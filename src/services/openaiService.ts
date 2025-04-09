/**
 * OpenAI Integration Service
 * Handles interactions with the OpenAI API
 */

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

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
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are a helpful product manager that writes product requirement documents. Format your response in clear, structured sections with markdown formatting."
          },
          {
            role: "user",
            content: `Please create a detailed PRD based on the following information. Include sections for Overview, Objectives, Requirements, and any other relevant sections. Format the response in markdown:

${content}`
          }
        ],
        temperature: 0.7,
        max_tokens: 2000
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

