import React from 'react';

export default function DraftKingsLogo({ width = 200, height = 50 }: { width?: number; height?: number }) {
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 200 50" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* DraftKings logo - simplified version with brighter green for dark mode */}
      <path 
        d="M20 10H35C40.5228 10 45 14.4772 45 20V30C45 35.5228 40.5228 40 35 40H20V10Z" 
        fill="#1aac73"
      />
      <path 
        d="M20 10H10C7.23858 10 5 12.2386 5 15V35C5 37.7614 7.23858 40 10 40H20V10Z" 
        fill="#1aac73"
      />
      <path 
        d="M25 20L30 25L25 30" 
        stroke="white" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M10 25L15 20" 
        stroke="white" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M10 25L15 30" 
        stroke="white" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      
      {/* Text */}
      <path 
        d="M55 15H60V35H55V15Z" 
        fill="#1aac73"
      />
      <path 
        d="M65 15H70L80 27V15H85V35H80L70 23V35H65V15Z" 
        fill="#1aac73"
      />
      <path 
        d="M90 15H105V20H95V22H103V27H95V30H105V35H90V15Z" 
        fill="#1aac73"
      />
      <path 
        d="M110 15H120C125 15 128 18 128 22C128 26 125 29 120 29H115V35H110V15ZM115 20V24H120C121.5 24 123 23 123 22C123 21 121.5 20 120 20H115Z" 
        fill="#1aac73"
      />
      <path 
        d="M130 15H140L145 25L150 15H160V35H155V22L148 35H142L135 22V35H130V15Z" 
        fill="#1aac73"
      />
      <path 
        d="M165 15H175C180 15 183 18 183 22C183 25 181 27 178 28L185 35H179L173 28H170V35H165V15ZM170 20V24H175C176.5 24 178 23 178 22C178 21 176.5 20 175 20H170Z" 
        fill="#1aac73"
      />
      <path 
        d="M188 15H195L200 28L195 35H190L193 28L188 15Z" 
        fill="#1aac73"
      />
    </svg>
  );
} 