export interface Recipe {
    id?: number;
    title?: string;
    description?: string;
    ingredients?: string;
    steps?: string;
    createdAt?: string;  // ISO 8601 date string
  }
  
 export interface Book {
    id: number;
    name: string;
    steps?: string[]
    createdAt: string;  // ISO 8601 date string
    recipes?: Recipe[];
  }
  
  export interface ApiResponse {
    code: number;
    message: string;
    data: Book[];
  }
  