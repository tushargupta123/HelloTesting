const { expectRevert, time } =  require("@openzeppelin/test-helpers");
const { web3 } = require("@openzeppelin/test-helpers/src/setup");
const Loan = artifacts.require("Loan.sol");

contract("Loan",(accounts) => {
    let loan;
    const amount = 1000;
    const interest = 10;
    const duration = 100;

    const [borrower,lender] = [accounts[1],accounts[2]];
    before(async () => {
        loan = await Loan.deployed();
    });

    it("should not accept lend if not lender",async()=>{
        await expectRevert(loan.lend({from: borrower, value: amount}),"only lender can lend");
    });

    it("should not accpet lend amount if not exact amount",async()=>{
        await expectRevert(loan.lend({from:lender,value:100}),"can only lend the exact amount");
    });

    it("should accept lend amount",async()=>{
        const balanceBefore = web3.utils.toBN(await web3.eth.getBalance(borrower));
        await loan.lend({from : lender, value: amount});
        const balanceAfter = web3.utils.toBN(await web3.eth.getBalance(borrower));
        const state = await loan.state();
        assert(state.toNumber() == 1);
        assert(balanceAfter.sub(balanceBefore).toNumber()===amount);
    });

    it("should not reimburse if not borrower",async()=>{
        await expectRevert(loan.reimburse({from:accounts[3],value: amount+interest}),"only borrower can reimburse")
    });

    it("should not reimburse if not exact amount",async() => {
        await expectRevert(loan.reimburse({from: borrower,value: 50}),"borrower need to reimburse exactly amount + interest")
    });

    it("should not reimburse if loan has not matured",async() => {
        await expectRevert(loan.reimburse({from:borrower,value:amount+interest}),"loan has not been matured yet" )
    });

    
})