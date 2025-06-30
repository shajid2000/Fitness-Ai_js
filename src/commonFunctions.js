import { useUser } from "@clerk/nextjs";
import { ConvexHttpClient } from "convex/browser";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { api } from "../convex/_generated/api";

// Configuration
const CONVEX_URL = process.env.NEXT_PUBLIC_CONVEX_URL;
const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;


// Initialize clients
const convex = new ConvexHttpClient(CONVEX_URL);
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// Constants
const GEMINI_MODEL = "gemini-2.0-flash-001";
const GENERATION_CONFIG = {
  temperature: 0.4,
  topP: 0.9,
  responseMimeType: "application/json",
};

/**
 * Converts base64 string to ArrayBuffer
 * @param {string} base64 - Base64 encoded string
 * @returns {ArrayBuffer} - Decoded array buffer
 */
export function base64ToArray(base64) {
  if (!base64 || typeof base64 !== 'string') {
    throw new Error('Invalid base64 input');
  }
  
  try {
    const binaryString = window.atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    
    return bytes.buffer;
  } catch (error) {
    throw new Error('Failed to decode base64 string');
  }
}

/**
 * Hook to get current user from Clerk
 * @returns {Object|null} - User object or null
 */
export function getUserFromClerk() {
  const { user } = useUser();
  return user;
}

/**
 * Validates and normalizes workout plan data
 * @param {Object} plan - Raw workout plan from AI
 * @returns {Object} - Validated workout plan
 */
function validateWorkoutPlan(plan) {
  if (!plan || typeof plan !== 'object') {
    throw new Error('Invalid workout plan structure');
  }

  if (!Array.isArray(plan.schedule)) {
    throw new Error('Workout schedule must be an array');
  }

  if (!Array.isArray(plan.exercises)) {
    throw new Error('Workout exercises must be an array');
  }

  return {
    schedule: plan.schedule,
    exercises: plan.exercises.map((exercise, index) => {
      if (!exercise.day || !Array.isArray(exercise.routines)) {
        throw new Error(`Invalid exercise structure at index ${index}`);
      }

      return {
        day: exercise.day,
        routines: exercise.routines.map((routine, routineIndex) => {
          if (!routine.name) {
            throw new Error(`Exercise name missing at exercise ${index}, routine ${routineIndex}`);
          }

          return {
            name: routine.name,
            sets: Number(routine.sets) || 1,
            reps: Number(routine.reps) || 10,
          };
        }),
      };
    }),
  };
}

/**
 * Validates and normalizes diet plan data
 * @param {Object} plan - Raw diet plan from AI
 * @returns {Object} - Validated diet plan
 */
function validateDietPlan(plan) {
  if (!plan || typeof plan !== 'object') {
    throw new Error('Invalid diet plan structure');
  }

  if (!plan.dailyCalories || !Array.isArray(plan.meals)) {
    throw new Error('Diet plan must have dailyCalories and meals array');
  }

  return {
    dailyCalories: Number(plan.dailyCalories) || 2000,
    meals: plan.meals.map((meal, index) => {
      if (!meal.name || !Array.isArray(meal.foods)) {
        throw new Error(`Invalid meal structure at index ${index}`);
      }

      return {
        name: meal.name,
        foods: meal.foods.filter(food => food && typeof food === 'string'),
      };
    }),
  };
}

/**
 * Gets user ID from Clerk or localStorage
 * @returns {string|null} - User ID
 */
function getUserId() {
  const { user } = useUser();
  
  if (user?.id) {
    return user.id;
  }
  
  // Fallback to localStorage (consider removing this for security)
  return window.localStorage.getItem("userid");
}

/**
 * Generates workout plan using Gemini AI
 * @param {Object} userProfile - User fitness profile
 * @returns {Promise<Object>} - Generated workout plan
 */
async function generateWorkoutPlan(userProfile) {
  const { age, height, weight, injuries, workout_days, fitness_goal, fitness_level } = userProfile;

  const model = genAI.getGenerativeModel({
    model: GEMINI_MODEL,
    generationConfig: GENERATION_CONFIG,
  });

  const workoutPrompt = `You are an experienced fitness coach creating a personalized workout plan based on:
Age: ${age}
Height: ${height}
Weight: ${weight}
Injuries or limitations: ${injuries || 'None'}
Available days for workout: ${workout_days}
Fitness goal: ${fitness_goal}
Fitness level: ${fitness_level}

As a professional coach:
- Consider muscle group splits to avoid overtraining the same muscles on consecutive days
- Design exercises that match the fitness level and account for any injuries
- Structure the workouts to specifically target the user's fitness goal

CRITICAL SCHEMA INSTRUCTIONS:
- Your output MUST contain ONLY the fields specified below, NO ADDITIONAL FIELDS
- "sets" and "reps" MUST ALWAYS be NUMBERS, never strings
- For example: "sets": 3, "reps": 10
- Do NOT use text like "reps": "As many as possible" or "reps": "To failure"
- Instead use specific numbers like "reps": 12 or "reps": 15
- For cardio, use "sets": 1, "reps": 1 or another appropriate number
- NEVER include strings for numerical fields
- NEVER add extra fields not shown in the example below

Return a JSON object with this EXACT structure:
{
  "schedule": ["Monday", "Wednesday", "Friday"],
  "exercises": [
    {
      "day": "Monday",
      "routines": [
        {
          "name": "Exercise Name",
          "sets": 3,
          "reps": 10
        }
      ]
    }
  ]
}

DO NOT add any fields that are not in this example. Your response must be a valid JSON object with no additional text.`;

  const result = await model.generateContent(workoutPrompt);
  const planText = result.response.text();
  
  return JSON.parse(planText);
}

