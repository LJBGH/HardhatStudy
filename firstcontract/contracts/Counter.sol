// SPDX-License-Identifier: MIT
pragma solidity ^0.8.33;

import "hardhat/console.sol";

contract Counter {
    uint256 counter;

    event CounterInc(address sender ,uint256 newCounter);

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
}