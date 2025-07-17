import React from 'react'

const Input = ({ 
  label, 
  error, 
  className = '', 
  type = 'text',
  ...props 
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-questrial font-semibold text-gray-700 mb-2">
          {label}
        </label>
      )}
      <input
        type={type}
        className={`w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-mingled-cyan focus:outline-none transition-colors font-questrial ${
          error ? 'border-red-500' : ''
        } ${className}`}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-500 font-questrial">{error}</p>
      )}
    </div>
  )
}

export default Input