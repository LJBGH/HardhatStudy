const { loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MyToken contract", function () {
    async function deployMyTokenFixture() {
        // 获取一些地址
        const [owner, addr1, addr2] = await ethers.getSigners();
        const Token = await ethers.getContractFactory("MyToken");
        const token = await Token.deploy(ethers.parseEther("1000000"));
        return { token, owner, addr1, addr2 };
    }

    it("测试合约name和symbol", async function () {
        const { token } = await loadFixture(deployMyTokenFixture);
        expect(await token.name()).to.equal("MyToken");
        expect(await token.symbol()).to.equal("MT");
    })

    it("测试代币总", async function () {
        const { token, owner } = await loadFixture(deployMyTokenFixture);
        const ownerBalance = await token.balanceOf(owner.address);
        expect(ownerBalance).to.equal(ethers.parseEther("1000000"));
    })

    it("测试转账", async function () {
        const { token, owner, addr1, addr2 } = await loadFixture(deployMyTokenFixture);
        await expect(
            token.transfer(addr1.address, 100)
        ).to.changeTokenBalances(token, [owner, addr1], [-100, 100]);

        await expect(
            token.connect(addr1).transfer(addr2.address, 50)
        ).to.changeTokenBalances(token, [addr1, addr2], [-50, 50]);
    })
}) 