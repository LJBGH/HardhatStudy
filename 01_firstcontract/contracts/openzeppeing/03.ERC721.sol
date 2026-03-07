// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";
import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {ERC721Pausable} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721Pausable.sol";

/*
AccessControl 是 OpenZeppelin 提供的一个访问控制模块，允许开发者定义不同的角色，并为每个角色分配特定的权限。   
    通过使用 AccessControl，开发者可以轻松地管理合约中的权限，确保只有授权的地址能够执行特定的操作。

AccessControl 主要引入了角色管理功能，允许开发者定义不同的角色，并为每个角色分配特定的权限。
    通过使用 AccessControl，开发者可以轻松地管理合约中的权限，确保只有授权的地址能够执行特定的操作。
    
AccessControl 的使用场景包括：
1. 角色管理：开发者可以定义不同的角色（如管理员、用户等），并为每个角色分配特定的权限，确保只有授权的地址能够执行特定的操作。
2. 权限控制：通过使用 AccessControl，开发者可以轻松地管理合约中的权限，确保只有授权的地址能够执行特定的操作，从而提高合约的安全性。
3. 多角色管理：AccessControl 允许开发者定义多个角色，并为每个角色分配不同的权限，使得合约能够支持复杂的权限管理需求。
总之，AccessControl 通过引入角色管理功能，使得开发者能够轻松地管理合约中的权限，确保只有授权的地址能够执行特定的操作，从而提高合约的安全性。这在需要复杂权限管理的场景中具有重要的应用价值。
*/
contract MyERC721 is ERC721, ERC721Pausable, AccessControl {
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");

    constructor(address defaultAdmin, address pauser) ERC721("MyERC721", "ME") {
        _grantRole(DEFAULT_ADMIN_ROLE, defaultAdmin);
        _grantRole(PAUSER_ROLE, pauser);
    }

    function _baseURI() internal pure override returns (string memory) {
        return "https://example.io";
    }

    function pause() public onlyRole(PAUSER_ROLE) {
        _pause();
    }

    function unpause() public onlyRole(PAUSER_ROLE) {
        _unpause();
    }

    // The following functions are overrides required by Solidity.

    function _update(address to, uint256 tokenId, address auth)
        internal
        override(ERC721, ERC721Pausable)
        returns (address)
    {
        return super._update(to, tokenId, auth);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}