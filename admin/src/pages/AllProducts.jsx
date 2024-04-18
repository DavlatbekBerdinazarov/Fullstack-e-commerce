import { Card } from "@material-tailwind/react";
import { IoClose } from "react-icons/io5";
import { useEffect, useState } from "react";
import axios from "axios";

const TABLE_HEAD = ["Products", "Title", "New Price", "Old Price", "Category", "Remove"];

export default function AllProducts() {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:4545/api/allproducts');
      setAllProducts(response.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  console.log(allProducts)

  const handleRemoveFromCart = async (productId) => {
    try {
      await axios.delete(`http://localhost:4545/api/deleteproduct/${productId}`);
      // Update the list of products after deletion
      setAllProducts(allProducts.filter(product => product.id !== productId));
    } catch (error) {
      console.error('Error removing product:', error);
      // Handle error state or display an error message
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (allProducts.length === 0) {
    return <div>No products available</div>;
  }

  return (
    <div className="w-full pl-5 pt-5">
      <Card className="h-[85vh] xl:w-3/4 py-8 px-16">
        <h2 className="text-center font-semibold text-2xl text-black pb-4">All Products List ({allProducts.length})</h2>
        <div className="max-h-full h-[500px] overflow-y-scroll select-none">
          <table className="w-full min-w-max text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head, index) => (
                  <th
                    key={index}
                    className="border-b border-black py-4 text-black font-semibold"
                  >
                    <h2 className="leading-none capitalize">{head}</h2>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {allProducts.map(({ image, title, new_price, old_price, _id, category }, index) => {
                const isLast = index === allProducts.length - 1;
                const classes = isLast ? "pt-6 max-w-40" : "py-6 border-b border-black max-w-40";

                return (
                  <tr key={index}>
                    <td className={classes}>
                      <div className="w-20 h-20">
                        <img className="relative -top-2" src={image} alt={name} />
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="font-semibold">{title}</div>
                    </td>
                    <td className={classes}>
                      <div className="font-semibold">${new_price}</div>
                    </td>
                    <td className={classes}>
                      <div className="font-semibold">${old_price}</div>
                    </td>
                    <td className={classes}>
                      <div className="font-semibold">{category}</div>
                    </td>
                    <td className={classes}>
                      <div className="flex justify-center text-center">
                        <IoClose
                          onClick={() => handleRemoveFromCart(_id)}
                          className="font-semibold text-2xl cursor-pointer hover:bg-gray-300 hover:rounded-full"
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {allProducts.length === 0 && (
            <div className="py-4 text-xl">No products yet...</div>
          )}
        </div>
      </Card>
    </div>
  );
}
