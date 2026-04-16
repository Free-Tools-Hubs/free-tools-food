import fs from 'fs';
import path from 'path';

const cuisines = ['Italian', 'Mexican', 'Indian', 'Mediterranean', 'Japanese', 'Keto', 'Vegan', 'Paleo', 'Thai', 'Greek'];
const dietGoals = ['Weight Loss', 'Muscle Gain', 'Balanced', 'Low Carb', 'High Protein'];

const commonIngredients = [
  { id: 'chicken_breast', name: 'Chicken Breast', calories: 165, protein: 31, carbs: 0, fat: 3.6, unit: 'g' },
  { id: 'brown_rice', name: 'Brown Rice', calories: 111, protein: 2.6, carbs: 23, fat: 0.9, unit: 'g' },
  { id: 'broccoli', name: 'Broccoli', calories: 34, protein: 2.8, carbs: 7, fat: 0.4, unit: 'g' },
  { id: 'olive_oil', name: 'Olive Oil', calories: 884, protein: 0, carbs: 0, fat: 100, unit: 'ml' },
  { id: 'avocado', name: 'Avocado', calories: 160, protein: 2, carbs: 9, fat: 15, unit: 'g' },
  { id: 'salmon', name: 'Salmon', calories: 208, protein: 20, carbs: 0, fat: 13, unit: 'g' },
  { id: 'eggs', name: 'Eggs', calories: 155, protein: 13, carbs: 1.1, fat: 11, unit: 'pcs' },
  { id: 'sweet_potato', name: 'Sweet Potato', calories: 86, protein: 1.6, carbs: 20, fat: 0.1, unit: 'g' },
  { id: 'quinoa', name: 'Quinoa', calories: 120, protein: 4.4, carbs: 21, fat: 1.9, unit: 'g' },
  { id: 'greek_yogurt', name: 'Greek Yogurt', calories: 59, protein: 10, carbs: 3.6, fat: 0.4, unit: 'g' },
  { id: 'tofu', name: 'Tofu', calories: 76, protein: 8, carbs: 1.9, fat: 4.8, unit: 'g' },
  { id: 'turkey_breast', name: 'Turkey Breast', calories: 135, protein: 30, carbs: 0, fat: 0.7, unit: 'g' },
  { id: 'cashews', name: 'Cashews', calories: 553, protein: 18, carbs: 30, fat: 44, unit: 'g' },
  { id: 'blueberries', name: 'Blueberries', calories: 57, protein: 0.7, carbs: 14, fat: 0.3, unit: 'g' },
  { id: 'kale', name: 'Kale', calories: 49, protein: 4.3, carbs: 8.8, fat: 0.9, unit: 'g' },
  { id: 'greek_yogurt_full', name: 'Full Fat Greek Yogurt', calories: 97, protein: 9, carbs: 4, fat: 5, unit: 'g' },
  { id: 'lentils', name: 'Lentils', calories: 116, protein: 9, carbs: 20, fat: 0.4, unit: 'g' },
  { id: 'shrimp', name: 'Shrimp', calories: 99, protein: 24, carbs: 0.2, fat: 0.3, unit: 'g' },
  { id: 'cauliflower', name: 'Cauliflower', calories: 25, protein: 1.9, carbs: 5, fat: 0.3, unit: 'g' },
  { id: 'peanut_butter', name: 'Peanut Butter', calories: 588, protein: 25, carbs: 20, fat: 50, unit: 'g' },
  { id: 'black_beans', name: 'Black Beans', calories: 132, protein: 8.9, carbs: 23, fat: 0.5, unit: 'g' },
  { id: 'cod_fish', name: 'Cod Fish', calories: 82, protein: 18, carbs: 0, fat: 0.7, unit: 'g' },
  { id: 'honey', name: 'Honey', calories: 304, protein: 0.3, carbs: 82, fat: 0, unit: 'g' },
  { id: 'walnuts', name: 'Walnuts', calories: 654, protein: 15, carbs: 14, fat: 65, unit: 'g' },
  { id: 'asparagus', name: 'Asparagus', calories: 20, protein: 2.2, carbs: 3.9, fat: 0.1, unit: 'g' },
  { id: 'pita_bread', name: 'Pita Bread', calories: 275, protein: 9, carbs: 55, fat: 1.2, unit: 'g' },
];

const recipes = [];
const slugs = new Set();

const generateSlug = (title) => {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
};

for (let i = 1; i <= 2500; i++) {
  const cuisine = cuisines[i % cuisines.length];
  const goal = dietGoals[i % dietGoals.length];
  const title = `${cuisine} ${goal} Meal Idea ${i}`;
  let slug = generateSlug(title);
  
  if (slugs.has(slug)) slug += `-${i}`;
  slugs.add(slug);

  const recipeIngredients = [];
  const numIngs = 3 + (i % 7);
  for (let j = 0; j < numIngs; j++) {
    const ingIdx = (i * j + j) % commonIngredients.length;
    const ing = commonIngredients[ingIdx];
    recipeIngredients.push({ id: ing.id, amount: 40 + (j * 15) + (i % 50), unit: ing.unit });
  }

  let totalCals = 0;
  recipeIngredients.forEach(ri => {
    const dbIng = commonIngredients.find(ci => ci.id === ri.id);
    if (dbIng) totalCals += (ri.amount / 100) * dbIng.calories;
  });

  recipes.push({
    id: `rec-${i}`,
    slug,
    title,
    cuisine,
    ingredients: recipeIngredients,
    instructions: [
      `Step 1: Gather your ${recipeIngredients.length} ingredients.`,
      `Step 2: Prepare the ${recipeIngredients[0].id.replace('_', ' ')}.`,
      `Step 3: Combine and cook till perfection.`,
      `Step 4: Serve and enjoy your ${cuisine} creation.`
    ],
    baseCalories: Math.round(totalCals),
    tags: [goal, cuisine, 'Healthy'],
    variations: [`Swap ingredients for a personalized touch.`]
  });
}

const dataDir = path.join(process.cwd(), 'src', 'data');
const publicDir = path.join(process.cwd(), 'public');

if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });

fs.writeFileSync(path.join(dataDir, 'ingredientDatabase.json'), JSON.stringify(commonIngredients, null, 2));
fs.writeFileSync(path.join(dataDir, 'recipes.json'), JSON.stringify(recipes, null, 2));

const today = new Date().toISOString().split('T')[0];
const createSitemapEntry = (url, priority = '0.5', changefreq = 'weekly') => {
  return `  <url>
    <loc>${url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
};

const sitemapEntries = [
  createSitemapEntry('https://food.freetoolshubs.com/', '1.0', 'daily'),
  createSitemapEntry('https://food.freetoolshubs.com/what-to-cook-today', '0.9', 'daily'),
  createSitemapEntry('https://food.freetoolshubs.com/meal-planner', '0.9', 'daily'),
  createSitemapEntry('https://food.freetoolshubs.com/calorie-estimator', '0.9', 'daily')
];

recipes.forEach(r => {
  sitemapEntries.push(createSitemapEntry(`https://food.freetoolshubs.com/recipe/${r.slug}`, '0.7', 'weekly'));
});

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries.join('\n')}
</urlset>`;

fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);

const robots = `User-agent: *
Allow: /

Sitemap: https://food.freetoolshubs.com/sitemap.xml`;
fs.writeFileSync(path.join(publicDir, 'robots.txt'), robots);

console.log(`Successfully generated 2,500 recipes, sitemap.xml, and robots.txt`);
