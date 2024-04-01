"use client";

import { useState, useEffect } from "react";

export default function AccountPage() {
  const [saldo, setSaldo] = useState("");
  const [amount, setAmount] = useState("");
  async function fetchSaldo() {
    try {
      const token = sessionStorage.getItem("token");
      const response = await fetch("http://localhost:3001/me/accounts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });
      const data = await response.json();
      console.log(data);
      setSaldo(data.saldo);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  useEffect(() => {
    fetchSaldo();
  }, []);

  async function depositMoney() {
    try {
      const token = sessionStorage.getItem("token");
      const response = await fetch(
        "http://localhost:3001/me/accounts/transactions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token, amount: parseInt(amount) }),
        }
      );
      const data = await response.json();
      console.log(data);
      fetchSaldo();
      setSaldo(data.newBalance);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <section className="card">
      <h2>Konto </h2>
      <p className="text-xl font-bold text-slate-900" >SALDO: {saldo} kr</p>

      <input
        type="text"
        placeholder="Ange belopp"
        className="input-field"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <button onClick={depositMoney} className="button">
        Sätt in
      </button>
    </section>
  );
}
