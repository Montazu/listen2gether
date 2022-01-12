import { Link } from "react-router-dom";
export default function Home() {
  const randomString = (length) =>
    Math.random()
      .toString(36)
      .substr(2, length)
      .split("")
      .map((e) => (Math.random() < Math.random() ? e.toUpperCase() : e))
      .join()
      .replaceAll(",", "");

  return (
    <div>
      <h1>Słuchaj muzyki razem</h1>
      <Link to={`/a/${randomString(5)}`}>Utwórz pokój</Link>
    </div>
  );
}
