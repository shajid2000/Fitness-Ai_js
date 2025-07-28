// // 

// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import {
//   ChevronRight,
//   Dumbbell,
//   Sparkles,
//   Users,
//   Clock,
//   AppleIcon,
//   ShieldIcon,
// } from "lucide-react";
// import { USER_PROGRAMS } from "@/constants";

// const UserPrograms = () => {
//   return (
//     <div className="w-full pb-24 pt-16 relative">
//       <div className="container mx-auto max-w-6xl px-4">
//         {/* HEADER- PROGRAM GALLERY */}
//         <div className="bg-card/90 backdrop-blur-sm border border-border rounded-lg overflow-hidden mb-16">
//           {/* HEADER BAR */}
//           <div className="flex items-center justify-between px-5 py-3 border-b border-border bg-background/70">
//             <div className="flex items-center gap-2">
//               <div className="w-2.5 h-2.5 rounded-full bg-primary"></div>
//               <span className="text-sm text-primary font-medium">Program Gallery</span>
//             </div>
//             <div className="text-sm text-muted-foreground">Featured Plans</div>
//           </div>

//           {/* HEADER CONTENT */}
//           <div className="p-8 text-center">
//             <h2 className="text-4xl md:text-5xl font-bold mb-6">
//               <span className="text-foreground">AI-Generated </span>
//               <span className="text-primary">Programs</span>
//             </h2>

//             <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-10">
//               Explore personalized fitness plans our AI assistant has created for other users
//             </p>

