// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Donate {
    address owner;
    mapping(address => uint) private senderStructs;
    address [] private senderList;

    constructor(){
        owner = msg.sender;
    }

    function deposit() external payable {
        if (senderStructs[msg.sender] == 0 && msg.value > 0) {
            senderList.push(msg.sender);
        }

        senderStructs[msg.sender] += msg.value;
    }

    function withdraw(uint _value, address payable _to) external {
        require(msg.sender == owner, 'You should be an owner');
        _to.transfer(_value);
    }

    function getTotalSumOfSender(address _address) external view returns (uint) {
        return senderStructs[_address];
    }

    function getSenders() external view returns (address[] memory){
        return senderList;
    }
}