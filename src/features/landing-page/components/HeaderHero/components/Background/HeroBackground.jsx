export const HeroBackground = () => (
  <div className="absolute inset-0 overflow-hidden">
    {/* Animated gradient circles */}
    <div className="absolute top-20 -left-40 w-80 h-80 bg-blue-600/10 dark:bg-blue-600/20 rounded-full blur-3xl animate-pulse" />
    <div className="absolute top-40 -right-40 w-80 h-80 bg-indigo-600/10 dark:bg-indigo-600/20 rounded-full blur-3xl animate-pulse" />
    <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-full h-full">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/5 via-transparent to-indigo-900/5 dark:from-blue-900/10 dark:to-indigo-900/10" />
    </div>
    
    {/* Grid pattern */}
    <div className="absolute inset-0 opacity-5 dark:opacity-10">
      <div className="absolute inset-0" style={{
        backgroundImage: `linear-gradient(to right, #888 1px, transparent 1px),
                         linear-gradient(to bottom, #888 1px, transparent 1px)`,
        backgroundSize: '50px 50px'
      }} />
    </div>
  </div>
);