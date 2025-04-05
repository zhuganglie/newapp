import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="max-w-prose mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">关于我</h1>
      <hr className="mb-6 border-zinc-600" />
      <p className="mb-4">Hi there! I am just a middle-aged guy who still believes he has got a few good years left in him. By day, I am an educator, the kind that never really stopped being a student. I have spent a lifetime reading social sciences, which has given me just enough knowledge to be dangerous at dinner parties. When I am not trying to figure out how the world works, you can find me pedaling around on my bike, pretending I am training for the Tour de France (spoiler: I am not). </p>
      <p className="mb-4">I am also a grassroots leader in my local community, which mostly means I am good at nodding and saying, “That is a great idea!” to anyone who has one. My hobbies? Let us see, I am hooked on the game of Go, which I still can not seem to win against the computer, but hey, it is the thought that counts, right? I dabble in coding too—nothing fancy, just enough to make my laptop think I am smarter than I actually am. </p>
      <p className="mb-4">When it comes to cooking, I like to believe I am a culinary genius, but the smoke detector would probably disagree. At the end of the day, I am just a simple, stupid person trying to keep things pleasant and optimistic, evenif that means persevering through a few burnt meals and bad code. Life is a journey, and I am just here for the ride—preferably on two wheels.</p>
      
      <p className="mt-8">
        <Link href="/" className="text-yellow-500 hover:text-yellow-400">
          &larr; Back to Home
        </Link>
      </p>
    </div>
  )
}
