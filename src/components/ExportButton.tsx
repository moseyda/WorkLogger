
import React from 'react';
import { Download } from 'lucide-react';
import type { WorkLog } from './WorkForm';

interface ExportButtonProps {
  logs: WorkLog[];
}

const ExportButton: React.FC<ExportButtonProps> = ({ logs }) => {
  const exportToCSV = () => {
    if (logs.length === 0) {
      alert('No work logs to export');
      return;
    }

    // Create CSV content
    const headers = ['Date', 'Start Time', 'End Time', 'Duration', 'Tags', 'Description'];
    
    const csvContent = logs.map(log => {
      return [
        new Date(log.startTime).toLocaleDateString(),
        new Date(log.startTime).toLocaleTimeString(),
        new Date(log.endTime).toLocaleTimeString(),
        `${Math.floor(log.duration / 1000 / 60)} minutes`,
        log.tags.join(', '),
        `"${log.description.replace(/"/g, '""')}"`
      ].join(',');
    });

    const csv = [headers.join(','), ...csvContent].join('\n');
    
    // Create download link
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    link.setAttribute('href', url);
    link.setAttribute('download', `work-logs-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.display = 'none';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button
      onClick={exportToCSV}
      className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors disabled:opacity-50"
      disabled={logs.length === 0}
    >
      <Download size={16} />
      <span>Export CSV</span>
    </button>
  );
};

export default ExportButton;
