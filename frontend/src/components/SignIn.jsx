import React from 'react'

const SignIn = () => {
  return (
    <div className="flex items-center justify-center min-h-screen dark:bg-gray-900 bg-gray-100">
          <div className="w-full max-w-sm p-6 max-sm:mx-2 bg-white dark:border dark:border-white dark:bg-gray-900 rounded-xl shadow-lg">
    <h2 className="text-2xl font-bold text-center text-gray-800 mb-6 dark:text-white">Sign In</h2>
    <form action="#" method="POST" className="space-y-4">
      
      {/* Username */}
      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-white">Username</label>
        <input type="text" id="username" name="username" required
          className="mt-1 block w-full rounded-lg border dark:text-white border-gray-300 p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"/>
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-white">Email</label>
        <input type="email" id="email" name="email" required
          className="mt-1 block w-full rounded-lg border dark:text-white border-gray-300 p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"/>
      </div>

      {/* Password*/}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-white">Password</label>
        <input type="password" id="password" name="password" required
          className="mt-1 block w-full rounded-lg border dark:text-white border-gray-300 p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"/>
      </div>

      {/* Submit Button */}
      <button type="submit"
        className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors">
        Sign In
      </button>
    </form>
  </div>
    </div>
  )
}

export default SignIn