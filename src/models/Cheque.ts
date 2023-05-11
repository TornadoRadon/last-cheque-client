export default interface Cheque {
  id: number;
  paymentNumber: number;
  total: number;
  paymentType: PaymentType;
  createdAt: string;

  productList: ChequeProduct[];
}

export interface ChequeProduct {
  id: number;
  name: string;
  price: number;
  qty: number;
}

export enum PaymentType {
  CASH = "CASH",
  TERMINAL = "TERMINAL",
  P2P = "P2P",
}

export interface ChequeRTO {
  paymentType: PaymentType;
  productList: {
    productID: number;
    qty: number;
  }[];
}
