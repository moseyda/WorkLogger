
import React, { useState, useEffect } from 'react';
import Timer from '@/components/Timer';
import WorkForm, { WorkLog } from '@/components/WorkForm';
import WorkLogList from '@/components/WorkLogList';
import ThemeToggle from '@/components/ThemeToggle';
import ExportButton from '@/components/ExportButton';
import { Clock } from 'lucide-react';

const STORAGE_KEY = 'worklogger_logs';

const Index: React.FC = () => {
  const [timerStatus, setTimerStatus] = useState<'idle' | 'running' | 'paused'>('idle');
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [workLogs, setWorkLogs] = useState<WorkLog[]>([]);

  // Load saved logs from localStorage
  useEffect(() => {
    const savedLogs = localStorage.getItem(STORAGE_KEY);
    if (savedLogs) {
      try {
        const parsedLogs = JSON.parse(savedLogs) as WorkLog[];
        // Convert string dates back to Date objects
        const processedLogs = parsedLogs.map(log => ({
          ...log,
          startTime: new Date(log.startTime),
          endTime: new Date(log.endTime)
        }));
        setWorkLogs(processedLogs);
      } catch (error) {
        console.error('Error parsing saved logs:', error);
      }
    }
  }, []);

  // Save logs to localStorage when they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(workLogs));
  }, [workLogs]);

  const handleLogSubmit = (log: WorkLog) => {
    setWorkLogs(prev => [log, ...prev]);
    setTimerStatus('idle');
    setCurrentTime(0);
  };

  const handleLogDelete = (id: string) => {
    setWorkLogs(prev => prev.filter(log => log.id !== id));
  };

  const handleCancel = () => {
    setTimerStatus('idle');
    setCurrentTime(0);
  };

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      <header className="glass-panel sticky top-0 z-10 border-b border-border/50 backdrop-blur-xl">
        <div className="container max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Clock className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-medium">WorkLogger</h1>
          </div>
          <div className="flex items-center space-x-2">
            <ExportButton logs={workLogs} />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="container max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <section className="space-y-6">
            <Timer 
              onTimeUpdate={setCurrentTime} 
              onStatusChange={setTimerStatus} 
            />
            
            {(timerStatus !== 'idle' || currentTime > 0) && (
              <WorkForm 
                elapsedTime={currentTime} 
                timerStatus={timerStatus} 
                onSubmit={handleLogSubmit}
                onCancel={handleCancel}
              />
            )}
          </section>
          
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-medium">Work History</h2>
              <span className="text-sm text-muted-foreground">
                {workLogs.length} {workLogs.length === 1 ? 'entry' : 'entries'}
              </span>
            </div>
            
            <div className="max-h-[calc(100vh-12rem)] overflow-y-auto pr-1 subtle-scroll">
              <WorkLogList 
                logs={workLogs} 
                onDeleteLog={handleLogDelete}
              />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Index;
