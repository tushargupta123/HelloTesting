const Darray = artifacts.require("Darray");

contract("Darray", () => {

    // we can avoid this repetiton by using Mocha hooks
    // before -> works only once before any test statement
    // after -> works only once after last test statement
    // beforeEach -> works before every test statement
    // afterEach -> works after every test statement

    let darray = null;
    before(async () => {
        darray = await Darray.deployed();
    });


    it("array has been pushed", async () => {
        // let darray = await Darray.deployed();
        await darray.insert(2)
        const element = await darray.arr(0)
        assert(element.toNumber() == 2);
    })
    it("should get an element form arr array", async () => {
        // let darray = await Darray.deployed();
        await darray.insert(20);
        const element = await darray.arr(1);
        assert(element.toNumber() == 20);
    })
    it("should return the lenght of arr",async () => {
        // let darray = await Darray.deployed();
        const length = await darray.length();
        assert(length.toNumber() == 2);
    })
    it("should get all the elements of arr",async() => {
        const arr = await darray.getAll();
        const elements = arr.map((element) => element.toNumber());
        assert.deepEqual(elements,[2, 20]);
    })
})