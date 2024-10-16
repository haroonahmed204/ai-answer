import { HfInference } from "@huggingface/inference";

const tokens = [
  "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",
  "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",
  "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",
  "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",
  "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",
  "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",
  "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",
  "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",
];

// Variable to track which token is being used
let currentTokenIndex = 0;

// Function to get the current token
function getCurrentToken() {
  return tokens[currentTokenIndex];
}

// Function to rotate to the next token
function rotateToken() {
  currentTokenIndex = (currentTokenIndex + 1) % tokens.length;
  console.log(`Switched to token: ${getCurrentToken()}`);
}

// Function to make API call using HfInference and handle token rotation
async function makeChatCompletion() {
  let token = getCurrentToken();
  let inference = new HfInference(token);

  try {
    // Stream the chat completion using the current token
    for await (const chunk of inference.chatCompletionStream({
      model: "mistralai/Mistral-7B-Instruct-v0.3",
      messages: [{ role: "user", content: "What is the capital of France?" }],
      max_tokens: 500,  // Token limit
    })) {
      process.stdout.write(chunk.choices[0]?.delta?.content || "");
    }
  } catch (error) {
    console.error("Error occurred:", error);

    // Check if the error is related to token expiration or rate limit (status 401 or 429)
    if (error?.response?.status === 429 || error?.response?.status === 401) {
      console.error(`Token ${token} has expired or hit the rate limit. Switching token...`);
      rotateToken(); // Switch to the next token
      return makeChatCompletion(); // Retry with the new token
    } else {
      throw new Error(`Request failed with status: ${error.response?.status}`);
    }
  }
}

// Example usage
makeChatCompletion();
