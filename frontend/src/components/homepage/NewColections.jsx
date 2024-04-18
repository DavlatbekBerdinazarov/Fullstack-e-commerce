import { Link } from "react-router-dom";
import newCollectinsData from "../Assets/new_collections";
import { useEffect, useState } from "react";
import axios from "axios";

export default function NewCollections() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:4545/api/allproducts');
      setData(response.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (data.length === 0) {
    return <div>No products available</div>;
  }

  console.log(data)

  return (
    <section className="py-12">
      <div className="w-[400px] mx-auto flex justify-center flex-col items-center gap-2">
        <h1 className="text-center tracking-tighter font-semibold text-4xl uppercase">
          New Collections
        </h1>
        <div className="w-1/2 h-2 bg-black rounded-sm   "></div>
      </div>

      <main className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-16">
        {data && data.map((product) => {
          return (
            <Link to={`/product/${product._id}`} key={product._id} className=" col-span-1">
              <div className=" overflow-hidden">
                <img className=" hover:scale-[1.1] duration-200" src={product.image} alt="girl 1" />
              </div>
              <h2 className="text-sm font-semibold leading-6">
                {product.title}
              </h2>
              <h2 className=" text-black font-semibold">
                ${product.new_price}{" "}
                <span className="ml-4 text-gray-500 line-through">${product.old_price}</span>
              </h2>
            </Link>
          );
        })}
      </main>
    </section>
  );
}
