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

        await transferAmount.send(recipents,amounts,{from:accounts[0],value:90});

        const finalBalances = await Promise.all(
            recipents.map((recipient) => {
                return web3.eth.getBalance(recipient);
            })
        )
        console.log(finalBalances);
    });

    it("should not transfer amount if array length is not the same",async() => {
        const recipents = [accounts[1],accounts[2],accounts[3]];
        const amounts = [10,20];
        try{
            await transferAmount.send(recipents,amounts,{from:accounts[0],value:90});
        }catch(e){
            // console.error(e);
            assert(e.message.includes("must be the same length as amount"));
            return ;
        }
        assert(false);
    })
})