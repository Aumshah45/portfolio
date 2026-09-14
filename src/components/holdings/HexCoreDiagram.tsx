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

function PortCard({ port }: { port: Port }) {
  return (
    <div className="rounded-panel border border-line-2 bg-bg-2 px-[18px] py-4">
      <div className="mb-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-acc">{port.label}</div>
      <p className="m-0 text-[13px] text-text-2">{port.body}</p>
    </div>
  );
}

/** Hexagonal architecture: one pure core, a port on each side, one seam to the regulated venue. */
export function HexCoreDiagram({ portA, core, portB, seam }: Props) {
  return (
    <div className="mb-2.5 mt-9">
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-[22px] max-md:grid-cols-1 max-md:justify-items-center max-md:text-center">
        <PortCard port={portA} />
        <div className="relative flex aspect-[1/1.05] w-[190px] flex-col items-center justify-center gap-1.5 px-6">
          <svg
            aria-hidden="true"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full fill-tint stroke-line"
          >
            <polygon points="50,1 99,25.5 99,74.5 50,99 1,74.5 1,25.5" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          </svg>
          <b className="relative font-mono text-[12px] font-normal tracking-[0.22em] text-acc">{core.label}</b>
          <span className="relative max-w-[14ch] text-center font-serif text-[12.5px] italic text-note">{core.note}</span>
        </div>
        <PortCard port={portB} />
      </div>
      <div className="mt-[18px] rounded-panel border border-dashed border-line px-[18px] py-3.5 text-center font-mono text-[11px] uppercase tracking-[0.12em] text-acc-dim">
        {seam}
      </div>
    </div>
  );
}
