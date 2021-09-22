import type { NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100%",
      }}
    >
      <Link href="/enter">
        wow, this is a great idea! let's get started already 😛
      </Link>
    </div>
  );
};

export default Home;
