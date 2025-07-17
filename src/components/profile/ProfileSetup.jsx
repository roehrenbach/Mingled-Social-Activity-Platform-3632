import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import Button from '../ui/Button'
import Input from '../ui/Input'
import Card from '../ui/Card'
import Badge from '../ui/Badge'

const ProfileSetup = ({ onComplete }) => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm()
  const [step, setStep] = useState(1)
  const [selectedInterests, setSelectedInterests] = useState([])

  const interests = [
    'Art & Culture', 'Sports & Fitness', 'Food & Dining', 'Music & Concerts',
    'Outdoor Activities', 'Photography', 'Travel', 'Books & Literature',
    'Technology', 'Gaming', 'Dancing', 'Yoga & Meditation'
  ]

  const toggleInterest = (interest) => {
    setSelectedInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    )
  }

  const onSubmit = (data) => {
    const profileData = {
      ...data,
      interests: selectedInterests,
      showUpTotal: 0,
      showUpAttended: 0
    }
    onComplete(profileData)
  }

  return (
    <div className="min-h-screen bg-mingled-gradient flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl"
      >
        <Card className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-questrial font-bold text-gray-800 mb-2">
              Complete Your Profile
            </h2>
            <p className="text-gray-600 font-questrial">
              Step {step} of 2
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="First Name"
                    {...register('firstName', { required: 'First name is required' })}
                    error={errors.firstName?.message}
                  />
                  <Input
                    label="Last Name"
                    {...register('lastName', { required: 'Last name is required' })}
                    error={errors.lastName?.message}
                  />
                </div>

                <Input
                  label="Date of Birth"
                  type="date"
                  {...register('dateOfBirth', { required: 'Date of birth is required' })}
                  error={errors.dateOfBirth?.message}
                />

                <div>
                  <label className="block text-sm font-questrial font-semibold text-gray-700 mb-2">
                    Gender
                  </label>
                  <div className="flex space-x-4">
                    {['Male', 'Female', 'Other'].map(gender => (
                      <label key={gender} className="flex items-center">
                        <input
                          type="radio"
                          value={gender.toLowerCase()}
                          {...register('gender', { required: 'Gender is required' })}
                          className="mr-2"
                        />
                        <span className="font-questrial text-gray-700">{gender}</span>
                      </label>
                    ))}
                  </div>
                  {errors.gender && (
                    <p className="mt-1 text-sm text-red-500 font-questrial">{errors.gender.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-questrial font-semibold text-gray-700 mb-4">
                    What are you looking for?
                  </label>
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        {...register('intentFriend')}
                        className="mr-3"
                      />
                      <span className="font-questrial text-gray-700">Making new friends</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        {...register('intentDating')}
                        className="mr-3"
                      />
                      <span className="font-questrial text-gray-700">Dating & romantic matches</span>
                    </label>
                  </div>
                </div>

                <Button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full"
                >
                  Next Step
                </Button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div>
                  <label className="block text-sm font-questrial font-semibold text-gray-700 mb-4">
                    Select Your Interests
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {interests.map(interest => (
                      <button
                        key={interest}
                        type="button"
                        onClick={() => toggleInterest(interest)}
                        className={`p-3 rounded-xl border-2 transition-all font-questrial text-sm ${
                          selectedInterests.includes(interest)
                            ? 'border-mingled-cyan bg-mingled-cyan bg-opacity-10 text-gray-800'
                            : 'border-gray-200 hover:border-gray-300 text-gray-600'
                        }`}
                      >
                        {interest}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Age Range Min"
                    type="number"
                    min="18"
                    max="100"
                    {...register('ageMin', { required: 'Minimum age is required' })}
                    error={errors.ageMin?.message}
                  />
                  <Input
                    label="Age Range Max"
                    type="number"
                    min="18"
                    max="100"
                    {...register('ageMax', { required: 'Maximum age is required' })}
                    error={errors.ageMax?.message}
                  />
                </div>

                <Input
                  label="Max Distance (km)"
                  type="number"
                  min="1"
                  max="100"
                  {...register('maxDistance', { required: 'Max distance is required' })}
                  error={errors.maxDistance?.message}
                />

                <div className="flex space-x-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(1)}
                    className="flex-1"
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1"
                  >
                    Complete Profile
                  </Button>
                </div>
              </motion.div>
            )}
          </form>
        </Card>
      </motion.div>
    </div>
  )
}

export default ProfileSetup