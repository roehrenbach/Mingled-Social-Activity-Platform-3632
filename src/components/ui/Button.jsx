import React from 'react'
import { motion } from 'framer-motion'

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  disabled = false,
  onClick,
  ...props 
}) => {
  const baseClasses = 'font-questrial font-semibold rounded-full transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed'
  
  const variants = {
    primary: 'bg-mingled-gradient text-white hover:scale-105',
    secondary: 'bg-white text-transparent bg-clip-text bg-mingled-gradient border-2 border-transparent bg-origin-border hover:bg-gray-50',
    outline: 'border-2 border-gray-300 bg-white text-gray-700 hover:border-gray-400'
  }
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  }

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.button>
  )
}

export default Button