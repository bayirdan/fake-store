export interface Category {
  id: number;
  name: string;
  image: string;
}

export interface ProductType {
  id: number;
  title: string;
  price: number;
  description: string;
  category: Category;
  images: string[];
}

export interface ShoppingCartType {
  product: ProductType;
  amount: number;
}
