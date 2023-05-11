import Category from "./Category";
import Product, { ProductWithCat } from "./Product";

export interface CategoryAndProduct {
  categories: Category[];
  products: ProductWithCat[];
}
