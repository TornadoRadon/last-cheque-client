import Category from "./Category";

export default interface Product {
  id: number;
  name: string;
  price: number;
  catID: number;
  qty: number;
}

export interface ProductWithCat {
  id: number;
  name: string;
  price: number;
  category: Category;
  qty: number;
}

