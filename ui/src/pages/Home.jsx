
export default function Home() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-r from-indigo-200 to-purple-200">
      <div className="text-6xl font-bold text-gray-700">Welcome to NXTWAVE</div>
      <div className="text-3xl font-light text-gray-700 mt-4">Your Next Generation Social Network</div>
      <div className="mt-8">
        <a href="/signin" className="pt-2 pb-3 px-4 bg-gray-700 text-white rounded-lg shadow-lg">Sign In</a>
        <a href="/signup" className="pt-2 pb-3 px-4 bg-gray-700 text-white rounded-lg shadow-lg ml-4">Sign Up</a>
      </div>
    </div>
  )
}
