import React from 'react';

const Select = ({ options, value, onChange, className = '', disabled, error, ...props }) => {
  return (
    <select
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={`w-full px-4 py-3 rounded-input border bg-white text-text-primary transition-all appearance-none cursor-pointer disabled:cursor-not-allowed disabled:bg-[#F5F3F8] disabled:text-text-secondary/60 disabled:italic focus:outline-none ${
        error 
        ? 'border-[#D9534F] focus:ring-2 focus:ring-[#FEE2E2] focus:border-[#D9534F]' 
        : 'border-border-color focus:ring-2 focus:ring-secondary/30 focus:border-secondary'
      } ${className}`}
      {...props}
    >
      {options && options.map((item, i) => {
        if (!item) return null;
        if (item.options) {
          return (
            <optgroup key={i} label={item.label} className="font-bold text-text-secondary py-2 bg-white">
              {item.options.map((opt) => (
                <option key={opt.value} value={opt.value} className="font-medium text-text-primary bg-white">
                  {opt.label}
                </option>
              ))}
            </optgroup>
          );
        }
        return (
          <option key={item.value || i} value={item.value} className="bg-white">
            {item.label}
          </option>
        );
      })}
    </select>
  );
};

export default Select;
