import bannerWomens from "../components/Assets/banner_women.png";
import { Select, Option } from "@material-tailwind/react";
import allProduct from "../components/Assets/all_product";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Womens() {
  const [mensProuct, setMensProduct] = useState(null);

  useEffect(() => {
    const mendata = allProduct.filter((product) => product.category == "women");
    setMensProduct(mendata);
  }, []);

  return (
    <div className="md:container mx-auto lg:px-10 px-[15px] my-5">
      <div>
        <img src={bannerWomens} alt="banner mens" />
      </div>

      <div className="flex justify-between my-6 items-center">
        <h2>Showing 1-12 out of 54 products</h2>
        <div className="flex gap-8 justify-center items-center">
          <h3>Sort:</h3>
          <Select variant="static" className="">
            <Option>HTML</Option>
            <Option>React</Option>
            <Option>Vue</Option>
            <Option>Angular</Option>
            <Option>Svelte</Option>
          </Select>
        </div>
      </div>

      <main className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-16">
        {mensProuct &&
          mensProuct.map((product) => {
            return (
              <Link
                to={`/product/${product.id}`}
                key={product.id}
                className=" col-span-1"
              >
                <div className=" overflow-hidden">
                  <img
                    className=" hover:scale-[1.1] duration-200"
                    src={product.image}
                    alt="girl 1"
                  />
                </div>
                <h2 className="text-sm font-semibold leading-6">
                  {product.name}
                </h2>
                <h2 className=" text-black font-semibold">
                  ${product.new_price}{" "}
                  <span className="ml-4 text-gray-500 line-through">
                    ${product.old_price}
                  </span>
                </h2>
              </Link>
            );
          })}
      </main>
    </div>
  );
}
