// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Storage {

      int MyNumber;
     
      function store(int _a) public {
            MyNumber = _a;
      }

      function read() public view returns(int) {
            return MyNumber;
      }

}
