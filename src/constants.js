export const OPENAI_API_KEY = 'a7e225a5012c45a4bd2a530360e00507';
export const OPENAI_ENDPOINT = 'https://chicagofireopenai.openai.azure.com/openai/deployments/ChicagoFireGPT4model/chat/completions?api-version=2023-07-01-preview';
//export const ELASTIC_USERNAME = 'elastic'; // Replace with your actual username
//export const ELASTIC_PASSWORD = 'uQFTxSsR7Kmh72PAGM5mplDv'; // Replace with your actual password
//Export const ELASTIC_CONNECTION_STRING =" https://test-deployment-01564d.es.eastus2.azure.elastic-cloud.com/"


export const INDEX_ENDPOINT = 'http://localhost:3001/convert-index'
export const OPENAI_SYSTEM_PROMPT = 'You are an AI code generator assistant and expert in mongodb and elastic search indexes'
export const OPENAI_USER_PROMPT = 'Generate the MongoDB atlas search index code from the following Elasticsearch index definition:'
export const OPENAI_MAX_TOKENS = 800


const CONSTANTS = {
    OPENAI_API_KEY,
    OPENAI_ENDPOINT,
    INDEX_ENDPOINT,
    OPENAI_SYSTEM_PROMPT,
    OPENAI_USER_PROMPT,
    OPENAI_MAX_TOKENS
};

export default CONSTANTS;

