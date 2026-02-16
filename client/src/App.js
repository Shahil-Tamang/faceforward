import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Login from './components/Login';
import Signup from './components/Signup';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ImageUploader from './components/ImageUploader';
import AnalysisResults from './components/AnalysisResults';
import FeaturesSection from './components/FeaturesSection';
import Footer from './components/Footer';
import { logout } from './redux/authSlice';
import { toast } from 'react-hot-toast';
import { validateFile, processImageFile } from './utils/imageUtils';

function FaceForward() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const fileInputRef = useRef(null);
  const dragCounter = useRef(0);

  // Redux hooks
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [showAuthModal, setShowAuthModal] = useState(!user);
  const [authMode, setAuthMode] = useState('login');

  // --- Handlers ---

  const handleImageUpload = (e) => {
    const files = e.target.files;
    processFiles(files);
  };

  const processFiles = async (files) => {
    for (let i = 0; i < files.length; i++) {
      const result = validateFile(files[i]);
      if (!result.valid) {
        setErrorMessage(result.error);
        return;
      }
    }

    try {
      const { base64, resizedFile } = await processImageFile(files[0]);
      setSelectedImage(base64);
      setResults(null);
      setUploadedFiles([resizedFile]);
      setErrorMessage(null);
    } catch (err) {
      setErrorMessage(err.message);
    }
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
    setAnalyzing(true);

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
  };

  // --- Render ---

  if (showAuthModal && !user) {
    if (authMode === 'login') {
      return <Login onSwitchToSignup={() => setAuthMode('signup')} />;
    }
    return <Signup onSwitchToLogin={() => setAuthMode('login')} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-blue-100">
      <Header userName={user?.name} onLogout={handleLogout} />

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {!selectedImage && <HeroSection />}

        <div className="grid md:grid-cols-2 gap-8">
          <ImageUploader
            selectedImage={selectedImage}
            analyzing={analyzing}
            errorMessage={errorMessage}
            isDragging={isDragging}
            fileInputRef={fileInputRef}
            onImageUpload={handleImageUpload}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onAnalyze={analyzeImage}
            onClearError={() => setErrorMessage(null)}
          />
          <AnalysisResults analyzing={analyzing} results={results} />
        </div>

        <FeaturesSection />
      </main>

      <Footer />
    </div>
  );
}

export default FaceForward;