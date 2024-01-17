const express = require('express');
const cors = require('cors');
const getIndexDefinition = require('./grabIndex'); // Import the function
const { makeOpenAIRequest } = require('./openAIconnect');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.post('/convert-index', async (req, res) => {
    try {
        console.log("Establishing connection to Elastic Instance");
        const elasticString = req.body.elasticInstance;
        const userName = req.body.userName;
        const password = req.body.password;
        const indexName = req.body.indexName;
        console.log('Elasticsearch Connection String:', elasticString);

        // Call the function to get Elastic index definition
        const elasticIndexDefinition = await getIndexDefinition(elasticString, indexName, userName, password);

        console.log('Index Definition:', elasticIndexDefinition);
        // Assuming makeOpenAIRequest is a function that processes the index definition and returns a MongoDB equivalent
        const mongoDBIndexEquivalent = await makeOpenAIRequest(elasticIndexDefinition);

        // Send the MongoDB equivalent back to the React app
        res.json({ mongoDBIndexEquivalent });
    } catch (error) {
        console.error('Error in /convert-index:', error.message);
        res.status(500).send(error.message);
    }
});

app.listen(port, () => {
    console.log('Server is running on http://localhost:3001');
});