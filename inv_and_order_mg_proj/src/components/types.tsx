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
  p_m_productId: number;
  p_quantity: number;
}

export interface Customer {
  p_CustomerId: number;
  p_CustomerName: string;
  p_ContactInfo: string;
}

export interface ManufacturedProduct {
  m_productID: number;
  m_productName: string;
  customerID: number;
  sku: string;
  created_at: Date;
}
export interface Recipe {
  p_m_productName: string;
  p_m_productID: number;
  p_customerID: number;
  p_quantity: number;
  p_unit: string;
  //need to rename this to make it more intuitive
  p_productName: string;
}
export interface CustomerDropdownProps {
  onSelect: (p_CustomerId: number) => void;
}
export interface ManufacturedProductDropdownProps {
  onSelect: (p_CustomerId: number) => void;
}
