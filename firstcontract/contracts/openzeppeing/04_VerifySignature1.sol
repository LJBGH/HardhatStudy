// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/*
通过签名和消息恢复地址
*/
contract VerifySignature1{

    // 通过签名和消息恢复地址
    function recover(string memory message, bytes memory signature) external pure returns(address){
        (bytes32 r,bytes32 s, uint8 v) = splitSignature (signature);
        bytes32 _sigMessage = keccak256(
            abi.encodePacked("\x19Ethereum Signed Message:\n32", keccak256(bytes(message)))
        );

        address addr = ecrecover(_sigMessage, v, r, s);
        return addr;
    }

    // 通过签名分解出r,s,v
    function splitSignature(bytes memory sig) public pure returns(bytes32 r,bytes32 s,uint8 v){
        assembly{
            r:= mload(add(sig,32))
            s:= mload(add(sig,64))
            v:= byte(0, mload(add(sig, 96)))
        }
    }
}