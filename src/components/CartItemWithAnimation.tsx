import { motion } from "framer-motion";
import Image from "next/image";
import { useContext, useState } from "react";
import { MockedCartContext } from "./MockCartProvider";

const ProgressIndicator = () => (
  <motion.svg
    viewBox="25 25 50 50"
    width="24px"
    height="24px"
    display="block"
    z-index="1"
    strokeWidth="3"
    color="white"
    strokeMiterlimit="10"
    strokeLinecap="round"
    opacity="0"
    animate={{
      opacity: 1,
    }}
    transition={{
      duration: 0.5,
      ease: "easeIn",
    }}
  >
    <motion.circle
      cx="50"
      cy="50"
      r="20"
      fill="none"
      stroke-dasharray="1, 200"
      stroke-dashoffset="0"
      stroke="white"
      animate={{
        strokeDasharray: ["1 200", "89 200", "89 200"],
        rotate: 360,
        strokeDashoffset: [0, -35, -124],
      }}
      transition={{
        type: "tween",
        ease: "linear",
        duration: 1.3,
        repeat: Infinity,
        repeatType: "loop",
      }}
    />
  </motion.svg>
);
export const CartItemWithAnimation = ({
  src,
  name,
  price,
  quantity,
  line,
}: {
  src: string;
  name: string;
  price: string;
  line: string;
  quantity: number;
}) => {
  const globalProvider = useContext(MockedCartContext);
  const [isRemovingItem, setIsRemovingItem] = useState(false);
  const [isAddingQuantity, setIsAddingQuantity] = useState(false);
  const [isRemovingQuantity, setIsRemovingQuantity] = useState(false);

  const updateQuantityHelper = async (
    line: string,
    type: "increase" | "decrease"
  ) => {
    const newQuantity = type === "increase" ? quantity + 1 : quantity - 1;
    if (type === "increase") setIsAddingQuantity(true);
    if (type === "decrease") setIsRemovingQuantity(true);
    await globalProvider?.updateQuantity(line, newQuantity);
    setIsAddingQuantity(false);
    setIsRemovingQuantity(false);
  };

  const removeItemHelper = async (line: string) => {
    setIsRemovingItem(true);
    await globalProvider.removeItem(line);
    setIsRemovingItem(false);
  };
  return (
    <motion.div
      layout
      exit={{
        x: "100%",
        opacity: 0,
        transition: { duration: 0.35, ease: "easeIn" },
      }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className="grid-rows-[max-content_max-content_max-content_1fr_max-content] grid-cols-[100px_1fr_max-content] lg:grid-cols-[118px_1fr_max-content] grid lg:w-[420px] mb-4 lg:mb-6 items-center [&>svg]:stroke-black"
    >
      {/* NAME  */}
      <h2 className="col-start-2 col-end-3 row-start-1 row-end-2 flex mb-1 text-xs text-[white] font-inter">
        {name}
      </h2>

      {/* {isRemovingItem && (
        <motion.svg
          viewBox="25 25 50 50"
          width="24px"
          height="24px"
          display="block"
          z-index="1"
          strokeWidth="3"
          strokeMiterlimit="10"
          strokeLinecap="round"
          opacity="0"
          className="-left-[80px] absolute"
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.5,
            ease: "easeIn",
          }}
        >
          <motion.circle
            cx="50"
            cy="50"
            r="20"
            fill="none"
            stroke-dasharray="1, 200"
            stroke-dashoffset="0"
            animate={{
              strokeDasharray: ["1 200", "89 200", "89 200"],
              rotate: 360,
              strokeDashoffset: [0, -35, -124],
            }}
            transition={{
              type: "tween",
              ease: "linear",
              duration: 1.3,
              repeat: Infinity,
              repeatType: "loop",
            }}
          />
        </motion.svg>
      )} */}

      {/* Image */}
      <span
        className={
          "col-start-1 col-end-2 row-span-4 flex relative aspect-product mr-4 rounded-[8px] bg-[#F6F6F6] h-[118px] justify-center items-center"
        }
      >
        <Image
          className={"w-full object-cover bg-[#F6F6F6] h-full rounded-[8px]"}
          src={src}
          layout={"fill"}
          objectFit="cover"
          alt={"yabbayabba"}
        />
      </span>

      {/* REMOVE  */}
      <button
        onClick={() => removeItemHelper(line)}
        className="col-start-3 col-end-4 row-start-4 row-end-5 flex justify-end font-light text-xs text-[white] font-inter self-end"
      >
        {isRemovingItem ? <ProgressIndicator /> : "[ Remove ]"}
      </button>

      {/* PRICE */}
      <div className="col-start-2 col-end-3 row-start-2 row-end-3 flex flex-col mb-1 justify-end text-[white] font-mono text-xs uppercase">
        <span>{price}</span>
      </div>

      <div className="row-start-4 row-end-5 col-start-2 col-end-3 flex gap-4 items-center text-sm font-inter self-end">
        <motion.button
          // whileTap={{ scale: quantity === 1 ? 1 : 1.2 }}
          className="w-6 h-6 flex justify-center disabled:cursor-default cursor-pointer items-center [&>svg]:disabled:fill-[#bababa] [&>svg]:w-3 [&>svg]:h-3 [&>svg]:fill-[#161316] [&>svg]:hover:fill-[#161316]"
          disabled={quantity === 1}
          onClick={() => updateQuantityHelper(line, "decrease")}
        >
          {!isRemovingQuantity ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 1.13">
              <path d="M5.44 0h6a.56.56 0 1 1 0 1.12H.56A.56.56 0 1 1 .56 0h4.87Z" />
            </svg>
          ) : (
            <ProgressIndicator />
          )}
        </motion.button>
        <motion.span key={quantity} className="">
          {quantity}
        </motion.span>
        <motion.button
          // whileTap={{ scale: 1.3 }}
          className="w-6 h-6 flex justify-center items-center [&>svg]:fill-[#161316] [&>svg]:hover:fill-[#161316] [&>svg]:hover:cursor-pointer disabled:[&>svg]:fill-[#f6f6f6] [&>svg]:w-3 [&>svg]:h-3"
          onClick={() => updateQuantityHelper(line, "increase")}
        >
          {!isAddingQuantity ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12">
              <path d="M11.44 5.44H6.57V.56a.56.56 0 1 0-1.12 0v4.87H.56a.56.56 0 1 0 0 1.12h4.87v4.87a.56.56 0 1 0 1.12 0V6.55h4.87a.56.56 0 1 0 0-1.12Z" />
            </svg>
          ) : (
            <ProgressIndicator />
          )}
        </motion.button>
      </div>
    </motion.div>
  );
};
