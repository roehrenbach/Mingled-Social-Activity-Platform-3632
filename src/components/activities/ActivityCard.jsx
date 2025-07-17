import React from 'react'
import { motion } from 'framer-motion'
import { format } from 'date-fns'
import Card from '../ui/Card'
import Button from '../ui/Button'
import Badge from '../ui/Badge'
import SafeIcon from '../../common/SafeIcon'
import * as FiIcons from 'react-icons/fi'

const { FiMapPin, FiClock, FiUsers, FiDollarSign } = FiIcons

const ActivityCard = ({ activity, onJoin, isJoined = false }) => {
  const getBudgetColor = (budget) => {
    switch (budget) {
      case 'free': return 'success'
      case 'medium': return 'warning'
      case 'premium': return 'danger'
      default: return 'default'
    }
  }

  const getBudgetText = (budget) => {
    switch (budget) {
      case 'free': return 'Free - Low (<€20)'
      case 'medium': return 'Medium (€20-50)'
      case 'premium': return 'Premium (>€50)'
      default: return budget
    }
  }

  const spotsLeft = activity.maxSpots - (activity.signups?.length || 0)

  return (
    <Card className="hover:shadow-xl transition-all duration-300">
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="text-xl font-questrial font-bold text-gray-800 mb-2">
              {activity.title}
            </h3>
            <p className="text-gray-600 font-questrial text-sm line-clamp-2">
              {activity.description}
            </p>
          </div>
          <Badge variant={activity.category === 'cultural' ? 'primary' : 'default'}>
            {activity.category}
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <SafeIcon icon={FiClock} className="w-4 h-4 text-gray-500" />
            <span className="font-questrial text-gray-600">
              {format(new Date(activity.dateTime), 'MMM dd, HH:mm')}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <SafeIcon icon={FiMapPin} className="w-4 h-4 text-gray-500" />
            <span className="font-questrial text-gray-600">
              {activity.areaSlug}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <SafeIcon icon={FiUsers} className="w-4 h-4 text-gray-500" />
            <span className="font-questrial text-gray-600">
              {spotsLeft} spots left
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <SafeIcon icon={FiDollarSign} className="w-4 h-4 text-gray-500" />
            <Badge variant={getBudgetColor(activity.budgetBand)} className="text-xs">
              {getBudgetText(activity.budgetBand)}
            </Badge>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100">
          <Button
            onClick={() => onJoin(activity.id)}
            disabled={isJoined || spotsLeft === 0}
            className="w-full"
          >
            {isJoined ? 'Already Joined' : spotsLeft === 0 ? 'Full' : "I'm in"}
          </Button>
        </div>
      </div>
    </Card>
  )
}

export default ActivityCard