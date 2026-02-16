import React from 'react';
import { Eye, Sparkles, Smile } from 'lucide-react';

export default function FeaturesSection() {
    return (
        <div className="mt-16 grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Eye className="w-6 h-6 text-blue-600" />
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
    );
}
