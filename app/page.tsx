'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Menu, ChevronDown, ChevronUp } from 'lucide-react'
import { auth, signInWithGoogle, logout } from "C:/Users/GVH VARDHAN/Desktop/Projects/DSS/DSS_landing_page/DSS-Landing-Page/firebaseConfig.js" // Import Firebase Auth functions

export default function Component() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)
  const [user, setUser] = useState(null) // Track authentication state

  // Listen for Firebase authentication state changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user); // Update user state when signed in/out
    });
    return () => unsubscribe();
  }, []);

  const handleAuth = async () => {
    if (user) {
      await logout();
      setUser(null);
    } else {
      const result = await signInWithGoogle();
      setUser(result?.user);
    }
  };

  const faqData = [
    { question: "What do we do?", answer: "We empower the technical community at VJIT Hyderabad through workshops, projects, and events." },
    { question: "How does support work?", answer: "Our support team is available via Discord and email to assist with any queries or issues." },
    { question: "How to book tickets?", answer: "Tickets for our events can be booked through our website or mobile app. Look for the 'Events' section." },
    { question: "How to attend events?", answer: "Once you've booked a ticket, you'll receive an email with all the details on how to attend, whether it's online or in-person." },
    { question: "What kind of events do you organize?", answer: "We organize a variety of events including coding workshops, tech talks, hackathons, and networking sessions." }
  ]

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <header className="border-b bg-white"> 
        <div className="container flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dss%20logo-R8VwfqJHCrweUkR0ODY8tDHENw8x2b.jpeg"
              alt="DSS Logo"
              width={32}
              height={32}
              className="rounded-lg"
            />
            <span className="text-xl font-bold text-black">DSS</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6 text-black">
            {["Home", "About Us", "Team", "Events", "Resources", "Contact"].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase().replace(" ", "-")}`}
                className="text-sm font-medium transition-colors hover:text-blue-500 hover:border-b-2 hover:border-yellow-500"
              >
                {item}
              </Link>
            ))}
          </nav>
          <div className="flex items-center space-x-4">
            {/* ✅ Google Sign In Button */}
            <button 
              onClick={handleAuth} 
              className="border border-blue-500 hover:bg-blue-500 hover:text-white transition-colors px-4 py-2 rounded-md text-sm font-medium text-black"
            >
              {user ? "Sign Out" : "Sign In with Google"}
            </button>
            {/* ✅ Mobile Menu Button */}
            <button 
              className="md:hidden" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              title="Toggle Menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden border-t p-4 bg-white"> 
            <nav className="flex flex-col space-y-4">
              {["Home", "About Us", "Team", "Events", "Resources", "Contact"].map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase().replace(" ", "-")}`}
                  className="text-sm font-medium transition-colors hover:text-blue-500"
                >
                  {item}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1 bg-white"> 
        {/* Hero Section */}
        <section className="container px-10 py-10 md:py-26 bg-white"> 
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-gradient-to-r from-red-500 via-blue-500 to-green-500 bg-clip-text text-transparent">
              Empowering Technical Community at VJIT Hyderabad
            </h1>
            <p className="text-gray-500 md:text-xl">
              A student-driven community that aims the best of the community. Join us to explore, innovate, and grow in the tech world.
            </p>
            <button 
              className="mt-4 bg-blue-500 hover:bg-blue-600 transition-colors text-white px-6 py-3 rounded-md text-lg font-medium"
            >
              Join Us
            </button>
          </div>
        </section>
      </main>

      <footer className="border-t bg-white"> 
        <div className="container px-4 py-12">
          <div className="mt-12 pt-8 border-t text-center text-sm text-gray-500">
            ©2024 DSS - All rights reserved
          </div>
        </div>
      </footer>
    </div>
  )
}
