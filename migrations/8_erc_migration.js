const ERC = artifacts.require("ERC20Token.sol");

module.exports = function(deployer,_network,accounts){
    deployer.deploy(ERC,"My Block","BLK",18,"1000000000000");
}