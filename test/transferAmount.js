const TransferAmount = artifacts.require("TransferAmount");

contract("TransferAmount",(accounts)=>{
    let transferAmount = null;

    before(async()=>{
        transferAmount = await TransferAmount.deployed();
    })

    it("should transfer amount",async() =>{
        const recipents = [accounts[1],accounts[2],accounts[3]]; 
        const amounts = [10,20,30];

        const initialBalances = await Promise.all(
            recipents.map((recipient)=>{
                return web3.eth.getBalance(recipient);
            })
        )
        console.log(initialBalances);
    })
})