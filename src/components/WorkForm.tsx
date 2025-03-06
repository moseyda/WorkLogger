
import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Check, X, Tag } from 'lucide-react';
import { formatTimeWithLabels } from '@/utils/timeUtils';

interface WorkFormProps {
  elapsedTime: number;
  timerStatus: 'idle' | 'running' | 'paused';
  onSubmit: (log: WorkLog) => void;
  onCancel: () => void;
}

export interface WorkLog {
  id: string;
  startTime: Date;
  endTime: Date;
  duration: number;
  description: string;
  tags: string[];
}

const AVAILABLE_TAGS = [
  'Development', 'Design', 'Meeting', 'Planning', 
  'Research', 'Writing', 'Testing', 'Learning', 'Other'
];

const WorkForm: React.FC<WorkFormProps> = ({ 
  elapsedTime, 
  timerStatus, 
  onSubmit, 
  onCancel 
}) => {
  const [description, setDescription] = useState('');
  const [startTime] = useState(new Date(Date.now() - elapsedTime));
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showTagsSelector, setShowTagsSelector] = useState(false);

  const isFormDisabled = timerStatus === 'running';
  const isSubmitDisabled = description.trim() === '' || elapsedTime === 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitDisabled) return;
    
    const log: WorkLog = {
      id: Date.now().toString(),
      startTime: startTime,
      endTime: new Date(),
      duration: elapsedTime,
      description: description.trim(),
      tags: selectedTags
    };
    
    onSubmit(log);
    setDescription('');
    setSelectedTags([]);
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag) 
        : [...prev, tag]
    );
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="glass-panel p-6 rounded-2xl animate-fade-in">
        <div className="flex items-center justify-between mb-4">
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground">
              {timerStatus !== 'idle' ? 
                `Started ${format(startTime, 'h:mm a')}` : 
                'Ready to work'
              }
            </p>
            <h3 className="text-lg font-medium">
              {elapsedTime > 0 ? formatTimeWithLabels(elapsedTime) : 'No time recorded'}
            </h3>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={isFormDisabled}
              placeholder="What did you work on?"
              className="w-full h-24 p-3 bg-background/50 border border-border rounded-lg resize-none transition-all placeholder:text-muted-foreground/70 focus:border-primary/20"
              required
            />
          </div>
          
          <div className="flex flex-wrap gap-2 min-h-10">
            {selectedTags.map(tag => (
              <span 
                key={tag}
                className="inline-flex items-center px-2.5 py-1 bg-primary/10 text-primary-foreground/90 text-xs rounded-full"
              >
                {tag}
                <button 
                  type="button" 
                  className="ml-1"
                  onClick={() => toggleTag(tag)}
                >
                  <X size={12} />
                </button>
              </span>
            ))}
            
            {selectedTags.length === 0 && !showTagsSelector && (
              <button
                type="button"
                onClick={() => setShowTagsSelector(true)}
                className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
              >
                <Tag size={12} /> Add tags
              </button>
            )}
          </div>
          
          {showTagsSelector && (
            <div className="flex flex-wrap gap-2 py-2 animate-fade-in">
              {AVAILABLE_TAGS.map(tag => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className={`px-2.5 py-1 text-xs rounded-full border transition-all ${
                    selectedTags.includes(tag)
                      ? 'bg-primary/10 border-primary/20 text-primary-foreground/90'
                      : 'bg-secondary border-secondary/50 text-secondary-foreground hover:bg-secondary/80'
                  }`}
                >
                  {tag}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setShowTagsSelector(false)}
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                <X size={14} /> Close
              </button>
            </div>
          )}
          
          <div className="flex space-x-2 justify-end">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 rounded-lg border border-border bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
              disabled={isFormDisabled}
            >
              <X size={18} className="mr-1 inline" /> Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg border border-primary/10 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:hover:bg-primary disabled:cursor-not-allowed"
              disabled={isSubmitDisabled || isFormDisabled}
            >
              <Check size={18} className="mr-1 inline" /> Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WorkForm;
