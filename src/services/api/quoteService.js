import mockQuotes from '@/services/mockData/quotes.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const quoteService = {
  async getTodaysQuote() {
    await delay(300);
    // Simulate getting today's quote (in real app, this would be based on date)
    const today = new Date().toISOString().split('T')[0];
    const todaysQuote = mockQuotes.find(quote => 
      quote.displayDate.startsWith(today)
    ) || mockQuotes[0];
    
    return todaysQuote;
  },

  async getQuoteHistory() {
    await delay(400);
    // Return quotes sorted by display date (newest first)
    return [...mockQuotes].sort((a, b) => 
      new Date(b.displayDate) - new Date(a.displayDate)
    );
  },

  async getQuoteById(quoteId) {
    await delay(200);
    const quote = mockQuotes.find(q => q.Id === quoteId);
    if (!quote) {
      throw new Error('Quote not found');
    }
    return quote;
  },

  async getQuotesByCategory(category) {
    await delay(300);
    return mockQuotes.filter(quote => quote.category === category);
  },

  async searchQuotes(searchTerm) {
    await delay(350);
    const term = searchTerm.toLowerCase();
    return mockQuotes.filter(quote => 
      quote.text.toLowerCase().includes(term) ||
      quote.author.toLowerCase().includes(term)
    );
  }
};