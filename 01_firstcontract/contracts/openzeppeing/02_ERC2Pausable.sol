// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {ERC20Pausable} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Pausable.sol";

/*
ERC20Pausable 是 ERC20 的一个扩展，允许合约所有者暂停和恢复代币的转移。
    当合约处于暂停状态时，所有的代币转移操作（包括转账、授权等）都会被禁止。这对于在紧急情况下保护用户资金或防止恶意行为非常有用。

ERC20Pausable 主要引入了 pause 和 unpause 函数，允许合约所有者控制合约的暂停状态。
    当合约处于暂停状态时，所有的代币转移操作都会被禁止，直到合约被恢复。

ERC20Pausable 的使用场景包括：
1. 紧急情况：当发现合约存在安全漏洞或受到攻击时，合约所有者可以暂停合约以保护用户资金，直到问题得到解决。
2. 维护和升级：在进行合约维护或升级时，合约所有者可以暂停合约以防止用户在维护期间进行操作，确保系统的稳定性。
3. 防止恶意行为：如果发现某个地址正在进行恶意操作（如大量转移代币），合约所有者可以暂停合约以阻止该行为，保护其他用户的利益。

总之，ERC20Pausable 通过引入暂停机制，为 ERC20 代币提供了额外的安全性和控制能力，使得合约所有者能够在紧急情况下保护用户资金，维护系统的稳定性，并防止恶意行为。
    这在 DeFi 协议、去中心化交易所等场景中具有重要的应用价值。
*/
contract MyERC20Pausable is ERC20, ERC20Pausable, Ownable {
    constructor(address initialOwner)
        ERC20("MyERC20Pausable", "MEP")
        Ownable(initialOwner)
    {
        _mint(msg.sender, 100 * 10 ** decimals());
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    // The following functions are overrides required by Solidity.

    function _update(address from, address to, uint256 value)
        internal
        override(ERC20, ERC20Pausable)
    {
        super._update(from, to, value);
    }
}