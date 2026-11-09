import NotFoundPage from "../components/body-comp/NotFoundPage";
import { pageMeta } from "../lib/seo";

export const meta = ({ location }) =>
  pageMeta({
    title: "Page not found",
    path: location?.pathname ?? "/",
    description: "The page you’re looking for doesn’t exist or has moved.",
    noindex: true,
  });

export default function NotFound() {
  return <NotFoundPage />;
}
