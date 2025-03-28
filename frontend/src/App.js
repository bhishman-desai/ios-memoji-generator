import { useState } from 'react';
import './App.css';

function App() {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [generatedImage, setGeneratedImage] = useState('');

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('Please enter a description');
      return;
    }

    setLoading(true);
    setError('');
    setGeneratedImage('');

    try {
      const response = await fetch('https://testtest.us-east-1.aws.modelbit.com/v1/emoji_generator/latest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: prompt }),
      });

      const result = await response.json();
      if (result.data) {
        setGeneratedImage(result.data);
      } else {
        setError('Failed to generate image');
      }
    } catch (err) {
      setError('Error generating image: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">iOS Style Memoji Generator</h1>
        <div className="input-container">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe the emoji you want to generate..."
            className="App-input"
          />
          <button 
            className="App-button" 
            onClick={handleGenerate}
            disabled={loading}
          >
            {loading ? 'Generating...' : 'Generate'}
          </button>
        </div>

        {error && <p className="error-message">{error}</p>}
        
        {generatedImage && (
          <div className="image-container">
            <img 
              src={`data:image/webp;base64,${generatedImage}`}
              alt="Generated emoji"
              className="generated-image"
            />
          </div>
        )}
      </header>
      
      <footer className="App-footer">
        <p>Note: This application uses a cold server. The first generation might take a few minutes as the server warms up.</p>
      </footer>
    </div>
  );
}

export default App;
