const Wallet = artifacts.require("Wallet");

module.exports = function(deployer,_network,accounts){
    deployer.deploy(Wallet,accounts[0])
    // we are taking all the accounts present in our ganache and making top account as owner of contract.
}