export interface ServiceLink {
  id: string;
  title: string;
  description: string;
  url: string;
  iconName: string;
  categoryId: string; // Added for easier flat-list filtering
}

export interface Category {
  id: string;
  title: string;
  gradient: string; // Store gradient config here for consistency
  services: ServiceLink[];
}