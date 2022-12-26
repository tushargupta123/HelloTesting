const Demo = artifacts.require("Demo");

contract("Demo",()=> {
    it("Should set the value of variable in smart contract",async()=>{
        const demo = await Demo.deployed();
        await demo.set("Great");
        const result = await demo.get();
        assert(result=="Great");
    })
})