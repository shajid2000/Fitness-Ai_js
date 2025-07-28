"use client";
import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";
import { DumbbellIcon, HomeIcon, UserIcon, ZapIcon, MenuIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { useState } from "react";

const Navbar = () => {
  const { isSignedIn } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-sm border-b border-white/10">
      {/* Top border glow */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-30" />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          
          {/* LOGO */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl group-hover:scale-105 transition-all duration-300 shadow-lg group-hover:shadow-purple-500/25">
              <ZapIcon className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              FitAI Pro
            </span>
          </Link>

          {/* DESKTOP NAVIGATION */}
          <div className="hidden lg:flex items-center space-x-6">
            {isSignedIn ? (
              <>
                <Link 
                  href="/" 
                  className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-300 group"
                >
                  <HomeIcon className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                  <span>Dashboard</span>
                </Link>
                <Link 
                  href="/generate-program" 
                  className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-300 group"
                >
                  <DumbbellIcon className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                  <span>Generate</span>
                </Link>
                <Link 
                  href="/profile" 
                  className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-300 group"
                >
                  <UserIcon className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                  <span>Profile</span>
                </Link>
                <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 rounded-xl px-6 py-2 font-medium hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-purple-500/25">
                  <Link href="/premium">Go Premium</Link>
                </Button>
                <div className="ml-4">
                  <UserButton 
                    appearance={{
                      elements: {
                        avatarBox: "w-8 h-8 rounded-xl border-2 border-purple-500/20 hover:border-purple-500/40 transition-colors duration-300"
                      }
                    }}
                  />
                </div>
              </>
            ) : (
              <>
                <SignInButton>
                  <Button 
                    variant="ghost" 
                    className="text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-300"
                  >
                    Sign In
                  </Button>
                </SignInButton>
                <SignUpButton>
                  <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 rounded-xl px-6 py-2 font-medium hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-purple-500/25">
                    Get Started
                  </Button>
                </SignUpButton>
              </>
            )}
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-gray-300 hover:text-white transition-colors duration-300"
          >
            <MenuIcon className="w-6 h-6" />
          </button>
        </div>

        {/* MOBILE MENU */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 space-y-4 border-t border-white/10 bg-slate-900/95 backdrop-blur-sm">
            {isSignedIn ? (
              <>
                <Link href="/dashboard" className="block text-gray-300 hover:text-white transition-colors duration-300 py-2">
                  Dashboard
                </Link>
                <Link href="/generate" className="block text-gray-300 hover:text-white transition-colors duration-300 py-2">
                  Generate Workout
                </Link>
                <Link href="/profile" className="block text-gray-300 hover:text-white transition-colors duration-300 py-2">
                  Profile
                </Link>
                <div className="pt-2">
                  <UserButton />
                </div>
              </>
            ) : (
              <div className="space-y-3">
                <SignInButton>
                  <Button variant="ghost" className="w-full text-left justify-start text-gray-300 hover:text-white">
                    Sign In
                  </Button>
                </SignInButton>
                <SignUpButton>
                  <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl">
                    Get Started
                  </Button>
                </SignUpButton>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;