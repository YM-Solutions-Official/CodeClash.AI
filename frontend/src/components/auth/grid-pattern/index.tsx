export default function GridPattern() {
  return (
    <div
      className="absolute inset-0 opacity-[0.03]"
      style={{
        backgroundImage: `
            linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)
          `,
        backgroundSize: "60px 60px",
      }}
    />
  );
}
