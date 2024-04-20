import { Card, Button, Input } from "@material-tailwind/react";
import { IoClose } from "react-icons/io5";
import { FiEdit } from "react-icons/fi";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const TABLE_HEAD = [
  "Products",
  "Title",
  "New Price",
  "Old Price",
  "Category",
  "Remove",
  "Edit",
];

export default function AllProducts() {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:4545/api/allproducts");
      setAllProducts(response.data.reverse());
      setFilteredProducts(response.data.reverse());
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const filteredProducts = allProducts.filter((product) =>
        product.title.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredProducts(filteredProducts.reverse());
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchValue, allProducts]);

  const onChange = ({ target }) => setSearchValue(target.value);

  const handleRemoveProduct = async (productId) => {
    try {
      await axios.delete(
        `http://localhost:4545/api/deleteproduct/${productId}`
      );
      // Update the list of products after deletion
      setAllProducts(allProducts.filter((product) => product.id !== productId));
      // Reload the page
      window.location.reload();
    } catch (error) {
      console.error("Error removing product:", error);
      // Handle error state or display an error message
    }
  };

  const handleEditProduct = (id) => {
    null;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="w-full pl-5 pt-5">
      <Card className="h-[85vh] xl:w-3/4 py-8 px-16">
        <h2 className="text-center font-semibold text-2xl text-black pb-4">
          All Products List ({allProducts.length})
        </h2>
        <form className="relative mb-8 flex w-full max-w-[24rem] mx-auto">
          <Input
            type="text"
            placeholder="Search products..."
            className="!border !border-gray-300 rounded-full py-3 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
            labelProps={{
              className: "hidden",
            }}
            onChange={onChange}
            containerProps={{ className: "min-w-[100px]" }}
          />
        </form>
        <div className="max-h-full h-[500px] overflow-y-scroll">
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
              {filteredProducts.map(
                (
                  { image, title, new_price, old_price, _id, category },
                  index
                ) => {
                  const isLast = index === filteredProducts.length - 1;
                  const classes = isLast
                    ? "pt-6 pr-3 max-w-40"
                    : "py-6 pr-3 border-b border-black max-w-40";

                  return (
                    <tr key={index}>
                      <td className={classes}>
                        <div className="w-20 h-20">
                          <img
                            className="relative -top-2"
                            src={image}
                            alt={name}
                          />
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
                            onClick={() => handleRemoveProduct(_id)}
                            className="font-semibold text-2xl cursor-pointer hover:bg-gray-300 hover:rounded-full"
                          />
                        </div>
                      </td>
                      <td className={classes}>
                        <Link
                          to={`/dashboard/edit-product/${_id}`}
                          className="flex justify-center text-center"
                        >
                          <FiEdit
                            onClick={() => handleEditProduct(_id)}
                            className="font-semibold text-2xl cursor-pointer hover:text-gray-900"
                          />
                        </Link>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
          {filteredProducts.length === 0 && (
            <div className="py-4 text-xl">No matching products found...</div>
          )}
        </div>
      </Card>
    </div>
  );
}
