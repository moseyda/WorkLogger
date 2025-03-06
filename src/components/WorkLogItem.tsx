
import React from 'react';
import { Clock, Trash2 } from 'lucide-react';
import { formatTimeWithLabels, formatDate } from '@/utils/timeUtils';
import type { WorkLog } from './WorkForm';

interface WorkLogItemProps {
  log: WorkLog;
  onDelete: (id: string) => void;
}

const WorkLogItem: React.FC<WorkLogItemProps> = ({ log, onDelete }) => {
  return (
    <div className="glass-panel rounded-xl p-4 hover:border-primary/10 transition-all duration-300 animate-slide-in">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center text-xs text-muted-foreground mb-1">
            <Clock size={12} className="mr-1" />
            <span>{formatTimeWithLabels(log.duration)}</span>
            <span className="mx-2">•</span>
            <span>{formatDate(log.startTime)}</span>
          </div>
          
          <p className="text-sm text-foreground whitespace-pre-wrap mb-2">{log.description}</p>
          
          {log.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {log.tags.map(tag => (
                <span 
                  key={tag}
                  className="inline-block px-2 py-0.5 text-xs rounded-full bg-secondary text-secondary-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
        
        <button
          onClick={() => onDelete(log.id)}
          className="p-1.5 rounded-full hover:bg-destructive/10 hover:text-destructive transition-colors"
          aria-label="Delete log"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

export default WorkLogItem;
