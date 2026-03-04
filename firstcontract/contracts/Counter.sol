// SPDX-License-Identifier: MIT
pragma solidity ^0.8.33;

import "hardhat/console.sol";

contract Counter {
    uint256 counter;
    error SendEthFailed();
    error WithdrawEthFailed();

    event CounterInc(address sender ,uint256 newCounter);
    event ReceiveEthLog(address sender, uint256 value);
    event SendEthLog(address target, uint256 value);
    event WithdrawEthLog(address sender, uint256 value);

    receive() external payable {
        console.log("Receive function called, value: %s", msg.value);
        emit ReceiveEthLog(msg.sender, msg.value);
    }

    // 如果是非 view 函数，修改状态变量的值，会产生新的区块
    function count() public returns (uint256) {
        counter++;
        console.log("Now, Counter value: %s", counter);
        emit CounterInc(msg.sender, counter);
        return counter;
    }

    // 如果是 view 函数，不能修改状态变量的值，不会产生新的区块
    function getCount() public view returns (uint256) {
        return counter;
    }

    // 发送ETH到指定地址
    function sendEth (address addr, uint256 value) external payable {
        require(value > 0, "Value must be greater than 0");
        require(address(this).balance >= value, "Insufficient balance");
        
        (bool success, ) = addr.call{value: value}("");
        if (!success) {
            revert SendEthFailed();  
        }else{
            emit SendEthLog(addr, value);
        }
    }


    // 提取合约中的所有ETH
    function withdraw() external payable {
        (bool success, ) = msg.sender.call{value: address(this).balance}("");
        if (!success) {
            revert WithdrawEthFailed();
        }
        emit WithdrawEthLog(msg.sender, address(this).balance);
    }
}