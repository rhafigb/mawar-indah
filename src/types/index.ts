export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
}

export interface ChatMessage {
  role: 'user' | 'ai';
  content: string;
}