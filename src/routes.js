import { index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.jsx"),
  route("services", "routes/services.jsx"),
  route("portfolio", "routes/portfolio.jsx"),
  route("portfolio/project/:id", "routes/project.jsx"),
  route("workhistory", "routes/work-history.jsx"),
  route("contact", "routes/contact.jsx"),
  route("*", "routes/not-found.jsx"),
];
