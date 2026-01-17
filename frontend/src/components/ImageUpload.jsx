import React, { useState, useCallback } from 'react';

const ImageUpload = ({ onUpload, isLoading }) => {
    const [dragActive, setDragActive] = useState(false);

    const handleDrag = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    }, []);

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            if (file.type.startsWith("image/")) {
                onUpload(file);
            } else {
                alert("Please upload an image file (JPG, PNG).");
            }
        }
    }, [onUpload]);

    const handleChange = useCallback((e) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            onUpload(e.target.files[0]);
        }
    }, [onUpload]);

    return (
        <div
            className={`relative w-full p-10 border-2 border-dashed rounded-2xl transition-all duration-300 ease-out group
                ${dragActive
                    ? "border-blue-500 bg-blue-50/50 scale-[1.02] shadow-xl ring-4 ring-blue-100"
                    : "border-gray-200 bg-white hover:border-blue-400 hover:bg-gray-50 hover:shadow-lg hover:-translate-y-1"
                }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
        >
            <input
                type="file"
                id="image-input"
                className="hidden"
                accept="image/*"
                onChange={handleChange}
                disabled={isLoading}
            />

            <label
                htmlFor="image-input"
                className="flex flex-col items-center justify-center cursor-pointer h-full py-6"
            >
                <div className={`p-5 rounded-full mb-5 transition-all duration-300 ${dragActive ? "bg-blue-100 text-blue-600 scale-110" : "bg-gray-100 text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-500"}`}>
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                </div>
                <p className="text-xl font-semibold text-gray-700 mb-2 group-hover:text-gray-900 transition-colors">
                    Drop your image here
                </p>
                <p className="text-sm text-gray-500 flex items-center">
                    <span className="bg-white px-2 py-1 rounded border border-gray-200 shadow-sm text-xs font-mono mr-2 group-hover:border-blue-200 hover:text-blue-600 transition-colors">JPG</span>
                    <span className="bg-white px-2 py-1 rounded border border-gray-200 shadow-sm text-xs font-mono group-hover:border-blue-200 hover:text-blue-600 transition-colors">PNG</span>
                    <span className="mx-2">or</span>
                    <span className="text-blue-600 font-medium hover:underline decoration-2 underline-offset-2">browse files</span>
                </p>
            </label>

            {dragActive && (
                <div className="absolute inset-0 w-full h-full bg-blue-500/5 rounded-2xl pointer-events-none backdrop-blur-[1px]"></div>
            )}
        </div>
    );
};

export default ImageUpload;
