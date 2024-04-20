import bannerKids from "../components/Assets/banner_kids.png";
import { Select, Option } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Kids() {
  const [kidsProduct, setKidsProduct] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      const response = await axios.get("http://localhost:4545/api/allproducts");
      setData(response.data);
      setLoading(false); // Move setLoading to here so it triggers after data is set
    } catch (error) {
      setError(error.message);
      setLoading(false); // Set loading to false even in case of error
    }
  };

  useEffect(() => {
    if (data) {
      const kidsData = data.filter((product) => product.category === "kid");
      setKidsProduct(kidsData);
    }
  }, [data]); // Trigger this useEffect whenever data changes

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!kidsProduct || kidsProduct.length === 0) {
    return <div>No products available</div>;
  }

  return (
    <div className="md:container mx-auto lg:px-10 px-[15px] my-5">
      <div>
        <img src={bannerKids} alt="banner womens" />
      </div>

      <div className="flex justify-between my-6 items-center">
        <h2>Showing 1-12 out of {kidsProduct.length} products</h2>
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
        {kidsProduct.map((product) => (
          <Link
            to={`/product/${product._id}`}
            key={product._id}
            className="col-span-1"
          >
            <div className="overflow-hidden">
              <img
                className="hover:scale-[1.1] duration-200"
                src={product.image}
                alt={product.title}
              />
            </div>
            <h2 className="text-sm font-semibold leading-6">{product.title}</h2>
            <h2 className="text-black font-semibold">
              ${product.new_price}{" "}
              <span className="ml-4 text-gray-500 line-through">
                ${product.old_price}
              </span>
            </h2>
          </Link>
        ))}
      </main>
    </div>
  );
}
