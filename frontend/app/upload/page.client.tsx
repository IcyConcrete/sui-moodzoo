'use client';

import React, { useState, useRef, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type Emotion = 'MELANCHOLY' | 'RAGE' | 'TRANQUILITY' | 'CHAOS' | 'CUSTOM' | null;

interface UploadFormData {
  audioFile: File | null;
  emotion: Emotion;
  customEmotion?: string;
  description: string;
}

export default function UploadPageClient() {
  const router = useRouter();
  const [formData, setFormData] = useState<UploadFormData>({
    audioFile: null,
    emotion: null,
    description: '',
  });
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle file selection
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    
    if (file) {
      // Check if file is mp3 or wav
      if (!file.type.match('audio/(mpeg|wav)')) {
        setErrors({...errors, file: 'Only MP3 or WAV files are allowed'});
        return;
      }
      
      // Max file size (10MB)
      if (file.size > 10 * 1024 * 1024) {
        setErrors({...errors, file: 'File size should be less than 10MB'});
        return;
      }
      
      // Clear error if exists
      const newErrors = {...errors};
      delete newErrors.file;
      setErrors(newErrors);
      
      // Set file and simulate upload progress
      setFormData({...formData, audioFile: file});
      simulateUploadProgress();
    }
  };

  // Simulate upload progress
  const simulateUploadProgress = () => {
    setIsUploading(true);
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  // Handle emotion selection
  const handleEmotionSelect = (emotion: Emotion) => {
    setFormData({...formData, emotion});
    
    // Clear error if exists
    const newErrors = {...errors};
    delete newErrors.emotion;
    setErrors(newErrors);
  };

  // Handle description change
  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const description = e.target.value;
    setFormData({...formData, description});
    
    // Clear error if exists
    if (description.trim()) {
      const newErrors = {...errors};
      delete newErrors.description;
      setErrors(newErrors);
    }
  };

  // Handle form submission
  const handleSubmit = () => {
    // Validate form
    const newErrors: Record<string, string> = {};
    
    if (!formData.audioFile) {
      newErrors.file = 'Please upload an audio file';
    }
    
    if (!formData.emotion) {
      newErrors.emotion = 'Please select an emotion';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Please provide a description';
    } else if (formData.description.length > 280) {
      newErrors.description = 'Description should be less than 280 characters';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Store data in localStorage for the generate page to access
    const uploadData = {
      fileName: formData.audioFile?.name,
      fileSize: formData.audioFile?.size,
      fileType: formData.audioFile?.type,
      emotion: formData.emotion,
      customEmotion: formData.customEmotion,
      description: formData.description,
      uploadTime: new Date().toISOString()
    };
    
    localStorage.setItem('moodZooUploadData', JSON.stringify(uploadData));
    
    // Convert audio file to base64 to pass via localStorage
    if (formData.audioFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        localStorage.setItem('moodZooAudioFile', reader.result as string);
        
        // Navigate to generate page
        router.push('/generate');
      };
      reader.readAsDataURL(formData.audioFile);
    }
  };

  // Trigger file input click
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // Get emotion button class
  const getEmotionButtonClass = (emotion: Emotion) => {
    const baseClass = "emotion-tag bg-black/50 border rounded-full py-2 px-4 text-2xl transition-all hover:scale-105 group";
    let colorClass = "";
    
    switch (emotion) {
      case 'MELANCHOLY':
        colorClass = formData.emotion === emotion 
          ? "bg-blue-900/40 border-blue-400 shadow-[0_0_15px_rgba(0,100,255,0.5)]" 
          : "hover:bg-blue-900/30 border-blue-500/50 hover:shadow-[0_0_15px_rgba(0,100,255,0.5)]";
        break;
      case 'RAGE':
        colorClass = formData.emotion === emotion 
          ? "bg-red-900/40 border-red-400 shadow-[0_0_15px_rgba(255,0,0,0.5)]" 
          : "hover:bg-red-900/30 border-red-500/50 hover:shadow-[0_0_15px_rgba(255,0,0,0.5)]";
        break;
      case 'TRANQUILITY':
        colorClass = formData.emotion === emotion 
          ? "bg-green-900/40 border-green-400 shadow-[0_0_15px_rgba(0,255,100,0.5)]" 
          : "hover:bg-green-900/30 border-green-500/50 hover:shadow-[0_0_15px_rgba(0,255,100,0.5)]";
        break;
      case 'CHAOS':
        colorClass = formData.emotion === emotion 
          ? "bg-purple-900/40 border-purple-400 shadow-[0_0_15px_rgba(200,0,255,0.5)]" 
          : "hover:bg-purple-900/30 border-purple-500/50 hover:shadow-[0_0_15px_rgba(200,0,255,0.5)]";
        break;
      case 'CUSTOM':
        colorClass = formData.emotion === emotion 
          ? "bg-pink-900/40 border-pink-400 shadow-[0_0_15px_rgba(255,0,255,0.5)]" 
          : "hover:bg-pink-900/30 border-pink-500/50 hover:shadow-[0_0_15px_rgba(255,0,255,0.5)]";
        break;
    }
    
    return `${baseClass} ${colorClass}`;
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Cyberpunk background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-purple-900/30 to-black/90"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] bg-repeat opacity-30"></div>
        
        {/* Glow elements */}
        <div className="absolute top-1/4 -left-40 w-[500px] h-[500px] rounded-full bg-cyan-500/20 blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-40 w-[500px] h-[500px] rounded-full bg-pink-500/20 blur-3xl"></div>
        <div className="absolute top-3/4 left-1/4 w-[300px] h-[300px] rounded-full bg-purple-500/15 blur-3xl"></div>
      </div>

      {/* Main content */}
      <div className="z-10 max-w-4xl w-full mx-auto border-2 border-cyan-500/50 rounded-lg backdrop-blur-sm bg-black/70 p-6 shadow-[0_0_25px_rgba(0,255,255,0.5)]">
        <div className="text-center mb-4">
          <h1 className="text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500 glitch-text" data-text="SONIC EMOTION CAPTURE">
            SONIC EMOTION CAPTURE
          </h1>
          <p className="text-cyan-300 italic text-sm">"Your feelings, amplified through sound, immortalized in the digital realm"</p>
        </div>
        
        <div className="space-y-4">
          {/* Upload Audio File Section */}
          <div 
            className={`border ${errors.file ? 'border-red-500/70' : 'border-cyan-500/30'} rounded-lg p-4 hover:border-cyan-400/50 transition-all hover:shadow-[0_0_15px_rgba(0,255,255,0.3)] group cursor-pointer`}
            onClick={triggerFileInput}
          >
            <div className="flex flex-col items-center justify-center w-full">
              <div className="flex flex-col items-center justify-center py-2">
                <span className="text-3xl mb-1 group-hover:scale-110 transition-transform">🎵</span>
                <span className="text-xl font-medium text-cyan-300 mb-1 group-hover:text-pink-300 transition-colors">
                  {formData.audioFile ? 'AUDIO UPLOADED' : 'DROP YOUR SONIC VIBE'}
                </span>
                {formData.audioFile ? (
                  <span className="text-xs text-pink-400/70">{formData.audioFile.name} ({Math.round(formData.audioFile.size / 1024)} KB)</span>
                ) : (
                  <>
                    <span className="text-xs text-gray-400">[MP3/WAV FORMAT]</span>
                    <span className="text-xs text-pink-400/70 max-w-md text-center mt-1">Upload audio that captures your emotional state</span>
                  </>
                )}
              </div>
              <input 
                type="file" 
                className="hidden" 
                ref={fileInputRef}
                accept=".mp3,.wav" 
                onChange={handleFileChange}
              />
              <div className="w-full h-2 bg-gray-800/50 rounded-full mt-3 overflow-hidden border border-cyan-500/20">
                <div 
                  className="h-full bg-gradient-to-r from-cyan-500 to-pink-500 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              {errors.file && (
                <p className="text-red-400 text-xs mt-2">{errors.file}</p>
              )}
            </div>
          </div>
          
          {/* Emotion Tags Section */}
          <div className={`border ${errors.emotion ? 'border-red-500/70' : 'border-cyan-500/30'} rounded-lg p-4 hover:border-cyan-400/50 transition-all hover:shadow-[0_0_15px_rgba(0,255,255,0.3)]`}>
            <div className="mb-2 text-lg font-medium text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500">EMOTIONAL SIGNATURE</div>
            <p className="text-xs text-cyan-400/70 mb-3 max-w-lg">Select the emotion that best matches your audio</p>
            
            <div className="flex flex-wrap gap-3 justify-center">
              <button 
                className={getEmotionButtonClass('MELANCHOLY')}
                onClick={() => handleEmotionSelect('MELANCHOLY')}
                type="button"
              >
                <span className="group-hover:-translate-y-1 transition-transform inline-block">😢</span>
                <span className={`block text-xs mt-1 text-blue-400 ${formData.emotion === 'MELANCHOLY' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity`}>MELANCHOLY</span>
              </button>
              
              <button 
                className={getEmotionButtonClass('RAGE')}
                onClick={() => handleEmotionSelect('RAGE')}
                type="button"
              >
                <span className="group-hover:-translate-y-1 transition-transform inline-block">😡</span>
                <span className={`block text-xs mt-1 text-red-400 ${formData.emotion === 'RAGE' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity`}>RAGE</span>
              </button>
              
              <button 
                className={getEmotionButtonClass('TRANQUILITY')}
                onClick={() => handleEmotionSelect('TRANQUILITY')}
                type="button"
              >
                <span className="group-hover:-translate-y-1 transition-transform inline-block">😌</span>
                <span className={`block text-xs mt-1 text-green-400 ${formData.emotion === 'TRANQUILITY' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity`}>TRANQUILITY</span>
              </button>
              
              <button 
                className={getEmotionButtonClass('CHAOS')}
                onClick={() => handleEmotionSelect('CHAOS')}
                type="button"
              >
                <span className="group-hover:-translate-y-1 transition-transform inline-block">🤯</span>
                <span className={`block text-xs mt-1 text-purple-400 ${formData.emotion === 'CHAOS' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity`}>CHAOS</span>
              </button>
              
              <button 
                className={getEmotionButtonClass('CUSTOM')}
                onClick={() => handleEmotionSelect('CUSTOM')}
                type="button"
              >
                <span className="group-hover:-translate-y-1 transition-transform inline-block text-lg">✨</span>
                <span className={`block text-xs mt-1 text-pink-400 ${formData.emotion === 'CUSTOM' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity`}>CUSTOM</span>
              </button>
            </div>
            
            {formData.emotion === 'CUSTOM' && (
              <div className="mt-3">
                <input 
                  type="text" 
                  className="w-full bg-black/50 border border-pink-500/30 rounded-lg p-2 text-white placeholder-gray-500 focus:border-pink-400 focus:outline-none focus:ring-1 focus:ring-pink-500 transition-all text-xs"
                  placeholder="Enter your custom emotion..."
                  value={formData.customEmotion || ''}
                  onChange={(e) => setFormData({...formData, customEmotion: e.target.value})}
                />
              </div>
            )}
            
            {errors.emotion && (
              <p className="text-red-400 text-xs mt-2">{errors.emotion}</p>
            )}
          </div>
          
          {/* Description Section */}
          <div className={`border ${errors.description ? 'border-red-500/70' : 'border-cyan-500/30'} rounded-lg p-4 hover:border-cyan-400/50 transition-all hover:shadow-[0_0_15px_rgba(0,255,255,0.3)]`}>
            <div className="mb-2 text-lg font-medium text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500">NEURAL CONTEXT</div>
            <p className="text-xs text-cyan-400/70 mb-2 max-w-lg">Describe the context of your audio</p>
            
            <textarea 
              className={`w-full h-20 bg-black/50 border ${errors.description ? 'border-red-500/70' : 'border-cyan-500/30'} rounded-lg p-3 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all text-xs`}
              placeholder="What inspired this emotional moment? How intense is it?"
              value={formData.description}
              onChange={handleDescriptionChange}
              maxLength={280}
            ></textarea>
            <div className="text-right mt-1 flex justify-between items-center">
              <span className={`text-xs ${formData.description.length > 280 ? 'text-red-400' : 'text-gray-500'}`}>
                {formData.description.length}/280 CHARS
              </span>
              {errors.description && (
                <p className="text-red-400 text-xs">{errors.description}</p>
              )}
            </div>
          </div>
          
          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-6 border-t border-cyan-500/20 pt-4">
            <Link href="/" className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1 text-sm">
              <span>←</span> <span>BACK</span>
            </Link>
            
            <button 
              onClick={handleSubmit}
              disabled={isUploading}
              className={`bg-gradient-to-r from-cyan-500 to-pink-500 hover:from-cyan-600 hover:to-pink-600 text-white font-bold py-2 px-6 rounded-full shadow-[0_0_10px_rgba(0,255,255,0.5)] transition-all hover:shadow-[0_0_15px_rgba(0,255,255,0.7)] hover:scale-105 flex items-center gap-2 group text-sm ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <span>SYNTHESIZE CREATURE</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Animated elements */}
      <div className="absolute top-10 right-10 w-3 h-32 bg-cyan-500/60 animate-pulse"></div>
      <div className="absolute bottom-10 left-10 w-32 h-3 bg-pink-500/60 animate-pulse"></div>
      <div className="absolute left-0 w-full h-[2px] bg-cyan-500/30 animate-scan"></div>
    </div>
  );
}
