/** Service card. */
function ItemCard({ title, description, icon: Icon }) {
  return (
    <article className="card flex h-full flex-col gap-3 transition-colors duration-200 hover:border-accent/60">
      <span className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent">
        <Icon aria-hidden="true" className="h-7 w-7" />
      </span>
      <h3 className="text-lg font-semibold text-fg">{title}</h3>
      <p className="leading-relaxed text-muted">{description}</p>
    </article>
  );
}

export default ItemCard;
