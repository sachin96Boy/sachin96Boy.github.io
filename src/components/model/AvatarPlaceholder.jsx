/** Lightweight silhouette shown while the 3D chunk and model load (no three.js import). */
function AvatarPlaceholder() {
  return (
    <div role="status" className="flex h-full w-full items-end justify-center">
      <div className="flex h-[78%] w-[48%] max-w-[280px] animate-pulse flex-col items-center">
        <div className="aspect-square w-[38%] rounded-full bg-surface-2" />
        <div className="mt-3 w-full flex-1 rounded-t-[45%] bg-gradient-to-b from-surface-2 to-transparent" />
      </div>
      <span className="sr-only">Loading 3D avatar…</span>
    </div>
  );
}

export default AvatarPlaceholder;
