// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.5.0 < 0.9.0;

contract Conditionals{
    function check(uint256 a, uint256 b) public pure returns(uint256){
        uint256 c;
        require(a>b,"a must be greater then b");
        c = a;
        return c;
    }
}