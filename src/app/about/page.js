import { FiBookOpen, FiUsers, FiTarget, FiZap } from 'react-icons/fi';
import { generateMetadata as generateSEOMetadata, generatePersonSchema } from '@/lib/seo';

export const metadata = generateSEOMetadata({
  title: '关于',
  description: '「政治的逻辑」——用政治科学的方法，解读真实世界的政治逻辑。了解更多关于这个播客的信息。',
  path: '/about',
  keywords: ['关于', '政治科学', '播客', '科普']
});


export default function AboutPage() {
  const sections = [
    {
      title: "这是什么？",
      icon: FiBookOpen,
      content: "「政治的逻辑」是一个政治科学科普项目。我们用学术但不枯燥的方式，解读真实世界中的政治现象——从威权体制的运作逻辑到民主化的艰难历程，从独裁者的生存策略到社会运动的内在动力。",
    },
    {
      title: "为什么做这个？",
      icon: FiTarget,
      content: "政治科学拥有大量有趣且深刻的理论工具，但这些知识大多被锁在学术论文和英文教科书里。我希望分享这些工具，共同探索理解真实世界的路径。",
    },
    {
      title: "你能获得什么？",
      icon: FiZap,
      content: "在这里，你不会看到情绪化的复读或立场先行的争吵，而是一套看透迷雾的分析框架。这里致力于理清复杂现象背后的因果逻辑，让理性的政治科学思维，成为理解真实世界的本能。",
    },
    {
      title: "谁在写？",
      icon: FiUsers,
      content: "我是一名对政治科学充满热情的创作者。在这里，我负责内容策划与最终呈现——通过整合学术框架与个人的观察和思考，试图把繁复的政治逻辑讲得通俗而不失深度。我希望在这里构建一个理性的讨论空间。不在这里打磨内容时，我在下围棋或者骑脚踏车。",
    }
  ];

  return (
    <main className="min-h-screen py-12">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generatePersonSchema()) }}
      />

      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <section className="mb-12 animate-fade-in">
          <h1 className="text-3xl font-serif font-bold text-text-main mb-3 border-none">
            关于「政治的逻辑」
          </h1>
          <p className="text-lg text-text-muted leading-relaxed max-w-xl">
            用政治科学的方法，解读真实世界的政治逻辑。
          </p>
        </section>

        {/* Content Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <section
              key={section.title}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="p-2 bg-surface rounded-md flex-shrink-0 mt-0.5">
                  <section.icon size={18} className="text-text-muted" />
                </div>
                <h2 className="text-lg font-serif font-bold text-text-main border-none m-0 p-0">
                  {section.title}
                </h2>
              </div>
              <p className="text-text-main leading-relaxed pl-[44px]">
                {section.content}
              </p>
            </section>
          ))}
        </div>

      </div>
    </main>
  );
}
