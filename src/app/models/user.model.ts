export interface User {
  id: string;
  username: string;
  email: string;
  passwordHash: string; 
  fullName?: string; 
  dateOfBirth?: Date; 
  subscriptionStatus: 'active' | 'inactive' | 'canceled'; 
  subscriptionPlan?: string; 
  roles: string[]; 
  createdAt: Date; 
  updatedAt: Date;
  lastLogin?: Date; 
  isVerified: boolean;
}
