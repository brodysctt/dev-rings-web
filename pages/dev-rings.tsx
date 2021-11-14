import type { NextPage } from "next";
import Image from "next/image";

const DevRings: NextPage = () => {
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
      <Image
        src="https://media.giphy.com/media/054ZPjUUVPHPwrzpHJ/giphy.gif"
        width="500px"
        height="300px"
      />
    </div>
  );
};

export default DevRings;
