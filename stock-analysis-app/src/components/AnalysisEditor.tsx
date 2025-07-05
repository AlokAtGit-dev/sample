import React, { useState, useEffect } from 'react';
import { X, Save, Eye, Youtube, AlertTriangle, DollarSign, Target } from 'lucide-react';
import { AnalysisFormData } from '../types';

interface AnalysisEditorProps {
  stockId: string | null;
  onClose: () => void;
  onSave: (stockId: string, data: AnalysisFormData) => void;
}

const AnalysisEditor: React.FC<AnalysisEditorProps> = ({ stockId, onClose, onSave }) => {
  const [formData, setFormData] = useState<AnalysisFormData>({
    title: '',
    content: '',
    whyTrending: '',
    financialHealthSummary: '',
    valuationSummary: '',
    redFlags: [''],
    youtubeVideoId: '',
    recommendation: 'HOLD',
    targetPrice: 0,
    stopLoss: 0,
    tags: ['']
  });

  const [activeTab, setActiveTab] = useState<'basic' | 'analysis' | 'metrics' | 'preview'>('basic');

  const handleInputChange = (field: keyof AnalysisFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (field: 'redFlags' | 'tags', index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayItem = (field: 'redFlags' | 'tags') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayItem = (field: 'redFlags' | 'tags', index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = () => {
    if (!stockId) return;
    
    // Clean up empty array items
    const cleanedData = {
      ...formData,
      redFlags: formData.redFlags.filter(flag => flag.trim() !== ''),
      tags: formData.tags.filter(tag => tag.trim() !== '')
    };
    
    onSave(stockId, cleanedData);
  };

  const extractYouTubeId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/);
    return match ? match[1] : url;
  };

  const tabs = [
    { id: 'basic', name: 'Basic Info', icon: Eye },
    { id: 'analysis', name: 'Analysis', icon: AlertTriangle },
    { id: 'metrics', name: 'Metrics', icon: DollarSign },
    { id: 'preview', name: 'Preview', icon: Target }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">
            {stockId ? 'Edit Analysis' : 'Create New Analysis'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-6 py-3 text-sm font-medium border-b-2 ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.name}</span>
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {activeTab === 'basic' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Analysis Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter analysis title..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Why is it trending?
                </label>
                <textarea
                  value={formData.whyTrending}
                  onChange={(e) => handleInputChange('whyTrending', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Explain why this stock is trending..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  YouTube Video URL (optional)
                </label>
                <input
                  type="text"
                  value={formData.youtubeVideoId}
                  onChange={(e) => handleInputChange('youtubeVideoId', extractYouTubeId(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://www.youtube.com/watch?v=..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tags
                </label>
                <div className="space-y-2">
                  {formData.tags.map((tag, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={tag}
                        onChange={(e) => handleArrayChange('tags', index, e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter tag..."
                      />
                      <button
                        onClick={() => removeArrayItem('tags', index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => addArrayItem('tags')}
                    className="text-blue-500 hover:text-blue-700 text-sm"
                  >
                    + Add Tag
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'analysis' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Analysis Content
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) => handleInputChange('content', e.target.value)}
                  rows={8}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Write your detailed analysis here..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Financial Health Summary
                </label>
                <textarea
                  value={formData.financialHealthSummary}
                  onChange={(e) => handleInputChange('financialHealthSummary', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Summarize the financial health..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Valuation Summary
                </label>
                <textarea
                  value={formData.valuationSummary}
                  onChange={(e) => handleInputChange('valuationSummary', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Summarize the valuation analysis..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Red Flags
                </label>
                <div className="space-y-2">
                  {formData.redFlags.map((flag, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={flag}
                        onChange={(e) => handleArrayChange('redFlags', index, e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter a red flag..."
                      />
                      <button
                        onClick={() => removeArrayItem('redFlags', index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => addArrayItem('redFlags')}
                    className="text-blue-500 hover:text-blue-700 text-sm"
                  >
                    + Add Red Flag
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'metrics' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Recommendation
                  </label>
                  <select
                    value={formData.recommendation}
                    onChange={(e) => handleInputChange('recommendation', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="BUY">BUY</option>
                    <option value="HOLD">HOLD</option>
                    <option value="SELL">SELL</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Target Price ($)
                  </label>
                  <input
                    type="number"
                    value={formData.targetPrice}
                    onChange={(e) => handleInputChange('targetPrice', parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0.00"
                    step="0.01"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Stop Loss ($)
                  </label>
                  <input
                    type="number"
                    value={formData.stopLoss}
                    onChange={(e) => handleInputChange('stopLoss', parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0.00"
                    step="0.01"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'preview' && (
            <div className="space-y-6">
              <div className="border rounded-lg p-4 bg-gray-50">
                <h3 className="font-semibold text-lg mb-2">{formData.title}</h3>
                <div className="prose prose-sm max-w-none">
                  <p>{formData.whyTrending}</p>
                  <div className="mt-4">
                    <h4 className="font-medium">Analysis</h4>
                    <p>{formData.content}</p>
                  </div>
                  <div className="mt-4 flex items-center space-x-4">
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      formData.recommendation === 'BUY' ? 'bg-green-100 text-green-700' :
                      formData.recommendation === 'SELL' ? 'bg-red-100 text-red-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {formData.recommendation}
                    </span>
                    <span className="text-sm text-gray-600">
                      Target: ${formData.targetPrice}
                    </span>
                    <span className="text-sm text-gray-600">
                      Stop Loss: ${formData.stopLoss}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="btn-primary flex items-center space-x-2"
          >
            <Save className="h-4 w-4" />
            <span>Save Analysis</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnalysisEditor;