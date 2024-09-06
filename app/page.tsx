import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div>
        <p>Home</p>
        <Link href="/dashboard">Go to Dashboard</Link>
      </div>
    </main>
  );
}
