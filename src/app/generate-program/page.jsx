"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useCallback } from "react";
import { log_fitness_profile_json } from '../../commonFunctions'


// ⚡ Gemini SDK (default export is the hook)
import useGeminiAgent from "gemini-ai-agent/react";
import { logFitnessProfileJsonToolDefinition, systemPrompt } from "@/constants";

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
    // You may need to adjust based on the actual Gemini SDK API
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
    console.log("befor return ");
    
    return () => {
      try {
        console.log("this is mee");
        
        endGeminiCall();
      } catch (error) {
        console.warn("Error during cleanup:", error);
      }
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen text-foreground overflow-hidden pb-6 pt-24">
      <div className="container mx-auto px-4 h-full max-w-5xl">
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-mono">
            <span>Generate Your </span>
            <span className="text-primary uppercase">Fitness Program</span>
          </h1>
          <p className="text-muted-foreground mt-2">
            Have a voice conversation with our AI assistant to create your personalized plan
          </p>
        </div>

        {/* VIDEO CALL AREA */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* AI ASSISTANT CARD */}
          <Card className="bg-card/90 backdrop-blur-sm border border-border overflow-hidden relative">
            <div className="aspect-video flex flex-col items-center justify-center p-6 relative">
              {/* AI VOICE ANIMATION */}
              <div
                className={`absolute inset-0 ${
                  isSpeaking ? "opacity-30" : "opacity-0"
                } transition-opacity duration-300`}
              >
                <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 flex justify-center items-center h-20">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={`mx-1 h-16 w-1 bg-primary rounded-full ${
                        isSpeaking ? "animate-sound-wave" : ""
                      }`}
                      style={{
                        animationDelay: `${i * 0.1}s`,
                        height: isSpeaking ? `${Math.random() * 50 + 20}%` : "5%",
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* AI IMAGE */}
              <div className="relative size-32 mb-4">
                <div
                  className={`absolute inset-0 bg-primary opacity-10 rounded-full blur-lg ${
                    isSpeaking ? "animate-pulse" : ""
                  }`}
                />
                <div className="relative w-full h-full rounded-full bg-card flex items-center justify-center border border-border overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-secondary/10"></div>
                  <img
                    src="/ai-avatar.png"
                    alt="AI Assistant"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <h2 className="text-xl font-bold text-foreground">CodeFlex AI</h2>
              <p className="text-sm text-muted-foreground mt-1">Fitness & Diet Coach</p>

              {/* SPEAKING INDICATOR */}
              <div
                className={`mt-4 flex items-center gap-2 px-3 py-1 rounded-full bg-card border border-border ${
                  isSpeaking || typingIndicator ? "border-primary" : ""
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full ${
                    isSpeaking || typingIndicator ? "bg-primary animate-pulse" : "bg-muted"
                  }`}
                />
                <span className="text-xs text-muted-foreground">
                  {isSpeaking
                    ? "Speaking..."
                    : typingIndicator
                    ? "Thinking..."
                    : callActive
                    ? "Listening..."
                    : callEnded
                    ? "Redirecting to profile..."
                    : "Waiting..."}
                </span>
              </div>
            </div>
          </Card>

          {/* USER CARD */}
          <Card className="bg-card/90 backdrop-blur-sm border overflow-hidden relative">
            <div className="aspect-video flex flex-col items-center justify-center p-6 relative">
              <div className="relative size-32 mb-4">
                <img
                  src={user?.imageUrl}
                  alt="User"
                  className="size-full object-cover rounded-full"
                />
              </div>
              <h2 className="text-xl font-bold text-foreground">You</h2>
              <p className="text-sm text-muted-foreground mt-1">
                {user ? (user.firstName + " " + (user.lastName || "")).trim() : "Guest"}
              </p>
              <div className="mt-4 flex items-center gap-2 px-3 py-1 rounded-full bg-card border">
                <div className={`w-2 h-2 rounded-full ${isRecording ? "bg-red-500 animate-pulse" : "bg-muted"}`} />
                <span className="text-xs text-muted-foreground">
                  {isRecording ? "Recording..." : "Ready"}
                </span>
              </div>
            </div>
          </Card>
        </div>

        {/* MESSAGE CONTAINER */}
        {messages.length > 0 && (
          <div
            ref={messageContainerRef}
            className="w-full bg-card/90 backdrop-blur-sm border border-border rounded-xl p-4 mb-8 h-64 overflow-y-auto transition-all duration-300 scroll-smooth"
          >
            <div className="space-y-3">
              {messages.map((msg) => (
                <div key={msg.id} className="message-item animate-fadeIn">
                  <div className="font-semibold text-xs text-muted-foreground mb-1 flex items-center gap-2">
                    {msg.role === "model" ? "CodeFlex AI" : "You"}
                    {msg.hasAudio && <span className="text-primary">🔊</span>}
                  </div>
                  <p className="text-foreground">{msg.content}</p>
                </div>
              ))}

              {typingIndicator && (
                <div className="message-item animate-fadeIn">
                  <div className="font-semibold text-xs text-muted-foreground mb-1">CodeFlex AI:</div>
                  <p className="text-foreground opacity-70">...</p>
                </div>
              )}

              {callEnded && (
                <div className="message-item animate-fadeIn">
                  <div className="font-semibold text-xs text-primary mb-1">System:</div>
                  <p className="text-foreground">
                    Your fitness program has been created! Redirecting to your profile...
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* CALL CONTROLS */}
        <div className="w-full flex justify-center gap-4">
          <Button
            className={`w-40 text-xl rounded-3xl ${
              callActive
                ? "bg-destructive hover:bg-destructive/90"
                : callEnded
                ? "bg-green-600 hover:bg-green-700"
                : "bg-primary hover:bg-primary/90"
            } text-white relative`}
            onClick={toggleCall}
            disabled={connecting || callEnded}
          >
            {connecting && (
              <span className="absolute inset-0 rounded-full animate-ping bg-primary/50 opacity-75"></span>
            )}
            <span>
              {callActive
                ? "End Call"
                : connecting
                ? "Connecting..."
                : callEnded
                ? "View Profile"
                : "Start Call"}
            </span>
          </Button>
        </div>

        {/* Debug Text Input (for testing) */}
        {process.env.NODE_ENV === 'development' && callActive && (
          <div className="mt-4 flex gap-2">
            <input
              type="text"
              placeholder="Type a message (dev only)"
              className="flex-1 p-2 border rounded"
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
    </div>
  );
};

export default GenerateProgramPage;