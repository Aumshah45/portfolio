import { useDecode } from '../../hooks/useDecode';

interface Props {
  value: string;
  className?: string;
}

export function DecodeNumber({ value, className }: Props) {
  const { ref, text } = useDecode<HTMLSpanElement>(value);
  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{value}</span>
      <span aria-hidden="true">{text}</span>
    </span>
  );
}
