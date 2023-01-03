const Token = artifacts.require("ERC20Token.sol");
const { web3 } = require("@openzeppelin/test-helpers/src/setup");
const {expectRevert, expectEvent} = require("@openzeppelin/test-helpers");

contract("ERC20Token", (accounts) => {
    let token;
    const initialBalance = web3.utils.toBN(web3.utils.toWei("1"));

    beforeEach(async() => {
        token = await Token.new("My Block","BLK",18,initialBalance);
    });

    it("should return the total supply",async() => {
        const supply = await token.totalSupply();
        assert(supply.eq(initialBalance));
    });

    it("should return the correct balance",async() => {
        const balance = await token.balanceOf(accounts[0]);
        assert(balance.eq(initialBalance));
    });

    it("should transfer token",async() => {
        const value = web3.utils.toBN(100);
        const receipt = await token.transfer(accounts[1],value);
        const balance1 = await token.balanceOf(accounts[0]); 
        const initialBalance = web3.utils.toBN(web3.utils.toWei("1"));
        assert(balance1.eq(initialBalance.sub(value)));
        expectEvent(receipt,"Transfer",{from:accounts[0],to:accounts[1],tokens:value});
    });

    it("should not transfer token if balance is too low",async() => {
        await expectRevert(token.transfer(accounts[1], web3.utils.toWei("10")),"not sufficient balance");
    });

    it("should transfer token when approved",async() => {
        let allowance;
        let receipt;

        const value = web3.utils.toBN(100);

        allowance = await token.allowance(accounts[0],accounts[1]);
        assert(allowance.isZero());

        receipt = await token.approve(accounts[1],value);  // accounts[0] has approved accounts[1] for 100 tokens
        allowance = await token.allowance(accounts[0],accounts[1]);  // allowance = 100
        assert(allowance.eq(value));

        expectEvent(receipt,"Approval",{
            tokenOwner:accounts[0],
            spender:accounts[1],
            tokens:value
        });

        receipt = await token.transferFrom(accounts[0],accounts[2],value,{from:accounts[1]}); // as this hav trasferred 100 tokens to accounts[2] from accounts[1]
        allowance = await token.allowance(accounts[0],accounts[1]); // hence allowance = 0 for accounts[1]
        const balance1 = await token.balanceOf(accounts[0]);
        const balance2 = await token.balanceOf(accounts[2]);
        assert(balance1.eq(initialBalance.sub(value)));
        assert(balance2.eq(value));
        assert(balance.isZero());

        expectEvent(receipt, "Transfer", {from:accounts[0],to:accounts[2],tokens:value});
    });

    it("should not transfer token if not approved",async() => {
        await expectRevert(token.transferFrom(accounts[0],accounts[1],10),"allowance too low");
    });

})