import Link from "next/link";

export default function NotFound() {
  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h4 style={{ fontSize: "2.2rem", textAlign: "center" }}>
        Page is not found
      </h4>

      <Link href={"/"}>
        <button style={{ padding: "10px", width: "inherit" }}>Home</button>
      </Link>
    </main>
  );
}
