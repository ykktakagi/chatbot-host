import React, { useState, useEffect } from 'react';
import { componentRegistry } from '@/lib/webComponentRegistry';

export default function Analytics() {
  const [usageStats, setUsageStats] = useState<any>({});
  const [feedbackStats, setFeedbackStats] = useState<any>({});

  useEffect(() => {
    const stats = componentRegistry.getUsageStats();
    setUsageStats(stats);

    fetch('/api/component-feedback')
      .then(res => res.json())
      .then(data => setFeedbackStats(data))
      .catch(err => console.error('Failed to load feedback stats:', err));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Remap Component Analytics</h1>
      
      <div style={{ marginBottom: '30px' }}>
        <h2>Usage Statistics</h2>
        <div>
          <p>Total Usage: {usageStats.totalUsage || 0}</p>
          <p>Success Rate: {((usageStats.successRate || 0) * 100).toFixed(1)}%</p>
          <p>Recent Usage (7 days): {usageStats.recentUsage || 0}</p>
        </div>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h2>Feedback Statistics</h2>
        <div>
          <p>Total Feedback: {feedbackStats.totalFeedback || 0}</p>
          <p>Average Rating: {(feedbackStats.averageRating || 0).toFixed(1)}/5</p>
          <p>Recent Feedback: {feedbackStats.recentFeedback?.length || 0}</p>
        </div>
      </div>

      <div>
        <h2>Improvement Suggestions</h2>
        <ul>
          {feedbackStats.improvementSuggestions?.map((suggestion: string, index: number) => (
            <li key={index}>{suggestion}</li>
          )) || []}
        </ul>
      </div>

      <div style={{ marginTop: '30px' }}>
        <h2>Component Recommendations</h2>
        <p>Based on usage patterns, recommended components for different contexts:</p>
        <ul>
          <li>Population data: {componentRegistry.getComponentRecommendations('人口').join(', ')}</li>
          <li>Transportation: {componentRegistry.getComponentRecommendations('交通').join(', ')}</li>
          <li>Housing: {componentRegistry.getComponentRecommendations('住宅').join(', ')}</li>
        </ul>
      </div>
    </div>
  );
}
