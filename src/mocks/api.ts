
import { toast } from "sonner";

// In-memory storage for suggestions
const suggestions: Record<string, { text: string, timestamp: number }[]> = {};

// Mock API handlers

// Intercept fetch requests to our mock endpoints
const originalFetch = window.fetch;
window.fetch = async function(input: RequestInfo | URL, init?: RequestInit) {
  const url = input.toString();
  
  // Handle suggestion submission
  if (url === '/api/suggestions' && init?.method === 'POST') {
    const body = JSON.parse(init.body as string);
    const { cardId, suggestionText } = body;
    
    console.log('Mock API: Storing suggestion for card', cardId, suggestionText);
    
    // Store the suggestion
    if (!suggestions[cardId]) {
      suggestions[cardId] = [];
    }
    
    suggestions[cardId].push({
      text: suggestionText,
      timestamp: Date.now()
    });
    
    return new Response(JSON.stringify({ success: true }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  // Handle suggestion retrieval
  if (url.startsWith('/api/cards/') && url.endsWith('/suggestions')) {
    const cardId = url.split('/')[3]; // Extract card ID from URL
    
    console.log('Mock API: Retrieving suggestions for card', cardId);
    
    return new Response(JSON.stringify({ 
      suggestions: suggestions[cardId] || [] 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  // For all other requests, use the original fetch
  return originalFetch(input, init);
};

// Initialize the mock API
export const initMockApi = () => {
  console.log('Mock API initialized. This should be replaced with a real backend in production.');
  toast.info('Using mock API for suggestion storage');
};
