import girlImg from "../Assets/product_13.png";
import React, { useContext } from "react";
import { Button, Rating, Typography } from "@material-tailwind/react";
import { ShoppingCartContext } from "../../layouts/MainLayout";

export default function ProductDetails({ data }) {
  const [rated, setRated] = React.useState(4);

  const { handleAddToCart } = useContext(ShoppingCartContext);



  return (
    <>
      {data &&
        data.map((product) => {
          return (
            <section className="mt-8 flex gap-12">
              {/* imgs */}
              <div className="flex gap-3 select-none w-1/2">
                <div className="flex flex-col justify-between min-w-[110px]">
                  <img className="h-32" src={product.image} alt="dfe" />
                  <img className="h-32" src={product.image} alt="dfe" />
                  <img className="h-32" src={product.image} alt="dfe" />
                  <img className="h-32" src={product.image} alt="dfe" />
                </div>
                <div>
                  <img className="min-w-[460px] h-full" src={product.image} alt="" />
                </div>
              </div>
              {/* descr */}

              <div className="flex flex-col justify-between gap-1">
                <h1 className="text-3xl font-semibold">
                  {product.name}
                </h1>

                <div className="my-2">
                  <div className="flex items-center gap-2 font-bold text-blue-gray-500">
                    {rated}.7
                    <Rating
                      value={4}
                      ratedColor="red"
                      onChange={(value) => setRated(value)}
                      readonly
                    />
                    <Typography
                      color="blue-gray"
                      className="font-medium text-blue-gray-500"
                    >
                      Based on 134 Reviews
                    </Typography>
                  </div>
                </div>

                <div>
                  <h2 className=" text-red-700 font-semibold text-2xl my-5">
                    ${product.new_price}{" "}
                    <span className="ml-4 text-gray-800 line-through">
                      ${product.old_price}
                    </span>
                  </h2>
                </div>

                <p className="mb-6">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Maxime saepe perferendis ab?
                </p>

                <div>
                  <h1 className=" font-semibold text-xl">Select size</h1>
                  <div className="my-4 flex gap-5">
                    <div className=" bg-blue-gray-50 w-14 h-14 uppercase shadow-sm border-gray-300 hover:bg-gray-700 select-none border-2 flex items-center justify-center">
                      S
                    </div>
                    <div className=" bg-blue-gray-50 w-14 h-14 uppercase shadow-sm border-gray-300 hover:bg-gray-700 select-none border-2 flex items-center justify-center">
                      M
                    </div>
                    <div className=" bg-blue-gray-50 w-14 h-14 uppercase shadow-sm border-gray-300 hover:bg-gray-700 select-none border-2 flex items-center justify-center">
                      L
                    </div>
                    <div className=" bg-blue-gray-50 w-14 h-14 uppercase shadow-sm border-gray-300 hover:bg-gray-700 select-none border-2 flex items-center justify-center">
                      XL
                    </div>
                    <div className=" bg-blue-gray-50 w-14 h-14 uppercase shadow-sm border-gray-300 hover:bg-gray-700 select-none border-2 flex items-center justify-center">
                      XXL
                    </div>
                  </div>
                </div>

                <div>
                  <Button onClick={() => handleAddToCart(product)} className=" capitalize rounded-none my-2 text-sm py-3 px-8 bg-red-600">
                    ADD TO CART
                  </Button>
                </div>

                <div className="my-3">
                  <h1 className="font-semibold mb-2">
                    Category:{" "}
                    <span className="font-normal">
                      <span className=" capitalize font-medium">{product.category}</span>, {product.name}
                    </span>
                  </h1>
                  <h1 className="font-semibold">
                    Tags:{" "}
                    <span className="font-normal">
                      Modern style
                    </span>
                  </h1>
                </div>
              </div>
            </section>
          );
        })}
    </>
  );
}
