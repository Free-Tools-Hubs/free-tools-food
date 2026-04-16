import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { get, set, del } from 'idb-keyval';

// Custom storage for IndexedDB via idb-keyval
const storage = {
  getItem: async (name: string): Promise<string | null> => {
    return (await get(name)) || null;
  },
  setItem: async (name: string, value: string): Promise<void> => {
    await set(name, value);
  },
  removeItem: async (name: string): Promise<void> => {
    await del(name);
  },
};

interface AppState {
  currentMealPlan: any[];
  savedPlans: any[];
  calorieLog: any[];
  history: {
    recipesSearched: number;
    plansGenerated: number;
    lastPlanDate: string | null;
  };
  streak: {
    count: number;
    lastActive: string | null;
  };
  userPreferences: {
    diet: string;
    calorieGoal: number;
    excludedIngredients: string[];
  };
  savedRecipes: string[]; // slug array
  setDiet: (diet: string) => void;
  setCalorieGoal: (goal: number) => void;
  incrementStreak: () => void;
  trackAction: (type: 'recipe' | 'plan') => void;
  toggleSaveRecipe: (slug: string) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      currentMealPlan: [],
      savedPlans: [],
      calorieLog: [],
      history: {
        recipesSearched: 0,
        plansGenerated: 0,
        lastPlanDate: null,
      },
      streak: {
        count: 0,
        lastActive: null,
      },
      userPreferences: {
        diet: 'Balanced',
        calorieGoal: 2000,
        excludedIngredients: [],
      },
      savedRecipes: [],
      setDiet: (diet) => set((state) => ({ 
        userPreferences: { ...state.userPreferences, diet } 
      })),
      setCalorieGoal: (goal) => set((state) => ({ 
        userPreferences: { ...state.userPreferences, calorieGoal: goal } 
      })),
      toggleSaveRecipe: (slug) => set((state) => {
        const isSaved = state.savedRecipes.includes(slug);
        return {
          savedRecipes: isSaved 
            ? state.savedRecipes.filter(s => s !== slug)
            : [...state.savedRecipes, slug]
        };
      }),
      incrementStreak: () => set((state) => {
        const today = new Date().toDateString();
        if (state.streak.lastActive === today) return {};
        
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const isConsecutive = state.streak.lastActive === yesterday.toDateString();
        
        return {
          streak: {
            count: isConsecutive ? state.streak.count + 1 : 1,
            lastActive: today
          }
        };
      }),
      trackAction: (type) => set((state) => ({
        history: {
          ...state.history,
          [type === 'recipe' ? 'recipesSearched' : 'plansGenerated']: 
            state.history[type === 'recipe' ? 'recipesSearched' : 'plansGenerated'] + 1,
          lastPlanDate: new Date().toISOString()
        }
      }))
    }),
    {
      name: 'food-hub-storage',
      storage: createJSONStorage(() => storage), // Using IndexedDB via idb-keyval
    }
  )
);
