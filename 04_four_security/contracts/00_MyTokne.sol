// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    constructor(uint256 totalSupply) ERC20("MyToken", "MT") {
        _mint(msg.sender, totalSupply);
    }
}
