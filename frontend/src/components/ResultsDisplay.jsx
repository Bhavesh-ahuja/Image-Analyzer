import React from 'react';
import RiskCard from './RiskCard';

const ResultsDisplay = ({ results }) => {
    if (!results) return null;

    return (
        <div className="w-full space-y-8 animate-fade-in pb-10">
            {/* Scene Summary */}
            <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-8 border border-gray-100 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-full -mr-12 -mt-12 group-hover:bg-blue-100 transition-colors"></div>
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center relative z-10">
                    <span className="p-2 bg-blue-100 text-blue-600 rounded-lg mr-3 shadow-sm">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                    </span>
                    Scene Summary
                </h2>
                <p className="text-gray-700 leading-relaxed text-lg">{results.scene}</p>
            </div>

            {/* Detected Objects */}
            <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-8 border border-gray-100 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                    <span className="p-2 bg-emerald-100 text-emerald-600 rounded-lg mr-3 shadow-sm">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                        </svg>
                    </span>
                    Detected Objects
                </h2>
                <div className="flex flex-wrap gap-3">
                    {results.objects.map((obj, index) => (
                        <span
                            key={index}
                            className="px-4 py-2 bg-emerald-50 text-emerald-700 text-sm font-semibold rounded-xl border border-emerald-100 shadow-sm hover:shadow transition-shadow hover:bg-emerald-100 cursor-default"
                        >
                            {obj}
                        </span>
                    ))}
                </div>
            </div>

            {/* Risk Analysis */}
            <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center px-2">
                    <span className="p-2 bg-rose-100 text-rose-600 rounded-lg mr-3 shadow-sm">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                        </svg>
                    </span>
                    Safety Risks
                </h2>
                {results.risks && results.risks.length > 0 ? (
                    <div className="space-y-4">
                        {results.risks.map((risk, idx) => (
                            <RiskCard key={idx} risk={risk} />
                        ))}
                    </div>
                ) : (
                    <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100 text-emerald-800 flex items-center shadow-sm">
                        <svg className="w-6 h-6 mr-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <div>
                            <p className="font-semibold">Safe Environment</p>
                            <p className="text-sm opacity-90">No immediate safety risks were detected in this image.</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Unified AI Reasoning */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-lg p-8 text-white border border-slate-700 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                    <span className="p-2 bg-white/10 rounded-lg mr-3 backdrop-blur-sm">
                        <svg className="w-5 h-5 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                    </span>
                    AI Reasoning
                </h2>
                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                    <p className="text-gray-100 leading-relaxed text-lg font-light tracking-wide opacity-90">
                        {results.ai_reasoning}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ResultsDisplay;
