// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/cryptography/MessageHashUtils.sol";

/*
通过签名和消息恢复地址
使用OpenZeppelin的ECDSA库和MessageHashUtils库来简化签名验证过程
ECDSA库提供了recover函数，可以直接从消息哈希和签名中恢复出地址
MessageHashUtils库提供了toEthSignedMessageHash函数，可以将消息哈希转换为以太坊签名消息哈希格式，确保与以太坊签名规范一致
*/
contract VerifySignature2{
    using ECDSA for bytes32;
    using MessageHashUtils for bytes32;

    function recover(string memory str, bytes memory signature) external pure returns(address){
        bytes32 hash = keccak256(bytes(str));

        return hash.toEthSignedMessageHash().recover(signature);
    }
}