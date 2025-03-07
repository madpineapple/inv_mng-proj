export interface Product {
  prodItemID: number;
  prodItemName: string;
  prodItemLoc: string;
  prodItemLotNum: string;
  prodVendorLotNum: string;
  prodExpDate: Date;
  prodQuantity: number;
  prodWeight: number;
}

export interface Order {
  p_OrderID: number;
  p_CustomerId: number;
  p_OrderDate: Date;
  p_OrderStatus: string;
  p_Price: number;
  products: Product[];
}

export interface Customer {
  p_CustomerID: number;
  p_CustomerName: string;
}

export interface CustomerDropdownProps {
  onSelect: (p_CustomerId: number) => void;
}
