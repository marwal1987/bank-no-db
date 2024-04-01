import Link from "next/link";

export default function Header() {
  return (
    <header className="header">
      <div
        aria-hidden="true"
        className="p-3 text-xl font-bold uppercase drop-shadow-xl border border-zinc-400 bg-gradient-to-tl from-teal-900 to-teal-900 via-teal-700 via-60% rounded-md shadow-sm"
      >
       <span className="bg-clip-text text-transparent bg-gradient-to-tl from-zinc-500 to-zinc-400 via-zinc-300">
         DinBank
        </span>
      </div>

      <nav>
        <menu className="nav-menu">
          <Link href="/" className="link">
            Hem
          </Link>
          <Link href="/create-user" className="link">
            Skapa användare
          </Link>

          <Link href="/login" className="link">
            Logga in
          </Link>
          <Link href="/account" className="link">
            Konto
          </Link>
        </menu>
      </nav>
    </header>
  );
}
