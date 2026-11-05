interface Props {
  items: string[];
  label: string;
}

/** A plain list of names (a stack, the tools): no boxes, no capitals. */
export function Tag({ items, label }: Props) {
  return (
    <ul className="tags" aria-label={label}>
      {items.map((t) => (
        <li key={t}>{t}</li>
      ))}
    </ul>
  );
}
