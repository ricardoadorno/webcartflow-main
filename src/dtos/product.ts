export class CreateProductDto {
    id: string;
    title: string;
    description: string;
    price: number;
    image: string;
    category: string;
    rating: {
      rate: number;
      count: number;
      comments: {
        rate: number;
        username: string;
        comment: string;
      }[]
    };
    
}