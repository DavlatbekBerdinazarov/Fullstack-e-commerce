import { ButtonGroup, Card, Typography } from "@material-tailwind/react";
import img from "../Assets/product_11.png";
import { IoClose } from "react-icons/io5";
import { useContext, useState } from "react";
import { ShoppingCartContext } from "../../layouts/MainLayout";
import { Button, Input } from "@material-tailwind/react";
import { Link } from "react-router-dom";

const TABLE_HEAD = ["Products", "name", "price", "Quantity", "Total", "Remove"];

const TABLE_ROWS = [
  {
    image: img,
    name: "John Michael Smith - List of Products",
    new_price: "$80",
  },
  {
    image: img,
    name: "John Michael Smith - List of Products",
    new_price: "$80",
  },
  {
    image: img,
    name: "John Michael Smith - List of Products",
    new_price: "$80",
  },
  {
    image: img,
    name: "John Michael Smith - List of Products",
    new_price: "$80",
  },
];

export function ShoppingCartTable() {
  const [email, setEmail] = useState("");
  const onChange = ({ target }) => setEmail(target.value);
  const { cartData, handleRemoveFromCart, totalPrice } =
    useContext(ShoppingCartContext);

  return (
    <>
      <Card className="h-full w-full shadow-none">
        <table className="w-full min-w-max table-auto text-left">
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
              const isLast = index === TABLE_ROWS.length - 1;
              const classes = isLast ? "py-4" : "py-4 border-b border-black";

              return (
                <tr key={name}>
                  <td className={classes}>
                    <Link
                      as="div"
                      to={`/product/${id}`}
                      className="block w-16 h-16"
                    >
                      <img src={image} alt="name" />
                    </Link>
                  </td>
                  <td className={classes}>
                    <div className="font-semibold">{name}</div>
                  </td>
                  <td className={classes}>
                    <div className="font-semibold">{new_price}</div>
                  </td>
                  <td className={classes}>
                    <Button className="font-semibold bg-white rounded-none shadow-sm text-black">{quantity}</Button>
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
      </Card>
      <div className="flex justify-between my-16">
        <div className="w-1/2">
          <h1 className="text-2xl font-semibold">Cart Totals</h1>
          <div className="flex flex-col gap-1 mt-5 font-medium">
            <div className="flex justify-between py-3 border-b-2 border-gray-600">
              <h3 className=" text-black">Subtotals</h3>
              <h3>${totalPrice}</h3>
            </div>
            <div className="flex justify-between py-3 border-b-2 border-gray-600">
              <h3>Shipping Fee</h3>
              <h3>$100</h3>
            </div>
            <div className="flex justify-between py-3 font-semibold text-lg">
              <h3>Total</h3>
              <h3>${totalPrice + 100}</h3>
            </div>
          </div>

          <div>
            <Button className=" tracking-normal bg-red-600 rounded-none px-6 py-4 mt-5">
              <span className=" capitalize text-[#e5dfdf] text-[14px]">
                Checkout now
              </span>
            </Button>
          </div>
        </div>

        <div className="w-1/3">
          <div>
            <h1>If you have a promo code eneter here</h1>
            <from className="relative flex w-full max-w-[32rem] mx-auto mt-6">
              <Input
                type="email"
                placeholder="Enter Coupon"
                className="!border !border-gray-300 rounded-none py-6 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                labelProps={{
                  className: "hidden",
                }}
                onChange={onChange}
                containerProps={{ className: "min-w-[100px]" }}
              />
              <Button
                size="md"
                color={email ? "gray" : "blue-gray"}
                disabled={!email}
                className="!absolute right-0 top-0 py-4 rounded-none"
              >
                Submit
              </Button>
            </from>
          </div>
        </div>
      </div>
    </>
  );
}