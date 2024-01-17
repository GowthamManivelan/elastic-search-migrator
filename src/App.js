import React, { useState } from 'react';
import ElasticIndexForm from './ElasticIndexForm';
import './App.css';
import bgImage from './bg.png';

function App() {
  const [migrationResult, setMigrationResult] = useState('');
  const [mongodbSchema, setMongoDBSchema] = useState('')


  const handleMigrationComplete = (result) => {

    // Handle the result of migration here
    setMongoDBSchema(result);
    setMigrationResult('Migration Successful')
  };

  return (
    <div className="App" style={{ backgroundImage: `url(${bgImage})` }}>
      <h1>Elastic Search to Atlas Search Migrator</h1>

      <ElasticIndexForm onMigrationComplete={handleMigrationComplete}
        setMigrationResult={setMigrationResult} />
      {migrationResult && (
        <div className="progress-message">
          <p>{migrationResult}</p>
        </div>
      )}
      <div className="mongodb-schema-display">
        <h2>Generated MongoDB Schema:</h2>
        <textarea
          value={mongodbSchema}
          readOnly
          className="mongodb-schema-textarea" // Adjust the size as needed
        />
      </div>
    </div>


  );
}
export default App;