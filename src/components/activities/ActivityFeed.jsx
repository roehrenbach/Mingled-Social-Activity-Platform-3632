import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ActivityCard from './ActivityCard'
import CreateActivity from './CreateActivity'
import Button from '../ui/Button'
import SafeIcon from '../../common/SafeIcon'
import * as FiIcons from 'react-icons/fi'

const { FiPlus, FiFilter } = FiIcons

const ActivityFeed = () => {
  const [activities, setActivities] = useState([])
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [filter, setFilter] = useState('all')
  const [joinedActivities, setJoinedActivities] = useState(new Set())

  // Mock data for demo
  useEffect(() => {
    const mockActivities = [
      {
        id: 1,
        title: 'Coffee & Art Gallery Tour',
        description: 'Join us for a relaxed morning exploring local art galleries followed by coffee at a cozy café.',
        category: 'cultural',
        dateTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        areaSlug: 'Downtown',
        maxSpots: 4,
        budgetBand: 'medium',
        signups: []
      },
      {
        id: 2,
        title: 'Sunset Hiking Adventure',
        description: 'Experience breathtaking sunset views on this moderate hiking trail. Perfect for nature lovers!',
        category: 'outdoor',
        dateTime: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
        areaSlug: 'Mountain View',
        maxSpots: 6,
        budgetBand: 'free',
        signups: [{ id: 1 }]
      },
      {
        id: 3,
        title: 'Wine Tasting Evening',
        description: 'Discover exquisite wines from local vineyards in an elegant setting with fellow wine enthusiasts.',
        category: 'culinary',
        dateTime: new Date(Date.now() + 72 * 60 * 60 * 1000).toISOString(),
        areaSlug: 'Wine District',
        maxSpots: 3,
        budgetBand: 'premium',
        signups: []
      }
    ]
    setActivities(mockActivities)
  }, [])

  const handleCreateActivity = (activityData) => {
    const newActivity = {
      ...activityData,
      id: Date.now(),
      signups: []
    }
    setActivities(prev => [newActivity, ...prev])
    setShowCreateModal(false)
  }

  const handleJoinActivity = (activityId) => {
    setJoinedActivities(prev => new Set([...prev, activityId]))
    // Here you would typically make an API call to join the activity
  }

  const filteredActivities = activities.filter(activity => {
    if (filter === 'all') return true
    return activity.category === filter
  })

  const categories = ['all', 'cultural', 'sports', 'culinary', 'nightlife', 'outdoor', 'other']

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-questrial font-bold text-gray-800">
              Discover Activities
            </h1>
            <p className="text-gray-600 font-questrial mt-2">
              Find your next adventure and meet amazing people
            </p>
          </div>
          <Button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center space-x-2"
          >
            <SafeIcon icon={FiPlus} className="w-5 h-5" />
            <span>Create Activity</span>
          </Button>
        </div>

        <div className="flex flex-wrap gap-3 mb-8">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-4 py-2 rounded-full font-questrial text-sm transition-all ${
                filter === category
                  ? 'bg-mingled-gradient text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {category === 'all' ? 'All' : category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredActivities.map(activity => (
            <motion.div
              key={activity.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <ActivityCard
                activity={activity}
                onJoin={handleJoinActivity}
                isJoined={joinedActivities.has(activity.id)}
              />
            </motion.div>
          ))}
        </motion.div>

        {filteredActivities.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 font-questrial">
              No activities found. Be the first to create one!
            </p>
          </div>
        )}

        {showCreateModal && (
          <CreateActivity
            onClose={() => setShowCreateModal(false)}
            onSubmit={handleCreateActivity}
          />
        )}
      </div>
    </div>
  )
}

export default ActivityFeed