export default function GridBackground({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`absolute inset-0 -z-10 ${className}`}
      style={{
        backgroundImage:
          "radial-gradient(rgba(255, 255, 255, 0.18) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
        maskImage:
          "radial-gradient(ellipse 80% 60% at 50% 30%, black 40%, transparent 80%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 80% 60% at 50% 30%, black 40%, transparent 80%)",
      }}
    />
  );
}
