import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Card from '../ui/Card'
import Button from '../ui/Button'
import Badge from '../ui/Badge'
import SafeIcon from '../../common/SafeIcon'
import * as FiIcons from 'react-icons/fi'

const { FiCheckCircle, FiXCircle, FiThumbsUp, FiThumbsDown } = FiIcons

const AttendanceTracker = () => {
  const [participants, setParticipants] = useState([
    { id: 1, name: 'Alice Johnson', arrived: null, feedback: null },
    { id: 2, name: 'Bob Smith', arrived: null, feedback: null },
    { id: 3, name: 'Carol Davis', arrived: null, feedback: null }
  ])

  const handleAttendance = (participantId, arrived) => {
    setParticipants(prev =>
      prev.map(participant =>
        participant.id === participantId
          ? { ...participant, arrived }
          : participant
      )
    )
  }

  const handleFeedback = (participantId, feedback) => {
    setParticipants(prev =>
      prev.map(participant =>
        participant.id === participantId
          ? { ...participant, feedback }
          : participant
      )
    )
  }

  const attendedCount = participants.filter(p => p.arrived === true).length
  const totalCount = participants.length

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-questrial font-bold text-gray-800">
            Attendance Tracker
          </h1>
          <p className="text-gray-600 font-questrial mt-2">
            Track who showed up and collect feedback
          </p>
        </div>

        <Card className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-questrial font-bold text-gray-800">
                Coffee & Art Gallery Tour
              </h2>
              <p className="text-gray-600 font-questrial">
                Today at 2:00 PM • Downtown
              </p>
            </div>
            <Badge variant="primary" className="text-lg px-4 py-2">
              {attendedCount} / {totalCount} attended
            </Badge>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {participants.map(participant => (
            <motion.div
              key={participant.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-mingled-gradient rounded-full flex items-center justify-center">
                    <span className="text-white font-questrial font-semibold">
                      {participant.name.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-questrial font-semibold text-gray-800">
                      {participant.name}
                    </h3>
                    <Badge 
                      variant={
                        participant.arrived === true ? 'success' :
                        participant.arrived === false ? 'danger' : 'default'
                      }
                    >
                      {participant.arrived === true ? 'Attended' :
                       participant.arrived === false ? 'No Show' : 'Pending'}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-questrial font-semibold text-gray-700 mb-2">
                      Attendance
                    </p>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant={participant.arrived === true ? 'primary' : 'outline'}
                        onClick={() => handleAttendance(participant.id, true)}
                        className="flex items-center space-x-1"
                      >
                        <SafeIcon icon={FiCheckCircle} className="w-4 h-4" />
                        <span>Showed Up</span>
                      </Button>
                      <Button
                        size="sm"
                        variant={participant.arrived === false ? 'primary' : 'outline'}
                        onClick={() => handleAttendance(participant.id, false)}
                        className="flex items-center space-x-1"
                      >
                        <SafeIcon icon={FiXCircle} className="w-4 h-4" />
                        <span>No Show</span>
                      </Button>
                    </div>
                  </div>

                  {participant.arrived === true && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                    >
                      <p className="text-sm font-questrial font-semibold text-gray-700 mb-2">
                        Feedback
                      </p>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant={participant.feedback === 'up' ? 'primary' : 'outline'}
                          onClick={() => handleFeedback(participant.id, 'up')}
                          className="flex items-center space-x-1"
                        >
                          <SafeIcon icon={FiThumbsUp} className="w-4 h-4" />
                          <span>Good</span>
                        </Button>
                        <Button
                          size="sm"
                          variant={participant.feedback === 'down' ? 'primary' : 'outline'}
                          onClick={() => handleFeedback(participant.id, 'down')}
                          className="flex items-center space-x-1"
                        >
                          <SafeIcon icon={FiThumbsDown} className="w-4 h-4" />
                          <span>Bad</span>
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Button className="px-8 py-3">
            Complete Event
          </Button>
        </div>
      </div>
    </div>
  )
}

export default AttendanceTracker