import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Camera, Upload, Sparkles, Eye, Smile, LogOut, CreditCard } from 'lucide-react';
import Login from './components/Login';
import Signup from './components/Signup';
import SubscriptionPlans from './components/SubscriptionPlans';
import { logout } from './redux/authSlice';
import { decrementAnalyses } from './redux/subscriptionSlice';
import { Toaster, toast } from 'react-hot-toast';

function FaceForward() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [currentView, setCurrentView] = useState('analyze'); // 'analyze', 'subscription'
  const [errorMessage, setErrorMessage] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const fileInputRef = useRef(null);
  const dragCounter = useRef(0);

  // Redux hooks
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { analysesRemaining, plan, maxAnalysesPerMonth } = useSelector((state) => state.subscription);
  const [showAuthModal, setShowAuthModal] = useState(!user);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'signup'

  const validateFile = (file) => {
    const maxSize = 10 * 1024 * 1024; // 10MB
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

    if (!validTypes.includes(file.type)) {
      setErrorMessage('Invalid file type. Please upload JPG, PNG, GIF, or WebP images.');
      return false;
    }

    if (file.size > maxSize) {
      setErrorMessage('File is too large. Maximum size is 10MB.');
      return false;
    }

    setErrorMessage(null);
    return true;
  };

  const handleImageUpload = (e) => {
    const files = e.target.files;
    processFiles(files);
  };

  const processFiles = (files) => {
    const validFiles = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (validateFile(file)) {
        validFiles.push(file);
      }
    }

    if (validFiles.length === 0) return;

    // Process the first valid file
    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedImage(reader.result);
      setResults(null);
      setUploadedFiles([validFiles[0]]);
    };
    reader.onerror = () => {
      setErrorMessage('Error reading file. Please try again.');
    };
    reader.readAsDataURL(validFiles[0]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current++;
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current--;
    if (dragCounter.current === 0) {
      setIsDragging(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current = 0;
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      processFiles(files);
    } else {
      setErrorMessage('No files detected. Please drag and drop image files.');
    }
  };

  const analyzeImage = () => {
    if (analysesRemaining <= 0) {
      alert('You\'ve reached your monthly limit. Upgrade your plan!');
      setCurrentView('subscription');
      return;
    }

    setAnalyzing(true);
    dispatch(decrementAnalyses());

    // Simulate API call
    setTimeout(() => {
      setResults({
        message: 'Analysis Complete',
        status: 'Backend ra ML ko Integration baki',
      });
      setAnalyzing(false);
    }, 2000);
  };

  const handleLogout = () => {
    dispatch(logout());
    toast.success('Logged out successfully');
    setShowAuthModal(true);
    setAuthMode('login');
    setCurrentView('analyze');
  };

  const renderContent = () => {
    // Show auth modal if not logged in
    if (showAuthModal && !user) {
      if (authMode === 'login') {
        return (
          <Login
            onSwitchToSignup={() => setAuthMode('signup')}
          />
        );
      } else {
        return (
          <Signup
            onSwitchToLogin={() => setAuthMode('login')}
          />
        );
      }
    }

    // Show subscription plans if that view is selected
    if (currentView === 'subscription') {
      return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
          {/* Header */}
          <header className="bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setCurrentView('analyze')}
                  className="flex items-center space-x-2 hover:opacity-70"
                >
                  <Sparkles className="w-8 h-8 text-purple-600" />
                  <h1 className="text-2xl font-bold text-gray-900">FaceForward</h1>
                </button>
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium text-gray-700">{user?.name}</span>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            </div>
          </header>
          <SubscriptionPlans />
        </div>
      );
    }

    // Main view
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
        {/* Header */}
        <header className="bg-white shadow-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="flex items-center space-x-2 hover:opacity-70 transition-opacity"
              >
                <Sparkles className="w-8 h-8 text-purple-600" />
                <h1 className="text-2xl font-bold text-gray-900">FaceForward</h1>
              </button>

              <div className="flex items-center space-x-4">
                {/* Plan Badge */}
                <div className="hidden sm:block px-4 py-2 bg-purple-50 rounded-lg">
                  <p className="text-xs text-gray-600">Plan: <span className="font-bold text-purple-600 capitalize">{plan}</span></p>
                  {plan !== 'enterprise' && (
                    <p className="text-xs text-gray-600">Analyses: <span className="font-bold">{analysesRemaining}/{maxAnalysesPerMonth}</span></p>
                  )}
                </div>

                {/* User Menu */}
                <div className="flex items-center space-x-3">
                  <span className="hidden sm:inline text-sm font-medium text-gray-700">{user?.name}</span>

                  <button
                    onClick={() => setCurrentView('subscription')}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Upgrade plan"
                  >
                    <CreditCard className="w-5 h-5 text-gray-600" />
                  </button>

                  <button
                    onClick={handleLogout}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Logout"
                  >
                    <LogOut className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
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
                <>
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`border-3 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all duration-300 transform ${isDragging
                        ? 'border-purple-500 bg-purple-100 scale-105 shadow-lg'
                        : 'border-purple-300 hover:border-purple-500 hover:bg-purple-50'
                      }`}
                  >
                    <Upload className={`w-16 h-16 mx-auto mb-4 transition-colors ${isDragging ? 'text-purple-600' : 'text-purple-400'
                      }`} />
                    <p className="text-gray-600 mb-2 font-medium">Click to upload or drag and drop</p>
                    <p className="text-sm text-gray-500">PNG, JPG, GIF, WebP up to 10MB</p>
                  </div>
                  {errorMessage && (
                    <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg flex items-start">
                      <span className="mr-2">⚠️</span>
                      <span className="text-sm">{errorMessage}</span>
                    </div>
                  )}
                </>
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
                      onClick={() => {
                        fileInputRef.current?.click();
                        setErrorMessage(null);
                      }}
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
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-8 h-8 text-purple-600" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">{results.message}</h4>
                  <p className="text-gray-600">{results.status}</p>
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
  };

  return (
    <>
      {renderContent()}
      <Toaster position="top-center" />
    </>
  );
}

export default FaceForward;