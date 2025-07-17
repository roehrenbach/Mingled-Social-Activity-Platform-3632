import React from 'react'
import { motion } from 'framer-motion'
import Card from '../ui/Card'
import Badge from '../ui/Badge'
import SafeIcon from '../../common/SafeIcon'
import * as FiIcons from 'react-icons/fi'

const { FiUser, FiHeart, FiUsers, FiTrendingUp } = FiIcons

const UserProfile = () => {
  // Mock user data
  const user = {
    name: 'Sarah Johnson',
    age: 28,
    intentFriend: true,
    intentDating: true,
    interests: ['Art & Culture', 'Food & Dining', 'Outdoor Activities', 'Photography'],
    showUpTotal: 12,
    showUpAttended: 11,
    joinDate: '2024-01-15'
  }

  const showUpScore = user.showUpTotal > 0 ? (user.showUpAttended / user.showUpTotal * 100).toFixed(1) : 0

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-questrial font-bold text-gray-800">
            Your Profile
          </h1>
          <p className="text-gray-600 font-questrial mt-2">
            Manage your profile and view your activity history
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-2">
            <Card className="mb-6">
              <div className="flex items-center space-x-6 mb-6">
                <div className="w-24 h-24 bg-mingled-gradient rounded-full flex items-center justify-center">
                  <span className="text-white font-questrial font-bold text-2xl">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h2 className="text-2xl font-questrial font-bold text-gray-800">
                    {user.name}
                  </h2>
                  <p className="text-gray-600 font-questrial">
                    {user.age} years old
                  </p>
                  <div className="flex space-x-2 mt-2">
                    {user.intentFriend && (
                      <Badge variant="primary">
                        <SafeIcon icon={FiUsers} className="w-4 h-4 mr-1" />
                        Friends
                      </Badge>
                    )}
                    {user.intentDating && (
                      <Badge variant="success">
                        <SafeIcon icon={FiHeart} className="w-4 h-4 mr-1" />
                        Dating
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-questrial font-semibold text-gray-800 mb-3">
                  Interests
                </h3>
                <div className="flex flex-wrap gap-2">
                  {user.interests.map(interest => (
                    <Badge key={interest} variant="default">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>

            {/* Recent Activities */}
            <Card>
              <h3 className="text-lg font-questrial font-semibold text-gray-800 mb-4">
                Recent Activities
              </h3>
              <div className="space-y-3">
                {[
                  { title: 'Coffee & Art Gallery Tour', date: '2024-01-20', status: 'attended' },
                  { title: 'Sunset Hiking Adventure', date: '2024-01-18', status: 'attended' },
                  { title: 'Wine Tasting Evening', date: '2024-01-15', status: 'no-show' }
                ].map((activity, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-questrial font-semibold text-gray-800">
                        {activity.title}
                      </p>
                      <p className="text-sm text-gray-600 font-questrial">
                        {activity.date}
                      </p>
                    </div>
                    <Badge variant={activity.status === 'attended' ? 'success' : 'danger'}>
                      {activity.status === 'attended' ? 'Attended' : 'No Show'}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Stats */}
          <div className="space-y-6">
            <Card>
              <div className="text-center">
                <div className="w-16 h-16 bg-mingled-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                  <SafeIcon icon={FiTrendingUp} className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-questrial font-bold text-gray-800">
                  {showUpScore}%
                </h3>
                <p className="text-gray-600 font-questrial">
                  Show-Up Score
                </p>
                <p className="text-sm text-gray-500 font-questrial mt-2">
                  {user.showUpAttended} of {user.showUpTotal} activities attended
                </p>
              </div>
            </Card>

            <Card>
              <h3 className="text-lg font-questrial font-semibold text-gray-800 mb-4">
                Achievement
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                    <span className="text-xl">🏆</span>
                  </div>
                  <div>
                    <p className="font-questrial font-semibold text-gray-800">
                      Reliable Member
                    </p>
                    <p className="text-sm text-gray-600 font-questrial">
                      90%+ show-up rate
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            <Card>
              <h3 className="text-lg font-questrial font-semibold text-gray-800 mb-4">
                Quick Stats
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 font-questrial">Activities Joined</span>
                  <span className="font-questrial font-semibold text-gray-800">{user.showUpTotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 font-questrial">Activities Hosted</span>
                  <span className="font-questrial font-semibold text-gray-800">3</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 font-questrial">Member Since</span>
                  <span className="font-questrial font-semibold text-gray-800">Jan 2024</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile