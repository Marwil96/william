import React from "react";
import { MockedCartItems } from "./CartSummary";
const mockedBundleObject: {
  [key: string]: string;
} = {
  "26164":
    "https://minirodini.centraqa.com/client/dynamic/images/14261_487abc5711-11435_1d2e53b55d-2331010300-1-1350x0-full.jpg",
  "26180":
    "https://minirodini.centraqa.com/client/dynamic/images/14261_376f7ef9dc-11456_8233a5a10d-2336010675-2-1350x0-full.jpg",
  "26192":
    "https://minirodini.centraqa.com/client/dynamic/images/11351_744437f165-2322016660-1-1350x0.jpg",
};

const SimulateFetch = async (product: string) => {
  // Simulate a delay
  await new Promise((resolve) => setTimeout(resolve, 3000));
  if (product in mockedBundleObject) {
    return mockedBundleObject[product];
  }
};
export interface TransformedCartTotalsDataProps {
  totalPrice: string;
  shippingPrice: string;
  isFreeShipping: boolean;
}

interface ContextValue {
  fetchBundleImage: (product: string) => Promise<string | undefined>;
  removeItem: (id: string) => Promise<"success" | "failure">;
  updateQuantity: (
    id: string,
    newQuantity: number
  ) => Promise<number | undefined>;
  items: any[];
  totals: TransformedCartTotalsDataProps;
}

// Create the context with the defined type
export const MockedCartContext = React.createContext<ContextValue | undefined>(
  undefined
);

export const MockedCartProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [data, setData] = React.useState(MockedCartItems);

  const contextValue: ContextValue = {
    fetchBundleImage: async (product) => SimulateFetch(product),
    removeItem: async (line) => {
      if (!data) return "failure";
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const newData = data.filter((item) => item.line !== line);
      setData(newData);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      if (newData.length === 0) setData(MockedCartItems);
      return "success";
    },
    updateQuantity: async (line, newQuantity) => {
      await new Promise((resolve) => setTimeout(resolve, 1300));
      if (!data) throw new Error("Simulated failure");

      setData(
        data.map((item) =>
          item.line === line ? { ...item, quantity: newQuantity } : item
        )
      );
      return newQuantity;
    },
    items: data,
    totals: {
      totalPrice: "799 SEK",
      shippingPrice: "49 SEK",
      isFreeShipping: false,
    },
  };

  return (
    <MockedCartContext.Provider value={contextValue}>
      {children}
    </MockedCartContext.Provider>
  );
};
