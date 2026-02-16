import React from 'react';
import { Sparkles, Eye } from 'lucide-react';

export default function AnalysisResults({ analyzing, results }) {
    return (
        <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-xl font-semibold mb-6 flex items-center">
                <Sparkles className="w-6 h-6 mr-2 text-blue-600" />
                Your Personalized Recommendations
            </h3>

            {analyzing && (
                <div className="flex flex-col items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mb-4"></div>
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
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Sparkles className="w-8 h-8 text-blue-600" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">{results.message}</h4>
                    <p className="text-gray-600">{results.status}</p>
                </div>
            )}
        </div>
    );
}
