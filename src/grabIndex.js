const { Client } = require('@elastic/elasticsearch');


async function getIndexDefinition(connectionString, indexName, username, password) {
    //const indexName = "search_items"; // Replace with the actual index name
    const client = new Client({
        node: connectionString,
        auth: {
            username: username,
            password: password
        }
    });

    try {
        const response = await client.indices.get({ index: indexName });
        console.log('Response:', JSON.stringify(response, null, 2));
        return JSON.stringify(response.search_items); // Return the response body
    } catch (error) {
        console.error(`Error getting index definition: ${error.message}`);
        throw error;
    }
}

module.exports = getIndexDefinition;
