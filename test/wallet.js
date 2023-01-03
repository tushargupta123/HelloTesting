const Wallet = artifacts.require("Wallet");
const { web3 } = require("@openzeppelin/test-helpers/src/setup");

contract("Wallet",(accounts)=>{
    let wallet = null;
    before(async()=>{
        wallet = await Wallet.deployed();
    })
    it("should set accounts[0] as owner",async()=>{
        const owner = await wallet.owner();
        assert(owner===accounts[0]);
    })

    it("should deposit ether to wallet",async()=>{
        await wallet.deposit({from:accounts[0],value:50});
        const balance = await web3.eth.getBalance(wallet.address);
        assert(parseInt(balance) === 50);
    })  

    it("should return balance of wallet",async()=>{
        const balance = await wallet.balanceOf();
        assert(parseInt(balance) === 50);
    })

    it("should transfer ether to other address",async()=>{
        const receive_beforeBalance = await web3.eth.getBalance(accounts[1]);
        console.log("receiver before balance",receive_beforeBalance);
        await wallet.send(accounts[1],10,{from:accounts[0]});
        const receiver_afterBalance = await web3.eth.getBalance(accounts[1]); // string
        console.log("receiver after balance",receiver_afterBalance);
        const finalBalance = web3.utils.toBN(receiver_afterBalance); // object
        const intialBalance = web3.utils.toBN(receive_beforeBalance);
        assert(finalBalance.sub(intialBalance).toNumber() === 10);
    })

    it("should not transfer ether if tx not sent from the owner",async()=>{
        try{
            await wallet.send(accounts[1],10,{from:accounts[0]});
        }
        catch(e){
            assert(false,"only owner should send the tx");
        }
    })
})