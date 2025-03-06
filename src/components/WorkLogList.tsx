
import React from 'react';
import WorkLogItem from './WorkLogItem';
import { formatDay } from '@/utils/timeUtils';
import type { WorkLog } from './WorkForm';

interface GroupedLogs {
  [date: string]: WorkLog[];
}

interface WorkLogListProps {
  logs: WorkLog[];
  onDeleteLog: (id: string) => void;
}

const WorkLogList: React.FC<WorkLogListProps> = ({ logs, onDeleteLog }) => {
  // Group logs by day
  const groupedLogs: GroupedLogs = logs.reduce((groups, log) => {
    const date = formatDay(log.startTime);
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(log);
    return groups;
  }, {} as GroupedLogs);

  // Sort days in descending order (newest first)
  const sortedDays = Object.keys(groupedLogs).sort((a, b) => {
    return new Date(b).getTime() - new Date(a).getTime();
  });

  if (logs.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No work logs yet. Start the timer and log your work!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {sortedDays.map((day) => (
        <div key={day} className="space-y-3">
          <h3 className="text-sm font-medium text-muted-foreground">{day}</h3>
          <div className="space-y-3">
            {groupedLogs[day].map((log) => (
              <WorkLogItem
                key={log.id}
                log={log}
                onDelete={onDeleteLog}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default WorkLogList;
