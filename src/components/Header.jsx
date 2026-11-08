import { useEffect, useId, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { TbMenu2, TbX } from "react-icons/tb";
import Logo from "./Logo";
import ProfilePanel from "./profile/ProfilePanel";
import { navigation } from "../data/navigation";

/** Sticky mobile top bar with a full-screen menu drawer (hidden on desktop). */
function Header() {
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef(null);
  const drawerId = useId();
  const { pathname } = useLocation();

  // Close whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // While open: Esc closes, and the page behind doesn't scroll.
  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const close = () => {
    setOpen(false);
    menuButtonRef.current?.focus();
  };

  return (
    <header className="sticky top-0 z-40 lg:hidden">
      <div className="flex h-14 items-center justify-between border-b border-line bg-surface/90 px-2 backdrop-blur">
        <button
          ref={menuButtonRef}
          type="button"
          aria-label="Open menu"
          aria-expanded={open}
          aria-controls={drawerId}
          onClick={() => setOpen(true)}
          className="icon-link"
        >
          <TbMenu2 aria-hidden="true" className="h-6 w-6" />
        </button>
        <Logo />
        <span className="w-11" aria-hidden="true" />
      </div>

      {open && (
        <div
          id={drawerId}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-50 overflow-y-auto bg-bg"
        >
          <div className="flex h-14 items-center justify-between border-b border-line px-2">
            <button
              type="button"
              aria-label="Close menu"
              onClick={close}
              className="icon-link"
              autoFocus
            >
              <TbX aria-hidden="true" className="h-6 w-6" />
            </button>
            <Logo />
            <span className="w-11" aria-hidden="true" />
          </div>

          <nav aria-label="Primary" className="px-4 pt-4">
            <ul className="grid gap-1">
              {navigation.map(({ to, label, icon: Icon, end }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    end={end}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `flex min-h-[48px] items-center gap-3 rounded-lg px-3 text-base font-medium transition-colors duration-200 ${
                        isActive ? "bg-surface-2 text-accent" : "text-fg hover:bg-surface"
                      }`
                    }
                  >
                    <Icon aria-hidden="true" className="h-5 w-5" />
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="px-4 py-8">
            <ProfilePanel compact />
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
