import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router';
import Card, { SkeletonCard } from '../components/Card/Card';
import { FaSearch, FaFilter, FaSortAmountDown, FaThLarge, FaList } from 'react-icons/fa';

const AvailableFoods = () => {
  const loaderData = useLoaderData();
  const [foods, setFoods] = useState([]);
  const [displayFoods, setDisplayFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  
  // States for Filter/Search/Sort
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('expired_date');
  const [filterCategory, setFilterCategory] = useState('All');

  useEffect(() => {
    if (loaderData) {
      setFoods(loaderData);
      setLoading(false);
    }
  }, [loaderData]);

  useEffect(() => {
    let result = [...foods];

    // Search
    if (searchTerm) {
      result = result.filter(f => 
        f.food_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter (Example by location or mock category)
    if (filterCategory !== 'All') {
      result = result.filter(f => f.location === filterCategory);
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === 'expired_date') {
        return new Date(a.expired_date) - new Date(b.expired_date);
      }
      if (sortBy === 'quantity') {
        return b.food_quantity - a.food_quantity;
      }
      return 0;
    });

    setDisplayFoods(result);
  }, [foods, searchTerm, sortBy, filterCategory]);

  return (
    <div className="min-h-screen pt-28 pb-20 bg-base-200/30">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Page Header */}
        <div className="mb-12 text-center lg:text-left">
          <h1 className="text-4xl md:text-6xl font-black mb-4 italic">Discover <span className="text-primary italic">Surplus.</span></h1>
          <p className="text-base-content/60 text-lg max-w-2xl font-medium">Browse fresh food shared by your community. Ready to be pickup for free.</p>
        </div>

        {/* Toolbar */}
        <div className="bg-base-100 p-6 rounded-[2rem] shadow-xl shadow-base-200/50 border border-base-200 mb-10">
          <div className="flex flex-col xl:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative w-full xl:max-w-md">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/30" />
              <input 
                type="text" 
                placeholder="Search food or location..." 
                className="input input-bordered w-full pl-12 rounded-2xl h-14 bg-base-200/50 border-none focus:ring-2 focus:ring-primary/20"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-4 w-full xl:w-auto">
              {/* Category Filter */}
              <div className="flex items-center gap-2 bg-base-200/50 px-4 py-3 rounded-2xl h-14">
                <FaFilter className="text-primary" />
                <select 
                  className="bg-transparent font-bold focus:outline-none cursor-pointer"
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                >
                  <option value="All">All Locations</option>
                  {[...new Set(foods.map(f => f.location))].map(loc => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>

              {/* Sort */}
              <div className="flex items-center gap-2 bg-base-200/50 px-4 py-3 rounded-2xl h-14">
                <FaSortAmountDown className="text-secondary" />
                <select 
                  className="bg-transparent font-bold focus:outline-none cursor-pointer"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="expired_date">Sort by Expire Date</option>
                  <option value="quantity">Sort by Quantity</option>
                </select>
              </div>

              {/* View Toggle */}
              <div className="flex bg-base-200/50 p-1.5 rounded-2xl h-14 ml-auto lg:ml-0">
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`p-3 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-primary text-white shadow-lg' : 'opacity-40 hover:opacity-100'}`}
                >
                  <FaThLarge />
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  className={`p-3 rounded-xl transition-all ${viewMode === 'list' ? 'bg-primary text-white shadow-lg' : 'opacity-40 hover:opacity-100'}`}
                >
                  <FaList />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results Info */}
        <div className="mb-8 flex justify-between items-center px-4 font-bold text-sm uppercase tracking-widest opacity-40">
          <span>Showing {displayFoods.length} Results</span>
          {displayFoods.length === 0 && !loading && <span className="text-error">No items found</span>}
        </div>

        {/* Food Grid */}
        <div className={`grid gap-8 ${
          viewMode === 'grid' 
          ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
          : 'grid-cols-1'
        }`}>
          {loading ? (
            [...Array(8)].map((_, i) => <SkeletonCard key={i} />)
          ) : (
            displayFoods.map(food => (
              <Card key={food._id} food={food} />
            ))
          )}
        </div>
        
        {!loading && displayFoods.length === 0 && (
          <div className="py-40 text-center">
            <h2 className="text-3xl font-black opacity-10">Oops! Nothing found.</h2>
            <p className="mt-4 opacity-40">Try adjusting your filters or search term.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AvailableFoods;
