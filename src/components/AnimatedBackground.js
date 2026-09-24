/**
 * Enhanced AnimatedBackground — Premium cinematic background with 3D particles, 
 * glowing orbs, dynamic gradient meshes, and interactive elements for a stunning visual experience.
 */
const AnimatedBackground = () => {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* Enhanced animated gradient mesh */}
      <div className="absolute inset-0 bg-gradient-to-br from-bg via-surface to-bg animate-gradient bg-300%" />
      
      {/* Subtle grid with enhanced glow */}
      <div className="absolute inset-0 bg-grid-faint [background-size:44px_44px] opacity-40" />

      {/* Enhanced radial vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_60%,rgb(var(--c-bg))_100%)]" />

      {/* Multiple enhanced emerald aurora blobs with sophisticated animations */}
      <div className="absolute -top-40 -left-32 h-[40rem] w-[40rem] rounded-full bg-gradient-to-br from-brand/25 to-emerald-400/20 blur-[140px] animate-aurora" />
      <div
        className="absolute -bottom-48 right-[-10%] h-[44rem] w-[44rem] rounded-full bg-gradient-to-br from-emerald-400/20 to-teal-400/15 blur-[160px] animate-aurora"
        style={{ animationDelay: "7s" }}
      />
      <div
        className="absolute top-1/3 left-1/4 h-[32rem] w-[32rem] rounded-full bg-gradient-to-br from-teal-400/20 to-brand/15 blur-[120px] animate-aurora"
        style={{ animationDelay: "4s" }}
      />
      <div
        className="absolute bottom-1/4 right-1/3 h-[36rem] w-[36rem] rounded-full bg-gradient-to-br from-brand/15 to-emerald-400/10 blur-[130px] animate-aurora"
        style={{ animationDelay: "10s" }}
      />
      
      {/* Additional accent aurora for more depth */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[28rem] w-[28rem] rounded-full bg-gradient-to-br from-purple-500/10 to-pink-500/10 blur-[100px] animate-aurora"
        style={{ animationDelay: "5s" }}
      />
      
      {/* Enhanced floating geometric shapes with better animations */}
      <div className="absolute top-20 left-[15%] w-28 h-28 border-2 border-brand/20 rounded-2xl animate-float-3d rotate-45 bg-brand/5" />
      <div 
        className="absolute bottom-40 right-[20%] w-36 h-36 border-2 border-emerald-400/20 rounded-full animate-rotate-3d bg-emerald-400/5"
        style={{ animationDelay: "2s" }}
      />
      <div 
        className="absolute top-1/2 left-[10%] w-24 h-24 border-2 border-brand/20 rounded-2xl animate-float-slow bg-brand/5"
        style={{ animationDelay: "4s" }}
      />
      <div 
        className="absolute top-1/3 right-[15%] w-20 h-20 border-2 border-teal-400/20 rounded-lg animate-spin-slow bg-teal-400/5"
        style={{ animationDelay: "3s" }}
      />
      
      {/* Enhanced glowing particles with varied sizes and animations */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full blur-sm"
          style={{
            left: `${8 + i * 5}%`,
            top: `${12 + (i * 19) % 75}%`,
            width: `${2 + (i % 3)}px`,
            height: `${2 + (i % 3)}px`,
            background: i % 3 === 0 ? 'rgba(16, 185, 129, 0.5)' : i % 3 === 1 ? 'rgba(52, 211, 153, 0.4)' : 'rgba(20, 184, 166, 0.4)',
            animation: `particle-float ${3 + (i % 4)}s ease-in-out infinite`,
            animationDelay: `${i * 0.2}s`,
          }}
        />
      ))}
      
      {/* Subtle noise texture for depth */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
           }}
      />
    </div>
  );
};

export default AnimatedBackground;
