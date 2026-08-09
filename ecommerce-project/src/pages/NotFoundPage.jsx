import { Header } from "../components/Header";
import './NotFoundPage.css'

export function NotFoundPage() {
  return (
    <>
      <title>Not Found 404</title>
      <link rel="icon" href="404error.png" />
      <Header />
      <div className="not-found">404 NOT FOUND</div>
    </>
  );
}
