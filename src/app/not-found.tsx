import Link from "next/link";

export default function NotFound() {
  return (
    <main style={{ flexDirection: "column" }}>
      <h1>Page is not found</h1>

      <Link href={"/"}>
        <button>Return to home page</button>
      </Link>
    </main>
  );
}
