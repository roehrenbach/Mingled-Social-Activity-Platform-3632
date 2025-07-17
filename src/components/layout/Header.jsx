import React from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../../contexts/AuthContext'
import Button from '../ui/Button'
import SafeIcon from '../../common/SafeIcon'
import * as FiIcons from 'react-icons/fi'

const { FiUser, FiLogOut } = FiIcons

const Header = () => {
  const { user, signOut } = useAuth()

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-white shadow-sm border-b border-gray-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-questrial font-bold bg-mingled-gradient bg-clip-text text-transparent">
              Mingled
            </h1>
          </div>
          
          {user && (
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiUser} className="w-5 h-5 text-gray-600" />
                <span className="font-questrial text-gray-700">{user.email}</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={signOut}
                className="flex items-center space-x-2"
              >
                <SafeIcon icon={FiLogOut} className="w-4 h-4" />
                <span>Sign Out</span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </motion.header>
  )
}

export default Header