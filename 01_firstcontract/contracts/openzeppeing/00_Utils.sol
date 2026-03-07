// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/utils/math/Math.sol";
/*
使用utils的Math
需要先导入Math的Libary
*/

/*
Math
Cryptographt
Security
Intorspection
Data Structures
Libraries

Math库提供了常用的数学函数，如最大值、最小值、平均值等，还提供了安全的数学运算函数，如tryAdd、trySub、tryMul、tryDiv等，可以避免溢出和除零错误
Cryptography库提供了加密相关的函数，如哈希函数、签名验证函数等，可以用于实现安全的智能合约功能
Security库提供了安全相关的函数，如重入保护、访问控制等，可以用于增强智能合约的安全性
Introspection库提供了合约自省相关的函数，如接口检测、合约地址
Data Structures库提供了常用的数据结构，如链表、映射、数组等，可以用于实现复杂的数据管理功能
Libraries库提供了库相关的函数，如库的部署、调用等，可以用于实现可重用的智能合约组件
*/

contract MathUtils{
    using Math for uint256;

    // 使用方式1
    function tryAdd(uint a, uint b) external pure returns(uint256){
        (bool success, uint256 result) = Math.tryAdd(a,b);
        require(success,"tryAdd is failed");
        return result;
    }

    // 使用方式2
    function tryAdd2(uint a, uint b) external pure returns(uint256){
        (bool success, uint256 result) = a.tryAdd(b);
        require(success,"tryAdd is failed");
        return result;
    }
}