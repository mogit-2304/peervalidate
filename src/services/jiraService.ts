
/**
 * JIRA Integration Service
 * Handles interactions with the JIRA API
 */

interface JiraTicketData {
  summary: string;
  description: string;
  cardId: string;
  category: string;
  approvalCount: number;
  rejectionCount: number;
  suggestions: {
    id: string;
    suggestion: string;
    author: string;
    date: string;
  }[];
}

/**
 * Creates a JIRA ticket with the provided data
 * @param data - The data for the JIRA ticket
 * @returns Promise with the response data
 */
export const createJiraTicket = async (data: JiraTicketData) => {
  try {
    // In a real implementation, this would use the JIRA REST API
    // For now, we'll mock the API call
    console.log('Creating JIRA ticket with data:', data);
    
    // This would be replaced with your actual JIRA API endpoint when connected to Supabase
    const mockApiResponse = {
      id: `PEER-${Math.floor(Math.random() * 1000)}`,
      key: `PEER-${Math.floor(Math.random() * 1000)}`,
      self: `https://your-jira-instance.atlassian.net/rest/api/2/issue/${Math.floor(Math.random() * 10000)}`,
      success: true
    };
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return mockApiResponse;
  } catch (error) {
    console.error('Error creating JIRA ticket:', error);
    throw error;
  }
};

/**
 * Formats card data into a JIRA ticket description
 * @param data - The card data to format
 * @returns Formatted description string
 */
export const formatJiraDescription = (data: JiraTicketData): string => {
  const { cardId, category, approvalCount, rejectionCount, suggestions } = data;
  
  // Create a detailed description for the JIRA ticket
  let description = `
*Card ID:* ${cardId}
*Category:* ${category}
*Approval Count:* ${approvalCount}
*Rejection Count:* ${rejectionCount}

h2. Suggestions
`;

  // Add all suggestions to the description
  if (suggestions.length > 0) {
    suggestions.forEach(suggestion => {
      description += `
----
*Suggestion:* ${suggestion.suggestion}
*By:* ${suggestion.author}
*Date:* ${suggestion.date}
----
`;
    });
  } else {
    description += "\nNo suggestions available.";
  }
  
  return description;
};
