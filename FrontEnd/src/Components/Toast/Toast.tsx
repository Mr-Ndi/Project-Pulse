import { useEffect, useState } from 'react';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  onClose: () => void;
  duration?: number;
}

export default function Toast({ message, type, onClose, duration = 5000 }: ToastProps) {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    
    // Update progress bar every 50ms
    const interval = setInterval(() => {
      setProgress((prev) => {
        const decrement = (100 / duration) * 50;
        return prev - decrement > 0 ? prev - decrement : 0;
      });
    }, 50);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [onClose, duration]);

  const colors = {
    success: {
      bg: 'bg-white',
      border: 'border-green-500',
      icon: 'text-green-500',
      progress: 'bg-green-500',
    },
    error: {
      bg: 'bg-white',
      border: 'border-red-500',
      icon: 'text-red-500',
      progress: 'bg-red-500',
    },
    info: {
      bg: 'bg-white',
      border: 'border-blue-500',
      icon: 'text-blue-500',
      progress: 'bg-blue-500',
    },
  }[type];

  const icon = {
    success: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    error: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    info: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  }[type];

  return (
    <div className={`${colors.bg} ${colors.border} border-l-4 rounded-lg shadow-2xl overflow-hidden min-w-[300px] max-w-md animate-slide-in`}>
      <div className="flex items-center gap-3 px-4 py-3">
        <div className={colors.icon}>
          {icon}
        </div>
        <span className="flex-1 font-medium text-gray-800">{message}</span>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      {/* Progress bar */}
      <div className="h-1 bg-gray-200">
        <div
          className={`h-full ${colors.progress} transition-all duration-50 ease-linear`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
