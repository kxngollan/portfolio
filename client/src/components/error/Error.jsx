import { Link } from "react-router-dom";

const Error = () => {
  return (
    <main style={{ flexDirection: "column" }}>
      <h1>Page is not found</h1>

      <Link to="/">
        <button>Return to home page</button>
      </Link>
    </main>
  );
};

export default Error;
