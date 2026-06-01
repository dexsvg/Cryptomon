// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract YourContract is ERC1155, Ownable {
    using Strings for uint256;

    string public name = "Cryptomon TCG Series 1";
    string public symbol = "CMON1";
    
    // Harga 1 Booster Pack (Contoh: 0.0005 ETH atau sekitar Rp20.000)
    uint256 public packPrice = 0.0005 ether; 
    
    // Alamat dompet kamu untuk menerima keuntungan langsung
    address payable public developerWallet;

    constructor() 
        ERC1155("https://api.cryptomon.com/metadata/{id}.json") 
        Ownable(msg.sender) 
    {
        developerWallet = payable(msg.sender); // Otomatis set ke wallet kamu
    }

    // Fungsi Utama: User membeli dan membuka Booster Pack
    function buyAndOpenPack(uint256 _amountOfPacks) public payable {
        uint256 totalCost = packPrice * _amountOfPacks;
        require(msg.value >= totalCost, "Dana kurang, Bro!");

        // Cuan masuk otomatis ke dompetmu
        developerWallet.transfer(msg.value);

        // Dapat isi 3 kartu per pack secara acak
        for (uint256 i = 0; i < _amountOfPacks; i++) {
            for (uint256 j = 0; j < 3; j++) {
                uint256 cardId = _getRandomCardId(i + j);
                _mint(msg.sender, cardId, 1, "");
            }
        }
    }

    // Sistem pengacak kelangkaan kartu (Rarity)
    function _getRandomCardId(uint256 _salt) internal view returns (uint256) {
        uint256 randomNum = uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender, _salt))) % 100;

        if (randomNum < 70) {
            return (randomNum % 3) + 1; // 70% Common (ID: 1-3)
        } else if (randomNum < 95) {
            return (randomNum % 2) + 4; // 25% Rare (ID: 4-5)
        } else {
            return 6; // 5% Legendary (ID: 6)
        }
    }

    function setPackPrice(uint256 _newPrice) public onlyOwner {
        packPrice = _newPrice;
    }

    function setDeveloperWallet(address payable _newWallet) public onlyOwner {
        developerWallet = _newWallet;
    }
}
