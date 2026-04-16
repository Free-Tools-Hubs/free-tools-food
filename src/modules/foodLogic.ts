import recipes from '../data/recipes.json';
import ingredientDatabase from '../data/ingredientDatabase.json';

export interface Ingredient {
  id: string;
  name?: string;
  amount: number;
  unit: string;
}

export interface Recipe {
  id: string;
  slug: string;
  title: string;
  cuisine: string;
  ingredients: Ingredient[];
  instructions: string[];
  baseCalories: number;
  tags: string[];
  variations: string[];
}

export interface MealPlanDay {
  day: number;
  meals: {
    breakfast: Recipe;
    lunch: Recipe;
    dinner: Recipe;
    snacks: Recipe[];
  };
  totalCalories: number;
}

/**
 * Pure function to estimate calories based on ingredients
 */
export const ruleBasedCalorieEstimator = (ingredients: Ingredient[]) => {
  let total = 0;
  const breakdown: Record<string, number> = {};

  ingredients.forEach((ing) => {
    const dbItem = ingredientDatabase.find((item) => item.id === ing.id);
    if (dbItem) {
      // Basic rule-based calculation: (amount / 100) * calories
      // Assumes DB stores calories per 100g/ml
      const cal = (ing.amount / 100) * dbItem.calories;
      total += cal;
      breakdown[dbItem.name] = cal;
    } else {
      // Fallback for unknown ingredients (using a common average or 0)
      total += 0;
    }
  });

  return { total: Math.round(total), breakdown };
};

/**
 * Pure function to pick a random recipe based on filters
 */
export const randomRecipePicker = (filters: { cuisine?: string; tag?: string; maxCalories?: number }) => {
  let filtered = recipes as Recipe[];

  if (filters.cuisine) {
    filtered = filtered.filter((r) => r.cuisine === filters.cuisine);
  }
  if (filters.tag) {
    filtered = filtered.filter((r) => r.tags.includes(filters.tag!));
  }
  if (filters.maxCalories) {
    filtered = filtered.filter((r) => r.baseCalories <= filters.maxCalories!);
  }

  if (filtered.length === 0) return null;
  const randomIndex = Math.floor(Math.random() * filtered.length);
  return filtered[randomIndex];
};

/**
 * Pure function to generate a meal plan
 */
export const generateMealPlan = (preferences: { diet?: string; targetCalories: number }, days: number = 1): MealPlanDay[] => {
  const plan: MealPlanDay[] = [];

  for (let d = 1; d <= days; d++) {
    // Target distribution: Breakfast 25%, Lunch 35%, Dinner 40%
    const targets = {
      breakfast: preferences.targetCalories * 0.25,
      lunch: preferences.targetCalories * 0.35,
      dinner: preferences.targetCalories * 0.40
    };

    const breakfast = randomRecipePicker({ 
      tag: preferences.diet, 
      maxCalories: targets.breakfast * 1.2 // Allow slight overhead
    }) || (recipes[0] as Recipe);

    const lunch = randomRecipePicker({ 
      tag: preferences.diet, 
      maxCalories: targets.lunch * 1.2
    }) || (recipes[1] as Recipe);

    const dinner = randomRecipePicker({ 
      tag: preferences.diet, 
      maxCalories: targets.dinner * 1.2
    }) || (recipes[2] as Recipe);

    plan.push({
      day: d,
      meals: { breakfast, lunch, dinner, snacks: [] },
      totalCalories: Math.round(breakfast.baseCalories + lunch.baseCalories + dinner.baseCalories),
    });
  }

  return plan;
};

/**
 * Calculate macro split for a plan or recipe
 */
export const calculateMacroSplit = (ingredients: Ingredient[]) => {
  let protein = 0;
  let carbs = 0;
  let fat = 0;

  ingredients.forEach((ing) => {
    const dbItem = ingredientDatabase.find((item) => item.id === ing.id);
    if (dbItem) {
      protein += (ing.amount / 100) * dbItem.protein;
      carbs += (ing.amount / 100) * dbItem.carbs;
      fat += (ing.amount / 100) * dbItem.fat;
    }
  });

  return { protein: Math.round(protein), carbs: Math.round(carbs), fat: Math.round(fat) };
};
