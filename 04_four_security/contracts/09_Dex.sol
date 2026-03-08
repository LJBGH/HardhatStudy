// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "openzeppelin-contracts-08/token/ERC20/IERC20.sol";
import "openzeppelin-contracts-08/token/ERC20/ERC20.sol";
import "openzeppelin-contracts-08/access/Ownable.sol";

contract Dex is Ownable {
    address public token1;
    address public token2;

    constructor() {}

    function setTokens(address _token1, address _token2) public onlyOwner {
        token1 = _token1;
        token2 = _token2;
    }

    function addLiquidity(address token_address, uint256 amount) public onlyOwner {
        IERC20(token_address).transferFrom(msg.sender, address(this), amount);
    }

    // 初始状态：User_Token1：10，User_Token：10，Dex_Token1:100，Dex_Token2:100
    // 1. Swap(U1 -> U2) = 10 * 100 / 100 = 10  -> (U1: 0,   U2: 20, D1: 110, D2: 90)
    // 2. Swap(U2 -> U1) = 20 * 110 / 90  = 24  -> (U1: 24,  U2: 0,  D1: 86,  D2: 110)
    // 3. Swap(U1 -> U2) = 24 * 110 / 86  = 30  -> (U1: 0,   U2: 30, D1: 100, D2: 80)
    // 4. Swap(U2 -> U1) = 30 * 110 / 80  = 41  -> (U1: 41,  U2: 20, D1: 69,  D2: 110)
    // 5. Swap(U1 -> U2) = 41 * 110 / 69  = 65  -> (U1: 0,   U2: 0,  D1: 100, D2: 45)
    // 6. Swap(U2 -> U1) = 45 * 110 / 45  = 110 -> (U1: 110, U2: 65, D1: 0,   D2: 90)
    function swap(address from, address to, uint256 amount) public {
        require((from == token1 && to == token2) || (from == token2 && to == token1), "Invalid tokens");
        require(IERC20(from).balanceOf(msg.sender) >= amount, "Not enough to swap");
        uint256 swapAmount = getSwapPrice(from, to, amount);
        IERC20(from).transferFrom(msg.sender, address(this), amount);
        IERC20(to).approve(address(this), swapAmount);
        IERC20(to).transferFrom(address(this), msg.sender, swapAmount);
    }

    function getSwapPrice(address from, address to, uint256 amount) public view returns (uint256) {
        return ((amount * IERC20(to).balanceOf(address(this))) / IERC20(from).balanceOf(address(this)));
    }

    function approve(address spender, uint256 amount) public {
        SwappableToken(token1).approve(msg.sender, spender, amount);
        SwappableToken(token2).approve(msg.sender, spender, amount);
    }

    function balanceOf(address token, address account) public view returns (uint256) {
        return IERC20(token).balanceOf(account);
    }
}

contract SwappableToken is ERC20 {
    address private _dex;

    constructor(address dexInstance, string memory name, string memory symbol, uint256 initialSupply)
        ERC20(name, symbol)
    {
        _mint(msg.sender, initialSupply);
        _dex = dexInstance;
    }

    function approve(address owner, address spender, uint256 amount) public {
        require(owner != _dex, "InvalidApprover");
        super._approve(owner, spender, amount);
    }
}