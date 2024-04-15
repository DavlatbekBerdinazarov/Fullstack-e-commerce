import { ButtonGroup, Card, Typography } from "@material-tailwind/react";
import { IoClose } from "react-icons/io5";
import { Button, Input } from "@material-tailwind/react";
import { Link } from "react-router-dom";

const TABLE_HEAD = ["Products", "name", "price", "Quantity", "Total", "Remove"];

const cartData = [
  {
    image: '/product_2.png',
    name: "John Michael Smith - List of Products",
    new_price: "$80",
  },
  {
    image: '/product_2.png',
    name: "John Michael Smith - List of Products",
    new_price: "$80",
  },
  {
    image: '/product_2.png',
    name: "John Michael Smith - List of Products",
    new_price: "$80",
  },
  {
    image: '/product_2.png',
    name: "John Michael Smith - List of Products",
    new_price: "$80",
  },
];


export default function AllProducts() {
  return (
    <div className="w-full pl-5 pt-5">
      <Card className="h-[85vh] w-3/4 py-8 px-16 ">
        <h2 className="text-center font-semibold text-2xl text-black pb-4">All Products List ({cartData.length})</h2>
        <div className="max-h-full overflow-y-scroll select-none">
          <table className="w-full min-w-max text-left ">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-b border-black py-4 text-black font-semibold"
                  >
                    <h2 className="leading-none capitalize">{head}</h2>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {cartData.map(({ image, name, new_price, id, quantity }, index) => {
                const isLast = index === cartData.length - 1;
                const classes = isLast ? "pt-6" : "py-6 border-b border-black";

                return (
                  <tr key={name}>
                    <td className={classes}>
                      <div
                        className=" w-20 h-20 "
                      >
                        <img className="relative -top-2" src={image} alt="name" />
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="font-semibold">{name}</div>
                    </td>
                    <td className={classes}>
                      <div className="font-semibold">{new_price}</div>
                    </td>
                    <td className={classes}>
                      <Button className="font-semibold bg-white rounded-none shadow-sm text-black">
                        {quantity}
                      </Button>
                    </td>
                    <td className={classes}>
                      <div className="font-semibold">${quantity * new_price}</div>
                    </td>
                    <td className={classes}>
                      <div className="flex justify-center text-center">
                        <IoClose
                          onClick={() => handleRemoveFromCart(id)}
                          className="font-semibold text-2xl"
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
              {cartData.length == 0 && (
                <div className="py-4 text-xl">No products yet...</div>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
