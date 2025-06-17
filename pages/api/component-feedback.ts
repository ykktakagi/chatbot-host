import { NextApiRequest, NextApiResponse } from "next";

interface ComponentFeedback {
  componentName: string;
  rating: number;
  feedback: string;
  context: string;
  timestamp: Date;
}

let feedbackData: ComponentFeedback[] = [];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const feedback: ComponentFeedback = {
      ...req.body,
      timestamp: new Date()
    };
    
    feedbackData.push(feedback);
    
    return res.status(200).json({ success: true });
  }
  
  if (req.method === 'GET') {
    const { component } = req.query;
    
    const filtered = component 
      ? feedbackData.filter(f => f.componentName === component)
      : feedbackData;
      
    const stats = {
      totalFeedback: filtered.length,
      averageRating: filtered.reduce((sum, f) => sum + f.rating, 0) / filtered.length || 0,
      recentFeedback: filtered.filter(f => 
        Date.now() - f.timestamp.getTime() < 7 * 24 * 60 * 60 * 1000
      ),
      improvementSuggestions: filtered
        .filter(f => f.rating < 3)
        .map(f => f.feedback)
        .filter(Boolean)
    };
    
    return res.status(200).json(stats);
  }
  
  return res.status(405).json({ error: 'Method not allowed' });
}