/**
 * Generates diet plan using Gemini AI
 * @param {Object} userProfile - User fitness profile
 * @returns {Promise<Object>} - Generated diet plan
 */
async function generateDietPlan(userProfile) {
  const { age, height, weight, fitness_goal, dietary_restrictions } = userProfile;

  const model = genAI.getGenerativeModel({
    model: GEMINI_MODEL,
    generationConfig: GENERATION_CONFIG,
  });

  const dietPrompt = `You are an experienced nutrition coach creating a personalized diet plan based on:
Age: ${age}
Height: ${height}
Weight: ${weight}
Fitness goal: ${fitness_goal}
Dietary restrictions: ${dietary_restrictions || 'None'}

As a professional nutrition coach:
- Calculate appropriate daily calorie intake based on the person's stats and goals
- Create a balanced meal plan with proper macronutrient distribution
- Include a variety of nutrient-dense foods while respecting dietary restrictions
- Consider meal timing around workouts for optimal performance and recovery

CRITICAL SCHEMA INSTRUCTIONS:
- Your output MUST contain ONLY the fields specified below, NO ADDITIONAL FIELDS
- "dailyCalories" MUST be a NUMBER, not a string
- DO NOT add fields like "supplements", "macros", "notes", or ANYTHING else
- ONLY include the EXACT fields shown in the example below
- Each meal should include ONLY a "name" and "foods" array

Return a JSON object with this EXACT structure and no other fields:
{
  "dailyCalories": 2000,
  "meals": [
    {
      "name": "Breakfast",
      "foods": ["Oatmeal with berries", "Greek yogurt", "Black coffee"]
    },
    {
      "name": "Lunch",
      "foods": ["Grilled chicken salad", "Whole grain bread", "Water"]
    }
  ]
}

DO NOT add any fields that are not in this example. Your response must be a valid JSON object with no additional text.`;

  const result = await model.generateContent(dietPrompt);
  const planText = result.response.text();
  
  return JSON.parse(planText);
}

/**
 * Saves the generated plans to the database
 * @param {string} userId - User ID
 * @param {Object} workoutPlan - Validated workout plan
 * @param {Object} dietPlan - Validated diet plan
 * @param {string} fitness_goal - User's fitness goal
 * @returns {Promise<string>} - Plan ID
 */
async function savePlansToDatabase(userId, workoutPlan, dietPlan, fitness_goal) {
  const planId = await convex.mutation(api.plans.createPlan, {
    userId,
    dietPlan,
    workoutPlan,
    isActive: true,
    name: `${fitness_goal} Plan - ${new Date().toLocaleDateString()}`,
  });

  return planId;
}

/**
 * Logs fitness profile data and triggers plan generation
 * @param {Object} data - Fitness profile data
 */
export async function logFitnessProfileJson(data) {
  console.log("Fitness Profile Data:", data);
  
  try {
    await generateFitnessProgram(data);
  } catch (error) {
    console.error("Error generating fitness program:", error);
    throw error;
  }
}

/**
 * Main function to generate complete fitness program
 * @param {Object} payload - User fitness profile data
 * @returns {Promise<Object>} - Generated fitness program result
 */
export async function generateFitnessProgram(payload = {}) {
  try {
    // Validate required API key
    if (!GEMINI_API_KEY) {
      throw new Error("Gemini API key is not configured");
    }

    const {
      age,
      height,
      weight,
      injuries,
      workout_days,
      fitness_goal,
      fitness_level,
      dietary_restrictions,
    } = payload;

    // Validate required fields
    // const requiredFields = { age, height, weight, workout_days, fitness_goal, fitness_level };
    // const missingFields = Object.entries(requiredFields)
    //   .filter(([key, value]) => !value)
    //   .map(([key]) => key);

    // if (missingFields.length > 0) {
    //   throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
    // }

    // Get user ID
    const user_id = payload.user_id || localStorage.getItem('userid');
    if (!user_id) {
      throw new Error("User ID is required");
    }

    console.log("Generating fitness program for user:", user_id);

    // Generate both plans concurrently
    const [rawWorkoutPlan, rawDietPlan] = await Promise.all([
      generateWorkoutPlan(payload),
      generateDietPlan(payload)
    ]);

    // Validate the generated plans
    const workoutPlan = validateWorkoutPlan(rawWorkoutPlan);
    const dietPlan = validateDietPlan(rawDietPlan);

    // Save to database
    const planId = await savePlansToDatabase(user_id, workoutPlan, dietPlan, fitness_goal);

    const result = {
      success: true,
      data: {
        planId,
        workoutPlan,
        dietPlan,
      },
    };

    console.log("Fitness program generated successfully:", result);

    // Navigate to profile page
    if (typeof window !== 'undefined') {
      window.location.href = '/profile';
    }

    return result;

  } catch (error) {
    console.error("Error generating fitness program:", error);
    
    const errorResult = {
      success: false,
      error: error.message,
    };

    // You might want to show an error message to the user here
    // instead of or in addition to throwing the error
    throw error;
  }
}

// Export the main function with the correct name for backward compatibility
export { generateFitnessProgram as generate_finess_program };
export { logFitnessProfileJson as log_fitness_profile_json };