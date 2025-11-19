export default async function HomePage() {
  return (
    <main className="min-h-[80vh] flex flex-col justify-center items-center relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px] animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>

      <div className="text-center space-y-12 z-10 p-8 max-w-4xl mx-auto">
        <div className="space-y-6">
          <h1 className="text-7xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-primary-light via-primary to-primary-dark animate-fade-in tracking-tighter drop-shadow-2xl">
            杂记
          </h1>
          <h2 className="text-2xl md:text-4xl text-text-muted font-light animate-slide-up tracking-wide" style={{ animationDelay: '0.2s' }}>
            嘿，你好！终于等到你了！
          </h2>
        </div>

        <div className="flex flex-col md:flex-row gap-8 justify-center items-center mt-16 animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <a
            href="/posts"
            className="group relative w-48 h-20 flex items-center justify-center bg-surface/30 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden transition-all duration-500 hover:scale-110 hover:bg-surface/50 hover:border-primary/50 hover:shadow-[0_0_40px_rgba(251,191,36,0.3)]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            <span className="relative text-xl font-bold text-text-main group-hover:text-primary transition-colors tracking-widest">文 章</span>
          </a>

          <a
            href="/tags"
            className="group relative w-48 h-20 flex items-center justify-center bg-surface/30 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden transition-all duration-500 hover:scale-110 hover:bg-surface/50 hover:border-secondary/50 hover:shadow-[0_0_40px_rgba(56,189,248,0.3)]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-secondary/20 via-transparent to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            <span className="relative text-xl font-bold text-text-main group-hover:text-secondary transition-colors tracking-widest">标 签</span>
          </a>
        </div>
      </div>
    </main>
  )
}