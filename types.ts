export interface ServiceLink {
  id: string;
  title: string;
  description: string;
  url: string;
  iconName: string;
  categoryId: string;
  department?: string;
  tags?: string[];
  state?: string;
  features?: string[];
  badge?: 'Popular' | 'Essential' | 'Instant' | 'Free' | 'New' | 'Verified';
}

export interface Category {
  id: string;
  title: string;
  iconName: string;
  gradient: string;
  accentColor: string;
  description: string;
}

export interface Helpline {
  id: string;
  name: string;
  number: string;
  description: string;
  category: string;
  iconName: string;
  badge?: string;
}

export type ViewMode = 'grid' | 'list' | 'grouped';
