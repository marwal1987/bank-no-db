import Link from "next/link";

export default function Home() {
  return (
    <section className="hero">
      <h1 className="text-8xl text-stone-50 max-w-[768px] text-center font-bold drop-shadow-xl">
        Välkommen till din bank!
      </h1>

      <Link href="/create-user" className="button-hero">
        Skapa användare
      </Link>
    </section>
  );
}
