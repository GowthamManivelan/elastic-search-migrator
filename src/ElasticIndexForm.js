import React, { useState } from 'react';
import axios from 'axios';
import CONSTANTS from './constants';

const ElasticIndexForm = ({ onMigrationComplete, setMigrationResult }) => {
  const [elasticInstance, setElasticInstance] = useState('');
  const [userNameInstance, setUserNameInstance] = useState('');
  const [passwordInstance, setPasswordInstance] = useState('');
  const [elasticIndex, setElasticIndexInstance] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Construct the payload for the API call
    const payload = {
      elasticInstance: elasticInstance,
      userName: userNameInstance,
      password: passwordInstance,
      indexName: elasticIndex,
    };

    try {
      // Make an API call to your backend endpoint
      setMigrationResult('Connecting to Elastic Instance and OpenAI. Migration in progress...');
      const response = await axios.post(CONSTANTS.INDEX_ENDPOINT, payload);
      const mongodbSchema = response.data.mongoDBIndexEquivalent;
      const res = JSON.stringify(response)
      onMigrationComplete(mongodbSchema)
      setMigrationResult('Migration completed successfully.')
    } catch (error) {
      onMigrationComplete('An error occurred during migration.' + error);
      setMigrationResult('An error occurred during migration: ' + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Elastic Instance Connection String:
          <input
            type="text"
            value={elasticInstance}
            onChange={(e) => setElasticInstance(e.target.value)}
            required
          />
        </label>
      </div>

      <div>
        <label>
          ElasticSearch Index Name:
          <input
            type="text"
            value={elasticIndex}
            onChange={(e) => setElasticIndexInstance(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Enter UserName:
          <input
            type="text"
            value={userNameInstance}
            onChange={(e) => setUserNameInstance(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Enter Password:
          <input
            type="text"
            value={passwordInstance}
            onChange={(e) => setPasswordInstance(e.target.value)}
            required
          />
        </label>
      </div>
      <button type="submit">Get Atlas Search Index</button>
    </form>

  );

};

export default ElasticIndexForm;
