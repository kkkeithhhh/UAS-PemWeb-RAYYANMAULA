import { useState } from "react";
import { ethers } from "ethers";
import axios from "axios";

function App() {
  const [account, setAccount] = useState("");
  const [balance, setBalance] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState("");

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        setError("MetaMask belum terinstall");
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      const bal = await provider.getBalance(address);

      setAccount(address);
      setBalance(ethers.formatEther(bal));
    } catch {
      setError("Gagal connect wallet");
    }
  };

  const loadTransactions = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/transactions"
      );
      setTransactions(res.data);
    } catch {
      setError("Gagal ambil data transaksi");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Full-Stack Blockchain App</h1>


      <button onClick={connectWallet}>Connect Wallet</button>

      {account && (
        <>
          <p><b>Address:</b> {account}</p>
          <p><b>Saldo:</b> {balance} ETH</p>
        </>
      )}

      <hr />

      <button onClick={loadTransactions}>
        Load Transactions
      </button>

      <ul>
        {transactions.map((tx, i) => (
          <li key={i}>{tx}</li>
        ))}
      </ul>

      {error && <p style={{ color: "red" }}>{error}</p>}
      <h5>-PROJECT UAS RayyanMaula 241111093</h5>
    </div>
  );
}

export default App;
