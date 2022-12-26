// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.5.0 < 0.9.0;

contract Wallet{
    address payable public owner;

    constructor(address payable _owner){
        owner = _owner;
    }
    // to pass the constructor value we have to pass it through migration.

    function deposit() public payable {}

    function balanceOf() public view returns(uint256){
        return address(this).balance;
    }

    function send(address payable to, uint256 amount ) public{
        require(msg.sender==owner,"sender is not allowed");
        to.transfer(amount);
    }
}