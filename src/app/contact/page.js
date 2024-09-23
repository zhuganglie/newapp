export default function ContactPage() {
  return (
    <div class="container mx-auto px-4 py-8 max-w-2xl">
    <h1 class="text-3xl font-bold text-gray-800 mb-4">Contact Me</h1>
    <p class="text-gray-600 mb-6">Feel free to reach out using the form below or via the provided contact information.</p>

    <form action="#" method="post" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <div class="mb-4">
    <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
    Name
    </label>
    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Your Name" required></input>
    </div>
    <div class="mb-4">
    <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
    Email
    </label>
    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="your@email.com" required></input>
    </div>
    <div class="mb-4">
    <label class="block text-gray-700 text-sm font-bold mb-2" for="subject">
    Subject
    </label>
    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="subject" type="text" placeholder="Subject" required></input>
    </div>
    <div class="mb-6">
    <label class="block text-gray-700 text-sm font-bold mb-2" for="message">
    Message
    </label>
    <textarea class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32" id="message" placeholder="Your message here..." required></textarea>
    </div>
    <div class="flex items-center justify-between">
    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
    Send Message
    </button>
    </div>
    </form>

    <div class="bg-white shadow-md rounded px-8 pt-6 pb-8">
    <h2 class="text-2xl font-bold text-gray-800 mb-4">Other Ways to Connect</h2>
    <ul class="text-gray-600">
    <li class="mb-2">
    <span class="font-bold">Email:</span> your.email@example.com
    </li>
    <li class="mb-2">
    <span class="font-bold">Phone:</span> (123) 456-7890
    </li>
    <li class="mb-2">
    <span class="font-bold">LinkedIn:</span>
    <a href="https://www.linkedin.com/in/yourprofile" class="text-blue-500 hover:text-blue-700">linkedin.com/in/yourprofile</a>
    </li>
    <li class="mb-2">
    <span class="font-bold">Twitter:</span>
    <a href="https://twitter.com/yourhandle" class="text-blue-500 hover:text-blue-700">@yourhandle</a>
    </li>
    </ul>
    </div>
    </div>
  )
}
