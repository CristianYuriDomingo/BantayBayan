import React from 'react'

const Footer = () => {
  return (
    <section className="mt-40 mx-auto">
    <footer className="grid grid-cols-2 md:grid-cols-4 bg-gray-900 text-white p-10 gap-8">
      <div className="flex flex-col items-center">
        <h2 className="font-bold text-xl mb-3">About</h2>
        <ul className="space-y-2 text-center">
          <li><a href="#" className="hover:text-blue-400 transition">Website</a></li>
          <li><a href="#" className="hover:text-blue-400 transition">Developer</a></li>
          <li><a href="#" className="hover:text-blue-400 transition">Documentation</a></li>
        </ul>
      </div>
      <div className="flex flex-col items-center">
        <h2 className="font-bold text-xl mb-3">Stations</h2>
        <ul className="space-y-2 text-center">
          <li><a href="#" className="hover:text-blue-400 transition">Manacnac</a></li>
          <li><a href="#" className="hover:text-blue-400 transition">Caimito</a></li>
          <li><a href="#" className="hover:text-blue-400 transition">Bagong Buhay</a></li>
        </ul>
      </div>
      <div className="flex flex-col items-center">
        <h2 className="font-bold text-xl mb-3">Programs</h2>
        <ul className="space-y-2 text-center">
          <li><a href="#" className="hover:text-blue-400 transition">College Programs</a></li>
          <li><a href="#" className="hover:text-blue-400 transition">High School Programs</a></li>
          <li><a href="#" className="hover:text-blue-400 transition">Elementary Programs</a></li>
        </ul>
      </div>
      <div className="flex flex-col items-center">
        <h2 className="font-bold text-xl mb-3">Social</h2>
        <ul className="space-y-2 text-center">
          <li><a href="#" className="hover:text-blue-400 transition">Facebook</a></li>
          <li><a href="#" className="hover:text-blue-400 transition">Tiktok</a></li>
          <li><a href="#" className="hover:text-blue-400 transition">Instagram</a></li>
          <li><a href="#" className="hover:text-blue-400 transition">YouTube</a></li>
        </ul>
      </div>
    </footer>
    <div className="bg-gray-900 text-center p-6">
      <h2 className="text-xl font-bold text-blue-400">Bantay Bayan</h2>
      <p className="text-sm mt-2 text-white">
        Dedicated to community safety, transparency, and public service. Together, we keep our neighborhoods secure.
      </p>
    </div>
  </section>
  )
}

export default Footer