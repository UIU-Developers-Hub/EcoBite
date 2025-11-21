import { motion } from 'motion/react';
import { 
  Search, Bell, ShoppingBag, MapPin, Truck, Recycle, 
  TrendingUp, Award, Leaf, User, ChevronRight, Sparkles,
  Home, Utensils, Building2, Users, Store, ShoppingCart, Wheat
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useState } from 'react';

interface HomePageProps {
  user: any;
  onNavigate: (screen: string) => void;
  onLogout: () => void;
}

export function HomePage({ user, onNavigate, onLogout }: HomePageProps) {
  const [activeNav, setActiveNav] = useState('home');

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white shadow-md">
              {user.name[0].toUpperCase()}
            </div>
            <div>
              <p className="text-sm text-gray-900">Good morning</p>
              <p className="text-xs text-gray-500">{user.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={() => onNavigate('notifications')}
              className="bg-transparent hover:bg-gray-100 text-gray-700 p-2 rounded-full relative"
            >
              <Bell className="w-5 h-5" />
              <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></div>
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto">
        {/* User Metrics */}
        <div className="px-6 pt-6 pb-4">
          <div className="grid grid-cols-3 gap-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
            >
              <div className="flex items-center justify-center w-10 h-10 bg-green-50 rounded-full mb-2 mx-auto">
                <Award className="w-5 h-5 text-green-600" />
              </div>
              <div className="text-center">
                <div className="text-xl text-gray-900 mb-1">{user.points}</div>
                <p className="text-xs text-gray-500">Points</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
            >
              <div className="flex items-center justify-center w-10 h-10 bg-orange-50 rounded-full mb-2 mx-auto">
                <Sparkles className="w-5 h-5 text-orange-600" />
              </div>
              <div className="text-center">
                <div className="text-xl text-gray-900 mb-1">{user.mealsRescued}</div>
                <p className="text-xs text-gray-500">Meals</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
            >
              <div className="flex items-center justify-center w-10 h-10 bg-blue-50 rounded-full mb-2 mx-auto">
                <TrendingUp className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-center">
                <div className="text-xl text-gray-900 mb-1">{user.co2Saved}kg</div>
                <p className="text-xs text-gray-500">CO₂ Saved</p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Daily Sustainable Tip */}
        <div className="px-6 pb-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-5 shadow-md"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center shrink-0">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-white mb-1">Daily Tip</h3>
                <p className="text-sm text-green-50">
                  Store herbs in a glass of water like flowers to keep them fresh longer!
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Search */}
        <div className="px-6 pb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search food, hubs, recipes..."
              className="pl-12 bg-white border-gray-200 rounded-xl py-6 shadow-sm"
            />
          </div>
        </div>

        {/* Four Pillar Cards */}
        <div className="px-6 pb-6">
          <h2 className="text-lg mb-4 text-gray-900">Explore</h2>

          <div className="grid grid-cols-2 gap-4">
            {/* Surplus Stream */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onNavigate(user.role === 'shop' || user.role === 'restaurant' ? 'business' : 'surplus')}
              className="bg-white rounded-2xl p-5 shadow-md border border-gray-100 text-left group"
            >
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mb-3 group-hover:bg-green-100 transition-colors">
                <ShoppingBag className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-gray-900 mb-1">Surplus Stream</h3>
              <p className="text-xs text-gray-500 mb-3">Share & discover food</p>
              <div className="flex items-center text-green-600 text-xs">
                <span>Explore</span>
                <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.button>

            {/* Community Hub */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onNavigate('hub')}
              className="bg-white rounded-2xl p-5 shadow-md border border-gray-100 text-left group"
            >
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-3 group-hover:bg-blue-100 transition-colors">
                <MapPin className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-gray-900 mb-1">Community Hub</h3>
              <p className="text-xs text-gray-500 mb-3">Rescue boxes & more</p>
              <div className="flex items-center text-blue-600 text-xs">
                <span>Explore</span>
                <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.button>

            {/* Flow Network */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onNavigate('network')}
              className="bg-white rounded-2xl p-5 shadow-md border border-gray-100 text-left group"
            >
              <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center mb-3 group-hover:bg-purple-100 transition-colors">
                <Truck className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-gray-900 mb-1">Flow Network</h3>
              <p className="text-xs text-gray-500 mb-3">Volunteer & transport</p>
              <div className="flex items-center text-purple-600 text-xs">
                <span>Explore</span>
                <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.button>

            {/* Bio-Transformation */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onNavigate('bio')}
              className="bg-white rounded-2xl p-5 shadow-md border border-gray-100 text-left group"
            >
              <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mb-3 group-hover:bg-emerald-100 transition-colors">
                <Recycle className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-gray-900 mb-1">Bio-Transform</h3>
              <p className="text-xs text-gray-500 mb-3">Waste to worth</p>
              <div className="flex items-center text-emerald-600 text-xs">
                <span>Explore</span>
                <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.button>
          </div>
        </div>

        {/* User Type Specific Sections */}
        <div className="px-6 pb-6">
          <h2 className="text-lg mb-4 text-gray-900">Your Dashboard</h2>

          <div className="space-y-3">
            {/* Smart Kitchen - Only for household, business, government (NOT for buyers) */}
            {(user.role === 'user' || user.role === 'shop' || user.role === 'restaurant' || user.role === 'admin') && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                onClick={() => onNavigate('kitchen')}
                className="w-full bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center">
                    <span className="text-xl">👨‍🍳</span>
                  </div>
                  <div className="text-left">
                    <h3 className="text-gray-900 text-sm">Smart Kitchen</h3>
                    <p className="text-xs text-gray-500">Manage your pantry</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </motion.button>
            )}

            {/* Household Section */}
            {user.role === 'user' && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                onClick={() => onNavigate('kitchen')}
                className="w-full bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-gray-900 text-sm">Household</h3>
                    <p className="text-xs text-gray-500">Manage household inventory</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </motion.button>
            )}

            {/* Business Section */}
            {(user.role === 'shop' || user.role === 'restaurant') && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                onClick={() => onNavigate('kitchen')}
                className="w-full bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center">
                    <Store className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-gray-900 text-sm">Business</h3>
                    <p className="text-xs text-gray-500">Manage business inventory</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </motion.button>
            )}

            {/* Government Section */}
            {user.role === 'admin' && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                onClick={() => onNavigate('kitchen')}
                className="w-full bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-gray-900 text-sm">Government</h3>
                    <p className="text-xs text-gray-500">Manage government inventory</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </motion.button>
            )}

            {/* Buyers Section - Separate, NOT part of Smart Kitchen */}
            {user.role === 'buyer' && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                onClick={() => onNavigate('buyers')}
                className="w-full bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
                    <ShoppingCart className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-gray-900 text-sm">Buy from Farmers</h3>
                    <p className="text-xs text-gray-500">Browse farmer listings</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </motion.button>
            )}

            {/* Farmers Section */}
            {user.role === 'farmer' && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                onClick={() => onNavigate('farmers')}
                className="w-full bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center">
                    <Wheat className="w-5 h-5 text-amber-600" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-gray-900 text-sm">My Farm Listings</h3>
                    <p className="text-xs text-gray-500">List your produce</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </motion.button>
            )}

            {/* Also show Buyers option for other roles (not just buyer role) */}
            {user.role !== 'buyer' && user.role !== 'farmer' && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                onClick={() => onNavigate('buyers')}
                className="w-full bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
                    <ShoppingCart className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-gray-900 text-sm">Buy from Farmers</h3>
                    <p className="text-xs text-gray-500">Browse farmer listings</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </motion.button>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              onClick={() => onNavigate('gamification')}
              className="w-full bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-50 rounded-xl flex items-center justify-center">
                  <span className="text-xl">🏆</span>
                </div>
                <div className="text-left">
                  <h3 className="text-gray-900 text-sm">Rewards & Badges</h3>
                  <p className="text-xs text-gray-500">Track your progress</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </motion.button>

            {(user.role === 'restaurant' || user.role === 'ngo') && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                onClick={() => onNavigate('ngo')}
                className="w-full bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-pink-50 rounded-xl flex items-center justify-center">
                    <span className="text-xl">❤️</span>
                  </div>
                  <div className="text-left">
                    <h3 className="text-gray-900 text-sm">Donations</h3>
                    <p className="text-xs text-gray-500">Restaurant to NGO</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </motion.button>
            )}

            {user.role === 'admin' && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                onClick={() => onNavigate('admin')}
                className="w-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl p-4 shadow-md flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                    <span className="text-xl">⚙️</span>
                  </div>
                  <div className="text-left">
                    <h3 className="text-white text-sm">Admin Panel</h3>
                    <p className="text-xs text-purple-100">Manage platform</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-white" />
              </motion.button>
            )}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="px-6 pb-6">
          <h2 className="text-lg mb-4 text-gray-900">Recent Activity</h2>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 divide-y divide-gray-100">
            <div className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center">
                <Leaf className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">Shared surplus vegetables</p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
              <div className="text-green-600 text-xs">+10 pts</div>
            </div>

            <div className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                <MapPin className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">Picked up rescue box</p>
                <p className="text-xs text-gray-500">Yesterday</p>
              </div>
              <div className="text-blue-600 text-xs">+15 pts</div>
            </div>

            <div className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-50 rounded-full flex items-center justify-center">
                <Award className="w-5 h-5 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">Earned "Eco Warrior" badge</p>
                <p className="text-xs text-gray-500">2 days ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-3 shadow-lg">
        <div className="flex justify-around items-center max-w-md mx-auto">
          <button
            onClick={() => setActiveNav('home')}
            className={`flex flex-col items-center gap-1 transition-colors ${
              activeNav === 'home' ? 'text-green-600' : 'text-gray-400'
            }`}
          >
            <Home className="w-6 h-6" />
            <span className="text-xs">Home</span>
          </button>

          <button
            onClick={() => {
              setActiveNav('explore');
              onNavigate('surplus');
            }}
            className={`flex flex-col items-center gap-1 transition-colors ${
              activeNav === 'explore' ? 'text-green-600' : 'text-gray-400'
            }`}
          >
            <Search className="w-6 h-6" />
            <span className="text-xs">Explore</span>
          </button>

          <button
            onClick={() => {
              setActiveNav('add');
              onNavigate('surplus');
            }}
            className="bg-green-600 text-white rounded-full p-4 -mt-6 shadow-lg"
          >
            <ShoppingBag className="w-6 h-6" />
          </button>

          <button
            onClick={() => {
              setActiveNav('rewards');
              onNavigate('gamification');
            }}
            className={`flex flex-col items-center gap-1 transition-colors ${
              activeNav === 'rewards' ? 'text-green-600' : 'text-gray-400'
            }`}
          >
            <Award className="w-6 h-6" />
            <span className="text-xs">Rewards</span>
          </button>

          <button
            onClick={() => {
              setActiveNav('profile');
              onNavigate('profile');
            }}
            className={`flex flex-col items-center gap-1 transition-colors ${
              activeNav === 'profile' ? 'text-green-600' : 'text-gray-400'
            }`}
          >
            <User className="w-6 h-6" />
            <span className="text-xs">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
}