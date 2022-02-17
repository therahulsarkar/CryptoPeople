var CryptoPeople = artifacts.require("./CryptoPeople.sol");

module.exports = function(deployer) {
  deployer.deploy(CryptoPeople);
};
