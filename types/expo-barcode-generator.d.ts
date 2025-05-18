declare module "expo-barcode-generator" {
  import * as React from "react";

  export interface BarcodeProps {
    value: string;
    format?: "QR_CODE" | "CODE128" | string;
    width?: number;
    height?: number;
    color?: string;
    background?: string;
  }

  const Barcode: React.FC<BarcodeProps>;
  export default Barcode;
}