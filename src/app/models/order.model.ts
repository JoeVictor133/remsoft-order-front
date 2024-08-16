import { Product } from "./product.model";
import { Supplier } from "./supplier.model";

export interface Order {
  id?: number;
  buyerName: string;
  supplier: Supplier;
  products: Product[];
  totalProductsPurchased?: number;
  totalAmountPurchased?: number;
}
