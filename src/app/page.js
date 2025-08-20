export default async function HomePage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12 space-y-16">
      <h1 className="text-center text-4xl md:text-5xl font-bold text-[#d9a705] mb-12">
        杂记
      </h1>
      <h2>嘿，你好！终于等到你了！</h2>
      <div className="flex gap-8 items-center justify-center">
        
        <a
          href="https://zhuganglie.vercel.app/posts"
          className="font-semibold border-2 border-[#d9a705] px-6 py-3 rounded-full text-[#d9a705] hover:bg-[#d9a705] hover:text-zinc-900 transition-all duration-300 hover:scale-105"
        >
          文 章
        </a>
        <a
          href="https://zhuganglie.vercel.app/tags"
          className="font-semibold border-2 border-[#d9a705] px-6 py-3 rounded-full text-[#d9a705] hover:bg-[#d9a705] hover:text-zinc-900 transition-all duration-300 hover:scale-105"
        >
          标 签
        </a>
      </div>
</main>
     )}