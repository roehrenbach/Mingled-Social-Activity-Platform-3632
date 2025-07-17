import React from 'react'
import { motion } from 'framer-motion'

const Card = ({ children, className = '', hover = true, ...props }) => {
  return (
    <motion.div
      whileHover={hover ? { y: -4, shadow: '0 20px 40px rgba(0,0,0,0.1)' } : {}}
      className={`bg-white rounded-2xl shadow-lg p-6 ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export default Card