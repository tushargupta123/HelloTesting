// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.5.0 < 0.9.0;

contract TransferAmount {
    address owner;

    constructor(address _owner){
        owner = _owner;
    }

    modifier ownerOnly() {
        require(msg.sender == owner);
        _;
    }

    function send(address payable[] memory to, uint256[] memory amount) public payable ownerOnly{
        require(to.length == amount.length, "to must be the same length as amount");
        for(uint256 i = 0 ; i < to.length; i++){
            to[i].transfer(amount[i]);
        }
    }
}