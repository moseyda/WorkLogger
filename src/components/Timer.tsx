
import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Square, RefreshCw } from 'lucide-react';
import { formatTime } from '@/utils/timeUtils';
import { cn } from '@/lib/utils';

interface TimerProps {
  onTimeUpdate: (time: number) => void;
  onStatusChange: (status: 'idle' | 'running' | 'paused') => void;
}

const Timer: React.FC<TimerProps> = ({ onTimeUpdate, onStatusChange }) => {
  const [status, setStatus] = useState<'idle' | 'running' | 'paused'>('idle');
  const [time, setTime] = useState<number>(0);
  const timerRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const accumulatedTimeRef = useRef<number>(0);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    onTimeUpdate(time);
    onStatusChange(status);
  }, [time, status, onTimeUpdate, onStatusChange]);

  const startTimer = () => {
    if (status === 'running') return;
    
    setStatus('running');
    startTimeRef.current = Date.now() - accumulatedTimeRef.current;
    
    timerRef.current = window.setInterval(() => {
      const currentTime = Date.now() - startTimeRef.current;
      setTime(currentTime);
      accumulatedTimeRef.current = currentTime;
    }, 100);
  };

  const pauseTimer = () => {
    if (status !== 'running') return;
    
    setStatus('paused');
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const resetTimer = () => {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
    
    setStatus('idle');
    setTime(0);
    accumulatedTimeRef.current = 0;
  };

  const formattedTime = formatTime(time);
  const [hours, minutes, seconds] = formattedTime.split(':');

  return (
    <div className="space-y-6 w-full max-w-sm mx-auto">
      <div className="glass-panel p-8 rounded-2xl">
        <div className="flex items-center justify-center space-x-1 text-4xl font-light mb-6">
          <div className="flex">
            <span className="timer-digit">{hours[0]}</span>
            <span className="timer-digit">{hours[1]}</span>
          </div>
          <span className="timer-separator">:</span>
          <div className="flex">
            <span className="timer-digit">{minutes[0]}</span>
            <span className="timer-digit">{minutes[1]}</span>
          </div>
          <span className="timer-separator">:</span>
          <div className="flex">
            <span className="timer-digit">{seconds[0]}</span>
            <span className="timer-digit">{seconds[1]}</span>
          </div>
          
          {status === 'running' && (
            <div className="ml-2 pt-2">
              <span className="timer-record-pulse" />
            </div>
          )}
        </div>
        
        <div className="flex justify-center space-x-4">
          {status === 'running' ? (
            <button
              onClick={pauseTimer}
              className="p-3 rounded-full bg-secondary hover:bg-secondary/80 text-secondary-foreground transition-colors duration-300"
              aria-label="Pause timer"
            >
              <Pause size={24} />
            </button>
          ) : (
            <button
              onClick={startTimer}
              className={cn(
                "p-3 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground transition-colors duration-300",
                status === 'paused' && "animate-pulse-scale"
              )}
              aria-label="Start timer"
            >
              <Play size={24} fill="currentColor" />
            </button>
          )}
          
          <button
            onClick={resetTimer}
            className="p-3 rounded-full bg-secondary hover:bg-secondary/80 text-secondary-foreground transition-colors duration-300"
            disabled={status === 'idle' && time === 0}
            aria-label="Reset timer"
          >
            {time === 0 ? <RefreshCw size={24} /> : <Square size={24} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Timer;
