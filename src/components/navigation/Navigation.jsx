import React from 'react'
import { motion } from 'framer-motion'
import SafeIcon from '../../common/SafeIcon'
import * as FiIcons from 'react-icons/fi'

const { FiHome, FiPlus, FiSettings, FiUser, FiCheckSquare } = FiIcons

const Navigation = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'discover', label: 'Discover', icon: FiHome },
    { id: 'host', label: 'Host', icon: FiSettings },
    { id: 'attendance', label: 'Attendance', icon: FiCheckSquare },
    { id: 'profile', label: 'Profile', icon: FiUser }
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-around items-center py-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center space-y-1 py-2 px-3 rounded-lg transition-all ${
                activeTab === tab.id
                  ? 'text-mingled-cyan'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <SafeIcon icon={tab.icon} className="w-6 h-6" />
              <span className="text-xs font-questrial font-semibold">
                {tab.label}
              </span>
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="w-1 h-1 bg-mingled-cyan rounded-full"
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}

export default Navigation