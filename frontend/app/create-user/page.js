"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateUserPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function createUser() {
    try {
      const response = await fetch("http://localhost:3001/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      console.log(data);
      router.push("/login");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <section className="card">
      <h2>Skapa användare</h2>
      <input
        type="text"
        placeholder=" Användarnamn"
        className="input-field"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder=" Lösenord"
        className="input-field"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={createUser} className="button">
        Skapa
      </button>
    </section>
  );
}
