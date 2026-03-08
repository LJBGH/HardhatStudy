// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
/*
* 状态变量攻击
实现方式：私有变量只能保证不被其他合约访问，但依然是对外公开的，可以被外部用户访问到
*/

contract Vault {
    bool public locked;
    bytes32 private password;

    constructor(bytes32 _password) {
        locked = true;
        password = _password;
    }

    function unlock(bytes32 _password) public {
        if (password == _password) {
            locked = false;
        }
    }
}