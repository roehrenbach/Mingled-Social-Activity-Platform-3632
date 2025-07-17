import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Card from '../ui/Card'
import Button from '../ui/Button'
import Badge from '../ui/Badge'
import SafeIcon from '../../common/SafeIcon'
import * as FiIcons from 'react-icons/fi'

const { FiUsers, FiStar, FiCheck, FiX } = FiIcons

const HostDashboard = () => {
  const [activities, setActivities] = useState([])
  const [selectedActivity, setSelectedActivity] = useState(null)
  const [applicants, setApplicants] = useState([])

  // Mock data for demo
  useEffect(() => {
    const mockActivities = [
      {
        id: 1,
        title: 'Coffee & Art Gallery Tour',
        dateTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        maxSpots: 4,
        signups: [
          { id: 1, userId: 101, userName: 'Alice Johnson', starRank: 0, state: 'pending' },
          { id: 2, userId: 102, userName: 'Bob Smith', starRank: 4, state: 'pending' },
          { id: 3, userId: 103, userName: 'Carol Davis', starRank: 5, state: 'accepted' }
        ]
      }
    ]
    setActivities(mockActivities)
    if (mockActivities.length > 0) {
      setSelectedActivity(mockActivities[0])
      setApplicants(mockActivities[0].signups)
    }
  }, [])

  const handleStarRank = (applicantId, rank) => {
    setApplicants(prev => 
      prev.map(applicant => 
        applicant.id === applicantId 
          ? { ...applicant, starRank: rank }
          : applicant
      )
    )
  }

  const handleAcceptReject = (applicantId, action) => {
    setApplicants(prev =>
      prev.map(applicant =>
        applicant.id === applicantId
          ? { ...applicant, state: action }
          : applicant
      )
    )
  }

  const sortedApplicants = [...applicants].sort((a, b) => b.starRank - a.starRank)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-questrial font-bold text-gray-800">
            Host Dashboard
          </h1>
          <p className="text-gray-600 font-questrial mt-2">
            Manage your activities and review applicants
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Activities List */}
          <div className="lg:col-span-1">
            <Card>
              <h2 className="text-xl font-questrial font-bold text-gray-800 mb-4">
                Your Activities
              </h2>
              <div className="space-y-3">
                {activities.map(activity => (
                  <button
                    key={activity.id}
                    onClick={() => {
                      setSelectedActivity(activity)
                      setApplicants(activity.signups)
                    }}
                    className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                      selectedActivity?.id === activity.id
                        ? 'border-mingled-cyan bg-mingled-cyan bg-opacity-10'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <h3 className="font-questrial font-semibold text-gray-800">
                      {activity.title}
                    </h3>
                    <p className="text-sm text-gray-600 font-questrial">
                      {activity.signups.length} applicants
                    </p>
                  </button>
                ))}
              </div>
            </Card>
          </div>

          {/* Applicants Management */}
          <div className="lg:col-span-2">
            {selectedActivity && (
              <Card>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-questrial font-bold text-gray-800">
                    Applicants for "{selectedActivity.title}"
                  </h2>
                  <Badge variant="primary">
                    {selectedActivity.signups.filter(s => s.state === 'accepted').length} / {selectedActivity.maxSpots} spots filled
                  </Badge>
                </div>

                <div className="space-y-4">
                  {sortedApplicants.map(applicant => (
                    <motion.div
                      key={applicant.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="border border-gray-200 rounded-xl p-4"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-mingled-gradient rounded-full flex items-center justify-center">
                            <span className="text-white font-questrial font-semibold">
                              {applicant.userName.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <h3 className="font-questrial font-semibold text-gray-800">
                              {applicant.userName}
                            </h3>
                            <Badge 
                              variant={
                                applicant.state === 'accepted' ? 'success' :
                                applicant.state === 'rejected' ? 'danger' : 'default'
                              }
                            >
                              {applicant.state}
                            </Badge>
                          </div>
                        </div>

                        <div className="flex items-center space-x-4">
                          {/* Star Rating */}
                          <div className="flex items-center space-x-1">
                            {[1, 2, 3, 4, 5].map(star => (
                              <button
                                key={star}
                                onClick={() => handleStarRank(applicant.id, star)}
                                className={`p-1 transition-colors ${
                                  star <= applicant.starRank ? 'text-yellow-400' : 'text-gray-300'
                                }`}
                              >
                                <SafeIcon icon={FiStar} className="w-4 h-4" />
                              </button>
                            ))}
                          </div>

                          {/* Action Buttons */}
                          {applicant.state === 'pending' && (
                            <div className="flex space-x-2">
                              <Button
                                size="sm"
                                onClick={() => handleAcceptReject(applicant.id, 'accepted')}
                                className="flex items-center space-x-1"
                              >
                                <SafeIcon icon={FiCheck} className="w-4 h-4" />
                                <span>Accept</span>
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleAcceptReject(applicant.id, 'rejected')}
                                className="flex items-center space-x-1"
                              >
                                <SafeIcon icon={FiX} className="w-4 h-4" />
                                <span>Reject</span>
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {sortedApplicants.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-gray-500 font-questrial">
                      No applicants yet. Share your activity to get people interested!
                    </p>
                  </div>
                )}
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HostDashboard