//             {/* STATS */}
//             <div className="flex items-center justify-center gap-16 mt-10 font-mono">
//               <div className="flex flex-col items-center">
//                 <p className="text-3xl text-primary">500+</p>
//                 <p className="text-sm text-muted-foreground uppercase tracking-wide mt-1">
//                   PROGRAMS
//                 </p>
//               </div>
//               <div className="w-px h-12 bg-border"></div>
//               <div className="flex flex-col items-center">
//                 <p className="text-3xl text-primary">3min</p>
//                 <p className="text-sm text-muted-foreground uppercase tracking-wide mt-1">
//                   CREATION TIME
//                 </p>
//               </div>
//               <div className="w-px h-12 bg-border"></div>
//               <div className="flex flex-col items-center">
//                 <p className="text-3xl text-primary">100%</p>
//                 <p className="text-sm text-muted-foreground uppercase tracking-wide mt-1">
//                   PERSONALIZED
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Program cards */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {USER_PROGRAMS.map((program) => (
//             <Card
//               key={program.id}
//               className="bg-card/90 backdrop-blur-sm border border-border hover:border-primary/50 transition-colors overflow-hidden"
//             >
//               {/* Card header with user info */}
//               <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-background/70">
//                 <div className="flex items-center gap-2">
//                   <div className="w-2 h-2 rounded-full bg-primary"></div>
//                   <span className="text-sm text-primary">USER.{program.id}</span>
//                 </div>
//                 <div className="text-sm text-muted-foreground">
//                   {program.fitness_level.toUpperCase()}
//                 </div>
//               </div>

//               <CardHeader className="pt-6 px-5">
//                 <div className="flex items-center gap-4 mb-4">
//                   <div className="h-16 w-16 rounded-full overflow-hidden border border-border">
//                     <img
//                       src={program.profilePic}
//                       alt={`${program.first_name}`}
//                       className="h-full w-full object-cover"
//                     />
//                   </div>
//                   <div>
//                     <CardTitle className="text-xl text-foreground">
//                       {program.first_name}
//                       <span className="text-primary">.exe</span>
//                     </CardTitle>
//                     <div className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
//                       <Users className="h-4 w-4" />
//                       {program.age}y • {program.workout_days}d/week
//                     </div>
//                   </div>
//                 </div>

//                 <div className="flex justify-between items-center gap-4">
//                   <div className="px-3 py-1 bg-primary/10 rounded border border-primary/20 text-sm text-primary flex items-center gap-2">
//                     <Sparkles className="h-4 w-4" />
//                     {program.fitness_goal}
//                   </div>
//                   <div className="text-sm text-muted-foreground flex items-center gap-2">
//                     <Clock className="h-4 w-4" />
//                     v3.5
//                   </div>
//                 </div>
//               </CardHeader>

//               <CardContent className="px-5">
//                 {/* Program details */}
//                 <div className="space-y-5 pt-2">
//                   <div className="flex items-start gap-3">
//                     <div className="p-2 rounded-md bg-primary/10 text-primary mt-0.5">
//                       <Dumbbell className="h-5 w-5" />
//                     </div>
//                     <div className="flex-1">
//                       <div className="flex justify-between items-center">
//                         <h3 className="font-medium text-foreground">
//                           {program.workout_plan.title}
//                         </h3>
//                       </div>
//                       <p className="text-sm text-muted-foreground mt-1">
//                         {program.equipment_access}
//                       </p>
//                     </div>
//                   </div>

//                   <div className="flex items-start gap-3">
//                     <div className="p-2 rounded-md bg-secondary/10 text-secondary mt-0.5">
//                       <AppleIcon className="h-5 w-5" />
//                     </div>
//                     <div className="flex-1">
//                       <div className="flex justify-between items-center">
//                         <h3 className="font-medium text-foreground">{program.diet_plan.title}</h3>
//                       </div>
//                       <p className="text-sm text-muted-foreground mt-1">
//                         System optimized nutrition
//                       </p>
//                     </div>
//                   </div>

//                   <div className="flex items-start gap-3">
//                     <div className="p-2 rounded-md bg-primary/10 text-primary mt-0.5">
//                       <ShieldIcon className="h-5 w-5" />
//                     </div>
//                     <div className="flex-1">
//                       <div className="flex justify-between items-center">
//                         <h3 className="font-medium text-foreground">AI Safety Protocols</h3>
//                       </div>
//                       <p className="text-sm text-muted-foreground mt-1">
//                         Protection systems enabled
//                       </p>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Program description */}
//                 <div className="mt-5 pt-5 border-t border-border">
//                   <div className="text-sm text-muted-foreground">
//                     <span className="text-primary">&gt; </span>
//                     {program.workout_plan.description.substring(0, 120)}...
//                   </div>
//                 </div>
//               </CardContent>

//               <CardFooter className="px-5 py-4 border-t border-border">
//                 <Link href={`/programs/${program.id}`} className="w-full">
//                   <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
//                     View Program Details
//                     <ChevronRight className="ml-2 h-4 w-4" />
//                   </Button>
//                 </Link>
//               </CardFooter>
//             </Card>
//           ))}
//         </div>

//         {/* CTA section */}
//         <div className="mt-16 text-center">
//           <Link href="/generate-program">
//             <Button
//               size="lg"
//               className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg"
//             >
//               Generate Your Program
//               <Sparkles className="ml-2 h-5 w-5" />
//             </Button>
//           </Link>
//           <p className="text-muted-foreground mt-4">
//             Join 500+ users with AI-customized fitness programs
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserPrograms;

import React, { useState, useEffect } from 'react';
import { 
  ChevronRight, 
  Dumbbell, 
  Sparkles, 
  Users, 
  Clock, 
  Apple, 
  Shield, 
  Play,
  Star,
  TrendingUp,
  Zap,
  Target,
  Activity
} from 'lucide-react';
import Link from 'next/link';

const UserPrograms = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Mock data for demonstration
  const programs = [
    {
      id: 1,
      first_name: "Alex",
      age: 28,
      workout_days: 5,
      fitness_level: "intermediate",
      fitness_goal: "Muscle Building",
      equipment_access: "Full gym access",
      profilePic: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      workout_plan: {
        title: "Power Builder Protocol",
        description: "Advanced strength training program combining powerlifting movements with hypertrophy-focused accessory work for maximum muscle growth and strength gains."
      },
      diet_plan: {
        title: "Lean Bulk Nutrition"
      },
      rating: 4.9,
      completionRate: 94
    },
    {
      id: 2,
      first_name: "Sarah",
      age: 32,
      workout_days: 4,
      fitness_level: "beginner",
      fitness_goal: "Weight Loss",
      equipment_access: "Home equipment",
      profilePic: "https://ix-marketing.imgix.net/focalpoint.png?auto=format,compress&w=1946",
      workout_plan: {
        title: "Home Fat Burn System",
        description: "High-intensity interval training combined with strength circuits designed for maximum calorie burn using minimal equipment at home."
      },
      diet_plan: {
        title: "Metabolic Boost Diet"
      },
      rating: 4.8,
      completionRate: 87
    },
    {
      id: 3,
      first_name: "Marcus",
      age: 35,
      workout_days: 6,
      fitness_level: "advanced",
      fitness_goal: "Athletic Performance",
      equipment_access: "Professional gym",
      profilePic: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      workout_plan: {
        title: "Elite Performance Matrix",
        description: "Sport-specific training program incorporating plyometrics, Olympic lifts, and periodization for peak athletic performance and competitive edge."
      },
      diet_plan: {
        title: "Performance Fuel Plan"
      },
      rating: 5.0,
      completionRate: 98
    }
  ];

  const goalColors = {
    "Muscle Building": "from-blue-500 to-cyan-500",
    "Weight Loss": "from-pink-500 to-rose-500",
    "Athletic Performance": "from-orange-500 to-yellow-500"
  };

  const levelColors = {
    "beginner": "text-green-400",
    "intermediate": "text-yellow-400", 
    "advanced": "text-red-400"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white py-20">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header Section */}
        <div className={`text-center mb-20 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <div className="inline-flex items-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3 mb-8">
            <Activity className="w-5 h-5 mr-2 text-purple-400" />
            <span className="text-sm font-medium">AI Program Gallery</span>
          </div>
          
          <h2 className="text-5xl lg:text-6xl font-black mb-6">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Real Results from
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              AI-Powered Programs
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
            Discover how our AI creates personalized fitness journeys that deliver real transformations for users just like you.
          </p>
          
          {/* Enhanced Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { number: "10K+", label: "Active Programs", icon: Users },
              { number: "2min", label: "Generation Time", icon: Clock },
              { number: "94%", label: "Success Rate", icon: TrendingUp },
              { number: "4.9★", label: "Avg Rating", icon: Star }
            ].map((stat, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <stat.icon className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-400 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Program Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {programs.map((program, index) => (
            <div
              key={program.id}
              className={`group relative bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 hover:border-purple-400/50 transition-all duration-500 hover:transform hover:scale-105 overflow-hidden ${
                isVisible ? 'animate-fade-in-up' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 0.2}s` }}
              onMouseEnter={() => setHoveredCard(program.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Glow Effect */}
              <div className={`absolute inset-0 bg-gradient-to-r ${goalColors[program.fitness_goal]} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl`}></div>
              
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-mono text-purple-400">USER.{program.id.toString().padStart(3, '0')}</span>
                </div>
                <div className={`text-sm font-semibold ${levelColors[program.fitness_level]} uppercase tracking-wider`}>
                  {program.fitness_level}
                </div>
              </div>

              {/* User Profile */}
              <div className="p-6">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-purple-400/50">
                      <img
                        src={program.profilePic}
                        alt={program.first_name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-xl font-bold">
                      {program.first_name}
                      <span className="text-purple-400">.ai</span>
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-400 mt-1">
                      <span className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {program.age}y
                      </span>
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {program.workout_days}d/week
                      </span>
                    </div>
                  </div>
                </div>

                {/* Goal Badge */}
                <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-white/20">
                  <Target className="w-4 h-4 mr-2 text-purple-400" />
                  <span className="text-sm font-medium">{program.fitness_goal}</span>
                </div>

                {/* Program Details */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                      <Dumbbell className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-white mb-1">{program.workout_plan.title}</h4>
                      <p className="text-sm text-gray-400">{program.equipment_access}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                      <Apple className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-white mb-1">{program.diet_plan.title}</h4>
                      <p className="text-sm text-gray-400">AI-optimized nutrition plan</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                      <Shield className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-white mb-1">Smart Adaptations</h4>
                      <p className="text-sm text-gray-400">Real-time program adjustments</p>
                    </div>
                  </div>
                </div>

                {/* Performance Metrics */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-white/5 rounded-xl p-3 text-center">
                    <div className="text-lg font-bold text-yellow-400">{program.rating}★</div>
                    <div className="text-xs text-gray-400">User Rating</div>
                  </div>
                  <div className="bg-white/5 rounded-xl p-3 text-center">
                    <div className="text-lg font-bold text-green-400">{program.completionRate}%</div>
                    <div className="text-xs text-gray-400">Completion</div>
                  </div>
                </div>

                {/* Description Preview */}
                <div className="bg-black/20 rounded-xl p-4 mb-6 border border-white/5">
                  <p className="text-sm text-gray-300 leading-relaxed">
                    <span className="text-purple-400 font-mono">&gt; </span>
                    {program.workout_plan.description.substring(0, 100)}...
                  </p>
                </div>

                {/* Action Button */}
                <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 group">
                  <span className="flex items-center justify-center">
                    View Full Program
                    <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 p-12 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Ready to Transform Your Fitness Journey?
              </span>
            </h3>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of users who've achieved their fitness goals with our AI-powered personalized programs.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={"/generate-program"} className="group bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-8 py-4 rounded-2xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25">
                <span className="flex items-center justify-center">
                  Generate My Program
                  <Sparkles className="ml-2 w-5 h-5 group-hover:rotate-12 transition-transform" />
                </span>
              </Link>
              
              <button className="group flex items-center justify-center px-8 py-4 rounded-2xl border-2 border-white/20 hover:border-white/40 backdrop-blur-sm transition-all duration-300 hover:bg-white/5">
                <Play className="mr-2 w-5 h-5" />
                Watch Success Stories
              </button>
            </div>
            
            <p className="text-gray-400 text-sm mt-6">
              ✨ Free to start • No credit card required • 2-minute setup
            </p>
          </div>
        </div>
      </div>

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
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out both;
        }
      `}</style>
    </div>
  );
};

export default UserPrograms;
