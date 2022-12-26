const HelloTesting = artifacts.require("HelloTesting");

contract("HelloTesting",()=>{
    it("Should return Hello Testing",async()=>{
        const helloTesting = await HelloTesting.deployed();
        const result = await helloTesting.print();
        assert(result=="Hello Testing");
    })
})