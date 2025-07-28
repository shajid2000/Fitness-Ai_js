// const TerminalOverlay = () => {
//   return (
//     <div className="absolute bottom-0 left-0 right-0 p-4">
//       <div className="relative bg-cyber-terminal-bg backdrop-blur-sm border border-border rounded-lg p-3 overflow-hidden font-mono">
//         {/* Status bar */}
//         <div className="flex items-center justify-between mb-2 border-b border-border pb-1">
//           <div className="flex items-center gap-2">
//             <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
//             <p className="text-xs text-primary">SYSTEM ACTIVE</p>
//           </div>
//           <p className="text-xs text-muted-foreground">ID:78412.93</p>
//         </div>

//         <p className="text-sm text-foreground mb-2 tracking-tight">
//           <span className="text-primary">/</span> WORKOUT ANALYSIS COMPLETE
//         </p>

//         <div className="space-y-1.5 text-xs text-muted-foreground">
//           <div className="flex items-center">
//             <div className="text-primary mr-2">01</div>
//             <span>30 min strength training (upper body)</span>
//           </div>
//           <div className="flex items-center">
//             <div className="text-primary mr-2">02</div>
//             <span>20 min cardio (moderate intensity)</span>
//           </div>
//           <div className="flex items-center">
//             <div className="text-primary mr-2">03</div>
//             <span>10 min flexibility (recovery)</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default TerminalOverlay;


import React, { useState, useEffect } from 'react';
import { Activity, Zap, TrendingUp } from 'lucide-react';

const TerminalOverlay = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const analysisSteps = [
    { id: "01", text: "30 min strength training (upper body)", icon: "💪", progress: 100 },
    { id: "02", text: "20 min cardio (moderate intensity)", icon: "🏃", progress: 85 },
    { id: "03", text: "10 min flexibility (recovery)", icon: "🧘", progress: 60 }
  ];

  useEffect(() => {
    setIsActive(true);
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % analysisSteps.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="my-2 bottom-4 left-4 right-4">
      <div className="relative bg-black/80 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-4 overflow-hidden">
        {/* Animated Background Glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-purple-500/10 animate-pulse"></div>
        
        {/* Scan Line Effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-400/20 to-transparent opacity-50 animate-pulse"></div>
        
        {/* Header */}
        <div className="relative flex items-center justify-between mb-3 pb-2 border-b border-purple-500/30">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full animate-pulse"></div>
              <div className="absolute inset-0 w-3 h-3 bg-green-400 rounded-full animate-ping opacity-75"></div>
            </div>
            <span className="text-sm font-mono text-green-400 font-semibold">
              AI SYSTEM ACTIVE
            </span>
            <div className="flex space-x-1">
              <div className="w-1 h-4 bg-purple-400 animate-pulse"></div>
              <div className="w-1 h-4 bg-pink-400 animate-pulse delay-100"></div>
              <div className="w-1 h-4 bg-blue-400 animate-pulse delay-200"></div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Activity className="w-4 h-4 text-purple-400" />
            <span className="text-xs font-mono text-gray-400">ID: FIT.78412.AI</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="relative space-y-3">
          <div className="flex items-center space-x-2 mb-3">
            <Zap className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-mono text-white font-semibold">
              WORKOUT ANALYSIS COMPLETE
            </span>
            <div className="flex-1 h-px bg-gradient-to-r from-purple-400/50 to-transparent"></div>
          </div>

          {/* Analysis Steps */}
          <div className="space-y-2">
            {analysisSteps.map((step, index) => (
              <div 
                key={step.id}
                className={`flex items-center space-x-3 p-2 rounded-lg transition-all duration-500 ${
                  currentStep === index 
                    ? 'bg-purple-500/20 border border-purple-400/50' 
                    : 'bg-white/5 border border-transparent'
                }`}
              >
                <div className={`text-sm font-mono font-bold ${
                  currentStep === index ? 'text-purple-400' : 'text-gray-500'
                }`}>
                  {step.id}
                </div>
                <div className="text-lg">{step.icon}</div>
                <div className="flex-1">
                  <span className={`text-sm font-mono ${
                    currentStep === index ? 'text-white' : 'text-gray-400'
                  }`}>
                    {step.text}
                  </span>
                  {/* Progress Bar */}
                  <div className="w-full bg-gray-700 rounded-full h-1 mt-1">
                    <div 
                      className={`h-1 rounded-full transition-all duration-1000 ${
                        currentStep === index 
                          ? 'bg-gradient-to-r from-purple-400 to-pink-400' 
                          : 'bg-gray-600'
                      }`}
                      style={{ 
                        width: currentStep === index ? `${step.progress}%` : '20%' 
                      }}
                    ></div>
                  </div>
                </div>
                {currentStep === index && (
                  <TrendingUp className="w-4 h-4 text-green-400 animate-pulse" />
                )}
              </div>
            ))}
          </div>

          {/* Status Footer */}
          <div className="flex items-center justify-between pt-2 mt-3 border-t border-purple-500/20">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs font-mono text-green-400">OPTIMAL PERFORMANCE</span>
            </div>
            <div className="flex items-center space-x-1 text-xs font-mono text-gray-400">
              <span>v4.2.1</span>
              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
              <span>REAL-TIME</span>
            </div>
          </div>
        </div>

        {/* Corner Decorations */}
        <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-purple-400/50"></div>
        <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-purple-400/50"></div>
        <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-purple-400/50"></div>
        <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-purple-400/50"></div>
      </div>
    </div>
  );
};

export default TerminalOverlay;