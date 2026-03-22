import { motion } from "motion/react";
import Image from "next/image";
import { useContext } from "react";
import { MockedCartContext } from "./MockCartProvider";

export const CartItem = ({
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

  return (
    <div className="grid-rows-[max-content_max-content_max-content_1fr_max-content] grid-cols-[100px_1fr_max-content] lg:grid-cols-[118px_1fr_max-content] grid lg:w-[420px] mb-4 lg:mb-6 items-center">
      {/* NAME  */}
      <h2 className="col-start-2 col-end-3 row-start-1 row-end-2 flex mb-1 text-xs text-[#F7F7F7] font-inter">
        {name}
      </h2>

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
        onClick={() => globalProvider?.removeItem(line)}
        whileTap={{ scale: 0.96 }}
        className="col-start-3 col-end-4 row-start-4 row-end-5 flex justify-end font-light text-xs text-gray-500 hover:text-[#F7F7F7] transition-colors duration-200 font-inter self-end cursor-pointer"
      >
        [ Remove ]
      </motion.button>

      {/* PRICE */}
      <div className="col-start-2 col-end-3 row-start-2 row-end-3 flex flex-col mb-1 justify-end text-[#F7F7F7] font-mono text-xs uppercase">
        <span>{price}</span>
      </div>

      <div className="row-start-4 row-end-5 col-start-2 col-end-3 flex gap-4 items-center text-sm font-inter self-end">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.85 }}
          className="w-6 h-6 flex justify-center disabled:cursor-default cursor-pointer items-center [&>svg]:disabled:fill-gray-600 [&>svg]:w-2 [&>svg]:h-2 [&>svg]:fill-gray-400 [&>svg]:hover:fill-[#F7F7F7] transition-colors duration-200"
          disabled={quantity === 1}
          onClick={() => globalProvider?.updateQuantity(line, quantity - 1)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 1.13">
            <path d="M5.44 0h6a.56.56 0 1 1 0 1.12H.56A.56.56 0 1 1 .56 0h4.87Z" />
          </svg>
        </motion.button>
        <span className="text-[#F7F7F7] font-mono text-xs tabular-nums w-[2ch] text-center inline-block">
          {quantity}
        </span>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.85 }}
          className="w-6 h-6 flex justify-center cursor-pointer items-center [&>svg]:fill-gray-400 [&>svg]:hover:fill-[#F7F7F7] [&>svg]:w-2 [&>svg]:h-2 transition-colors duration-200"
          onClick={() => globalProvider?.updateQuantity(line, quantity + 1)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12">
            <path d="M11.44 5.44H6.57V.56a.56.56 0 1 0-1.12 0v4.87H.56a.56.56 0 1 0 0 1.12h4.87v4.87a.56.56 0 1 0 1.12 0V6.55h4.87a.56.56 0 1 0 0-1.12Z" />
          </svg>
        </motion.button>
      </div>
    </div>
  );
};
