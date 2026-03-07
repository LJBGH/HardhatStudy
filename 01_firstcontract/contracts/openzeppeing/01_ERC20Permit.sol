// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {ERC20Permit} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";

/*
ERC20Permit 是 ERC20 的一个扩展，允许用户通过签名授权代币转移，而无需发送交易。这使得用户可以在不支付 gas 费用的情况下授权第三方（如去中心化交易所）代表他们转移代币。
ERC20Permit 主要引入了 permit 函数，该函数接受用户的签名
并验证签名的有效性。如果签名有效，合约将更新用户的授权额度，使得第三方可以在之后的交易中使用该授权额度转移代币。

ERC20Permit 的使用场景包括：
1. 去中心化交易所：用户可以授权交易所代表他们转移代币进行交易，而无需支付 gas 费用。
2. DeFi 协议：用户可以授权 DeFi 协议代表他们转移代币进行借贷、质押等操作，而无需支付 gas 费用。
3. 其他需要授权代币转移的场景：用户可以授权任何第三方代表他们转移代币，而无需支付 gas 费用。

总之，ERC20Permit 通过引入 permit 函数，使得用户可以通过签名授权代币转移，从而实现了无需支付 gas 费用的授权机制。这在去中心化交易所、DeFi 协议等场景中具有重要的应用价值。
*/
contract MyERC20Permit is ERC20, ERC20Permit {
    constructor(address recipient) ERC20("MyERC20Permit", "MEP") ERC20Permit("MyERC20Permit")
    {
        _mint(recipient, 100 * 10 ** decimals());
    }
}