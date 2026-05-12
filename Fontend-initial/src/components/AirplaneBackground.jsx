import React from 'react';

const AirplaneBackground = () => {

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 flex items-center justify-center">
      <div className="opacity-[0.08] transform rotate-[-35deg] scale-[2.5] text-secondary">
        <svg
          viewBox="0 0 24 24"
          width="400"
          height="400"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M21 16.5C21 16.88 20.79 17.21 20.47 17.38L12.57 21.82C12.41 21.94 12.21 22 12 22C11.79 22 11.59 21.94 11.43 21.82L3.53 17.38C3.21 17.21 3 16.88 3 16.5V7.5C3 7.12 3.21 6.79 3.53 6.62L11.43 2.18C11.59 2.06 11.79 2 12 2C12.21 2 12.41 2.06 12.57 2.18L20.47 6.62C20.79 6.79 21 7.12 21 7.5V16.5Z" />
          <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21 4.7 20.3 4c-.7-.7-2-.7-3.5.8L13.3 8.3 5.1 6.5c-.4-.1-.8.1-1 .5s0 .9.4 1.1l7.5 4.1-3.2 3.2-3-.3c-.3 0-.6.1-.8.3l-.6.6c-.2.2-.2.5-.1.7l1.8 1.8.1.1 1.8 1.8c.2.2.5.2.7-.1l.6-.6c.2-.2.3-.5.3-.8l-.3-3 3.2-3.2 4.1 7.5c.2.4.6.6 1 .5s.6-.6.5-1z" transform="scale(0.8) translate(3, 3)" />
        </svg>
      </div>
    </div>
  );
};

export default AirplaneBackground;
