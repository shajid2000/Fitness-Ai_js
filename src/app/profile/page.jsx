"use client";

import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useState } from "react";
import ProfileHeader from "@/components/ProfileHeader";
import NoFitnessPlan from "@/components/NoFitnessPlan";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AppleIcon, CalendarIcon, DumbbellIcon, ZapIcon, TrendingUpIcon, TargetIcon, ClockIcon, Flame  } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const ProfilePage = () => {
  const { user } = useUser();
  const userId = user?.id;

  const allPlans = useQuery(api.plans.getUserPlans, { userId });
  const [selectedPlanId, setSelectedPlanId] = useState(null);

  const activePlan = allPlans?.find((plan) => plan.isActive);

  const currentPlan = selectedPlanId
    ? allPlans?.find((plan) => plan._id === selectedPlanId)
    : activePlan;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 -left-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-80 -right-40 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-40 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-20">
        
        <ProfileHeader user={user} />

        {allPlans && allPlans?.length > 0 ? (
          <div className="space-y-8">
            
            {/* PLAN SELECTOR */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 relative overflow-hidden group hover:bg-white/10 transition-all duration-500">
              
              {/* Corner glow effects */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/20 to-transparent rounded-full blur-2xl" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-pink-500/20 to-transparent rounded-full blur-2xl" />
              
              <div className="relative">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl">
                      <TrendingUpIcon className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-white">
                      Your{" "}
                      <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        Fitness Plans
                      </span>
                    </h2>
                  </div>
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-2">
                    <span className="text-sm font-medium text-gray-300">
                      Total Plans: {allPlans.length}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {allPlans.map((plan, index) => (
                    <Button
                      key={plan._id}
                      onClick={() => setSelectedPlanId(plan._id)}
                      className={`relative p-6 h-auto text-left border-0 rounded-2xl transition-all duration-300 hover:scale-105 ${
                        selectedPlanId === plan._id || (!selectedPlanId && plan.isActive)
                          ? "bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-2xl shadow-purple-500/25"
                          : "bg-white/5 backdrop-blur-sm border border-white/10 text-gray-300 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      <div className="flex flex-col space-y-3">
                        <div className="flex items-center justify-between">
                          <ZapIcon className="w-5 h-5" />
                          {plan.isActive && (
                            <div className="flex items-center space-x-1 bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full border border-green-500/30">
                              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                              <span className="font-medium">ACTIVE</span>
                            </div>
                          )}
                        </div>
                        <div>
                          <h3 className="font-bold text-lg leading-tight">{plan.name}</h3>
                          <p className="text-sm opacity-80 mt-1">
                            Created {new Date(plan._creationTime).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* PLAN DETAILS */}
            {currentPlan && (
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 relative overflow-hidden">
                
                {/* Background effects */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-50" />
                
                <div className="relative">
                  {/* Plan Header */}
                  <div className="flex items-center space-x-3 mb-8">
                    <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse shadow-lg shadow-purple-500/50" />
                    <h3 className="text-2xl font-bold text-white">
                      Current Plan:{" "}
                      <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        {currentPlan.name}
                      </span>
                    </h3>
                  </div>

                  <Tabs defaultValue="workout" className="w-full">
                    <TabsList className="mb-8 w-full grid grid-cols-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-1">
                      <TabsTrigger
                        value="workout"
                        className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
                      >
                        <DumbbellIcon className="mr-2 w-4 h-4" />
                        Workout Plan
                      </TabsTrigger>

                      <TabsTrigger
                        value="diet"
                        className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
                      >
                        <AppleIcon className="mr-2 h-4 w-4" />
                        Diet Plan
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="workout" className="space-y-6">
                      {/* Schedule Overview */}
                      <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-2xl p-6">
                        <div className="flex items-center space-x-3 mb-4">
                          <CalendarIcon className="h-5 w-5 text-blue-400" />
                          <h4 className="text-lg font-bold text-white">Weekly Schedule</h4>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {currentPlan.workoutPlan.schedule.map((day, index) => (
                            <div
                              key={index}
                              className="px-3 py-2 bg-blue-500/20 border border-blue-500/30 rounded-xl text-blue-300 text-sm font-medium"
                            >
                              {day}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Exercise Days */}
                      <Accordion type="multiple" className="space-y-4">
                        {currentPlan.workoutPlan.exercises.map((exerciseDay, index) => (
                          <AccordionItem
                            key={index}
                            value={exerciseDay.day}
                            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300"
                          >
                            <AccordionTrigger className="px-6 py-4 hover:no-underline group">
                              <div className="flex justify-between w-full items-center">
                                <div className="flex items-center space-x-3">
                                  <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full" />
                                  <span className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors duration-300">
                                    {exerciseDay.day}
                                  </span>
                                </div>
                                <div className="bg-purple-500/20 border border-purple-500/30 rounded-xl px-3 py-1">
                                  <span className="text-purple-300 text-sm font-medium">
                                    {exerciseDay.routines.length} Exercises
                                  </span>
                                </div>
                              </div>
                            </AccordionTrigger>

                            <AccordionContent className="px-6 pb-6">
                              <div className="space-y-4 mt-4">
                                {exerciseDay.routines.map((routine, routineIndex) => (
                                  <div
                                    key={routineIndex}
                                    className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 border border-white/10 rounded-2xl p-5 hover:border-purple-500/30 transition-all duration-300 group"
                                  >
                                    <div className="flex justify-between items-start mb-3">
                                      <h5 className="font-bold text-lg text-white group-hover:text-purple-300 transition-colors duration-300">
                                        {routine.name}
                                      </h5>
                                      <div className="flex items-center space-x-3">
                                        <div className="flex items-center space-x-2 bg-purple-500/20 border border-purple-500/30 rounded-xl px-3 py-2">
                                          <TargetIcon className="w-4 h-4 text-purple-400" />
                                          <span className="text-purple-300 text-sm font-medium">
                                            {routine.sets} Sets
                                          </span>
                                        </div>
                                        <div className="flex items-center space-x-2 bg-pink-500/20 border border-pink-500/30 rounded-xl px-3 py-2">
                                          <TrendingUpIcon className="w-4 h-4 text-pink-400" />
                                          <span className="text-pink-300 text-sm font-medium">
                                            {routine.reps} Reps
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                    {routine.description && (
                                      <p className="text-gray-300 leading-relaxed">
                                        {routine.description}
                                      </p>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </TabsContent>

                    <TabsContent value="diet" className="space-y-6">
                      {/* Calorie Target */}
                      <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-2xl p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Flame  className="h-6 w-6 text-orange-400" />
                            <h4 className="text-lg font-bold text-white">Daily Calorie Target</h4>
                          </div>
                          <div className="text-right">
                            <div className="text-3xl font-black bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                              {currentPlan.dietPlan.dailyCalories}
                            </div>
                            <div className="text-sm text-orange-300 font-medium">KCAL/DAY</div>
                          </div>
                        </div>
                      </div>

                      {/* Meals */}
                      <div className="grid gap-6">
                        {currentPlan.dietPlan.meals.map((meal, index) => (
                          <div
                            key={index}
                            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 group"
                          >
                            <div className="flex items-center space-x-3 mb-4">
                              <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full animate-pulse" />
                              <h4 className="text-xl font-bold text-white group-hover:text-green-300 transition-colors duration-300">
                                {meal.name}
                              </h4>
                            </div>
                            <div className="grid gap-3">
                              {meal.foods.map((food, foodIndex) => (
                                <div
                                  key={foodIndex}
                                  className="flex items-center space-x-3 p-3 bg-gradient-to-r from-slate-800/30 to-slate-700/30 rounded-xl border border-white/5 hover:border-green-500/30 transition-all duration-300"
                                >
                                  <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg text-white text-sm font-bold">
                                    {String(foodIndex + 1).padStart(2, "0")}
                                  </div>
                                  <span className="text-gray-300 leading-relaxed">{food}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            )}
          </div>
        ) : (
          <NoFitnessPlan />
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
      `}</style>
    </div>
  );
};

export default ProfilePage;