interface EyebrowProps {
  num: string;
  children: React.ReactNode;
}

export default function Eyebrow({ num, children }: EyebrowProps) {
  return (
    <div className="eyebrow">
      <span className="num">{num}</span>
      <span className="mono">{children}</span>
      <span className="rule" />
    </div>
  );
}
