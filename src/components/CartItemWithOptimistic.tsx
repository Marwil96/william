import { motion } from "motion/react";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { MockedCartContext } from "./MockCartProvider";
import { AsciiSpinner } from "./cart-utils";

export const CartItemWithOptimistic = ({
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

  const [internalQuantity, setQuantity] = useState(quantity);
  const [prevQuantity, setPrevQuantity] = useState(internalQuantity);
  const [updateQueue, setUpdateQueue] = useState<
    { line: string; newQuantity: number }[]
  >([]);

  useEffect(() => {
    if (updateQueue.length > 0) {
      const firstUpdate = updateQueue[0];
      if (firstUpdate) {
        const { line, newQuantity } = firstUpdate;
        const updateQuantity = async () => {
          try {
            await globalProvider?.updateQuantity(line, newQuantity);
            // Remove the processed operation from the queue
            setUpdateQueue((prevQueue) => prevQueue.slice(1));
            // Update prevQuantity state
            setPrevQuantity(newQuantity);
          } catch (error) {
            console.error("Failed to update quantity:", error);
            // Revert quantity state to prevQuantity
            setQuantity(prevQuantity);
          }
        };
        updateQuantity();
      }
    }
  }, [updateQueue]);

  const updateQuantityCallback = (
    line: string,
    type: "decrease" | "increase"
  ) => {
    const newQuantity =
      type === "increase" ? internalQuantity + 1 : internalQuantity - 1;
    // Optimistically update the UI
    setQuantity(newQuantity);
    // Add the update operation to the queue
    setUpdateQueue((prevQueue) => [...prevQueue, { line, newQuantity }]);
  };

  const removeItemHelper = async (line: string) => {
    setIsRemovingItem(true);
    await globalProvider?.removeItem(line);
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
      animate={{ x: isRemovingItem ? 110 : 0, opacity: 1 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className="grid-rows-[max-content_max-content_max-content_1fr_max-content] grid-cols-[100px_1fr_max-content] lg:grid-cols-[118px_1fr_max-content] grid lg:w-[420px] mb-4 lg:mb-6 items-center"
    >
      {/* NAME  */}
      <h2 className="col-start-2 col-end-3 row-start-1 row-end-2 flex mb-1 text-xs text-[#F7F7F7] font-inter">
        {name}
      </h2>

      {isRemovingItem && (
        <div className="-left-[80px] absolute">
          <AsciiSpinner className="font-mono text-sm text-gray-400" />
        </div>
      )}

      {/* Image */}
      <span
        className={
          "col-start-1 col-end-2 row-span-4 flex relative aspect-product mr-4 rounded-[8px] bg-[#F6F6F6] h-[118px] justify-center items-center"
        }
      >
        <Image
          className={"w-full object-cover bg-[#F6F6F6] h-full rounded-[8px]"}
          src={src}
          fill
          style={{ objectFit: "cover" }}
          sizes="118px"
          alt={name}
        />
      </span>

      {/* REMOVE  */}
      <motion.button
        onClick={() => removeItemHelper(line)}
        whileTap={{ scale: 0.96 }}
        className="col-start-3 col-end-4 row-start-4 row-end-5 flex justify-end font-light text-xs text-gray-500 hover:text-[#F7F7F7] transition-colors duration-200 font-inter self-end cursor-pointer"
      >
        {isRemovingItem ? (
          <span className="font-mono text-gray-400">
            [ <AsciiSpinner className="font-mono text-xs text-gray-400" /> ]
          </span>
        ) : (
          "[ Remove ]"
        )}
      </motion.button>

      {/* PRICE */}
      <div className="col-start-2 col-end-3 row-start-2 row-end-3 flex flex-col mb-1 justify-end text-[#F7F7F7] font-mono text-xs uppercase">
        <span>{price}</span>
      </div>

      <div className="row-start-4 row-end-5 col-start-2 col-end-3 flex gap-4 items-center text-sm font-inter self-end">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.85 }}
          className="w-6 h-6 flex justify-center disabled:cursor-default cursor-pointer items-center [&>svg]:disabled:fill-gray-600 [&>svg]:w-3 [&>svg]:h-3 [&>svg]:fill-gray-400 [&>svg]:hover:fill-[#F7F7F7] transition-colors duration-200"
          disabled={internalQuantity === 1}
          onClick={() => updateQuantityCallback(line, "decrease")}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 1.13">
            <path d="M5.44 0h6a.56.56 0 1 1 0 1.12H.56A.56.56 0 1 1 .56 0h4.87Z" />
          </svg>
        </motion.button>
        <motion.span
          key={internalQuantity}
          className="text-[#F7F7F7] font-mono text-xs tabular-nums w-[2ch] text-center inline-block"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15 }}
        >
          {internalQuantity}
        </motion.span>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.85 }}
          className="w-6 h-6 flex justify-center cursor-pointer items-center [&>svg]:fill-gray-400 [&>svg]:hover:fill-[#F7F7F7] [&>svg]:w-3 [&>svg]:h-3 transition-colors duration-200"
          onClick={() => updateQuantityCallback(line, "increase")}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12">
            <path d="M11.44 5.44H6.57V.56a.56.56 0 1 0-1.12 0v4.87H.56a.56.56 0 1 0 0 1.12h4.87v4.87a.56.56 0 1 0 1.12 0V6.55h4.87a.56.56 0 1 0 0-1.12Z" />
          </svg>
        </motion.button>
      </div>
    </motion.div>
  );
};
