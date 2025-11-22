import React from 'react';

interface AiraAvatarProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function AiraAvatar({ size = 'md', className = '' }: AiraAvatarProps) {
  const sizeMap = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
  };

  return (
    <div className={`${sizeMap[size]} ${className} relative`}>
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Background Circle - BPJS Green */}
        <circle cx="50" cy="50" r="48" fill="url(#bpjs-gradient)" />
        
        {/* Gradient Definition */}
        <defs>
          <linearGradient id="bpjs-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#047857', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#10b981', stopOpacity: 1 }} />
          </linearGradient>
          <linearGradient id="white-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#ffffff', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#f0fdf4', stopOpacity: 1 }} />
          </linearGradient>
        </defs>
        
        {/* Medical Cross (BPJS Symbol) */}
        <g opacity="0.2">
          <rect x="45" y="30" width="10" height="40" rx="2" fill="white" />
          <rect x="30" y="45" width="40" height="10" rx="2" fill="white" />
        </g>
        
        {/* AI Robot Head */}
        <g transform="translate(50, 50)">
          {/* Head */}
          <rect x="-15" y="-12" width="30" height="28" rx="4" fill="white" />
          
          {/* Antenna */}
          <line x1="0" y1="-12" x2="0" y2="-18" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <circle cx="0" cy="-20" r="3" fill="#22c55e" />
          
          {/* Eyes */}
          <circle cx="-7" cy="-4" r="3" fill="#047857" />
          <circle cx="7" cy="-4" r="3" fill="#047857" />
          
          {/* Smile */}
          <path d="M -8 4 Q 0 10, 8 4" stroke="#047857" strokeWidth="2" fill="none" strokeLinecap="round" />
          
          {/* Cheek blush */}
          <circle cx="-12" cy="2" r="2" fill="#fca5a5" opacity="0.6" />
          <circle cx="12" cy="2" r="2" fill="#fca5a5" opacity="0.6" />
        </g>
        
        {/* Sparkles for AI */}
        <g>
          <path d="M 20 25 L 22 27 L 20 29 L 18 27 Z" fill="#fbbf24" opacity="0.8" />
          <path d="M 75 30 L 77 32 L 75 34 L 73 32 Z" fill="#fbbf24" opacity="0.8" />
          <path d="M 80 65 L 82 67 L 80 69 L 78 67 Z" fill="#fbbf24" opacity="0.8" />
        </g>
        
        {/* Heartbeat line (health monitoring) */}
        <g opacity="0.3">
          <path 
            d="M 15 75 L 25 75 L 30 68 L 35 82 L 40 75 L 85 75" 
            stroke="white" 
            strokeWidth="2" 
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </svg>
    </div>
  );
}
