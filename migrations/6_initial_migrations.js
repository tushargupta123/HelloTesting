const TransferAmount = artifacts.require("TransferAmount");

module.exports = function(deployer,_network,accounts){
    deployer.deploy(TransferAmount,accounts[0])
}