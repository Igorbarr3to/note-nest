import { Timestamp } from 'firebase/firestore'; 

export interface Note {
  id?: string; 
  userId: string;
  content: string;
  createdAt: Timestamp | string;
  updatedAt: Timestamp | string;
  title?: string; 
  tags?: string[]; 
  isPinned?: boolean;
}