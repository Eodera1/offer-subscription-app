export interface Offer {
  contractStartDate: Date;
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string; // e.g., "USD", "EUR"
  durationInDays: number; 
  isActive: boolean;
  startDate: Date; 
  endDate?: Date; 
  features: string[];
  discountPercentage?: number; 
  createdAt: Date;
  updatedAt: Date;
}
