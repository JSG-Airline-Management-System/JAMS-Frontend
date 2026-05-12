import React from 'react';

const SkeletonTable = ({ rows = 4, cols = 7 }) => {
  return (
    <>
      {Array.from({ length: rows }).map((_, i) => (
        <tr key={i} className="border-b border-border-color last:border-0 animate-pulse">
          {Array.from({ length: cols }).map((_, j) => (
            <td key={j} className="px-8 py-6">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
            </td>
          ))}
        </tr>
      ))}
    </>
  );
};

export default SkeletonTable;
