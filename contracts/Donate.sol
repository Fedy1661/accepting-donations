// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import 'hardhat/console.sol';

contract Donate {
    address owner;
    mapping(address => uint) private senderStructs;
    address [] private senderList;

    constructor(){
        owner = msg.sender;
    }

    function deposit() external payable {
        require(msg.value > 0, 'Value should be positive');
        if (senderStructs[msg.sender] == 0) {
            senderList.push(msg.sender);
        }

        senderStructs[msg.sender] += msg.value;
    }

    function withdraw(address payable _to, uint _value) external {
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