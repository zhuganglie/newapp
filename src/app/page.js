export default async function HomePage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-center text-4xl md:text-5xl font-bold text-yellow-500 mb-10 mt-8">
        用科学的视角看政治
      </h1>
      <div className="flex gap-6 items-center justify-center mb-12">
        <a
          href="https://zhuganglie.vercel.app/posts"
          className="font-semibold border-2 border-yellow-600 px-5 py-2 rounded-full text-yellow-700 hover:bg-yellow-600 hover:text-white transition-colors duration-300"
        >
          文 章
        </a>
        <a
          href="https://zhuganglie.vercel.app/tags"
          className="font-semibold border-2 border-yellow-600 px-5 py-2 rounded-full text-yellow-700 hover:bg-yellow-600 hover:text-white transition-colors duration-300"
        >
          标 签
        </a>
      </div>

      <article className="prose prose-lg max-w-3xl mx-auto mb-12">
        <p>
          你是否曾好奇，为什么有些国家和平稳定，而有些国家却总是陷入冲突？或者为什么有些政府运作良好，而另一些效率低下？在这里，我们用科学的视角来探索政治问题。这里没有偏见或立场，我们专注于理解政治运作背后的真实规律。
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">政治科学？</h2>

        <p>
          政治科学是一门研究政治的科学。它帮助我们理解政府如何运作，为什么人们以某种方式投票，以及健康、教育或国际和平等重大决策背后的影响因素。通过分析数据和验证理论，政治学让我们深入了解政治事件和制度背后的“为什么”和“如何”。
        </p>
      </article>

      <article className="prose prose-lg max-w-3xl mx-auto mb-12">
        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">在这里能看到什么？</h2>

        <p>
          在这里，我们会将复杂的政治学研究成果以简明易懂的方式呈现。通过清晰的解释和真实的案例，帮助你理解周围的政治世界。不论你对选举、民主运作，还是公众意见如何影响政策感兴趣，这里都有你想知道的内容。
        </p>

        <ul className="space-y-3 list-disc list-inside">
          <li>
            <strong>简化的研究解读：</strong> 了解重要的政治学研究，以及它们揭示的政治如何影响我们生活的深刻见解，比如为什么有些政策会成功，而另一些则失败。
          </li>
          <li>
            <strong>比较不同的政府制度：</strong> 不同国家如何解决相似的问题？从民主到独裁，我们将探讨各种政治制度如何运作，以及它们有效（或无效）的原因。
          </li>
          <li>
            <strong>人们与政治的关系：</strong> 了解人们的观点、价值观和行为如何影响政治，从投票趋势到政治运动的兴起。
          </li>
        </ul>
      </article>

      <article className="prose prose-lg max-w-3xl mx-auto mb-12">
        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">为什么这很重要？</h2>

        <p>
          理解政治不仅仅是专家的事，它关乎每个人。政治学帮助我们看穿新闻背后的现象，理解为什么事情会这样发展。无论是政策如何影响我们的社区，还是国际协议如何塑造世界，政治学为我们提供了理解这些问题的工具。
        </p>

        <p>
          <span className="font-semibold">Why?</span> 的目标是让每个人都能理解政治科学。希望这里的每一篇文章都能激发你的好奇心，帮助你理解政治世界背后的科学。
        </p>
      </article>

      <article className="prose prose-lg max-w-3xl mx-auto mb-12">
        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">一起探索吧！</h2>

        <p>
          政治复杂难懂，但好奇心能带来理解。在这里，政治将其变得简单、有趣、贴近生活。来吧，让我们一起学习，科学地理解政治的世界。
        </p>

        <p className="font-semibold mt-6">
          政治塑造了我们的世界，理解它能帮助我们塑造未来。
        </p>
        <p className="text-sm text-gray-600 mt-4">关键词：政治学, 政府运作, 选举, 民主, 政策, 比较政治, 政治制度, 政治行为</p>
      </article>
    </main>
  );
}
