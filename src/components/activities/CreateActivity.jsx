import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import Button from '../ui/Button'
import Input from '../ui/Input'
import Card from '../ui/Card'
import SafeIcon from '../../common/SafeIcon'
import * as FiIcons from 'react-icons/fi'

const { FiPlus, FiX } = FiIcons

const CreateActivity = ({ onClose, onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [selectedCategory, setSelectedCategory] = useState('')

  const categories = [
    'cultural', 'sports', 'culinary', 'nightlife', 'outdoor', 'other'
  ]

  const budgetBands = [
    { value: 'free', label: 'Free - Low (<€20)' },
    { value: 'medium', label: 'Medium (€20-50)' },
    { value: 'premium', label: 'Premium (>€50)' }
  ]

  const handleFormSubmit = (data) => {
    const activityData = {
      ...data,
      category: selectedCategory,
      dateTime: new Date(data.dateTime).toISOString(),
      maxSpots: parseInt(data.maxSpots),
      criteriaJSON: {
        ageMin: data.ageMin ? parseInt(data.ageMin) : null,
        ageMax: data.ageMax ? parseInt(data.ageMax) : null,
        genderAllowed: data.genderAllowed ? data.genderAllowed.split(',').map(g => g.trim()) : []
      },
      status: 'open'
    }
    onSubmit(activityData)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <Card className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-questrial font-bold text-gray-800">
              Create New Activity
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <SafeIcon icon={FiX} className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
            <Input
              label="Activity Title"
              {...register('title', { required: 'Title is required' })}
              error={errors.title?.message}
              placeholder="e.g., Coffee & Art Gallery Tour"
            />

            <div>
              <label className="block text-sm font-questrial font-semibold text-gray-700 mb-2">
                Description
              </label>
              <textarea
                {...register('description', { required: 'Description is required' })}
                rows={4}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-mingled-cyan focus:outline-none transition-colors font-questrial"
                placeholder="Describe your activity..."
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-500 font-questrial">{errors.description.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-questrial font-semibold text-gray-700 mb-3">
                Category
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {categories.map(category => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setSelectedCategory(category)}
                    className={`p-3 rounded-xl border-2 transition-all font-questrial text-sm capitalize ${
                      selectedCategory === category
                        ? 'border-mingled-cyan bg-mingled-cyan bg-opacity-10 text-gray-800'
                        : 'border-gray-200 hover:border-gray-300 text-gray-600'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Date & Time"
                type="datetime-local"
                {...register('dateTime', { required: 'Date and time are required' })}
                error={errors.dateTime?.message}
              />
              <Input
                label="Area/District"
                {...register('areaSlug', { required: 'Area is required' })}
                error={errors.areaSlug?.message}
                placeholder="e.g., Downtown, Soho"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Max Spots"
                type="number"
                min="1"
                max="6"
                {...register('maxSpots', { required: 'Max spots is required' })}
                error={errors.maxSpots?.message}
              />
              <div>
                <label className="block text-sm font-questrial font-semibold text-gray-700 mb-2">
                  Budget Band
                </label>
                <select
                  {...register('budgetBand', { required: 'Budget band is required' })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-mingled-cyan focus:outline-none transition-colors font-questrial"
                >
                  <option value="">Select budget...</option>
                  {budgetBands.map(band => (
                    <option key={band.value} value={band.value}>
                      {band.label}
                    </option>
                  ))}
                </select>
                {errors.budgetBand && (
                  <p className="mt-1 text-sm text-red-500 font-questrial">{errors.budgetBand.message}</p>
                )}
              </div>
            </div>

            <div className="border-t border-gray-100 pt-6">
              <h3 className="text-lg font-questrial font-semibold text-gray-800 mb-4">
                Optional Criteria
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Min Age"
                  type="number"
                  min="18"
                  max="100"
                  {...register('ageMin')}
                  placeholder="18"
                />
                <Input
                  label="Max Age"
                  type="number"
                  min="18"
                  max="100"
                  {...register('ageMax')}
                  placeholder="65"
                />
              </div>
              <Input
                label="Gender Allowed (comma-separated)"
                {...register('genderAllowed')}
                placeholder="e.g., male, female, other"
                className="mt-4"
              />
            </div>

            <div className="flex space-x-4 pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1"
                disabled={!selectedCategory}
              >
                Create Activity
              </Button>
            </div>
          </form>
        </Card>
      </motion.div>
    </motion.div>
  )
}

export default CreateActivity