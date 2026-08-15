import { Header } from "../components/Header";
import "./NotFoundPage.css";

export function NotFoundPage({ cart }) {
  return (
    <>
      <title>Not Found 404</title>
      <link rel="icon" href="404error.png" />
      <Header cart={cart} />
      <div className="not-found">404 NOT FOUND</div>
    </>
  );
}
