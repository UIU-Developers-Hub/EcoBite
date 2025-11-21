import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Plus, AlertTriangle, ChefHat, Calendar, Trash2, Brain, Camera, TrendingUp, MessageCircle, BarChart3, Globe, Upload, X, Send, Sparkles, ShoppingCart, Target, Zap, Leaf, DollarSign, Clock, CheckCircle2, Building2, Users, Store, Gift, ChefHat as ChefIcon, TrendingDown, Activity, PieChart, MapPin, Bell, FileText, Download } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from './ui/chart';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface SmartKitchenProps {
  user: any;
  onBack: () => void;
}

export function SmartKitchen({ user, onBack }: SmartKitchenProps) {
  const [activeTab, setActiveTab] = useState<'pantry' | 'recipes' | 'planner' | 'ai-insights' | 'optimizer' | 'chatbot' | 'sdg' | 'inventory'>('pantry');
  const [showOCRDialog, setShowOCRDialog] = useState(false);
  const [ocrImage, setOcrImage] = useState<string | null>(null);
  const [ocrResults, setOcrResults] = useState<Array<{name: string, quantity: string, expiry?: string, confidence: number}>>([]);
  const [chatMessages, setChatMessages] = useState<Array<{role: 'user' | 'assistant', content: string}>>([]);
  const [chatInput, setChatInput] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<'en' | 'es' | 'fr' | 'bn'>('en');
  const [inventoryView, setInventoryView] = useState<'household' | 'business' | 'government'>('household');
  const [userType, setUserType] = useState<'household' | 'business' | 'restaurant'>('household');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const pantryItems = [
    { id: 1, name: 'Milk', expiry: 2, emoji: '🥛', urgent: true, category: 'dairy', quantity: '1L', purchaseDate: '2024-01-10', riskScore: 85, price: 3.50, expiryDate: '2024-01-13', warningLevel: '1 week' },
    { id: 2, name: 'Eggs', expiry: 3, emoji: '🥚', urgent: true, category: 'protein', quantity: '12', purchaseDate: '2024-01-10', riskScore: 75, price: 4.00, expiryDate: '2024-01-14', warningLevel: '1 week' },
    { id: 3, name: 'Tomatoes', expiry: 4, emoji: '🍅', urgent: false, category: 'vegetables', quantity: '500g', purchaseDate: '2024-01-09', riskScore: 60, price: 2.50, expiryDate: '2024-01-15', warningLevel: '1 week' },
    { id: 4, name: 'Bread', expiry: 1, emoji: '🍞', urgent: true, category: 'grains', quantity: '1 loaf', purchaseDate: '2024-01-11', riskScore: 90, price: 2.00, expiryDate: '2024-01-12', warningLevel: '1 week' },
    { id: 5, name: 'Cheese', expiry: 7, emoji: '🧀', urgent: false, category: 'dairy', quantity: '200g', purchaseDate: '2024-01-08', riskScore: 40, price: 5.00, expiryDate: '2024-01-18', warningLevel: '3 weeks' },
    { id: 6, name: 'Carrots', expiry: 5, emoji: '🥕', urgent: false, category: 'vegetables', quantity: '1kg', purchaseDate: '2024-01-09', riskScore: 50, price: 1.50, expiryDate: '2024-01-16', warningLevel: '1 week' },
    { id: 7, name: 'Bananas', expiry: 3, emoji: '🍌', urgent: true, category: 'fruits', quantity: '6', purchaseDate: '2024-01-10', riskScore: 80, price: 2.00, expiryDate: '2024-01-14', warningLevel: '1 week' },
    { id: 8, name: 'Chicken', expiry: 2, emoji: '🍗', urgent: true, category: 'protein', quantity: '500g', purchaseDate: '2024-01-11', riskScore: 88, price: 6.00, expiryDate: '2024-01-13', warningLevel: '1 week' },
    { id: 9, name: 'Rice', expiry: 90, emoji: '🍚', urgent: false, category: 'grains', quantity: '5kg', purchaseDate: '2024-01-01', riskScore: 10, price: 8.00, expiryDate: '2024-04-01', warningLevel: '3 months' },
    { id: 10, name: 'Pasta', expiry: 60, emoji: '🍝', urgent: false, category: 'grains', quantity: '1kg', purchaseDate: '2024-01-05', riskScore: 15, price: 3.00, expiryDate: '2024-03-05', warningLevel: '1 month' },
  ];

  // AI Consumption Pattern Data
  const consumptionPatterns = {
    weeklyTrends: [
      { day: 'Mon', fruits: 2, vegetables: 3, protein: 4, dairy: 2, grains: 3 },
      { day: 'Tue', fruits: 1, vegetables: 4, protein: 3, dairy: 2, grains: 4 },
      { day: 'Wed', fruits: 3, vegetables: 2, protein: 5, dairy: 3, grains: 3 },
      { day: 'Thu', fruits: 2, vegetables: 3, protein: 4, dairy: 2, grains: 3 },
      { day: 'Fri', fruits: 4, vegetables: 2, protein: 3, dairy: 2, grains: 2 },
      { day: 'Sat', fruits: 5, vegetables: 3, protein: 4, dairy: 3, grains: 3 },
      { day: 'Sun', fruits: 4, vegetables: 4, protein: 5, dairy: 3, grains: 4 },
    ],
    categoryBalance: {
      fruits: { consumed: 21, recommended: 14, status: 'over', percentage: 150 },
      vegetables: { consumed: 21, recommended: 35, status: 'under', percentage: 60 },
      protein: { consumed: 28, recommended: 28, status: 'balanced', percentage: 100 },
      dairy: { consumed: 17, recommended: 21, status: 'under', percentage: 81 },
      grains: { consumed: 22, recommended: 28, status: 'under', percentage: 79 },
    },
    wastePredictions: [
      { item: 'Bananas', daysUntilWaste: 2, confidence: 0.85, reason: 'High consumption on weekends, low mid-week', category: 'fruits' },
      { item: 'Tomatoes', daysUntilWaste: 4, confidence: 0.70, reason: 'Low vegetable intake pattern', category: 'vegetables' },
      { item: 'Milk', daysUntilWaste: 1, confidence: 0.95, reason: 'Expiring soon, low dairy consumption', category: 'dairy' },
      { item: 'Bread', daysUntilWaste: 1, confidence: 0.90, reason: 'Expiring today, low consumption rate', category: 'grains' },
    ],
    heatmapData: [
      { time: '6-9 AM', Mon: 2, Tue: 1, Wed: 3, Thu: 2, Fri: 4, Sat: 5, Sun: 4 },
      { time: '12-2 PM', Mon: 3, Tue: 4, Wed: 2, Thu: 3, Fri: 2, Sat: 3, Sun: 4 },
      { time: '6-9 PM', Mon: 4, Tue: 3, Wed: 5, Thu: 4, Fri: 3, Sat: 4, Sun: 5 },
    ],
    dailyTrends: {
      restaurants: [
        { date: '2024-01-08', breakfast: 120, lunch: 350, dinner: 280, total: 750 },
        { date: '2024-01-09', breakfast: 135, lunch: 380, dinner: 295, total: 810 },
        { date: '2024-01-10', breakfast: 140, lunch: 400, dinner: 310, total: 850 },
        { date: '2024-01-11', breakfast: 125, lunch: 370, dinner: 300, total: 795 },
        { date: '2024-01-12', breakfast: 150, lunch: 420, dinner: 350, total: 920 },
        { date: '2024-01-13', breakfast: 160, lunch: 450, dinner: 380, total: 990 },
        { date: '2024-01-14', breakfast: 145, lunch: 410, dinner: 340, total: 895 },
      ],
      groceries: [
        { item: 'Rice', sales: 450, trend: 'up' },
        { item: 'Vegetables', sales: 380, trend: 'up' },
        { item: 'Fruits', sales: 320, trend: 'stable' },
        { item: 'Dairy', sales: 290, trend: 'down' },
        { item: 'Protein', sales: 410, trend: 'up' },
      ],
    },
    imbalancedPatterns: [
      { category: 'Vegetables', issue: 'Low intake', current: 21, target: 35, impact: 'Nutrient deficiency risk' },
      { category: 'Fruits', issue: 'Over-consumption on weekends', current: 21, target: 14, impact: 'Potential waste' },
    ],
  };

  // AI Meal Optimization Data
  const mealOptimization = {
    weeklyPlan: [
      { day: 'Monday', breakfast: 'Oatmeal with Banana', lunch: 'Chicken Salad', dinner: 'Pasta Primavera', cost: 8.50, nutritionScore: 85 },
      { day: 'Tuesday', breakfast: 'Scrambled Eggs', lunch: 'Tomato Soup', dinner: 'Grilled Chicken', cost: 9.00, nutritionScore: 88 },
      { day: 'Wednesday', breakfast: 'Yogurt Parfait', lunch: 'Veggie Wrap', dinner: 'Stir Fry', cost: 7.50, nutritionScore: 82 },
      { day: 'Thursday', breakfast: 'Toast with Cheese', lunch: 'Caesar Salad', dinner: 'Fish & Vegetables', cost: 10.00, nutritionScore: 90 },
      { day: 'Friday', breakfast: 'Smoothie Bowl', lunch: 'Quinoa Bowl', dinner: 'Pizza Night', cost: 8.00, nutritionScore: 75 },
      { day: 'Saturday', breakfast: 'Pancakes', lunch: 'BBQ Chicken', dinner: 'Pasta', cost: 9.50, nutritionScore: 80 },
      { day: 'Sunday', breakfast: 'French Toast', lunch: 'Roast Dinner', dinner: 'Leftovers', cost: 7.00, nutritionScore: 78 },
    ],
    shoppingList: [
      { item: 'Oats', quantity: '500g', estimatedCost: 2.50, priority: 'high' },
      { item: 'Chicken Breast', quantity: '1kg', estimatedCost: 8.00, priority: 'high' },
      { item: 'Mixed Vegetables', quantity: '1kg', estimatedCost: 3.00, priority: 'medium' },
      { item: 'Yogurt', quantity: '500g', estimatedCost: 3.50, priority: 'medium' },
      { item: 'Whole Grain Bread', quantity: '1 loaf', estimatedCost: 2.50, priority: 'low' },
    ],
    totalCost: 58.50,
    budget: 60.00,
    savings: 1.50,
    inventoryUsage: 75,
  };

  // Waste Estimation Data
  const wasteEstimation = {
    weekly: { grams: 450, cost: 12.50, items: 3 },
    monthly: { grams: 1800, cost: 50.00, items: 12 },
    communityAverage: { grams: 2500, cost: 70.00 },
    projection: { nextWeek: { grams: 380, cost: 10.50 }, nextMonth: { grams: 1520, cost: 42.00 } },
  };

  // SDG Impact Score
  const sdgScore = {
    overall: 72,
    wasteReduction: 85,
    nutritionImprovement: 68,
    budgetOptimization: 75,
    communityImpact: 60,
    weeklyChange: +5,
    insights: [
      { area: 'Vegetable Intake', current: 21, target: 35, improvement: 'Increase by 14 servings/week', impact: '+10 points' },
      { area: 'Food Waste', current: 450, target: 300, improvement: 'Reduce by 150g/week', impact: '+8 points' },
      { area: 'Budget Efficiency', current: 95, target: 100, improvement: 'Optimize meal planning', impact: '+5 points' },
    ],
  };

  // Nutrient Gap Analysis
  const nutrientGaps = [
    { nutrient: 'Vitamin C', current: 60, recommended: 90, status: 'deficient', suggestion: 'Add citrus fruits, bell peppers' },
    { nutrient: 'Fiber', current: 18, recommended: 25, status: 'low', suggestion: 'Increase whole grains, legumes' },
    { nutrient: 'Calcium', current: 800, recommended: 1000, status: 'low', suggestion: 'Add dairy, leafy greens' },
    { nutrient: 'Iron', current: 12, recommended: 18, status: 'low', suggestion: 'Include lean meats, spinach' },
  ];

  // Local Food Surplus
  const localSurplus = [
    { id: 1, name: 'Fresh Bread', location: '0.5 km away', quantity: '5 loaves', expires: 'Today', contact: 'Local Bakery', type: 'grains' },
    { id: 2, name: 'Mixed Vegetables', location: '1.2 km away', quantity: '10kg', expires: 'Tomorrow', contact: 'Farmers Market', type: 'vegetables' },
    { id: 3, name: 'Fruits', location: '0.8 km away', quantity: '15kg', expires: '2 days', contact: 'Community Garden', type: 'fruits' },
  ];

  const recipes = [
    { name: 'Veggie Omelette', time: '15 min', ingredients: 3, emoji: '🍳' },
    { name: 'Tomato Soup', time: '20 min', ingredients: 4, emoji: '🍲' },
    { name: 'Cheese Sandwich', time: '5 min', ingredients: 2, emoji: '🥪' },
    { name: 'Carrot Salad', time: '10 min', ingredients: 3, emoji: '🥗' },
  ];

  // Helper Functions
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setOcrImage(reader.result as string);
        setShowOCRDialog(true);
        // Simulate OCR processing
        setTimeout(() => {
          simulateOCR();
        }, 1000);
      };
      reader.readAsDataURL(file);
    }
  };

  const getExpirationWarning = (daysUntilExpiry: number): { level: string, color: string, icon: any } => {
    if (daysUntilExpiry <= 7) return { level: '1 week', color: 'bg-red-500', icon: AlertTriangle };
    if (daysUntilExpiry <= 21) return { level: '3 weeks', color: 'bg-orange-500', icon: Clock };
    if (daysUntilExpiry <= 30) return { level: '1 month', color: 'bg-yellow-500', icon: Bell };
    if (daysUntilExpiry <= 90) return { level: '3 months', color: 'bg-blue-500', icon: CheckCircle2 };
    return { level: 'safe', color: 'bg-green-500', icon: CheckCircle2 };
  };

  const simulateOCR = () => {
    // Mock OCR results - in real implementation, this would call Tesseract or Google Vision API
    const mockResults = [
      { name: 'Milk', quantity: '1L', expiry: '2024-01-15', confidence: 0.95 },
      { name: 'Bread', quantity: '1 loaf', expiry: '2024-01-13', confidence: 0.88 },
      { name: 'Eggs', quantity: '12', expiry: '2024-01-16', confidence: 0.92 },
    ];
    setOcrResults(mockResults);
    return mockResults;
  };

  const confirmOCRResults = (confirmedItems: typeof ocrResults) => {
    // Add confirmed items to pantry
    console.log('Adding items to pantry:', confirmedItems);
    setShowOCRDialog(false);
    setOcrResults([]);
    setOcrImage(null);
  };

  const handleChatSend = () => {
    if (!chatInput.trim()) return;
    const userMessage = { role: 'user' as const, content: chatInput };
    setChatMessages([...chatMessages, userMessage]);
    const currentInput = chatInput;
    setChatInput('');
    
    // Enhanced AI response with context awareness
    setTimeout(() => {
      const lowerInput = currentInput.toLowerCase();
      let response = '';
      
      // Enhanced responses with contextual memory
      if (lowerInput.includes('waste') || lowerInput.includes('waste reduction')) {
        response = 'To reduce food waste, try meal planning, using FIFO (First In First Out), and storing items properly. Based on your consumption patterns, I notice you have high fruit intake on weekends. Consider spreading it throughout the week. I can help you create a meal plan based on your pantry!';
      } else if (lowerInput.includes('nutrition') || lowerInput.includes('nutrient')) {
        response = 'For balanced nutrition, aim for 5 servings of vegetables, 2 servings of fruits, and adequate protein daily. Your current intake shows you need more vegetables (currently 21 vs recommended 35 servings/week). I can suggest recipes to boost your vegetable intake!';
      } else if (lowerInput.includes('budget') || lowerInput.includes('cost')) {
        response = 'I can optimize your meal plan to fit your budget while using items from your pantry. Your current weekly cost is $58.50, which is under your $60 budget. Would you like me to generate a more cost-effective weekly plan?';
      } else if (lowerInput.includes('leftover') || lowerInput.includes('left over')) {
        response = 'Great ways to transform leftovers: turn rice into fried rice, make soups from vegetables, create wraps from proteins, or blend into smoothies! Based on your pantry, you could make a delicious omelette with your expiring eggs and vegetables.';
      } else if (lowerInput.includes('share') || lowerInput.includes('donate') || lowerInput.includes('surplus')) {
        response = 'You can share surplus food through local community apps, food banks, or neighbors. I can help you find nearby sharing opportunities. I see you have items expiring soon - would you like to see donation options?';
      } else if (lowerInput.includes('environment') || lowerInput.includes('impact') || lowerInput.includes('climate')) {
        response = 'Food waste contributes to 8% of global greenhouse gas emissions. By reducing waste, you\'re helping combat climate change and save resources. Your current waste projection is 450g/week, which is below the community average of 2500g/week - great job!';
      } else if (lowerInput.includes('recipe') || lowerInput.includes('cook') || lowerInput.includes('meal')) {
        response = 'I can suggest recipes based on your pantry items! I notice you have items expiring soon: Milk (2 days), Bread (1 day), and Chicken (2 days). Would you like recipe suggestions using these items?';
      } else if (lowerInput.includes('expir') || lowerInput.includes('expiring') || lowerInput.includes('expiry')) {
        response = 'You have several items expiring soon. Items with high risk: Bread (1 day, 90% risk), Chicken (2 days, 88% risk), Milk (2 days, 85% risk). I recommend using these items first. Would you like recipe suggestions?';
      } else if (lowerInput.includes('pattern') || lowerInput.includes('trend') || lowerInput.includes('consumption')) {
        response = 'Your consumption patterns show: High fruit intake on weekends (5-6 servings), Low vegetable intake overall (21 vs 35 recommended), Balanced protein intake. I can help you optimize these patterns!';
      } else {
        response = 'I\'m NourishBot, your AI assistant for food waste reduction, nutrition balancing, budget meal planning, creative leftover ideas, local food sharing, and environmental impact guidance. How can I assist you today?';
      }
      
      setChatMessages(prev => [...prev, { role: 'assistant', content: response }]);
    }, 500);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const translations: Record<string, Record<string, string>> = {
    en: {
      pantry: 'Pantry',
      recipes: 'Recipes',
      planner: 'Planner',
      aiInsights: 'AI Insights',
      optimizer: 'Optimizer',
      chatbot: 'Chatbot',
      sdg: 'SDG Score',
      inventory: 'Inventory',
      sellNow: 'SELL NOW!',
      donate: 'DONATE',
      generateRecipe: 'GENERATE RECIPE',
      consumptionPatterns: 'Consumption Patterns',
      wastePrediction: 'Waste Prediction',
      mealOptimization: 'Meal Optimization',
      nutrientGaps: 'Nutrient Gaps',
      expirationWarnings: 'Expiration Warnings',
    },
    es: {
      pantry: 'Despensa',
      recipes: 'Recetas',
      planner: 'Planificador',
      aiInsights: 'Análisis IA',
      optimizer: 'Optimizador',
      chatbot: 'Chatbot',
      sdg: 'Puntuación ODS',
      inventory: 'Inventario',
      sellNow: '¡VENDER AHORA!',
      donate: 'DONAR',
      generateRecipe: 'GENERAR RECETA',
      consumptionPatterns: 'Patrones de Consumo',
      wastePrediction: 'Predicción de Desperdicio',
      mealOptimization: 'Optimización de Comidas',
      nutrientGaps: 'Brechas Nutricionales',
      expirationWarnings: 'Advertencias de Caducidad',
    },
    fr: {
      pantry: 'Garde-manger',
      recipes: 'Recettes',
      planner: 'Planificateur',
      aiInsights: 'Analyse IA',
      optimizer: 'Optimiseur',
      chatbot: 'Chatbot',
      sdg: 'Score ODD',
      inventory: 'Inventaire',
      sellNow: 'VENDRE MAINTENANT!',
      donate: 'DONNER',
      generateRecipe: 'GÉNÉRER RECETTE',
      consumptionPatterns: 'Modèles de Consommation',
      wastePrediction: 'Prédiction de Gaspillage',
      mealOptimization: 'Optimisation des Repas',
      nutrientGaps: 'Carences Nutritionnelles',
      expirationWarnings: 'Avertissements d\'Expiration',
    },
    bn: {
      pantry: 'প্যান্ট্রি',
      recipes: 'রেসিপি',
      planner: 'পরিকল্পক',
      aiInsights: 'এআই অন্তর্দৃষ্টি',
      optimizer: 'অপ্টিমাইজার',
      chatbot: 'চ্যাটবট',
      sdg: 'এসডিজি স্কোর',
      inventory: 'ইনভেন্টরি',
      sellNow: 'এখনই বিক্রি করুন!',
      donate: 'দান করুন',
      generateRecipe: 'রেসিপি তৈরি করুন',
      consumptionPatterns: 'খাওয়ার ধরণ',
      wastePrediction: 'বর্জ্য পূর্বাভাস',
      mealOptimization: 'খাবার অপ্টিমাইজেশন',
      nutrientGaps: 'পুষ্টির ঘাটতি',
      expirationWarnings: 'মেয়াদ শেষের সতর্কতা',
    },
  };

  return (
    <div className="min-h-screen pb-20" style={{ backgroundColor: '#C1E2BE' }}>
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-green-200 px-6 py-4">
        <div className="flex items-center gap-3">
          <Button
            onClick={onBack}
            className="bg-transparent hover:bg-green-100 text-green-800 p-2 rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl text-green-900">Smart Kitchen</h1>
        </div>
      </div>

          {/* Language Selector */}
      <div className="px-6 pt-2 flex justify-end">
        <div className="flex gap-1 bg-white/70 rounded-lg p-1">
          {(['en', 'es', 'fr', 'bn'] as const).map((lang) => (
            <button
              key={lang}
              onClick={() => setSelectedLanguage(lang)}
              className={`px-3 py-1 rounded text-xs font-medium transition-all ${
                selectedLanguage === lang
                  ? 'bg-green-600 text-white'
                  : 'text-green-700 hover:bg-green-50'
              }`}
            >
              {lang.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="px-6 pt-4">
        <div className="flex gap-1 bg-green-100/50 rounded-2xl p-1 overflow-x-auto">
          <button
            onClick={() => setActiveTab('pantry')}
            className={`flex-shrink-0 py-2 px-3 rounded-xl transition-all text-xs sm:text-sm ${
              activeTab === 'pantry'
                ? 'bg-white text-green-900 shadow-sm'
                : 'text-green-700'
            }`}
          >
            {translations[selectedLanguage].pantry}
          </button>
          <button
            onClick={() => setActiveTab('recipes')}
            className={`flex-shrink-0 py-2 px-3 rounded-xl transition-all text-xs sm:text-sm ${
              activeTab === 'recipes'
                ? 'bg-white text-green-900 shadow-sm'
                : 'text-green-700'
            }`}
          >
            {translations[selectedLanguage].recipes}
          </button>
          <button
            onClick={() => setActiveTab('planner')}
            className={`flex-shrink-0 py-2 px-3 rounded-xl transition-all text-xs sm:text-sm ${
              activeTab === 'planner'
                ? 'bg-white text-green-900 shadow-sm'
                : 'text-green-700'
            }`}
          >
            {translations[selectedLanguage].planner}
          </button>
          <button
            onClick={() => setActiveTab('ai-insights')}
            className={`flex-shrink-0 py-2 px-3 rounded-xl transition-all text-xs sm:text-sm ${
              activeTab === 'ai-insights'
                ? 'bg-white text-green-900 shadow-sm'
                : 'text-green-700'
            }`}
          >
            <Brain className="w-4 h-4 inline mr-1" />
            {translations[selectedLanguage].aiInsights}
          </button>
          <button
            onClick={() => setActiveTab('optimizer')}
            className={`flex-shrink-0 py-2 px-3 rounded-xl transition-all text-xs sm:text-sm ${
              activeTab === 'optimizer'
                ? 'bg-white text-green-900 shadow-sm'
                : 'text-green-700'
            }`}
          >
            <Zap className="w-4 h-4 inline mr-1" />
            {translations[selectedLanguage].optimizer}
          </button>
          <button
            onClick={() => setActiveTab('chatbot')}
            className={`flex-shrink-0 py-2 px-3 rounded-xl transition-all text-xs sm:text-sm ${
              activeTab === 'chatbot'
                ? 'bg-white text-green-900 shadow-sm'
                : 'text-green-700'
            }`}
          >
            <MessageCircle className="w-4 h-4 inline mr-1" />
            {translations[selectedLanguage].chatbot}
          </button>
          <button
            onClick={() => setActiveTab('sdg')}
            className={`flex-shrink-0 py-2 px-3 rounded-xl transition-all text-xs sm:text-sm ${
              activeTab === 'sdg'
                ? 'bg-white text-green-900 shadow-sm'
                : 'text-green-700'
            }`}
          >
            <Target className="w-4 h-4 inline mr-1" />
            {translations[selectedLanguage].sdg}
          </button>
          <button
            onClick={() => setActiveTab('inventory')}
            className={`flex-shrink-0 py-2 px-3 rounded-xl transition-all text-xs sm:text-sm ${
              activeTab === 'inventory'
                ? 'bg-white text-green-900 shadow-sm'
                : 'text-green-700'
            }`}
          >
            <Building2 className="w-4 h-4 inline mr-1" />
            {translations[selectedLanguage].inventory}
          </button>
        </div>
      </div>

      {/* Pantry Tab */}
      {activeTab === 'pantry' && (
        <div className="px-6 pt-6">
          {/* Cook It Now Alert */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-orange-100/80 to-red-100/80 backdrop-blur-sm rounded-2xl p-5 mb-4 shadow-md border border-orange-200"
          >
            <div className="flex items-center gap-3 mb-2">
              <AlertTriangle className="w-6 h-6 text-orange-600" />
              <h3 className="text-green-900">Cook It Now!</h3>
            </div>
            <p className="text-sm text-green-700 mb-3">3 items expiring in 2 days or less</p>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl w-full">
              See Recipes
            </Button>
          </motion.div>

          {/* Add Item Buttons */}
          <div className="flex gap-2 mb-4">
            <Button 
              onClick={() => fileInputRef.current?.click()}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white rounded-2xl py-5 flex items-center justify-center gap-2"
            >
              <Camera className="w-5 h-5" />
              Scan with OCR
            </Button>
            <Button className="flex-1 bg-green-500 hover:bg-green-600 text-white rounded-2xl py-5 flex items-center justify-center gap-2">
              <Plus className="w-5 h-5" />
              Add Manually
            </Button>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />

          {/* Pantry Items */}
          <h2 className="text-lg mb-3 text-green-900">Your Pantry ({pantryItems.length} items)</h2>
          <div className="space-y-3">
            {pantryItems.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * idx }}
                className={`rounded-2xl p-4 shadow-md ${
                  item.urgent
                    ? 'bg-orange-100/80 border border-orange-200'
                    : 'bg-white/70'
                } backdrop-blur-sm`}
              >
                <div className="flex items-center gap-3">
                  <div className="text-4xl">{item.emoji}</div>
                  <div className="flex-1">
                    <h3 className="text-green-900 mb-1">{item.name}</h3>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          item.urgent
                            ? 'bg-orange-200 text-orange-800'
                            : 'bg-green-100 text-green-700'
                        }`}
                      >
                        Expires in {item.expiry} days
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        item.warningLevel === '1 week' ? 'bg-red-200 text-red-800' :
                        item.warningLevel === '3 weeks' ? 'bg-orange-200 text-orange-800' :
                        item.warningLevel === '1 month' ? 'bg-yellow-200 text-yellow-800' :
                        item.warningLevel === '3 months' ? 'bg-blue-200 text-blue-800' :
                        'bg-green-200 text-green-800'
                      }`}>
                        {item.warningLevel}
                      </span>
                      <span className="text-xs px-2 py-1 rounded-full bg-red-100 text-red-800">
                        Risk: {item.riskScore}%
                      </span>
                      <span className="text-xs text-green-600">
                        ${item.price}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    {userType === 'household' && (
                      <>
                        <Button className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-full" title="Generate Recipe">
                          <ChefIcon className="w-4 h-4" />
                        </Button>
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full" title="Donate">
                          <Gift className="w-4 h-4" />
                        </Button>
                      </>
                    )}
                    {(userType === 'business' || userType === 'restaurant') && (
                      <Button className="bg-orange-600 hover:bg-orange-700 text-white p-2 rounded-full text-xs" title="Sell Now">
                        <DollarSign className="w-4 h-4" />
                      </Button>
                    )}
                    <Button className="bg-transparent hover:bg-red-100 text-red-600 p-2 rounded-full">
                      <Trash2 className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Expiration Warnings Summary */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 bg-white/70 backdrop-blur-sm rounded-2xl p-5 shadow-md mb-4"
          >
            <h3 className="text-green-900 mb-3 flex items-center gap-2">
              <Bell className="w-5 h-5" />
              {translations[selectedLanguage].expirationWarnings}
            </h3>
            <div className="space-y-2">
              {[
                { level: '1 week', count: pantryItems.filter(i => i.warningLevel === '1 week').length, color: 'bg-red-100 text-red-800' },
                { level: '3 weeks', count: pantryItems.filter(i => i.warningLevel === '3 weeks').length, color: 'bg-orange-100 text-orange-800' },
                { level: '1 month', count: pantryItems.filter(i => i.warningLevel === '1 month').length, color: 'bg-yellow-100 text-yellow-800' },
                { level: '3 months', count: pantryItems.filter(i => i.warningLevel === '3 months').length, color: 'bg-blue-100 text-blue-800' },
              ].filter(w => w.count > 0).map((warning, idx) => (
                <div key={idx} className="flex justify-between items-center bg-green-50 rounded-xl p-3">
                  <span className="text-sm font-medium text-green-900">{warning.level} warning</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${warning.color}`}>
                    {warning.count} items
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Waste Prevention Insights */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6 bg-gradient-to-br from-green-100/80 to-blue-100/80 backdrop-blur-sm rounded-2xl p-5 shadow-md"
          >
            <h3 className="text-green-900 mb-3">This Month</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/70 rounded-xl p-3 text-center">
                <div className="text-2xl text-green-900 mb-1">95%</div>
                <p className="text-xs text-green-700">Food Used</p>
              </div>
              <div className="bg-white/70 rounded-xl p-3 text-center">
                <div className="text-2xl text-green-900 mb-1">$45</div>
                <p className="text-xs text-green-700">Saved</p>
              </div>
            </div>
          </motion.div>

          {/* Local Food Surplus */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-gradient-to-r from-yellow-100/80 to-orange-100/80 backdrop-blur-sm rounded-2xl p-5 shadow-md"
          >
            <h3 className="text-green-900 mb-3 flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Local Food Surplus Nearby
            </h3>
            <div className="space-y-2">
              {localSurplus.map((surplus) => (
                <div key={surplus.id} className="bg-white/70 rounded-xl p-3">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-semibold text-green-900">{surplus.name}</h4>
                      <p className="text-xs text-green-700">{surplus.location} • {surplus.quantity}</p>
                    </div>
                    <span className="text-xs px-2 py-1 rounded-full bg-orange-200 text-orange-800">
                      {surplus.expires}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white text-xs py-1">
                      View Details
                    </Button>
                    <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs py-1">
                      Contact
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      )}

      {/* Recipes Tab */}
      {activeTab === 'recipes' && (
        <div className="px-6 pt-6">
          <h2 className="text-lg mb-3 text-green-900">Recipes from Your Pantry</h2>
          <p className="text-sm text-green-700 mb-4">Based on items expiring soon</p>

          <div className="space-y-3">
            {recipes.map((recipe, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * idx }}
                whileHover={{ scale: 1.02 }}
                className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 shadow-md cursor-pointer"
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className="text-5xl">{recipe.emoji}</div>
                  <div className="flex-1">
                    <h3 className="text-green-900 mb-1">{recipe.name}</h3>
                    <div className="flex items-center gap-3 text-xs text-green-600">
                      <span>⏱️ {recipe.time}</span>
                      <span>•</span>
                      <span>🥘 {recipe.ingredients} ingredients</span>
                    </div>
                  </div>
                </div>
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white rounded-xl">
                  View Recipe
                </Button>
              </motion.div>
            ))}
          </div>

          {/* Search More Recipes */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 bg-gradient-to-r from-purple-100/80 to-pink-100/80 backdrop-blur-sm rounded-2xl p-5 text-center shadow-md"
          >
            <ChefHat className="w-12 h-12 text-purple-600 mx-auto mb-3" />
            <h3 className="text-green-900 mb-2">Need More Ideas?</h3>
            <p className="text-sm text-green-700 mb-3">Search 1000+ recipes</p>
            <Button className="bg-purple-500 hover:bg-purple-600 text-white rounded-xl w-full">
              Browse All Recipes
            </Button>
          </motion.div>
        </div>
      )}

      {/* Planner Tab */}
      {activeTab === 'planner' && (
        <div className="px-6 pt-6">
          <h2 className="text-lg mb-3 text-green-900">Weekly Meal Planner</h2>
          <p className="text-sm text-green-700 mb-4">Plan ahead to reduce waste</p>

          {/* Days */}
          <div className="space-y-3">
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * idx }}
                className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 shadow-md"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-green-600" />
                    <h3 className="text-green-900">{day}</h3>
                  </div>
                  <Button className="bg-green-600 hover:bg-green-700 text-white rounded-lg px-3 py-1 text-sm">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                {idx === 0 ? (
                  <div className="space-y-2">
                    <div className="bg-green-50 rounded-xl p-2 text-sm text-green-800">
                      🍳 Breakfast: Veggie Omelette
                    </div>
                    <div className="bg-green-50 rounded-xl p-2 text-sm text-green-800">
                      🍝 Lunch: Pasta with Vegetables
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-green-600">No meals planned</p>
                )}
              </motion.div>
            ))}
          </div>

          {/* Shopping List */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 bg-gradient-to-r from-blue-100/80 to-cyan-100/80 backdrop-blur-sm rounded-2xl p-5 shadow-md"
          >
            <h3 className="text-green-900 mb-3">Shopping List</h3>
            <p className="text-sm text-green-700 mb-3">Based on your meal plan</p>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl w-full">
              Generate List
            </Button>
          </motion.div>
        </div>
      )}

      {/* AI Insights Tab - Dedicated AI Analysis Page */}
      {activeTab === 'ai-insights' && (
        <div className="px-6 pt-6 pb-20">
          <h2 className="text-2xl font-bold mb-4 text-green-900">{translations[selectedLanguage].aiInsights}</h2>
          
          {/* Weekly Trends Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 shadow-md mb-4"
          >
            <h3 className="text-lg font-semibold mb-4 text-green-900">{translations[selectedLanguage].consumptionPatterns}</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={consumptionPatterns.weeklyTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="fruits" fill="#f59e0b" />
                  <Bar dataKey="vegetables" fill="#10b981" />
                  <Bar dataKey="protein" fill="#ef4444" />
                  <Bar dataKey="dairy" fill="#3b82f6" />
                  <Bar dataKey="grains" fill="#8b5cf6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Category Balance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 shadow-md mb-4"
          >
            <h3 className="text-lg font-semibold mb-4 text-green-900">Category Balance Analysis</h3>
            <div className="space-y-3">
              {Object.entries(consumptionPatterns.categoryBalance).map(([category, data]) => (
                <div key={category} className="bg-green-50 rounded-xl p-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-green-900 capitalize">{category}</span>
                    <span className={`text-sm px-2 py-1 rounded-full ${
                      data.status === 'over' ? 'bg-red-200 text-red-800' :
                      data.status === 'under' ? 'bg-orange-200 text-orange-800' :
                      'bg-green-200 text-green-800'
                    }`}>
                      {data.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          data.status === 'over' ? 'bg-red-500' :
                          data.status === 'under' ? 'bg-orange-500' :
                          'bg-green-500'
                        }`}
                        style={{ width: `${Math.min(data.percentage, 150)}%` }}
                      />
                    </div>
                    <span className="text-sm text-green-700">{data.consumed}/{data.recommended}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Waste Predictions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 shadow-md mb-4"
          >
            <h3 className="text-lg font-semibold mb-4 text-green-900">{translations[selectedLanguage].wastePrediction}</h3>
            <div className="space-y-3">
              {consumptionPatterns.wastePredictions.map((prediction, idx) => (
                <div key={idx} className="bg-orange-50 border border-orange-200 rounded-xl p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-semibold text-green-900">{prediction.item}</h4>
                      <p className="text-sm text-green-700">{prediction.reason}</p>
                    </div>
                    <span className="text-xs px-2 py-1 rounded-full bg-red-200 text-red-800">
                      {prediction.daysUntilWaste} days
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-red-500 h-2 rounded-full"
                        style={{ width: `${prediction.confidence * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-green-700">{(prediction.confidence * 100).toFixed(0)}% confidence</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Heatmap Visualization */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 shadow-md mb-4"
          >
            <h3 className="text-lg font-semibold mb-4 text-green-900">Consumption Heatmap</h3>
            <div className="space-y-2">
              {consumptionPatterns.heatmapData.map((row, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="w-20 text-sm text-green-700">{row.time}</span>
                  <div className="flex-1 flex gap-1">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => {
                      const value = row[day as keyof typeof row] as number;
                      const intensity = Math.min(value / 5, 1);
                      return (
                        <div
                          key={day}
                          className="flex-1 h-8 rounded"
                          style={{
                            backgroundColor: `rgba(16, 185, 129, ${intensity})`,
                          }}
                          title={`${day}: ${value}`}
                        />
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-end mt-2">
              <div className="flex items-center gap-2 text-xs text-green-700">
                <span>Low</span>
                <div className="flex gap-1">
                  {[0.2, 0.4, 0.6, 0.8, 1].map((intensity) => (
                    <div
                      key={intensity}
                      className="w-4 h-4 rounded"
                      style={{
                        backgroundColor: `rgba(16, 185, 129, ${intensity})`,
                      }}
                    />
                  ))}
                </div>
                <span>High</span>
              </div>
            </div>
          </motion.div>

          {/* Imbalanced Patterns */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border border-red-200 rounded-2xl p-5 shadow-md mb-4"
          >
            <h3 className="text-lg font-semibold mb-4 text-red-900 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Imbalanced Patterns Detected
            </h3>
            <div className="space-y-3">
              {consumptionPatterns.imbalancedPatterns.map((pattern, idx) => (
                <div key={idx} className="bg-white rounded-xl p-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-green-900">{pattern.category}</span>
                    <span className="text-sm text-red-600">{pattern.issue}</span>
                  </div>
                  <p className="text-sm text-green-700 mb-2">{pattern.impact}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-green-600">Current: {pattern.current}</span>
                    <span className="text-xs text-green-600">→</span>
                    <span className="text-xs text-green-600">Target: {pattern.target}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Nutrient Gap Prediction */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 shadow-md mb-4"
          >
            <h3 className="text-lg font-semibold mb-4 text-green-900 flex items-center gap-2">
              <Leaf className="w-5 h-5" />
              {translations[selectedLanguage].nutrientGaps}
            </h3>
            <div className="space-y-3">
              {nutrientGaps.map((gap, idx) => (
                <div key={idx} className={`rounded-xl p-4 ${
                  gap.status === 'deficient' ? 'bg-red-50 border border-red-200' :
                  gap.status === 'low' ? 'bg-orange-50 border border-orange-200' :
                  'bg-green-50 border border-green-200'
                }`}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-semibold text-green-900">{gap.nutrient}</h4>
                      <p className="text-sm text-green-700 mt-1">{gap.suggestion}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      gap.status === 'deficient' ? 'bg-red-200 text-red-800' :
                      gap.status === 'low' ? 'bg-orange-200 text-orange-800' :
                      'bg-green-200 text-green-800'
                    }`}>
                      {gap.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          gap.status === 'deficient' ? 'bg-red-500' :
                          gap.status === 'low' ? 'bg-orange-500' :
                          'bg-green-500'
                        }`}
                        style={{ width: `${(gap.current / gap.recommended) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-green-700">{gap.current}/{gap.recommended}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Waste Estimation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 shadow-md mb-4"
          >
            <h3 className="text-lg font-semibold mb-4 text-green-900">Waste Estimation & Projections</h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-red-50 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-red-900 mb-1">{wasteEstimation.weekly.grams}g</div>
                <p className="text-xs text-red-700">Weekly Waste</p>
                <p className="text-xs text-red-600 mt-1">${wasteEstimation.weekly.cost}</p>
              </div>
              <div className="bg-orange-50 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-orange-900 mb-1">{wasteEstimation.monthly.grams}g</div>
                <p className="text-xs text-orange-700">Monthly Waste</p>
                <p className="text-xs text-orange-600 mt-1">${wasteEstimation.monthly.cost}</p>
              </div>
            </div>
            <div className="bg-green-50 rounded-xl p-4 mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-green-900">Community Average</span>
                <span className="text-sm text-green-700">{wasteEstimation.communityAverage.grams}g (${wasteEstimation.communityAverage.cost})</span>
              </div>
              <div className="text-xs text-green-600">
                You're {((1 - wasteEstimation.weekly.grams / wasteEstimation.communityAverage.grams) * 100).toFixed(0)}% below average - Great job!
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-green-900">Projections</h4>
              <div className="flex justify-between text-sm">
                <span className="text-green-700">Next Week:</span>
                <span className="text-green-900 font-semibold">{wasteEstimation.projection.nextWeek.grams}g (${wasteEstimation.projection.nextWeek.cost})</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-green-700">Next Month:</span>
                <span className="text-green-900 font-semibold">{wasteEstimation.projection.nextMonth.grams}g (${wasteEstimation.projection.nextMonth.cost})</span>
              </div>
            </div>
          </motion.div>

          {/* Export JSON Data */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-gradient-to-r from-purple-100/80 to-pink-100/80 backdrop-blur-sm rounded-2xl p-5 shadow-md"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-green-900 mb-1">Export Data Insights</h3>
                <p className="text-sm text-green-700">Download JSON format for analysis</p>
              </div>
              <Button
                onClick={() => {
                  const dataStr = JSON.stringify({
                    consumptionPatterns,
                    wasteEstimation,
                    nutrientGaps,
                    sdgScore,
                  }, null, 2);
                  const dataBlob = new Blob([dataStr], { type: 'application/json' });
                  const url = URL.createObjectURL(dataBlob);
                  const link = document.createElement('a');
                  link.href = url;
                  link.download = 'ai-insights-data.json';
                  link.click();
                }}
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                <Download className="w-4 h-4 mr-2" />
                Export JSON
              </Button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Meal Optimizer Tab */}
      {activeTab === 'optimizer' && (
        <div className="px-6 pt-6 pb-20">
          <h2 className="text-2xl font-bold mb-4 text-green-900">{translations[selectedLanguage].mealOptimization}</h2>
          
          {/* Budget Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-blue-100/80 to-cyan-100/80 backdrop-blur-sm rounded-2xl p-5 shadow-md mb-4"
          >
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-900">${mealOptimization.totalCost.toFixed(2)}</div>
                <p className="text-xs text-green-700">Total Cost</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-900">${mealOptimization.budget.toFixed(2)}</div>
                <p className="text-xs text-green-700">Budget</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">${mealOptimization.savings.toFixed(2)}</div>
                <p className="text-xs text-green-700">Saved</p>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-green-700">Inventory Usage</span>
                <span className="text-green-900 font-semibold">{mealOptimization.inventoryUsage}%</span>
              </div>
              <div className="bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: `${mealOptimization.inventoryUsage}%` }}
                />
              </div>
            </div>
          </motion.div>

          {/* Weekly Meal Plan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 shadow-md mb-4"
          >
            <h3 className="text-lg font-semibold mb-4 text-green-900">Optimized Weekly Meal Plan</h3>
            <div className="space-y-3">
              {mealOptimization.weeklyPlan.map((day, idx) => (
                <div key={idx} className="bg-green-50 rounded-xl p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-green-900">{day.day}</h4>
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2 py-1 rounded-full bg-green-200 text-green-800">
                        ${day.cost.toFixed(2)}
                      </span>
                      <span className="text-xs px-2 py-1 rounded-full bg-blue-200 text-blue-800">
                        {day.nutritionScore}/100
                      </span>
                    </div>
                  </div>
                  <div className="space-y-1 text-sm text-green-800">
                    <div>🍳 {day.breakfast}</div>
                    <div>🍽️ {day.lunch}</div>
                    <div>🍲 {day.dinner}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Shopping List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 shadow-md mb-4"
          >
            <h3 className="text-lg font-semibold mb-4 text-green-900 flex items-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              Shopping List
            </h3>
            <div className="space-y-2">
              {mealOptimization.shoppingList.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center bg-green-50 rounded-xl p-3">
                  <div>
                    <span className="font-medium text-green-900">{item.item}</span>
                    <span className="text-sm text-green-700 ml-2">{item.quantity}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      item.priority === 'high' ? 'bg-red-200 text-red-800' :
                      item.priority === 'medium' ? 'bg-yellow-200 text-yellow-800' :
                      'bg-green-200 text-green-800'
                    }`}>
                      {item.priority}
                    </span>
                    <span className="text-sm font-semibold text-green-900">${item.estimatedCost.toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-green-200">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-green-900">Total Estimated Cost</span>
                <span className="text-xl font-bold text-green-900">
                  ${mealOptimization.shoppingList.reduce((sum, item) => sum + item.estimatedCost, 0).toFixed(2)}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Nutrition Requirements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 shadow-md"
          >
            <h3 className="text-lg font-semibold mb-4 text-green-900">Nutrition Requirements Met</h3>
            <div className="space-y-2">
              {['Protein', 'Carbs', 'Fats', 'Fiber', 'Vitamins'].map((nutrient) => (
                <div key={nutrient} className="flex items-center gap-3">
                  <span className="w-24 text-sm text-green-700">{nutrient}</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${75 + Math.random() * 20}%` }}
                    />
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      )}

      {/* Chatbot Tab - NourishBot */}
      {activeTab === 'chatbot' && (
        <div className="px-6 pt-6 pb-20 flex flex-col h-[calc(100vh-200px)]">
          <div className="bg-gradient-to-r from-purple-100/80 to-pink-100/80 backdrop-blur-sm rounded-2xl p-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-green-900">NourishBot</h3>
                <p className="text-sm text-green-700">Your AI assistant for food waste, nutrition, and meal planning</p>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto space-y-4 mb-4">
            {chatMessages.length === 0 && (
              <div className="text-center py-8">
                <MessageCircle className="w-16 h-16 text-green-300 mx-auto mb-4" />
                <p className="text-green-700 mb-2">Ask me about:</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {['waste reduction', 'nutrition', 'budget planning', 'leftovers', 'sharing', 'environment'].map((topic) => (
                    <button
                      key={topic}
                      onClick={() => setChatInput(topic)}
                      className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs hover:bg-green-200"
                    >
                      {topic}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {chatMessages.map((msg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl p-4 ${
                    msg.role === 'user'
                      ? 'bg-green-600 text-white'
                      : 'bg-white/70 text-green-900'
                  }`}
                >
                  {msg.content}
                </div>
              </motion.div>
            ))}
            <div ref={chatEndRef} />
          </div>

          <div className="flex gap-2">
            <Input
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleChatSend()}
              placeholder="Ask about food waste, nutrition, meal planning..."
              className="flex-1 rounded-2xl"
            />
            <Button
              onClick={handleChatSend}
              className="bg-green-600 hover:bg-green-700 text-white rounded-2xl px-6"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
      )}

      {/* SDG Score Tab */}
      {activeTab === 'sdg' && (
        <div className="px-6 pt-6 pb-20">
          <h2 className="text-2xl font-bold mb-4 text-green-900">SDG Impact Score</h2>
          
          {/* Overall Score */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-br from-green-100/80 to-blue-100/80 backdrop-blur-sm rounded-2xl p-8 shadow-md mb-4 text-center"
          >
            <div className="text-6xl font-bold text-green-900 mb-2">{sdgScore.overall}</div>
            <div className="text-lg text-green-700 mb-4">Overall SDG Score</div>
            <div className="flex items-center justify-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <span className="text-green-700">+{sdgScore.weeklyChange} points this week</span>
            </div>
          </motion.div>

          {/* Category Scores */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 shadow-md mb-4"
          >
            <h3 className="text-lg font-semibold mb-4 text-green-900">Category Breakdown</h3>
            <div className="space-y-4">
              {[
                { label: 'Waste Reduction', score: sdgScore.wasteReduction, color: 'bg-green-500' },
                { label: 'Nutrition Improvement', score: sdgScore.nutritionImprovement, color: 'bg-blue-500' },
                { label: 'Budget Optimization', score: sdgScore.budgetOptimization, color: 'bg-purple-500' },
                { label: 'Community Impact', score: sdgScore.communityImpact, color: 'bg-orange-500' },
              ].map((category) => (
                <div key={category.label}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-green-900">{category.label}</span>
                    <span className="text-sm font-semibold text-green-700">{category.score}/100</span>
                  </div>
                  <div className="bg-gray-200 rounded-full h-3">
                    <div
                      className={`${category.color} h-3 rounded-full transition-all`}
                      style={{ width: `${category.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Actionable Insights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 shadow-md mb-4"
          >
            <h3 className="text-lg font-semibold mb-4 text-green-900 flex items-center gap-2">
              <Target className="w-5 h-5" />
              Actionable Next Steps
            </h3>
            <div className="space-y-3">
              {sdgScore.insights.map((insight, idx) => (
                <div key={idx} className="bg-green-50 rounded-xl p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-green-900">{insight.area}</h4>
                    <span className="text-xs px-2 py-1 rounded-full bg-green-200 text-green-800">
                      {insight.impact}
                    </span>
                  </div>
                  <p className="text-sm text-green-700 mb-2">{insight.improvement}</p>
                  <div className="flex items-center gap-2 text-xs text-green-600">
                    <span>Current: {insight.current}</span>
                    <span>→</span>
                    <span>Target: {insight.target}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Weekly Progress */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-gradient-to-r from-blue-100/80 to-cyan-100/80 backdrop-blur-sm rounded-2xl p-5 shadow-md"
          >
            <h3 className="text-lg font-semibold mb-4 text-green-900">Weekly Progress</h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={[
                  { week: 'Week 1', score: 65 },
                  { week: 'Week 2', score: 68 },
                  { week: 'Week 3', score: 70 },
                  { week: 'Week 4', score: 72 },
                ]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="score" stroke="#10b981" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
      )}

      {/* Inventory Tab - For Government, Businesses, Restaurants */}
      {activeTab === 'inventory' && (
        <div className="px-6 pt-6 pb-20">
          <h2 className="text-2xl font-bold mb-4 text-green-900">{translations[selectedLanguage].inventory}</h2>
          
          {/* View Selector */}
          <div className="flex gap-2 mb-4 bg-green-100/50 rounded-xl p-1">
            {(['household', 'business', 'government'] as const).map((view) => (
              <button
                key={view}
                onClick={() => setInventoryView(view)}
                className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                  inventoryView === view
                    ? 'bg-white text-green-900 shadow-sm'
                    : 'text-green-700'
                }`}
              >
                {view === 'household' && <Users className="w-4 h-4 inline mr-1" />}
                {view === 'business' && <Store className="w-4 h-4 inline mr-1" />}
                {view === 'government' && <Building2 className="w-4 h-4 inline mr-1" />}
                {view.charAt(0).toUpperCase() + view.slice(1)}
              </button>
            ))}
          </div>

          {/* Consumption Trends */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 shadow-md mb-4"
          >
            <h3 className="text-lg font-semibold mb-4 text-green-900">Daily Consumption Trends</h3>
            {inventoryView === 'business' && (
              <div className="h-64 mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={consumptionPatterns.dailyTrends.restaurants}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="breakfast" stroke="#f59e0b" name="Breakfast" />
                    <Line type="monotone" dataKey="lunch" stroke="#10b981" name="Lunch" />
                    <Line type="monotone" dataKey="dinner" stroke="#ef4444" name="Dinner" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
            {inventoryView === 'government' && (
              <div className="space-y-3">
                {consumptionPatterns.dailyTrends.groceries.map((item, idx) => (
                  <div key={idx} className="bg-green-50 rounded-xl p-3">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-green-900">{item.item}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-green-700">Sales: {item.sales} units</span>
                        {item.trend === 'up' && <TrendingUp className="w-4 h-4 text-green-600" />}
                        {item.trend === 'down' && <TrendingDown className="w-4 h-4 text-red-600" />}
                        {item.trend === 'stable' && <Activity className="w-4 h-4 text-gray-600" />}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Inventory Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 shadow-md"
          >
            <h3 className="text-lg font-semibold mb-4 text-green-900">Inventory Summary</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-green-50 rounded-xl p-4 text-center">
                <div className="text-3xl font-bold text-green-900 mb-1">
                  {inventoryView === 'government' ? '1.2M' : inventoryView === 'business' ? '5.4K' : '45'}
                </div>
                <p className="text-sm text-green-700">Total Items</p>
              </div>
              <div className="bg-blue-50 rounded-xl p-4 text-center">
                <div className="text-3xl font-bold text-blue-900 mb-1">
                  {inventoryView === 'government' ? '92%' : inventoryView === 'business' ? '87%' : '95%'}
                </div>
                <p className="text-sm text-blue-700">Utilization</p>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* OCR Dialog */}
      <Dialog open={showOCRDialog} onOpenChange={setShowOCRDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>OCR Food Recognition</DialogTitle>
            <DialogDescription>
              Review and confirm the extracted items from your image
            </DialogDescription>
          </DialogHeader>
          {ocrImage && (
            <div className="mb-4">
              <img src={ocrImage} alt="Uploaded" className="w-full rounded-lg" />
            </div>
          )}
          {ocrResults.length > 0 && (
            <div className="space-y-2 mb-4">
              {ocrResults.map((result, idx) => (
                <div key={idx} className="bg-green-50 rounded-lg p-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-green-900">{result.name}</p>
                      <p className="text-sm text-green-700">Quantity: {result.quantity}</p>
                      {result.expiry && (
                        <p className="text-sm text-green-700">Expiry: {result.expiry}</p>
                      )}
                    </div>
                    <span className="text-xs px-2 py-1 rounded-full bg-green-200 text-green-800">
                      {(result.confidence * 100).toFixed(0)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="flex gap-2">
            <Button
              onClick={() => {
                if (ocrResults.length > 0) {
                  confirmOCRResults(ocrResults);
                }
              }}
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              Confirm & Add
            </Button>
            <Button
              onClick={() => {
                setShowOCRDialog(false);
                setOcrResults([]);
                setOcrImage(null);
              }}
              variant="outline"
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
