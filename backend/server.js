import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const port = 3001;

// Arrayer för användare, konton och sessioner
let users = [];
let accounts = [];
let sessions = [];

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Generera engångslösenord
function generateOTP() {
    const otp = Math.floor(100000 + Math.random() * 900000);
    return otp.toString();
}

// Skapa användare
app.post("/users", (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: "Alla fält måste fyllas i" });
    }
    const id = users.length + 1;
    users.push({ id, username, password });
    accounts.push({ id, userId: id, amount: 0 });
    res.status(200).json({ message: "Användare skapad!" });
});

// Logga in och skapa session
app.post("/sessions", (req, res) => {
    const { username, password } = req.body;
    const user = users.find(
        (user) => user.username === username && user.password === password
    );
    if (!user) {
        res.status(401).json({ message: "Felaktigt användarnamn eller lösenord" });
    } else {
        const token = generateOTP();
        sessions.push({ userId: user.id, token });
        res.status(200).json({ userId: user.id, token });
    }
});

// Visa saldo
app.post("/me/accounts", (req, res) => {
    const { token } = req.body;
    const session = sessions.find((session) => session.token === token);
    if (!session) {
        res.status(401).json({ message: "Ogiltig session" });
    } else {
        const account = accounts.find(
            (account) => account.userId === session.userId
        );
        res.status(200).json({ saldo: account.amount });
    }
});

// Sätt in pengar på konto
app.post("/me/accounts/transactions", (req, res) => {
    const { token, amount } = req.body;
    const session = sessions.find((session) => session.token === token);
    if (!session) {
        res.status(401).json({ message: "Ogiltig session" });
    } else {
        const account = accounts.find(
            (account) => account.userId === session.userId
        );
        account.amount += amount;
        res.status(200).json({ message: "Pengar insatta!", newBalance: account.amount });
    }
});

// Starta servern
app.listen(port, () => {
    console.log(`Bankens backend körs på http://localhost:${port}`);
});
