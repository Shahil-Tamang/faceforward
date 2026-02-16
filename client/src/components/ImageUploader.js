import React from 'react';
import { Camera, Upload } from 'lucide-react';

export default function ImageUploader({
    selectedImage,
    analyzing,
    errorMessage,
    isDragging,
    fileInputRef,
    onImageUpload,
    onDragOver,
    onDragLeave,
    onDrop,
    onAnalyze,
    onClearError,
}) {
    return (
        <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-xl font-semibold mb-6 flex items-center">
                <Camera className="w-6 h-6 mr-2 text-blue-600" />
                Upload Your Photo
            </h3>

            {!selectedImage ? (
                <>
                    <div
                        onClick={() => fileInputRef.current?.click()}
                        onDragOver={onDragOver}
                        onDragLeave={onDragLeave}
                        onDrop={onDrop}
                        className={`border-3 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all duration-300 transform ${isDragging
                            ? 'border-blue-500 bg-blue-100 scale-105 shadow-lg'
                            : 'border-blue-300 hover:border-blue-500 hover:bg-blue-50'
                            }`}
                    >
                        <Upload className={`w-16 h-16 mx-auto mb-4 transition-colors ${isDragging ? 'text-blue-600' : 'text-blue-400'
                            }`} />
                        <p className="text-gray-600 mb-2 font-medium">Click to upload or drag and drop</p>
                        <p className="text-sm text-gray-500">PNG, JPG up to 10MB</p>
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
                                onClearError();
                            }}
                            className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                        >
                            Change Photo
                        </button>
                        <button
                            onClick={onAnalyze}
                            disabled={analyzing}
                            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
                        >
                            {analyzing ? 'Analyzing...' : 'Analyze Features'}
                        </button>
                    </div>
                </div>
            )}

            <input
                ref={fileInputRef}
                type="file"
                accept=".jpg,.jpeg,.png,image/jpeg,image/png"
                onChange={onImageUpload}
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
    );
}
