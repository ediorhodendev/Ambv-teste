export interface Sale {
  id: string;
  customerId: string;
  customerName: string;
  branchId: string;
  branchName: string;
  date: string;
  cancelled: boolean;
  total: number;
  items: SaleItem[];
}

export interface SaleItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  discount: number;
}
