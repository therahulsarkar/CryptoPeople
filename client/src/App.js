import React, { useEffect, useState } from "react";
import CryptoPeople from "./contracts/CryptoPeople.json";
import getWeb3 from "./getWeb3";

const App = () => {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [people, setPeople] = useState([]);
  const [mintText, setMintText] = useState("");

  //! Minting function
  const mint = () => {
    contract.methods.mint(mintText).send({ from: account }, (error) => {
      console.log("Minted!");
      if (!error) {
        setPeople([...people, mintText]);
        setMintText("");
      }
    });
  };

  
  //!Load NFTS
  const loadNFTS = async (contract) => {
    const totalSupply = await contract.methods.totalSupply().call();
    let results = [];

    for (let i = 0; i < totalSupply; i++) {
      let peoples = await contract.methods.people(i).call();
      results.push(peoples);
    }
    setPeople(results);
  };

  //! load web3 account function
  const loadWeb3Account = async (web3) => {
    const accounts = await web3.eth.getAccounts(); //👈
    if (accounts) {
      setAccount(accounts[0]);
    }
  };

  //! load web3 contract function
  const loadWeb3Contract = async (web3) => {
    const networkId = await web3.eth.net.getId();
    // console.warn(networkId)
    const networkData = CryptoPeople.networks[networkId]; //👈
    // console.info(networkData);

    if (networkData) {
      const abi = CryptoPeople.abi;
      const address = networkData.address;
      const contract = new web3.eth.Contract(abi, address);
      setContract(contract);
      return contract;
    } else {
      console.info("sorry");
    }
  };

  //! Main
  useEffect(() => {
    async function fetchWeb3() {
      //Calling the getWeb3 function just after this component gets mounted
      const web3 = await getWeb3();
      await loadWeb3Account(web3);
      const contract = await loadWeb3Contract(web3);
      await loadNFTS(contract);
    }

    fetchWeb3();
  }, []);

  return (
    <>
      <div>
        <nav className="navbar navbar-light bg-light px-4">
          <a className="navbar-brand" href="#">
            Crypto People
          </a>
          <span>{account}</span>
        </nav>
        <div className="container-fluid mt-5">
          <div className="row">
            <div className="col d-flex flex-column align-items-center">
              <img
                className="mb-4"
                src="https://avatars.dicebear.com/api/pixel-art/naz.svg"
                alt=""
                width="72"
              />
              <h1 className="display-5 fw-bold">Crypto People</h1>
              <div className="col-6 text-center mb-3">
                <p className="lead text-center">
                  These are some of the most highly motivated coders in the
                  world! We are here to learn coding and apply it to the
                  betterment of humanity. We are inventors, innovators, and
                  creators
                </p>
                <div>
                  <input
                    type="text"
                    value={mintText}
                    onChange={(e) => setMintText(e.target.value)}
                    className="form-control mb-2"
                    placeholder="e.g. Naz"
                  />
                  <button onClick={mint} className="btn btn-primary">
                    Mint
                  </button>
                </div>
              </div>
              <div className="col-8 d-flex justify-content-center flex-wrap">
                {people.map((people, key) => (
                  <div
                    className="d-flex flex-column align-items-center"
                    key={key}
                  >
                    <img
                      width="150"
                      src={`https://avatars.dicebear.com/api/pixel-art/${people.replace(
                        "#",
                        ""
                      )}.svg`}
                    />
                    <span>{people}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
