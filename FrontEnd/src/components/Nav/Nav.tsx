import { useEffect, useRef, useState } from 'react'

export default function Nav() {
  const [open, setOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement | null>(null)
  const menuRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (!open) return
      const target = e.target as Node
      if (
        menuRef.current &&
        !menuRef.current.contains(target) &&
        buttonRef.current &&
        !buttonRef.current.contains(target)
      ) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleOutside)
    return () => document.removeEventListener('mousedown', handleOutside)
  }, [open])

  return (
    <div className="bg-gradient-to-t from-blue-500 to-gray-700 p-4">
      <nav className="relative max-w-7xl mx-auto flex items-center justify-between px-4">
        <div className="flex items-center">
          <span className="text-black font-bold text-xl md:text-3xl">Alexandria Library</span>
        </div>

        <ul className="hidden md:flex gap-6 items-center text-white">
          <li className="hover:underline hover:text-gray-300 cursor-pointer">Home</li>
          <li className="hover:underline hover:text-gray-300 cursor-pointer">About</li>
          <li className="hover:underline hover:text-gray-300 cursor-pointer">Services</li>
          <li className="hover:underline hover:text-gray-300 cursor-pointer">Contact</li>
        </ul>

        <div className="hidden md:flex items-center">
          <button className="ml-6 text-black font-semibold">Login</button>
        </div>

        <div className="md:hidden">
          <button
            ref={buttonRef}
            aria-controls="mobile-menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="p-2 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-300"
          >
            {open ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>

          <div
            id="mobile-menu"
            ref={menuRef}
            className={`absolute right-4 top-full mt-2 w-48 bg-white rounded-md shadow-lg z-50 overflow-hidden ${open ? 'block' : 'hidden'}`}
          >
            <a href="#" className="block px-4 py-2 text-black hover:bg-gray-100">Home</a>
            <a href="#" className="block px-4 py-2 text-black hover:bg-gray-100">About</a>
            <a href="#" className="block px-4 py-2 text-black hover:bg-gray-100">Services</a>
            <a href="#" className="block px-4 py-2 text-black hover:bg-gray-100">Contact</a>
            <div className="border-t px-4 py-2">
              <button className="w-full text-left text-black font-semibold">Login</button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}
