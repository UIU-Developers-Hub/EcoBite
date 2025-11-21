import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Search, MapPin, Calendar, DollarSign, ShoppingCart, Filter, CheckCircle2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

interface BuyersProps {
  user: any;
  onBack: () => void;
}

interface FarmerListing {
  id: number;
  farmerName: string;
  produce: string;
  amount: string;
  price: number;
  expirationDate: string;
  location: string;
  distance: string;
  category: string;
  image?: string;
  verified: boolean;
}

export function Buyers({ user, onBack }: BuyersProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedListing, setSelectedListing] = useState<FarmerListing | null>(null);

  // Mock data - farmer listings
  const farmerListings: FarmerListing[] = [
    {
      id: 1,
      farmerName: 'Green Valley Farm',
      produce: 'Fresh Tomatoes',
      amount: '50 kg',
      price: 2.50,
      expirationDate: '2024-01-20',
      location: 'Rural District',
      distance: '5.2 km',
      category: 'vegetables',
      verified: true,
    },
    {
      id: 2,
      farmerName: 'Sunshine Orchard',
      produce: 'Organic Apples',
      amount: '100 kg',
      price: 3.00,
      expirationDate: '2024-01-25',
      location: 'Mountain View',
      distance: '8.5 km',
      category: 'fruits',
      verified: true,
    },
    {
      id: 3,
      farmerName: 'Fresh Fields',
      produce: 'Carrots',
      amount: '75 kg',
      price: 1.80,
      expirationDate: '2024-01-18',
      location: 'Farm Road',
      distance: '12.3 km',
      category: 'vegetables',
      verified: false,
    },
    {
      id: 4,
      farmerName: 'Dairy Delight',
      produce: 'Fresh Milk',
      amount: '200 L',
      price: 4.50,
      expirationDate: '2024-01-15',
      location: 'Countryside',
      distance: '15.0 km',
      category: 'dairy',
      verified: true,
    },
    {
      id: 5,
      farmerName: 'Grain Masters',
      produce: 'Wheat',
      amount: '500 kg',
      price: 1.20,
      expirationDate: '2024-02-10',
      location: 'Plains Area',
      distance: '20.5 km',
      category: 'grains',
      verified: true,
    },
    {
      id: 6,
      farmerName: 'Herb Garden',
      produce: 'Fresh Basil',
      amount: '10 kg',
      price: 5.00,
      expirationDate: '2024-01-16',
      location: 'Garden District',
      distance: '6.8 km',
      category: 'herbs',
      verified: false,
    },
  ];

  const categories = ['all', 'vegetables', 'fruits', 'dairy', 'grains', 'herbs'];

  const filteredListings = farmerListings.filter(listing => {
    const matchesSearch = listing.produce.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         listing.farmerName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || listing.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getDaysUntilExpiry = (expirationDate: string) => {
    const today = new Date();
    const expiry = new Date(expirationDate);
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handlePurchase = (listing: FarmerListing) => {
    // In a real app, this would handle the purchase flow
    alert(`Purchase initiated for ${listing.amount} of ${listing.produce} from ${listing.farmerName}`);
  };

  if (selectedListing) {
    const daysUntilExpiry = getDaysUntilExpiry(selectedListing.expirationDate);
    return (
      <div className="min-h-screen pb-20" style={{ backgroundColor: '#C1E2BE' }}>
        <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-green-200 px-6 py-4">
          <div className="flex items-center gap-3">
            <Button
              onClick={() => setSelectedListing(null)}
              className="bg-transparent hover:bg-green-100 text-green-800 p-2 rounded-full"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-xl text-green-900">Product Details</h1>
          </div>
        </div>

        <div className="px-6 pt-6 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-md"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-green-900 mb-2">{selectedListing.produce}</h2>
                <div className="flex items-center gap-2">
                  <span className="text-green-700">{selectedListing.farmerName}</span>
                  {selectedListing.verified && (
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                  )}
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-green-900">${selectedListing.price}</div>
                <div className="text-sm text-green-700">per unit</div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-green-800">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <ShoppingCart className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <div className="text-sm text-green-600">Available Amount</div>
                  <div className="font-semibold">{selectedListing.amount}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 text-green-800">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <div className="text-sm text-green-600">Expiration Date</div>
                  <div className="font-semibold">
                    {selectedListing.expirationDate} 
                    <span className={`ml-2 text-sm ${daysUntilExpiry <= 7 ? 'text-red-600' : daysUntilExpiry <= 14 ? 'text-orange-600' : 'text-green-600'}`}>
                      ({daysUntilExpiry} days)
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 text-green-800">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-sm text-green-600">Location</div>
                  <div className="font-semibold">{selectedListing.location}</div>
                  <div className="text-xs text-green-600">{selectedListing.distance} away</div>
                </div>
              </div>

              <div className="flex items-center gap-3 text-green-800">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <div className="text-sm text-green-600">Total Price</div>
                  <div className="font-semibold text-xl">
                    ${(selectedListing.price * parseFloat(selectedListing.amount)).toFixed(2)}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-green-200">
              <Button
                onClick={() => handlePurchase(selectedListing)}
                className="w-full bg-green-600 hover:bg-green-700 text-white rounded-xl py-6 text-lg"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Purchase Now
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

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
          <h1 className="text-xl text-green-900">Buy from Farmers</h1>
        </div>
      </div>

      <div className="px-6 pt-6">
        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-green-600" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search produce, farmers..."
            className="pl-12 bg-white/70 border-green-300 rounded-xl py-6"
          />
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-green-600 text-white'
                  : 'bg-white/70 text-green-700 hover:bg-green-50'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Listings */}
        <div className="space-y-4">
          {filteredListings.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-green-700">No listings found</p>
            </div>
          ) : (
            filteredListings.map((listing) => {
              const daysUntilExpiry = getDaysUntilExpiry(listing.expirationDate);
              return (
                <motion.div
                  key={listing.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setSelectedListing(listing)}
                  className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 shadow-md cursor-pointer"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center text-3xl">
                      {listing.category === 'vegetables' ? '🥕' :
                       listing.category === 'fruits' ? '🍎' :
                       listing.category === 'dairy' ? '🥛' :
                       listing.category === 'grains' ? '🌾' :
                       '🌿'}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-lg font-semibold text-green-900 mb-1">
                            {listing.produce}
                          </h3>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-green-700">{listing.farmerName}</span>
                            {listing.verified && (
                              <CheckCircle2 className="w-4 h-4 text-green-600" />
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-green-900">${listing.price}</div>
                          <div className="text-xs text-green-600">per unit</div>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-3 mt-3">
                        <div className="flex items-center gap-1 text-sm text-green-700">
                          <ShoppingCart className="w-4 h-4" />
                          <span>{listing.amount}</span>
                        </div>
                        <div className={`flex items-center gap-1 text-sm ${
                          daysUntilExpiry <= 7 ? 'text-red-600' :
                          daysUntilExpiry <= 14 ? 'text-orange-600' :
                          'text-green-600'
                        }`}>
                          <Calendar className="w-4 h-4" />
                          <span>{daysUntilExpiry} days</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-green-700">
                          <MapPin className="w-4 h-4" />
                          <span>{listing.distance}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </div>

        {/* Connect to Big Companies Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 bg-gradient-to-r from-blue-100/80 to-cyan-100/80 backdrop-blur-sm rounded-2xl p-6 shadow-md"
        >
          <h3 className="text-lg font-semibold text-green-900 mb-2">
            Connect Farmers to Big Companies
          </h3>
          <p className="text-sm text-green-700 mb-4">
            Are you a large company looking to source directly from farmers? Connect with verified farmers for bulk purchases.
          </p>
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-6">
            Connect with Farmers
          </Button>
        </motion.div>
      </div>
    </div>
  );
}

