// Simple test file to verify imports
import { EventName } from '@/types/analytics';
import { trackEvent } from '@/utils/analytics';

export const testFunction = () => {
  console.log('Test function called');
  console.log('Available event names:', Object.keys(EventName));
  
  // Track a test event
  trackEvent('test_event', {
    source: 'test_file',
    timestamp: Date.now()
  });
  
  return true;
};

export default testFunction; 