import ProfilePanel from "../profile/ProfilePanel";

/** Fixed profile sidebar (desktop only; the mobile drawer in Header shows the same panel). */
function Sidebar() {
  return (
    <aside
      aria-label="Profile"
      className="fixed inset-y-0 left-0 z-30 hidden w-64 overflow-y-auto border-r border-line bg-surface px-5 py-8 lg:block"
    >
      <ProfilePanel />
    </aside>
  );
}

export default Sidebar;
