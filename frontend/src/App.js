import { useState } from 'react';
import './App.css';

function App() {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [generatedImage, setGeneratedImage] = useState('');
  const [downloadFormat, setDownloadFormat] = useState('png');

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

  const convertBase64ToFormat = async (base64String, format) => {
    const img = new Image();
    img.src = `data:image/webp;base64,${base64String}`;
    
    return new Promise((resolve, reject) => {
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        
        const dataUrl = canvas.toDataURL(`image/${format}`);
        resolve(dataUrl);
      };
      img.onerror = reject;
    });
  };

  const handleDownload = async () => {
    if (generatedImage) {
      try {
        const dataUrl = await convertBase64ToFormat(generatedImage, downloadFormat);
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = `generated-emoji.${downloadFormat}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (err) {
        setError('Error downloading image: ' + err.message);
      }
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
            <div className="download-controls">
              <select 
                value={downloadFormat} 
                onChange={(e) => setDownloadFormat(e.target.value)}
                className="format-select"
              >
                <option value="png">PNG</option>
                <option value="jpeg">JPEG</option>
                <option value="webp">WEBP</option>
              </select>
              <button 
                className="App-button download-button" 
                onClick={handleDownload}
              >
                Download
              </button>
            </div>
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
