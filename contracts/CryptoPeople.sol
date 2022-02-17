// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.5.0 <0.9.0;

import "../client/node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "../client/node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract CryptoPeople is ERC721, ERC721Enumerable {

    string[] public people;
    mapping(string => bool) _peopleExist; // _peopleExist[name] -> true/false

    constructor() ERC721('CryptoPeople', 'CRP') {}


    //Function to mint our NFT
    function mint(string memory _nameOfPeople) public{
        require(!_peopleExist[_nameOfPeople], 'This name has already been used'); //Run only when the name of the person does not exist in the blockchain
        
        people.push(_nameOfPeople);
        uint _id = people.length - 1; //Getting the last index of our people array
        _mint(msg.sender, _id); //Minting using user's adress and ID (We are using position on the array as ID)
        _peopleExist[_nameOfPeople] = true; //After minting pointing the user's name to true, so that duplicating can not occur
    }


    // Override function copied from openzeppelin
     function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }


    //Override function copied from openzeppelin
    function supportsInterface(bytes4 interfaceId) public view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
