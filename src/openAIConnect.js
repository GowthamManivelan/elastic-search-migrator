
const { Client } = require('@elastic/elasticsearch');
const axios = require('axios');
const OPENAI_API_KEY = 'a7e225a5012c45a4bd2a530360e00507';
const OPENAI_ENDPOINT = 'https://chicagofireopenai.openai.azure.com/openai/deployments/ChicagoFireGPT4model/chat/completions?api-version=2023-07-01-preview';
//export const ELASTIC_USERNAME = 'elastic'; // Replace with your actual username
//export const ELASTIC_PASSWORD = 'uQFTxSsR7Kmh72PAGM5mplDv'; // Replace with your actual password
//Export const ELASTIC_CONNECTION_STRING =" https://test-deployment-01564d.es.eastus2.azure.elastic-cloud.com/"


const INDEX_ENDPOINT = 'http://localhost:3001/convert-index'
const OPENAI_SYSTEM_PROMPT = 'You are an AI code generator assistant and expert in mongodb and elastic search indexes'
const OPENAI_USER_PROMPT = 'Generate the MongoDB atlas search index code from the following Elasticsearch index definition:'
const OPENAI_MAX_TOKENS = 800

// Replace 'your_openai_api_key' with your actual OpenAI API key
const openaiApiKey = OPENAI_API_KEY;
const openaiEndpoint = OPENAI_ENDPOINT; // Adjust the endpoint as needed

async function makeOpenAIRequest(elasticIndex) {
    try {
        const indexAsString = typeof elasticIndex === 'object' ? JSON.stringify(elasticIndex) : elasticIndex;
        const requestBody = {
            messages: [
                {
                    role: "system",
                    content: OPENAI_SYSTEM_PROMPT
                },
                {
                    role: "user",
                    content: OPENAI_USER_PROMPT + ": " + indexAsString
                }
            ],
            max_tokens: OPENAI_MAX_TOKENS
        };

        const response = await axios.post(openaiEndpoint, requestBody, {
            headers: {
                'Content-Type': 'application/json',
                'api-key': openaiApiKey // Ensure this is set correctly
            }
        });
        // Assuming 'response' is the variable that holds the response from the OpenAI API
        const openAIResponse = response.data; // Replace with the actual response from OpenAI API

        if (openAIResponse && openAIResponse.choices && openAIResponse.choices.length > 0) {
            const mongodbEquivalent = openAIResponse.choices[0].message && openAIResponse.choices[0].message.content
                ? openAIResponse.choices[0].message.content
                : null;

            console.log('MongoDB Equivalent:', mongodbEquivalent);
            return mongodbEquivalent
        } else {
            console.log('No choices available in the response');
        }

        // Output the complete response data
    } catch (error) {
        console.error(`Error making OpenAI API request: ${error.response ? error.response.data : error.message}`);
    }
}



// Call the functions
module.exports = {
    makeOpenAIRequest,
};