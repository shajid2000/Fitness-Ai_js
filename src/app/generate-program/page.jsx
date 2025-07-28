"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useCallback } from "react";
import { log_fitness_profile_json } from '../../commonFunctions'
import { PhoneIcon, PhoneOffIcon, ZapIcon, ActivityIcon, BrainIcon } from "lucide-react";

// ⚡ Gemini SDK (default export is the hook)
import useGeminiAgent from "gemini-ai-agent/react";
import { logFitnessProfileJsonToolDefinition, sendInitAudioChunk, systemPrompt } from "@/constants";

const GenerateProgramPage = () => {
  // UI State
  const [callActive, setCallActive] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [messages, setMessages] = useState([]);
  const [callEnded, setCallEnded] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [typingIndicator, setTypingIndicator] = useState(false);

  // Refs
  const { user } = useUser();
  const router = useRouter();
  const messageContainerRef = useRef(null);

  // ── Gemini runtime hook
  const gemini = useGeminiAgent({
    apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
    systemInstructions: systemPrompt,
    voiceName: "Puck",
    sendInitText:"Hello"
  });

  useEffect(()=>{
    localStorage.setItem('userid',user?.id)
  },[user?.id])

  useEffect(()=>{
    gemini.addTool(logFitnessProfileJsonToolDefinition,log_fitness_profile_json)
  },[])

  /** ────────────────────────────────────
   * Gemini‑runtime helpers
   * ────────────────────────────────────*/
  const startGeminiCall = useCallback(async () => {
    console.log("Starting Gemini call...", gemini);
    if (!gemini.isInitialized) {
      console.warn("Gemini not initialized");
      return false;
    }
    
    try {
      await gemini.startRecording();
      setIsRecording(true);
      setCallActive(true);
      console.log("Gemini call started successfully");
      return true;
    } catch (error) {
      console.error("Error starting Gemini call:", error);
      return false;
    }
  }, [gemini]);

  const endGeminiCall = useCallback(() => {
    try {
      if (gemini && typeof gemini.stopRecording === 'function') {
        gemini.stopRecording();
      }
      if (gemini && typeof gemini.disconnect === 'function') {
        gemini.disconnect();
      }
    } catch (error) {
      console.warn("Error in endGeminiCall:", error);
    }
    
    setCallActive(false);
    setIsRecording(false);
    setTypingIndicator(false);
    setIsSpeaking(false);
  }, [gemini]);

  const sendTextMessageToUI = useCallback((role, text, hasAudio = false) => {
    const id = Math.random().toString(36).substring(7);
    setMessages((prev) => [...prev, { id, content: text, role, hasAudio }]);
    return id;
  }, []);

  // Event Handlers
  const toggleCall = async () => {
    if (callActive) {
      endGeminiCall();
      return;
    }

    setConnecting(true);
    setMessages([]);

    try {
      const success = await startGeminiCall();
      if (!success) {
        console.error("Failed to start Gemini call");
        setConnecting(false);
      } else {
        setConnecting(false);
      }
    } catch (error) {
      console.error("Error in toggleCall:", error);
      setConnecting(false);
    }
  };

  const sendTextMessage = (text) => {
    if (!text.trim()) return;

    sendTextMessageToUI("user", text);
    
    try {
      gemini.sendMessage(text);
    } catch (error) {
      console.error("Error sending text message:", error);
    }
  };

  // Effects
  useEffect(() => {
    // Auto-scroll messages
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    // Redirect after call ends
    if (callEnded) {
      const redirectTimer = setTimeout(() => {
        router.push("/profile");
      }, 1500);
      return () => clearTimeout(redirectTimer);
    }
  }, [callEnded, router]);

  useEffect(() => {
    // Listen to Gemini events
    if (!gemini) return;

    const handleMessage = (message) => {
      console.log("Received message from Gemini:", message);
      
      if (message.type === 'text') {
        sendTextMessageToUI("model", message.content, false);
        setTypingIndicator(false);
      }
      
      if (message.type === 'audio_start') {
        setIsSpeaking(true);
      }
      
      if (message.type === 'audio_end') {
        setIsSpeaking(false);
      }
      
      if (message.type === 'thinking') {
        setTypingIndicator(true);
      }
    };

    // Note: This is a simplified event listener setup
    if (gemini.on) {
      gemini.on('message', handleMessage);
      gemini.on('audio_start', () => setIsSpeaking(true));
      gemini.on('audio_end', () => setIsSpeaking(false));
      gemini.on('thinking', () => setTypingIndicator(true));
    }

    return () => {
      if (gemini.off) {
        gemini.off('message', handleMessage);
        gemini.off('audio_start');
        gemini.off('audio_end');
        gemini.off('thinking');
      }
    };
  }, [gemini, sendTextMessageToUI]);

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      try {
        endGeminiCall();
      } catch (error) {
        console.warn("Error during cleanup:", error);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -left-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-60 -right-40 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-20">
        
        {/* Title Section */}
        <div className="text-center mb-16 space-y-6">
          <div className="inline-flex items-center space-x-3 px-6 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
            <BrainIcon className="w-6 h-6 text-purple-400" />
            <span className="text-purple-300 font-medium">AI-Powered Fitness Coach</span>
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-black text-white leading-tight">
            Generate Your{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Perfect Program
            </span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Have an intelligent voice conversation with our advanced AI fitness coach to create your personalized workout and nutrition plan
          </p>
        </div>

        {/* Main Interface Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          
          {/* AI ASSISTANT CARD */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 relative overflow-hidden group hover:bg-white/10 transition-all duration-500">
            
            {/* Card glow effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-500/20 rounded-full blur-2xl opacity-50" />
            
            <div className="relative flex flex-col items-center space-y-6">
              
              {/* AI Voice Visualization */}
              <div className="relative">
                {/* Outer pulse ring */}
                <div className={`absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 ${isSpeaking ? 'animate-ping opacity-30' : 'opacity-0'} transition-opacity duration-300`} style={{ transform: 'scale(1.5)' }} />
                
                {/* Main avatar container */}
                <div className="relative w-40 h-40 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 p-1 shadow-2xl shadow-purple-500/25">
                  <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-purple-500/20 to-pink-500/20" />
                    <ZapIcon className="w-16 h-16 text-white relative z-10" />
                  </div>
                </div>
                
                {/* Voice wave animation */}
                {isSpeaking && (
                  <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className="w-1 bg-gradient-to-t from-purple-500 to-pink-500 rounded-full animate-pulse"
                        style={{
                          height: `${Math.random() * 20 + 10}px`,
                          animationDelay: `${i * 0.1}s`,
                          animationDuration: `${0.5 + Math.random() * 0.5}s`
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* AI Info */}
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-white">FitAI Pro Coach  {isSpeaking && "speaking"}</h2>
                <p className="text-purple-300 font-medium">Advanced Fitness & Nutrition AI</p>
              </div>

              {/* Status Indicator */}
              <div className={`flex items-center space-x-3 px-4 py-2 rounded-xl border transition-all duration-300 ${
                isSpeaking || typingIndicator 
                  ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/30' 
                  : 'bg-white/5 border-white/10'
              }`}>
                <div className={`w-3 h-3 rounded-full ${
                  isSpeaking 
                    ? 'bg-green-400 animate-pulse shadow-lg shadow-green-400/50' 
                    : typingIndicator
                    ? 'bg-purple-400 animate-pulse shadow-lg shadow-purple-400/50'
                    : callActive
                    ? 'bg-blue-400 animate-pulse shadow-lg shadow-blue-400/50'
                    : callEnded
                    ? 'bg-pink-400 animate-pulse shadow-lg shadow-pink-400/50'
                    : 'bg-gray-400'
                }`} />
                <span className="text-sm font-medium text-gray-300">
                  {isSpeaking
                    ? "Speaking..."
                    : typingIndicator
                    ? "Analyzing..."
                    : callActive
                    ? "Listening actively..."
                    : callEnded
                    ? "Program created! Redirecting..."
                    : "Ready to help you"}
                </span>
              </div>
            </div>
          </div>

          {/* USER CARD */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 relative overflow-hidden group hover:bg-white/10 transition-all duration-500">
            
            {/* Card glow effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute -top-20 -left-20 w-40 h-40 bg-blue-500/20 rounded-full blur-2xl opacity-50" />
            
            <div className="relative flex flex-col items-center space-y-6">
              
              {/* User Avatar */}
              <div className="relative">
                <div className="w-40 h-40 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 p-1 shadow-2xl shadow-blue-500/25">
                  <div className="w-full h-full rounded-full overflow-hidden bg-slate-800">
                    {user?.imageUrl ? (
                      <img
                        src={user.imageUrl}
                        alt="User"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ActivityIcon className="w-16 h-16 text-white" />
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Recording indicator */}
                {isRecording && (
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center animate-pulse shadow-lg shadow-red-500/50">
                    <div className="w-3 h-3 bg-white rounded-full" />
                  </div>
                )}
              </div>

              {/* User Info */}
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-white">
                  {user ? `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'Fitness Enthusiast' : 'Guest User'}
                </h2>
                <p className="text-blue-300 font-medium">Ready for Transformation</p>
              </div>

              {/* Recording Status */}
              <div className={`flex items-center space-x-3 px-4 py-2 rounded-xl border transition-all duration-300 ${
                isRecording 
                  ? 'bg-gradient-to-r from-red-500/20 to-red-600/20 border-red-500/30' 
                  : 'bg-white/5 border-white/10'
              }`}>
                <div className={`w-3 h-3 rounded-full ${
                  isRecording ? 'bg-red-400 animate-pulse shadow-lg shadow-red-400/50' : 'bg-gray-400'
                }`} />
                <span className="text-sm font-medium text-gray-300">
                  {isRecording ? "Recording your voice..." : "Ready to speak"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Message Container */}
        {messages.length > 0 && (
          <div className="mb-12">
            <div 
              ref={messageContainerRef}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6 h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-purple-500/20 scrollbar-track-transparent"
            >
              <div className="space-y-4">
                {messages.map((msg, index) => (
                  <div 
                    key={msg.id} 
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in-up`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                      msg.role === 'user' 
                        ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white' 
                        : 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white border border-purple-500/30'
                    }`}>
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-xs font-medium opacity-80">
                          {msg.role === "model" ? "FitAI Pro" : "You"}
                        </span>
                        {msg.hasAudio && <span className="text-xs">🔊</span>}
                      </div>
                      <p className="text-sm leading-relaxed">{msg.content}</p>
                    </div>
                  </div>
                ))}

                {typingIndicator && (
                  <div className="flex justify-start animate-fade-in-up">
                    <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 px-4 py-3 rounded-2xl">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-medium text-purple-300">FitAI Pro</span>
                      </div>
                      <div className="flex space-x-1 mt-2">
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}} />
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}} />
                      </div>
                    </div>
                  </div>
                )}

                {callEnded && (
                  <div className="flex justify-center animate-fade-in-up">
                    <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 px-6 py-4 rounded-2xl text-center">
                      <div className="flex items-center justify-center space-x-2 mb-2">
                        <ZapIcon className="w-5 h-5 text-green-400" />
                        <span className="text-sm font-medium text-green-300">System</span>
                      </div>
                      <p className="text-sm text-white">
                        🎉 Your personalized fitness program has been generated! Redirecting to your profile...
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Call Controls */}
        <div className="flex justify-center">
          <Button
            onClick={toggleCall}
            disabled={connecting || callEnded}
            className={`relative px-12 py-6 text-lg font-bold rounded-3xl transition-all duration-300 hover:scale-105 shadow-2xl ${
              callActive
                ? "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-red-500/25"
                : callEnded
                ? "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 shadow-green-500/25"
                : "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-purple-500/25"
            } text-white border-0`}
          >
            {connecting && (
              <div className="absolute inset-0 rounded-3xl animate-ping bg-gradient-to-r from-purple-500 to-pink-500 opacity-50" />
            )}
            
            <div className="relative flex items-center space-x-3">
              {callActive ? (
                <PhoneOffIcon className="w-6 h-6" />
              ) : callEnded ? (
                <ZapIcon className="w-6 h-6" />
              ) : (
                <PhoneIcon className="w-6 h-6" />
              )}
              
              <span>
                {callActive
                  ? "End Session"
                  : connecting
                  ? "Connecting to AI..."
                  : callEnded
                  ? "View Your Program"
                  : "Start AI Session"}
              </span>
            </div>
          </Button>
        </div>

        {/* Debug Text Input (for testing) */}
        {process.env.NODE_ENV === 'development' && callActive && (
          <div className="mt-8 max-w-md mx-auto">
            <input
              type="text"
              placeholder="Type a message (dev only)"
              className="w-full p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 transition-colors duration-300"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  sendTextMessage(e.currentTarget.value);
                  e.currentTarget.value = '';
                }
              }}
            />
          </div>
        )}
      </div>

      <style jsx>{`
        .animate-fade-in-up {
          animation: fadeInUp 0.5s ease-out forwards;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        
        .scrollbar-thumb-purple-500\/20::-webkit-scrollbar-thumb {
          background-color: rgba(168, 85, 247, 0.2);
          border-radius: 3px;
        }
        
        .scrollbar-track-transparent::-webkit-scrollbar-track {
          background: transparent;
        }
      `}</style>
    </div>
  );
};

export default GenerateProgramPage;