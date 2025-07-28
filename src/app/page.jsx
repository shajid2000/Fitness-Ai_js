"use client";
import React, { useState, useEffect } from 'react';
import { ArrowRight, Play, Users, Clock, Target, Sparkles, Activity, Zap, Video } from 'lucide-react';
import UserPrograms from '@/components/UserPrograms';
import TerminalOverlay from '@/components/TerminalOverlay';
import Link from 'next/link';
import VideoPlayer from '@/components/ui/VideoPlayer';

const HomePage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
const handleWatchDemo = () => setShowVideo(true);
const handleCloseVideo = () => setShowVideo(false);


  useEffect(() => {
    setIsLoaded(true);
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent)] animate-pulse"></div>
        <div 
          className="absolute w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl transition-all duration-300"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        ></div>
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-2xl animate-bounce"></div>
      </div>

      {/* Navigation */}
      {/* <nav className="relative z-50 p-6">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              FitAI Pro
            </span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
            <a href="#programs" className="text-gray-300 hover:text-white transition-colors">Programs</a>
            <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</a>
            <Link href={"/generate-program"} className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105">
              Get Started
            </Link>
          </div>
        </div>
      </nav> */}

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Content */}
            <div className={`space-y-8 ${isLoaded ? 'animate-fade-in-up' : 'opacity-0'}`}>
              <div className="inline-flex items-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3">
                <Sparkles className="w-5 h-5 mr-2 text-yellow-400" />
                <span className="text-sm font-medium">AI-Powered Fitness Revolution</span>
              </div>
              
              <h1 className="text-6xl lg:text-7xl font-black leading-tight">
                <span className="bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
                  Transform
                </span>
                <br />
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                  Your Body
                </span>
                <br />
                <span className="text-white">
                  With AI
                </span>
              </h1>
              
              <p className="text-xl text-gray-300 leading-relaxed max-w-lg">
                Get personalized workout plans and nutrition guidance powered by advanced AI. 
                Your personal trainer that never sleeps.
              </p>
              
              {/* Stats */}
              <div className="flex items-center space-x-12 py-8">
                <div className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    10K+
                  </div>
                  <div className="text-sm text-gray-400 uppercase tracking-wider">Active Users</div>
                </div>
                <div className="w-px h-12 bg-gradient-to-b from-transparent via-white/30 to-transparent"></div>
                <div className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    2min
                  </div>
                  <div className="text-sm text-gray-400 uppercase tracking-wider">Setup Time</div>
                </div>
                <div className="w-px h-12 bg-gradient-to-b from-transparent via-white/30 to-transparent"></div>
                <div className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    24/7
                  </div>
                  <div className="text-sm text-gray-400 uppercase tracking-wider">AI Support</div>
                </div>
              </div>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Link href={"/generate-program"} className="group bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-8 py-4 rounded-2xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25">
                  <span className="flex items-center justify-center">
                    Start Your Journey
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
                
             <button 
  onClick={handleWatchDemo}
  className="group flex items-center justify-center px-8 py-4 rounded-2xl border-2 border-white/20 hover:border-white/40 backdrop-blur-sm transition-all duration-300 hover:bg-white/5"
>
  <Play className="mr-2 w-5 h-5" />
  Watch Demo
</button>
              </div>
            </div>
            
            {/* Right Content - Interactive Visual */}
            <div className={`relative ${isLoaded ? 'animate-fade-in-right' : 'opacity-0'}`}>
              <div className="relative w-full max-w-lg mx-auto">
                
                {/* Main AI Avatar Container */}
                <div className="relative aspect-square">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl backdrop-blur-sm border border-white/10"></div>
                  
                  {/* Animated Rings */}
                  <div className="absolute inset-8 rounded-full border-2 border-purple-400/30 animate-spin-slow"></div>
                  <div className="absolute inset-16 rounded-full border border-pink-400/30 animate-reverse-spin"></div>
                  
                  {/* Central AI Avatar */}
                  <div className="absolute inset-24 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                    <Activity className="w-16 h-16 text-white animate-pulse" />
                  </div>
                  
                  {/* Floating Elements */}
                  <div className="absolute top-12 right-12 bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 animate-float">
                    <Users className="w-6 h-6 text-purple-400" />
                    <div className="text-sm font-semibold mt-1">10K+ Users</div>
                  </div>
                  
                  <div className="absolute bottom-12 left-12 bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 animate-float-delayed">
                    <Target className="w-6 h-6 text-pink-400" />
                    <div className="text-sm font-semibold mt-1">100% Custom</div>
                  </div>
                  
                  <div className="absolute top-24 left-4 bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 animate-float-slow">
                    <Clock className="w-6 h-6 text-blue-400" />
                    <div className="text-sm font-semibold mt-1">Real-time</div>
                  </div>
                </div>
                
                {/* Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-3xl blur-3xl -z-10 animate-pulse"></div>
                
                {/* TERMINAL OVERLAY - positioned over the AI avatar */}
                <TerminalOverlay />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Preview */}
      <section className="relative z-10 py-20 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Powered by Advanced AI
              </span>
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Experience the future of fitness with our intelligent system that adapts to your goals, preferences, and progress.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Target className="w-8 h-8" />,
                title: "Personalized Plans",
                description: "AI creates custom workout and nutrition plans based on your unique profile and goals."
              },
              {
                icon: <Activity className="w-8 h-8" />,
                title: "Real-time Tracking",
                description: "Monitor your progress with intelligent analytics and receive instant feedback."
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: "Adaptive Learning",
                description: "Our AI learns from your performance and continuously optimizes your program."
              }
            ].map((feature, index) => (
              <div key={index} className="group p-8 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-purple-400/50 transition-all duration-300 hover:transform hover:scale-105">
                <div className="text-purple-400 mb-4 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* USER PROGRAMS SECTION - Full component integration */}
      <UserPrograms />

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fade-in-right {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        @keyframes reverse-spin {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        @keyframes float-delayed {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }
        
        @keyframes float-slow {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-6px);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }
        
        .animate-fade-in-right {
          animation: fade-in-right 0.8s ease-out 0.2s both;
        }
        
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        
        .animate-reverse-spin {
          animation: reverse-spin 15s linear infinite;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 3s ease-in-out infinite 1s;
        }
        
        .animate-float-slow {
          animation: float-slow 4s ease-in-out infinite 0.5s;
        }
      `}</style>

      <VideoPlayer showVideo={showVideo} handleCloseVideo={handleCloseVideo} />
    </div>
  );
};

export default HomePage;