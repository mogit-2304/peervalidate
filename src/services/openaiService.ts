
/**
 * OpenAI Integration Service
 * Handles interactions with the OpenAI API
 */

const OPENAI_API_KEY = "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";

interface OpenAIResponse {
  choices: {
    message: {
      content: string;
    };
  }[];
  error?: {
    message: string;
  };
}

/**
 * Generates a PRD summary using OpenAI's GPT model
 * @param content The content to summarize into a PRD
 * @returns Promise with the generated PRD content
 */
export const generatePRDSummary = async (content: string): Promise<string> => {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are a helpful product manager that writes product requirement documents."
          },
          {
            role: "user",
            content: `Summarize this content into a PRD, including both the main idea and any additional description provided: ${content}`
          }
        ]
      })
    });
    
    const result: OpenAIResponse = await response.json();
    
    if (result.error) {
      throw new Error(result.error.message || "Error generating PRD");
    }
    
    return result.choices[0].message.content;
  } catch (error) {
    console.error("Error generating PRD:", error);
    throw error;
  }
};

