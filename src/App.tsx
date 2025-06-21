import React, { useState } from 'react';
import { Calculator, Hash, Loader2, CheckCircle, XCircle, Info } from 'lucide-react';
import { CheckSection } from './components/CheckSection';
import { GenerateSection } from './components/GenerateSection';
import { InfoSection } from './components/InfoSection';

function App() {
  const [activeTab, setActiveTab] = useState<'check' | 'generate' | 'info'>('check');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
                <Calculator className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Polydivisible Numbers</h1>
                <p className="text-sm text-gray-600">Explore mathematical sequences across different bases</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex space-x-1 bg-white/60 backdrop-blur-sm rounded-xl p-1 border border-gray-200">
          <button
            onClick={() => setActiveTab('check')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              activeTab === 'check'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
            }`}
          >
            <CheckCircle className="w-4 h-4" />
            <span>Check Number</span>
          </button>
          <button
            onClick={() => setActiveTab('generate')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              activeTab === 'generate'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
            }`}
          >
            <Hash className="w-4 h-4" />
            <span>Generate Numbers</span>
          </button>
          <button
            onClick={() => setActiveTab('info')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              activeTab === 'info'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
            }`}
          >
            <Info className="w-4 h-4" />
            <span>About</span>
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 pb-12">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-lg">
          {activeTab === 'check' && <CheckSection />}
          {activeTab === 'generate' && <GenerateSection />}
          {activeTab === 'info' && <InfoSection />}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white/60 backdrop-blur-sm border-t border-gray-200 mt-12">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center text-gray-600">
            <p className="text-sm">
              Built by Abhishek
            </p>
            <p className="text-xs mt-2 text-gray-500">
              Supports bases 2-100 with efficient backtracking algorithms
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;