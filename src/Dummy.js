import React, { useState } from "react";
import { ethers } from "ethers";
import "./WalletCard.css";

const Dummy = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [connButtonText, setConnButtonText] = useState("connect wallet");
  const [userBalance, setUserBalance] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);

  const connectWalletHandler = () => {
    if (window.ethereum.isMetaMask) {
      console.log("Wallet here");
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result) => {
          accountChangeHandler(result[0]);
          setConnButtonText("Wallet Connected");
        })
        .catch((err) => {
          setErrorMessage(err.message);
        });
    } else {
      console.log("Wallet Not installed");
      setErrorMessage("Install a wallet");
    }
  };

  const accountChangeHandler = (newAccount) => {
    setDefaultAccount(newAccount);
    getAccountBalance(newAccount.toString());
  };

  const getAccountBalance = (account) => {
    window.ethereum
      .request({
        method: "eth_getBalance",
        params: [account, "latest"],
      })
      .then((balance) => {
        setUserBalance(ethers.utils.formatEther(balance));
      })
      .catch((err) => setErrorMessage(err.message));
  };

  const chainChangedHandler = () => {
    window.location.reload();
  };

  // Account/Chain change listener

  window.ethereum.on("accountsChanged", accountChangeHandler);

  window.ethereum.on("chainChanged", chainChangedHandler);

  return (
    <div className="walletCard">
      <h4>Connect Metamsk</h4>
      <button onClick={connectWalletHandler}>{connButtonText}</button>
      <div className="accountDisplay">Account : {defaultAccount}</div>
      <div className="balanceDisplay">Balance : {userBalance}</div>
      <div> {errorMessage} </div>
    </div>
  );
};

export default Dummy;
