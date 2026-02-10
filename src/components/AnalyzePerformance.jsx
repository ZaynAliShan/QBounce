import React from 'react'
import { FaMagic, FaVideo, FaArrowUp } from 'react-icons/fa'

const AnalyzePerformance = () => {
  return (
    <div 
      className="relative w-full max-w-xs sm:max-w-sm rounded-xl overflow-hidden"
      style={{
        opacity: 0.75,
        zIndex: 30,
        position: 'relative',
        transform: 'scale(0.6)',
        transformOrigin: 'right center',
      }}
    >
      {/* Gradient Background */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to right, rgb(126, 34, 206) 0%, rgb(30, 58, 138) 30%, rgb(96, 165, 250) 100%)'
        }}
      ></div>
      
      {/* Content */}
      <div className="relative z-10 p-6">
        {/* Top Label */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-200/20 backdrop-blur-sm mb-4">
          <FaMagic className="w-3 h-3 text-white" />
          <span className="text-white text-xs font-medium">AI-Powered Analysis</span>
        </div>

        {/* Title */}
        <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
          Analyze My Performance
        </h3>

        {/* Description */}
        <p 
          className="text-white/90 text-sm md:text-base mb-6 leading-relaxed"
          style={{ width: '101%' }}
        >
          Upload your jumpshot or shoot around footage and get AI-powered insights to improve your skills
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 w-full">
          {/* Record Live Button */}
          <button className="flex items-center justify-center gap-2 px-4 py-2 bg-white rounded-lg hover:bg-gray-100 transition-colors duration-200 w-full sm:flex-1">
            <FaVideo className="w-4 h-4 text-blue-800" />
            <span className="text-blue-800 font-semibold text-sm">Record Live</span>
          </button>

          {/* Upload Button */}
          <button className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg hover:from-blue-700 hover:to-blue-500 transition-all duration-200 w-full sm:flex-1">
            <FaArrowUp className="w-4 h-4 text-white" />
            <span className="text-white font-semibold text-sm">Upload</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default AnalyzePerformance
