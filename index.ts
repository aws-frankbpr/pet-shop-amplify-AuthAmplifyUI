export interface Pet {
    id: number;
    name: string;
    category: string;
    breed: string;
    age: number;
    price: number;
    imageUrl: string;
  }
  
  export type Category = 'all' | 'dogs' | 'cats';
  