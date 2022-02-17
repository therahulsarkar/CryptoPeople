const CryptoPeople = artifacts.require("./CryptoPeople");

contract("CryptoPeople", accounts => {

  let contract;

  before(async ()=>{
    contract = await CryptoPeople.deployed();
  })

  it("...get deployed", async () => {
    assert.notEqual(contract, "");
  });



  it('get minted and added', async()=>{
    const result = await contract.mint('Rahul');
    let people = await contract.people(0);
    assert(people, 'Rahul' )
  })



  });
