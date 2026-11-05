interface Port {
  label: string;
  body: string;
}

interface Props {
  portA: Port;
  core: { label: string; note: string };
  portB: Port;
  seam: string;
}

const sentence = (s: string) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();

/** Hexagonal architecture: one pure core, an interface each side, one seam to the regulated venue. */
export function HexCoreDiagram({ portA, core, portB, seam }: Props) {
  return (
    <div className="hexcore" role="figure" aria-label="Numera's hexagonal architecture">
      <div className="hexcore__port">
        <b>{portA.label.replace(' · ', ', ')}</b>
        <p>{portA.body}</p>
      </div>
      <div className="hexcore__core">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <polygon points="50,1 99,25.5 99,74.5 50,99 1,74.5 1,25.5" />
        </svg>
        <b>{sentence(core.label)}</b>
        <span>{sentence(core.note)}</span>
      </div>
      <div className="hexcore__port">
        <b>{portB.label.replace(' · ', ', ')}</b>
        <p>{portB.body}</p>
      </div>
      <p className="hexcore__seam">{seam.split(' · ').join('; ')}.</p>
    </div>
  );
}
