import { FaGraduationCap, FaUsers, FaBicycle } from 'react-icons/fa6';
import { generateMetadata as generateSEOMetadata, generatePersonSchema } from '@/lib/seo';

export const metadata = generateSEOMetadata({
  title: '关于我',
  description: 'Life-long learner, grassroots leader, and hobbyist. Just a middle-aged guy who believes he has a few good years left.',
  path: '/about',
  keywords: ['关于', 'about', '个人简介', '政治学', 'Go', '围棋', '自行车']
});


export default function AboutPage() {
  const cards = [
    {
      title: "Life-long Learner",
      icon: FaGraduationCap,
      content: "I used to be an educator, but now I'm just a professional student. I've spent a lifetime reading political science, giving me just enough knowledge to be dangerous at dinner parties—or at least annoying.",
      color: "from-primary-light to-primary"
    },
    {
      title: "Grassroots Leader",
      icon: FaUsers,
      content: "I'm a grassroots leader in my residential community. My main qualification? I'm excellent at nodding enthusiastically and saying 'That's a great idea!' while wondering who's going to actually do it.",
      color: "from-secondary to-secondary-hover"
    },
    {
      title: "The Hobbyist",
      icon: FaBicycle,
      content: "I'm a 2-dan Go player (on a good day), though the AI still beats me like I owe it money. When I'm not losing board games, I'm pedaling my bike, pretending I'm in the Tour de France—just much, much slower.",
      color: "from-emerald-400 to-emerald-600"
    }
  ];

  return (
    <main className="min-h-screen py-20 px-4 relative overflow-hidden">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generatePersonSchema()) }}
      />

      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-10 right-10 w-72 h-72 bg-primary/5 rounded-full blur-[80px] animate-pulse-slow" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-secondary/5 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '1.5s' }} />
      </div>

      <div className="max-w-6xl mx-auto space-y-20">
        {/* Hero Section */}
        <section className="text-center space-y-8 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-light via-white to-secondary tracking-tight drop-shadow-lg">
            关于我
          </h1>
          <p className="text-xl md:text-2xl text-text-muted max-w-3xl mx-auto font-light leading-relaxed">
            Just a middle-aged guy who believes he has a few good years left.
            <span className="block mt-2 text-primary italic">Tell me, why?</span>
          </p>
        </section>

        {/* Cards Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 perspective-1000">
          {cards.map((card, index) => (
            <div
              key={card.title}
              className="group relative h-full"
              style={{ animation: `slideUp 0.8s ease-out forwards ${index * 0.2}s`, opacity: 0 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/0 rounded-2xl blur-xl transition-all duration-500 group-hover:blur-2xl group-hover:opacity-75 opacity-0" />

              <div className="relative h-full glass p-8 rounded-2xl border border-white/10 transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_0_40px_rgba(0,0,0,0.3)] overflow-hidden">
                {/* Gradient Border Effect */}
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${card.color}`} />

                <div className="relative z-10 flex flex-col items-center text-center space-y-6">
                  <div className={`p-4 rounded-full bg-gradient-to-br ${card.color} bg-opacity-10 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                    <card.icon className="text-white text-3xl" />
                  </div>

                  <h3 className="text-2xl font-bold text-text-main group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-all">
                    {card.title}
                  </h3>

                  <p className="text-text-muted leading-relaxed">
                    {card.content}
                  </p>
                </div>

                {/* Hover Glow */}
                <div className={`absolute -bottom-20 -right-20 w-40 h-40 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-20 blur-3xl transition-all duration-700`} />
              </div>
            </div>
          ))}
        </section>

        {/* Footer Quote */}
        <section className="text-center animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <blockquote className="text-2xl md:text-3xl font-serif italic text-text-muted/60 max-w-4xl mx-auto border-none">
            "Life is a journey, and I am just here for the ride—preferably on two wheels."
          </blockquote>
        </section>
      </div>
    </main>
  );
}
