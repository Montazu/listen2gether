import cryptoRandomString from "crypto-random-string";
import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <h1>Słuchaj muzyki razem</h1>
      <Link
        to={{
          pathname: `/a/${cryptoRandomString({ length: 5, type: "base64" })}`,
        }}>
        Utwórz pokój
      </Link>
    </div>
  );
}
