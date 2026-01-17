import React, { useState } from 'react';
import ImageUpload from './components/ImageUpload';
import ResultsDisplay from './components/ResultsDisplay';
import { analyzeImage } from './services/api';

function App() {
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);

  const handleUpload = async (file) => {
    setIsLoading(true);
    setError(null);
    setResults(null);
    setCurrentImage(URL.createObjectURL(file));

    try {
      const data = await analyzeImage(file);
      setResults(data);
    } catch (err) {
      console.error(err);
      setError("Analysis failed. Please try again or check the backend connection.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-12 font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-header shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto py-5 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white p-2 rounded-lg shadow-md">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 tracking-tight">
                AI Visual Inspector
              </h1>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-widest mt-0.5">
                Powered by Google Gemini
              </p>
            </div>
          </div>
          <div className="hidden md:block">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
              v1.0.0
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Left Column: Upload & Preview */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Input Image</h2>
              <ImageUpload onUpload={handleUpload} isLoading={isLoading} />

              {currentImage && (
                <div className="mt-6">
                  <p className="text-sm font-medium text-gray-700 mb-2">Detailed View:</p>
                  <div className="relative rounded-lg overflow-hidden shadow-lg border border-gray-200 bg-black">
                    <img src={currentImage} alt="Analysis Target" className="w-full h-auto object-contain max-h-[500px]" />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Results & Status */}
          <div className="space-y-6">
            {isLoading && (
              <div className="bg-white p-12 rounded-xl shadow-sm text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600 font-medium">Analyzing visual data...</p>
                <p className="text-xs text-gray-400 mt-2">Detecting objects • Assessing risks • Generating reasoning</p>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-red-700 flex items-center">
                <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                {error}
              </div>
            )}

            {results && !isLoading && (
              <ResultsDisplay results={results} />
            )}

            {!results && !isLoading && !error && !currentImage && (
              <div className="flex flex-col items-center justify-center h-64 text-gray-400 border-2 border-dashed border-gray-200 rounded-xl">
                <p>Analysis results will appear here</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
