# iOS Style Memoji Generator

An AI-powered web application that generates custom iOS-style Memoji emojis based on text descriptions. The application uses Stable Diffusion XL with a specialized emoji LoRA model to create high-quality, stylized emoji artwork.

![App Screenshot](frontend/public/app-screenshot.png)

## Features

- 🎨 Generate custom iOS-style Memojis from text descriptions
- 🖼️ High-quality image generation using Stable Diffusion XL
- 💾 Multiple download formats (PNG, JPEG, WEBP)
- 🎭 Interactive loading animation with random emojis
- 📱 Responsive design for mobile and desktop
- 🚀 Efficient caching of previously generated images

## Tech Stack

### Frontend
- React.js
- CSS3 with custom animations
- Base64 image handling
- Canvas API for image format conversion

### Backend
- Python
- Stable Diffusion XL
- Hugging Face Transformers
- ModelBit for deployment
- Custom emoji LoRA model

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Python 3.11 (for backend development)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/ios-memoji-generator.git
cd ios-memoji-generator
```

2. Install frontend dependencies:
```bash
cd frontend
npm install
```

3. Start the development server:
```bash
npm start
```

The application will be available at `http://localhost:3000`

### Backend Development

1. Install Python dependencies:
```bash
pip install -r backend/requirements.txt
```

2. Open the Jupyter notebook:
```bash
jupyter notebook backend/Memoji\ Generator\ Model.ipynb
```

## Usage

1. Enter a description of the emoji you want to generate in the input field
2. Click the "Generate" button
3. Wait for the generation process to complete
4. Once generated, select your preferred download format
5. Click the "Download" button to save your emoji

## API Reference

The application uses a ModelBit-hosted API endpoint:
```
POST https://testtest.us-east-1.aws.modelbit.com/v1/emoji_generator/latest
```

Request body:
```json
{
  "data": "your emoji description"
}
```

Response:
```json
{
  "data": "base64_encoded_image"
}
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Stable Diffusion XL for the base image generation model
- The creators of the emoji LoRA model
- ModelBit for hosting the inference API

## Note

The first generation might take a few minutes as the server warms up (cold start). Subsequent generations will be faster.
