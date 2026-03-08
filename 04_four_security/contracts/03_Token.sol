// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;
/*
* uint 溢出攻击
实现方式：solidity8.0之前版本可使用uint溢出漏洞，使计算出的值发生变化，以盗取资金
*/
contract Token {
    mapping(address => uint256) balances;
    uint256 public totalSupply;

    constructor(uint256 _initialSupply) public {
        balances[msg.sender] = totalSupply = _initialSupply;
    }

    function transfer(address _to, uint256 _value) public returns (bool) {
        require(balances[msg.sender] - _value >= 0);
        balances[msg.sender] -= _value;
        balances[_to] += _value;
        return true;
    }

    function balanceOf(address _owner) public view returns (uint256 balance) {
        return balances[_owner];
    }
}