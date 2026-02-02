import React from 'react'

const footer = () => {
  return (
    <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-8 px-4 md:px-8 lg:px-16">  
  <div className="max-w-6xl mx-auto">  
    <div className="md:flex md:items-center md:justify-between mb-8">  
      <a href="/" className="flex items-center mb-4 md:mb-0">  
        <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">PASSPulse</span>  
      </a>  
      <p className="text-sm text-gray-300 max-w-md">Secure your passwords with elegant style. Your digital vault, redefined.</p>  
    </div>  
     
    <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row md:items-center justify-between text-sm text-gray-400">  
      <span>© 2026 PASSPulse™. All Rights Reserved. Secure your world with style.</span>  
      <div className="flex space-x-4 mt-4 md:mt-0">  
        <a href="#" className="hover:text-white transition">Privacy Policy</a>  
        <a href="#" className="hover:text-white transition">Terms</a>  
        <a href="#" className="hover:text-white transition">Support</a>  
      </div>  
    </div>  
  </div>  


    </div>
  )
}

export default footer
