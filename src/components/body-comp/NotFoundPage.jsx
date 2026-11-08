import { Link } from "react-router-dom";
import { TbHome } from "react-icons/tb";

function NotFoundPage() {
  return (
    <section className="section flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p className="eyebrow">404</p>
      <h1 className="section-title mt-2">Page not found</h1>
      <p className="mt-3 text-muted">The page you’re looking for doesn’t exist or has moved.</p>
      <Link to="/" className="btn-primary mt-8">
        <TbHome aria-hidden="true" className="h-5 w-5" />
        Back to home
      </Link>
    </section>
  );
}

export default NotFoundPage;
