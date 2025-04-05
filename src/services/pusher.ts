import Pusher, { Channel } from 'pusher-js';
import { Call } from '../types';

// Initialize Pusher
const pusher = new Pusher('your-pusher-key', {
  cluster: 'eu',
  forceTLS: true,
});

const CHANNEL_NAME = 'private-aircall';
const EVENT_NAME = 'update-call';

type CallUpdateCallback = (updatedCall: Call) => void;
type PusherEventCallback = (data: { call: Call }) => void;

class PusherService {
  private channel: Channel;
  private callbacks: Map<string, CallUpdateCallback[]> = new Map();
  
  constructor() {
    // Subscribe to the channel
    this.channel = pusher.subscribe(CHANNEL_NAME);
    
    // Listen for updates
    this.channel.bind(EVENT_NAME, ((data: { call: Call }) => {
      const updatedCall = data.call;
      
      // If we have callbacks for this call ID, execute them
      const callCallbacks = this.callbacks.get(updatedCall.id);
      if (callCallbacks) {
        callCallbacks.forEach(callback => callback(updatedCall));
      }
      
      // If we have global callbacks (empty string key), execute them
      const globalCallbacks = this.callbacks.get('');
      if (globalCallbacks) {
        globalCallbacks.forEach(callback => callback(updatedCall));
      }
    }) as PusherEventCallback);
  }
  
  // Subscribe to updates for a specific call ID
  subscribeToCall(callId: string, callback: CallUpdateCallback): void {
    if (!this.callbacks.has(callId)) {
      this.callbacks.set(callId, []);
    }
    
    this.callbacks.get(callId)!.push(callback);
  }
  
  // Subscribe to all call updates
  subscribeToAllCalls(callback: CallUpdateCallback): void {
    if (!this.callbacks.has('')) {
      this.callbacks.set('', []);
    }
    
    this.callbacks.get('')!.push(callback);
  }
  
  // Unsubscribe from updates for a specific call ID
  unsubscribeFromCall(callId: string, callback?: CallUpdateCallback): void {
    if (!this.callbacks.has(callId)) return;
    
    if (callback) {
      // Remove specific callback
      const callbacks = this.callbacks.get(callId)!;
      const index = callbacks.indexOf(callback);
      
      if (index !== -1) {
        callbacks.splice(index, 1);
      }
      
      if (callbacks.length === 0) {
        this.callbacks.delete(callId);
      }
    } else {
      // Remove all callbacks for this call ID
      this.callbacks.delete(callId);
    }
  }
  
  // Unsubscribe from all call updates
  unsubscribeFromAllCalls(callback?: CallUpdateCallback): void {
    if (!this.callbacks.has('')) return;
    
    if (callback) {
      // Remove specific callback
      const callbacks = this.callbacks.get('')!;
      const index = callbacks.indexOf(callback);
      
      if (index !== -1) {
        callbacks.splice(index, 1);
      }
      
      if (callbacks.length === 0) {
        this.callbacks.delete('');
      }
    } else {
      // Remove all global callbacks
      this.callbacks.delete('');
    }
  }
  
  // Cleanup on component unmount
  disconnect(): void {
    this.channel.unbind_all();
    pusher.unsubscribe(CHANNEL_NAME);
  }
}

const pusherService = new PusherService();
export default pusherService; 