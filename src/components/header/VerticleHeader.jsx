import { NavLink } from "react-router-dom";
import { navigation } from "../../data/navigation";

/** Fixed icon navigation rail on the right (desktop only). */
function VerticleHeader() {
  return (
    <nav
      aria-label="Primary"
      className="fixed inset-y-0 right-0 z-30 hidden w-20 flex-col items-center justify-center border-l border-line bg-surface lg:flex"
    >
      <ul className="flex flex-col items-center gap-5">
        {navigation.map(({ to, label, icon: Icon, end }) => (
          <li key={to} className="group relative">
            <NavLink
              to={to}
              end={end}
              aria-label={label}
              className={({ isActive }) =>
                `flex h-11 w-11 items-center justify-center rounded-full transition-colors duration-200 ${
                  isActive
                    ? "bg-accent text-on-accent"
                    : "bg-surface-2 text-muted hover:bg-line hover:text-fg"
                }`
              }
            >
              <Icon aria-hidden="true" className="h-6 w-6" />
            </NavLink>
            {/* Visual tooltip; the link's aria-label carries the accessible name. */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute right-full top-1/2 mr-3 -translate-y-1/2 whitespace-nowrap rounded-md border border-line bg-surface-2 px-2.5 py-1 text-sm text-fg opacity-0 shadow-lg transition-opacity duration-150 group-focus-within:opacity-100 group-hover:opacity-100"
            >
              {label}
            </span>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default VerticleHeader;
