// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

// import "@openzeppelin/contracts/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

// ERC1967Proxy.sol

/*
UUPSUpgradeable 是OpenZeppelin提供的一种可升级合约实现方式，它通过代理模式实现合约的升级。

-升级逻辑放在逻辑合约中，代理合约极简（只做 delegatecall）。
-逻辑合约必须继承 UUPSUpgradeable 并重写 _authorizeUpgrade(address newImplementation) 方法，用于权限控制。
-代理合约没有管理函数，所有升级请求都会被转发到逻辑合约处理。

升级逻辑位置：		在逻辑合约中
谁可以调用升级：	由逻辑合约中的权限控制（如 owner）决定
Gas 成本：		   更低（无额外检查）
兼容性：		   逻辑合约必须继承 UUPSUpgradeable 并实现 _authorizeUpgrade
安全性考量：	    逻辑合约需正确实现升级授权，否则可能被滥用
推荐使用场景：	    生产环境、追求 gas 效率、长期项目
*/

// 实现合约1
contract UUPSV1 is Initializable,UUPSUpgradeable,OwnableUpgradeable{
    uint public x;

    function _authorizeUpgrade(address implement) internal override {

    }

    function initialize (uint _val) external initializer{
        x = _val;
        __Ownable_init(msg.sender);
    }

    function call() external {
        x=x+1;
    }

    function showInvoke() external pure returns(bytes memory){
        return abi.encodeWithSelector(this.initialize.selector, 1);
    }
}

// 实现合约2
contract UUPSV2 is Initializable,UUPSUpgradeable,OwnableUpgradeable{
    uint public x;

    function _authorizeUpgrade(address implement) internal override {

    }

    function initialize (uint _val) external initializer{
        x = _val;
        __Ownable_init(msg.sender);
    }

    function call() external {
        x=x*2;
    }

    function showInvoke() external pure returns(bytes memory){
        return abi.encodeWithSelector(this.initialize.selector, 1);
    }
}