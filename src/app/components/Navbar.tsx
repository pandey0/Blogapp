"use client"

import * as React from "react"
import { Menu } from "lucide-react"
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs"

const links = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" }
]

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <nav className="w-full bg-white dark:bg-gray-900 shadow-md border-amber-400 border-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="text-2xl font-bold text-gray-800 dark:text-white">YourBlog</div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 font-medium transition"
              >
                {link.label}
              </a>
            ))}
            <OrganizationSwitcher  afterSelectOrganizationUrl='org/:slug' />
            <UserButton  />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-800 dark:text-white"
            aria-label="Toggle menu"
          >
            <Menu />
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-2 space-y-2 pb-4">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 px-2 font-medium transition"
              >
                {link.label}
              </a>
            ))}
            <div className="px-2 pt-2 space-y-2">
              <OrganizationSwitcher />
              <UserButton />
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
