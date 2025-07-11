import React, { useState } from "react";
import { motion } from "framer-motion";
import { useQuoteHistory } from "@/hooks/useQuoteHistory";
import { format } from "date-fns";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import Input from "@/components/atoms/Input";
import Empty from "@/components/ui/Empty";
import Error from "@/components/ui/Error";
import Loading from "@/components/ui/Loading";
import QuoteCard from "@/components/molecules/QuoteCard";

const QuoteHistory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  const { quotes, loading, error, refreshHistory } = useQuoteHistory();

  const categories = ['all', 'motivation', 'success', 'leadership', 'wisdom', 'inspiration'];

const filteredQuotes = quotes.filter(quote => {
    const matchesSearch = quote.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quote.author.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || quote.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  if (loading) return <Loading type="history" />;
  if (error) return <Error error={error} onRetry={refreshHistory} />;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Quote History
            </h1>
            <p className="text-lg text-gray-600">
              Revisit your favorite motivational quotes
            </p>
          </div>

          {quotes.length === 0 ? (
            <Empty 
              variant="history"
              onAction={() => window.location.href = '/'}
            />
          ) : (
            <>
              {/* Filters */}
              <Card className="p-6 mb-8">
                <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                  <div className="flex flex-col sm:flex-row gap-4 flex-1">
                    <div className="flex-1 max-w-md">
                      <Input
                        placeholder="Search quotes or authors..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full"
                      />
                    </div>
                    
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary bg-white"
                    >
                      {categories.map(category => (
                        <option key={category} value={category}>
                          {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button
                      variant={viewMode === 'grid' ? 'primary' : 'ghost'}
                      size="medium"
                      onClick={() => setViewMode('grid')}
                    >
                      <ApperIcon name="Grid3X3" className="w-4 h-4" />
                    </Button>
                    <Button
                      variant={viewMode === 'list' ? 'primary' : 'ghost'}
                      size="medium"
                      onClick={() => setViewMode('list')}
                    >
                      <ApperIcon name="List" className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Results Count */}
              <div className="mb-6">
                <p className="text-gray-600">
                  {filteredQuotes.length} {filteredQuotes.length === 1 ? 'quote' : 'quotes'} found
                </p>
              </div>

              {/* Quotes Grid/List */}
              {filteredQuotes.length === 0 ? (
                <Empty 
                  title="No quotes match your search"
                  description="Try adjusting your search terms or category filter."
                  actionText="Clear Filters"
                  onAction={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                  }}
                />
              ) : (
                <div className={
                  viewMode === 'grid' 
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    : "space-y-6"
                }>
                  {filteredQuotes.map((quote, index) => (
                    <motion.div
                      key={quote.Id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      {viewMode === 'grid' ? (
                        <Card className="p-4 hover:shadow-md transition-shadow duration-200">
                          <div className="space-y-3">
                            <blockquote className="text-gray-900 font-medium leading-relaxed">
                              "{quote.text}"
                            </blockquote>
<div className="flex items-center justify-between">
                              <cite className="text-sm text-gray-600 not-italic">
                                — {quote.author}
                              </cite>
                              <span className="text-xs text-gray-500">
                                {format(new Date(quote.display_date), 'MMM d')}
                              </span>
                            </div>
                          </div>
                        </Card>
                      ) : (
                        <QuoteCard quote={quote} />
                      )}
                    </motion.div>
                  ))}
                </div>
              )}
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default QuoteHistory;