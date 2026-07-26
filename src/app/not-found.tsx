import Link from "next/link";

export default function NotFound() {
  return (
    <section className="page-hero">
      <div className="container">
        <span className="eyebrow">404 · Page not found</span>
        <h1>This page is no longer here.</h1>
        <p className="page-hero__intro mt-4">
          The page may have moved. Try the navigation above, or return to the homepage.
        </p>
        <p className="mt-5">
          <Link className="text-link" href="/">
            Back to homepage →
          </Link>
        </p>
      </div>
    </section>
  );
}
