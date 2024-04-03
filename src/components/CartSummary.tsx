import { LayoutGroup, motion, AnimatePresence } from "framer-motion";
import { CartItem } from "./CartItem";
import { MockedCartContext } from "./MockCartProvider";
import { useContext } from "react";
import { CartItemWithAnimation } from "./CartItemWithAnimation";
import { CartItemWithOptimistic } from "./CartItemWithOptimistic";

export const MockedCartItems = [
  {
    line: "805057e012f37eef9e7fad1e82b2cbe0",
    size: "92/98",
    bundleItems: [],
    quantity: 1,
    metaData: "Blue / 92/98",
    id: "24997",
    name: "Wooden Stool",
    images: [
      {
        src: "https://images.unsplash.com/photo-1503602642458-232111445657?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Product image",
      },
    ],
    price: {
      price: "700.00 SEK",
      priceBeforeDiscount: "700.00 SEK",
      discounted: false,
      discountPercent: 0,
    },
  },
  {
    line: "dc3a51096b27700b2cecf7bcea03d7b0",
    size: "68/74",
    bundleItems: [],
    quantity: 1,
    metaData: "Multi / 68/74",
    id: "25347",
    name: "Bioglow",
    url: "mini-babies-baby-set-1100003500",
    images: [
      {
        src: "https://images.unsplash.com/photo-1615397349754-cfa2066a298e?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Product image",
      },
    ],
    price: {
      price: "500.00 SEK",
      priceBeforeDiscount: "500.00 SEK",
      discounted: false,
      discountPercent: 0,
    },
  },
  {
    line: "3ff194463aecbf29720b4da70de1075c",
    quantity: 1,
    metaData: " / NEW BORN",
    id: "28534",
    name: "Polaroid",
    images: [
      {
        src: "https://images.unsplash.com/photo-1516962126636-27ad087061cc?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Product image",
      },
    ],
    price: {
      price: "2 500.00 SEK",
      priceBeforeDiscount: "2 500.00 SEK",
      discounted: false,
      discountPercent: 0,
    },
  },
];

export const CartItems = ({ step }: { step: number }) => {
  const cartContext = useContext(MockedCartContext);

  let CartItemInUse = step === 0 && CartItem;
  if (step === 1) CartItemInUse = CartItemWithAnimation;
  if (step === 2) CartItemInUse = CartItemWithOptimistic;

  return (
    <LayoutGroup>
      <motion.section
        layout
        className="flex flex-col p-4 lg:p-6 bg-black overflow-hidden max-w-[550px] rounded-lg w-full"
      >
        <AnimatePresence>
          {cartContext.items.map((item) => (
            <CartItemInUse
              src={item.images[0].src}
              quantity={item.quantity}
              key={item.id}
              name={item.name}
              line={item.line}
              price={item.price.price}
            />
          ))}
        </AnimatePresence>
      </motion.section>
    </LayoutGroup>
  );
};
