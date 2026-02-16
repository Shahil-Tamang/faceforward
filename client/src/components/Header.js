import React from 'react';
import { Sparkles, LogOut } from 'lucide-react';

export default function Header({ userName, onLogout }) {
    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    <button
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="flex items-center space-x-2 hover:opacity-70 transition-opacity"
                    >
                        <Sparkles className="w-8 h-8 text-blue-600" />
                        <h1 className="text-2xl font-bold text-gray-900">FaceForward</h1>
                    </button>

                    <div className="flex items-center space-x-4">
                        <span className="hidden sm:inline text-sm font-medium text-gray-700">{userName}</span>

                        <button
                            onClick={onLogout}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            title="Logout"
                        >
                            <LogOut className="w-5 h-5 text-gray-600" />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}
