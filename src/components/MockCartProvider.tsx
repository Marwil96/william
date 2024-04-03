import React from "react";
import { MockedCartItems } from "./CartSummary";

interface ContextValue {
  removeItem: (id: string) => Promise<"success" | "failure">;
  updateQuantity: (
    id: string,
    newQuantity: number
  ) => Promise<number | undefined>;
  items: any[];
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
  };

  return (
    <MockedCartContext.Provider value={contextValue}>
      {children}
    </MockedCartContext.Provider>
  );
};
