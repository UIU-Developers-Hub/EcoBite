import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Plus, Calendar, DollarSign, Package, Trash2, Edit, CheckCircle2, Upload } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface FarmersProps {
  user: any;
  onBack: () => void;
}

interface ProduceListing {
  id: number;
  produce: string;
  amount: string;
  price: number;
  expirationDate: string;
  category: string;
  description?: string;
}

export function Farmers({ user, onBack }: FarmersProps) {
  const [listings, setListings] = useState<ProduceListing[]>([
    {
      id: 1,
      produce: 'Fresh Tomatoes',
      amount: '50 kg',
      price: 2.50,
      expirationDate: '2024-01-20',
      category: 'vegetables',
      description: 'Freshly harvested organic tomatoes',
    },
    {
      id: 2,
      produce: 'Organic Apples',
      amount: '100 kg',
      price: 3.00,
      expirationDate: '2024-01-25',
      category: 'fruits',
      description: 'Premium quality organic apples',
    },
  ]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingListing, setEditingListing] = useState<ProduceListing | null>(null);
  const [formData, setFormData] = useState({
    produce: '',
    amount: '',
    price: '',
    expirationDate: '',
    category: '',
    description: '',
  });

  const categories = ['vegetables', 'fruits', 'dairy', 'grains', 'herbs', 'other'];

  const handleAddListing = () => {
    setFormData({
      produce: '',
      amount: '',
      price: '',
      expirationDate: '',
      category: '',
      description: '',
    });
    setEditingListing(null);
    setShowAddForm(true);
  };

  const handleEditListing = (listing: ProduceListing) => {
    setFormData({
      produce: listing.produce,
      amount: listing.amount,
      price: listing.price.toString(),
      expirationDate: listing.expirationDate,
      category: listing.category,
      description: listing.description || '',
    });
    setEditingListing(listing);
    setShowAddForm(true);
  };

  const handleDeleteListing = (id: number) => {
    if (confirm('Are you sure you want to delete this listing?')) {
      setListings(listings.filter(l => l.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingListing) {
      // Update existing listing
      setListings(listings.map(l => 
        l.id === editingListing.id 
          ? {
              ...l,
              produce: formData.produce,
              amount: formData.amount,
              price: parseFloat(formData.price),
              expirationDate: formData.expirationDate,
              category: formData.category,
              description: formData.description,
            }
          : l
      ));
    } else {
      // Add new listing
      const newListing: ProduceListing = {
        id: Date.now(),
        produce: formData.produce,
        amount: formData.amount,
        price: parseFloat(formData.price),
        expirationDate: formData.expirationDate,
        category: formData.category,
        description: formData.description,
      };
      setListings([...listings, newListing]);
    }
    
    setShowAddForm(false);
    setEditingListing(null);
    setFormData({
      produce: '',
      amount: '',
      price: '',
      expirationDate: '',
      category: '',
      description: '',
    });
  };

  const getDaysUntilExpiry = (expirationDate: string) => {
    const today = new Date();
    const expiry = new Date(expirationDate);
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (showAddForm) {
    return (
      <div className="min-h-screen pb-20" style={{ backgroundColor: '#C1E2BE' }}>
        <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-green-200 px-6 py-4">
          <div className="flex items-center gap-3">
            <Button
              onClick={() => {
                setShowAddForm(false);
                setEditingListing(null);
                setFormData({
                  produce: '',
                  amount: '',
                  price: '',
                  expirationDate: '',
                  category: '',
                  description: '',
                });
              }}
              className="bg-transparent hover:bg-green-100 text-green-800 p-2 rounded-full"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-xl text-green-900">
              {editingListing ? 'Edit Listing' : 'Add New Listing'}
            </h1>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="px-6 pt-6 space-y-6">
          {/* Produce Name */}
          <div>
            <Label htmlFor="produce" className="text-green-800">Produce Name</Label>
            <Input
              id="produce"
              value={formData.produce}
              onChange={(e) => setFormData({ ...formData, produce: e.target.value })}
              placeholder="e.g., Fresh Tomatoes"
              className="mt-1 bg-white/70 border-green-300 rounded-xl"
              required
            />
          </div>

          {/* Category */}
          <div>
            <Label htmlFor="category" className="text-green-800">Category</Label>
            <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
              <SelectTrigger className="mt-1 bg-white/70 border-green-300 rounded-xl">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Amount */}
          <div>
            <Label htmlFor="amount" className="text-green-800">Amount Available</Label>
            <Input
              id="amount"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              placeholder="e.g., 50 kg, 100 L, 200 pieces"
              className="mt-1 bg-white/70 border-green-300 rounded-xl"
              required
            />
          </div>

          {/* Price */}
          <div>
            <Label htmlFor="price" className="text-green-800">Price per Unit</Label>
            <div className="relative mt-1">
              <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-green-600" />
              <Input
                id="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="0.00"
                className="pl-12 bg-white/70 border-green-300 rounded-xl"
                required
              />
            </div>
          </div>

          {/* Expiration Date */}
          <div>
            <Label htmlFor="expirationDate" className="text-green-800">Expiration Date</Label>
            <Input
              id="expirationDate"
              type="date"
              value={formData.expirationDate}
              onChange={(e) => setFormData({ ...formData, expirationDate: e.target.value })}
              className="mt-1 bg-white/70 border-green-300 rounded-xl"
              required
            />
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description" className="text-green-800">Description (Optional)</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Add any additional details about your produce..."
              className="mt-1 bg-white/70 border-green-300 rounded-xl"
              rows={4}
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white rounded-xl py-6 text-lg"
          >
            <CheckCircle2 className="w-5 h-5 mr-2" />
            {editingListing ? 'Update Listing' : 'Create Listing'}
          </Button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20" style={{ backgroundColor: '#C1E2BE' }}>
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-green-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              onClick={onBack}
              className="bg-transparent hover:bg-green-100 text-green-800 p-2 rounded-full"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-xl text-green-900">My Farm Listings</h1>
          </div>
          <Button
            onClick={handleAddListing}
            className="bg-green-600 hover:bg-green-700 text-white rounded-full p-3"
          >
            <Plus className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="px-6 pt-6">
        {/* Stats Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 shadow-md mb-6"
        >
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-900">{listings.length}</div>
              <div className="text-xs text-green-700">Active Listings</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-900">
                ${listings.reduce((sum, l) => sum + (l.price * parseFloat(l.amount)), 0).toFixed(2)}
              </div>
              <div className="text-xs text-green-700">Total Value</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-900">
                {listings.reduce((sum, l) => sum + parseFloat(l.amount), 0).toFixed(0)}
              </div>
              <div className="text-xs text-green-700">Total Units</div>
            </div>
          </div>
        </motion.div>

        {/* Listings */}
        {listings.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Package className="w-16 h-16 text-green-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-green-900 mb-2">No Listings Yet</h3>
            <p className="text-green-700 mb-4">Start by adding your first produce listing</p>
            <Button
              onClick={handleAddListing}
              className="bg-green-600 hover:bg-green-700 text-white rounded-xl"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add First Listing
            </Button>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {listings.map((listing) => {
              const daysUntilExpiry = getDaysUntilExpiry(listing.expirationDate);
              return (
                <motion.div
                  key={listing.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 shadow-md"
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
                          <div className="text-sm text-green-700 capitalize">{listing.category}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-green-900">${listing.price}</div>
                          <div className="text-xs text-green-600">per unit</div>
                        </div>
                      </div>

                      {listing.description && (
                        <p className="text-sm text-green-700 mb-3">{listing.description}</p>
                      )}

                      <div className="flex flex-wrap gap-3 mb-3">
                        <div className="flex items-center gap-1 text-sm text-green-700">
                          <Package className="w-4 h-4" />
                          <span>{listing.amount}</span>
                        </div>
                        <div className={`flex items-center gap-1 text-sm ${
                          daysUntilExpiry <= 7 ? 'text-red-600' :
                          daysUntilExpiry <= 14 ? 'text-orange-600' :
                          'text-green-600'
                        }`}>
                          <Calendar className="w-4 h-4" />
                          <span>Expires: {listing.expirationDate} ({daysUntilExpiry} days)</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-green-700">
                          <DollarSign className="w-4 h-4" />
                          <span>Total: ${(listing.price * parseFloat(listing.amount)).toFixed(2)}</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleEditListing(listing)}
                          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
                        >
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                        <Button
                          onClick={() => handleDeleteListing(listing.id)}
                          className="bg-red-600 hover:bg-red-700 text-white rounded-xl px-4"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Connect to Big Companies Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 bg-gradient-to-r from-blue-100/80 to-cyan-100/80 backdrop-blur-sm rounded-2xl p-6 shadow-md"
        >
          <h3 className="text-lg font-semibold text-green-900 mb-2">
            Connect with Big Companies
          </h3>
          <p className="text-sm text-green-700 mb-4">
            Get your produce in front of large buyers. List your products to connect with companies looking for bulk purchases.
          </p>
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-6">
            Connect with Companies
          </Button>
        </motion.div>
      </div>
    </div>
  );
}

