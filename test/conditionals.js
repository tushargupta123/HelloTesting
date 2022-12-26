const Conditionals = artifacts.require("Conditionals");

contract("Conditionals",()=> {
    it("should check whether a is greater than b",async()=>{
        const conditionals = await Conditionals.deployed();
        try{
            const result = await conditionals.check(1,4);
            assert(result.toNumber()===5);
        }catch(e){
            assert(false,"a shoud be greater than b")
        }
        })
})