// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/proxy/utils/Initializable.sol"; 
import "@openzeppelin/contracts/proxy/transparent/TransparentUpgradeableProxy.sol";

// Proxy.sol
// ERC1967Proxy.sol

/* 透明可升级合约
-代理合约包含升级逻辑（如 upgradeTo(address)）。
-所有对逻辑合约的调用都通过代理转发（delegatecall）。
-为避免用户调用与管理函数（如 upgradeTo）冲突，采用“透明代理”设计：
-如果调用者是 admin，则执行代理本身的管理函数；
-否则，将调用转发给逻辑合约。

升级逻辑位置：	    在代理合约中	
谁可以调用升级：	由代理合约的管理员（admin）控制	
Gas 成本：	        略高（每次调用需检查是否是 admin）	
兼容性：	        兼容所有逻辑合约（无需修改）	
安全性考量：	    代理本身复杂，存在“函数冲突”风险（需透明代理解决）	
推荐使用场景：	    简单、快速原型；不希望修改逻辑合约	
*/
contract TPUProxy is TransparentUpgradeableProxy{
    constructor( address _logic, address initialOwner, bytes memory _data) payable TransparentUpgradeableProxy(_logic, initialOwner, _data){

    }

    receive() external payable { }

    function proxyAdmin() external view returns(address){
        return _proxyAdmin();
    }

    function getImplements() external view returns(address){
        return _implementation();
    }
}
 

// 实现合约1
contract TUPV1 is Initializable{
    uint public x;

    function initialize (uint _val) external initializer{
        x = _val;
    }

    function call() external {
        x=x+1;
    }

    function showInvoke() external pure returns(bytes memory){
        // return abi.encodeWithSelector(this.initialize.selector, 1);
        bytes4 selector = bytes4(keccak256("initialize(uint256)"));
        return abi.encodeWithSelector(selector, 1);
    }
}

// 实现合约2
contract TUPV2 is Initializable{
    uint public x;

    function initialize (uint _val) external initializer{
        x = _val;
    }

    function call() external {
        x=x*2;
    }

    function showInvoke() external pure returns(bytes memory){
        return abi.encodeWithSelector(this.initialize.selector, 1);
    }
}
