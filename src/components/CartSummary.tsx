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
    description:
      "Blue woven shirt with an all over print of the iconic Mini Rodini Panda, made from 100 % TENCEL™ Lyocell. The fabric is soft and airy, perfect for summer days.<br><br>The Panda is the iconic symbol of Mini Rodini and was created by Founder and Creative Director Cassandra Rhodin around the same time she started the brand in 2006.",
    url: "panda-woven-shirt-blue",
    images: [
      {
        src: "https://images.unsplash.com/photo-1503602642458-232111445657?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Product image",
      },
      {
        src: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa",
        alt: "Product image",
      },
      {
        src: "https://minirodini.centraqa.com/client/dynamic/images/11351_a831b28866-2322016660-3-full.jpg",
        alt: "Product image",
      },
      {
        src: "https://minirodini.centraqa.com/client/dynamic/images/11351_94c1a33b54-2322016660-4-full.jpg",
        alt: "Product image",
      },
    ],
    price: {
      price: "700.00 SEK",
      priceBeforeDiscount: "700.00 SEK",
      discounted: false,
      discountPercent: 0,
    },
    shortDescription:
      "Blue woven shirt with an all over print of the iconic Mini Rodini Panda, made from 100 % TENCEL™ Lyocell.",
  },
  {
    line: "dc3a51096b27700b2cecf7bcea03d7b0",
    size: "68/74",
    bundleItems: [],
    quantity: 1,
    metaData: "Multi / 68/74",
    id: "25347",
    name: "Bioglow",
    description:
      "Baby kit including a long sleeved body and a hat with all over Mini Babies print along with a baby bib, made from GOTS certified organic cotton with stretch. The hat features a soft elastic around the head. The body is designed with snap buttons at the shoulder and crotch for easy dressing. The bib is designed with snap buttons to achieve the perfect fit. The kit comes with a matching drawstring bag.<br><br>The print Mini Babies was created by Cassandra Rhodin, Founder and Creative Director, in 2020. She was inspired by the idea that the Mini Rodini cat and Dashing Dog had kids. A personal favorite of Cassandra, now Mini Babies relaunches, for a small collection of organic styles.<br><br>To see which size of the hat that comes with each set, see below:<br><br>Size 56/62: 40/42 (approx 1-4 months)<br>Size 68/74: 44/46 (approx 4-9 months)<br>Size 80/86: 48/50 (approx 9 months-1,5 years)",
    url: "mini-babies-baby-set-1100003500",
    images: [
      {
        src: "https://images.unsplash.com/photo-1615397349754-cfa2066a298e?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Product image",
      },
      {
        src: "https://minirodini.centraqa.com/client/dynamic/images/11209_f7ce1a85d3-1100003500-2-full.jpg",
        alt: "Product image",
      },
      {
        src: "https://minirodini.centraqa.com/client/dynamic/images/11209_771077e4a1-1100003500-3-full.jpg",
        alt: "Product image",
      },
      {
        src: "https://minirodini.centraqa.com/client/dynamic/images/11209_dfd21204a1-1100003500-4-full.jpg",
        alt: "Product image",
      },
      {
        src: "https://minirodini.centraqa.com/client/dynamic/images/11209_8e4ced5ee3-1100003500-5-full.jpg",
        alt: "Product image",
      },
    ],
    price: {
      price: "500.00 SEK",
      priceBeforeDiscount: "500.00 SEK",
      discounted: false,
      discountPercent: 0,
    },
    shortDescription:
      "Baby kit including a long sleeved body and a hat with all over Mini Babies print along with a baby bib.",
  },
  {
    line: "3ff194463aecbf29720b4da70de1075c",
    size: "NEW BORN",
    quantity: 1,
    metaData: " / NEW BORN",
    id: "28534",
    name: "Polaroid",
    description:
      "Multi coloured track jacket with an all over Rabbit print, made from 100 % recycled polyamide. Designed for an oversized fit, featuring two front pockets with Mini Rodini branded snap buttons, zip closure and a FILA x Mini Rodini collaborative logo pull tab and patch on the chest. Lined with breathable mesh.\r\n\r\n\r\nMulti coloured panelled track pants featuring a Rabbit print on the leg, made from 100 % recycled polyamide. Designed with two front pockets, an elastic waistband with a hidden drawstring and elastic cuffs at leg ends. Lined with breathable mesh and finished with a FILA x Mini Rodini collaborative patch.\r\n\r\n\r\nWhite mid-top faux leather sneakers featuring printed green stripes, the FILA F-logo on the side panels along with debossed Mini Rodini Panda symbols on the heel. Designed with stretchy knot-free laces, velcro-fastened straps along with a padded and ribbed tongue. Cushy EVA-soles ensure all day comfort and the heel loops make putting these shoes on a breeze.",
    url: "mp-qa-flexible-bundle",
    images: [
      {
        src: "https://images.unsplash.com/photo-1516962126636-27ad087061cc?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Product image",
      },
      {
        src: "https://minirodini.centraqa.com/client/dynamic/images/14261_2da0ec3fe0-11449_965ac74892-2333010700-1-1350x0-full.jpg",
        alt: "Product image",
      },
      {
        src: "https://minirodini.centraqa.com/client/dynamic/images/14261_376f7ef9dc-11456_8233a5a10d-2336010675-2-1350x0-full.jpg",
        alt: "Product image",
      },
      {
        src: "https://minirodini.centraqa.com/client/dynamic/images/14261_613e6d7c18-11449_a1931026f4-7_y2a4819-1350x0-full.jpg",
        alt: "Product image",
      },
    ],
    price: {
      price: "2 500.00 SEK",
      priceBeforeDiscount: "2 500.00 SEK",
      discounted: false,
      discountPercent: 0,
    },
    shortDescription:
      "FILA x Mini Rodini kids track suit with all over Rabbit print, and matching sneakers.",
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
