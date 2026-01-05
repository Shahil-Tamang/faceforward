import React, { useState, useRef } from 'react';
import { Camera, Upload, Sparkles, Eye, Smile, Users } from 'lucide-react';

export default function FaceForward() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
        setResults(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
        setResults(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = () => {
    setAnalyzing(true);
    // TODO: Your backend team will implement the API call here
    // Example:
    // const formData = new FormData();
    // formData.append('image', selectedImage);
    // fetch('/api/analyze', { method: 'POST', body: formData })
    //   .then(res => res.json())
    //   .then(data => setResults(data))
    //   .finally(() => setAnalyzing(false));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-8 h-8 text-purple-600" />
              <h1 className="text-2xl font-bold text-gray-900">FaceForward</h1>
            </div>
            
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Hero Section */}
        {!selectedImage && (
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Discover Your Perfect Look
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Upload your photo and let our AI analyze your unique facial features to provide
              personalized makeup and styling recommendations that boost your confidence.
            </p>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-xl font-semibold mb-6 flex items-center">
              <Camera className="w-6 h-6 mr-2 text-purple-600" />
              Upload Your Photo
            </h3>

            {!selectedImage ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border-3 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all ${
                  isDragging 
                    ? 'border-purple-500 bg-purple-100' 
                    : 'border-purple-300 hover:border-purple-500 hover:bg-purple-50'
                }`}
              >
                <Upload className="w-16 h-16 mx-auto text-purple-400 mb-4" />
                <p className="text-gray-600 mb-2">Click to upload or drag and drop</p>
                <p className="text-sm text-gray-500">PNG, JPG up to 10MB</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative rounded-xl overflow-hidden">
                  <img
                    src={selectedImage}
                    alt="Uploaded"
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Change Photo
                  </button>
                  <button
                    onClick={analyzeImage}
                    disabled={analyzing}
                    className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:bg-purple-400 disabled:cursor-not-allowed"
                  >
                    {analyzing ? 'Analyzing...' : 'Analyze Features'}
                  </button>
                </div>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />

            {/* Guidelines */}
            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Tips for Best Results:</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Use a clear, front-facing photo</li>
                <li>• Ensure good lighting</li>
                <li>• Show neutral facial expression</li>
                <li>• Remove glasses or masks if possible</li>
              </ul>
            </div>
          </div>

          {/* Results Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-xl font-semibold mb-6 flex items-center">
              <Sparkles className="w-6 h-6 mr-2 text-purple-600" />
              Your Personalized Recommendations
            </h3>

            {analyzing && (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-200 border-t-purple-600 mb-4"></div>
                <p className="text-gray-600">Analyzing your facial features...</p>
              </div>
            )}

            {!analyzing && !results && (
              <div className="text-center py-12 text-gray-500">
                <Eye className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p>Upload a photo and click "Analyze Features" to get your personalized recommendations</p>
              </div>
            )}

            {results && !analyzing && (
              <div className="space-y-6">
                {/* Facial Features Detected */}
                <div className="bg-purple-50 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-900 mb-3">Detected Features</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white rounded p-3">
                      <p className="text-xs text-gray-600">Face Shape</p>
                      <p className="font-semibold text-gray-900">{results.faceShape}</p>
                    </div>
                    <div className="bg-white rounded p-3">
                      <p className="text-xs text-gray-600">Eye Type</p>
                      <p className="font-semibold text-gray-900">{results.eyeType}</p>
                    </div>
                    <div className="bg-white rounded p-3">
                      <p className="text-xs text-gray-600">Lip Shape</p>
                      <p className="font-semibold text-gray-900">{results.lipShape}</p>
                    </div>
                    <div className="bg-white rounded p-3">
                      <p className="text-xs text-gray-600">Skin Tone</p>
                      <p className="font-semibold text-gray-900">{results.skinTone}</p>
                    </div>
                  </div>
                </div>

                {/* Recommendations */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">Makeup Recommendations</h4>
                  
                  <div className="border-l-4 border-pink-400 pl-4 py-2">
                    <h5 className="font-semibold text-pink-900 mb-1">💄 Lipstick</h5>
                    <p className="text-sm text-gray-700">{results.recommendations.lipstick}</p>
                  </div>

                  <div className="border-l-4 border-purple-400 pl-4 py-2">
                    <h5 className="font-semibold text-purple-900 mb-1">👁️ Eyeshadow</h5>
                    <p className="text-sm text-gray-700">{results.recommendations.eyeshadow}</p>
                  </div>

                  <div className="border-l-4 border-rose-400 pl-4 py-2">
                    <h5 className="font-semibold text-rose-900 mb-1">🌸 Blush</h5>
                    <p className="text-sm text-gray-700">{results.recommendations.blush}</p>
                  </div>

                  <div className="border-l-4 border-blue-400 pl-4 py-2">
                    <h5 className="font-semibold text-blue-900 mb-1">✨ Accessories</h5>
                    <p className="text-sm text-gray-700">{results.recommendations.accessories}</p>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-900">
                    <strong>Remember:</strong> These are personalized suggestions to enhance your natural beauty. 
                    Feel free to experiment and find what makes you feel most confident!
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Eye className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Facial Analysis</h3>
            <p className="text-sm text-gray-600">Advanced AI detection of 68+ facial landmarks</p>
          </div>

          <div className="bg-white rounded-xl shadow p-6 text-center">
            <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-6 h-6 text-pink-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Personalized Tips</h3>
            <p className="text-sm text-gray-600">Custom recommendations using RAG-powered AI</p>
          </div>

          <div className="bg-white rounded-xl shadow p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Smile className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Boost Confidence</h3>
            <p className="text-sm text-gray-600">Embrace your unique features with expert guidance</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-600">
            © 2026 All Rights Reserved
          </p>
        </div>
      </footer>
    </div>
  );
}