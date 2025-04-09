
// API service for handling backend requests

/**
 * Submit a suggestion for a card
 * @param cardId - The ID of the card
 * @param suggestion - The suggestion text
 * @returns Promise with the response data
 */
export const submitCardSuggestion = async (cardId: string, suggestion: string) => {
  try {
    // This would be replaced with your actual API endpoint
    const response = await fetch('/api/suggestions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cardId,
        suggestionText: suggestion
      })
    });
    
    if (!response.ok) {
      throw new Error('Failed to submit suggestion');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error submitting suggestion:', error);
    throw error;
  }
};

/**
 * Fetch suggestions for a specific card
 * @param cardId - The ID of the card
 * @returns Promise with the suggestions data
 */
export const getCardSuggestions = async (cardId: string) => {
  try {
    // This would be replaced with your actual API endpoint
    const response = await fetch(`/api/cards/${cardId}/suggestions`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch suggestions');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching suggestions:', error);
    throw error;
  }
};
