import { Button, Card } from "@material-tailwind/react";
import { Input } from "@material-tailwind/react";
import { useState, useEffect } from "react";
import axios from "axios";
import { FiEdit } from "react-icons/fi";
import { useParams } from "react-router-dom";


export default function EditProduct() {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [old_price, setOld_price] = useState('');
  const [new_price, setNew_price] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state

  let { id } = useParams();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:4545/api/allproducts/${id}`);
      console.log(response.data)
      setTitle(response.data.title);
      setImage(response.data.image);
      setOld_price(response.data.old_price);
      setNew_price(response.data.new_price);
      setCategory(response.data.category);
    } catch (error) {
      console.log(error.message);
    }
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true while submitting
    axios.put(`http://localhost:4545/api/edit-product/${id}`, { title, image, category, old_price, new_price })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
        }
      })
      .catch((err) => {
        console.log(err);
        // Handle errors or provide feedback to the user
      })
      .finally(() => {
        setLoading(false); // Set loading back to false after request completes
      });
  };
  return (
    <div className="w-full pl-5 pt-5 ">
      <Card className="h-[85vh] xl:w-3/4 py-8 px-16 bg-[#f5faff]">
        <h2 className="text-center flex items-center justify-center gap-3 font-semibold text-2xl text-black pb-4">
          Edit Product <FiEdit />
        </h2>
        <form onSubmit={onSubmitHandler} className="max-h-full">
          <label htmlFor="title" className="my-3">
            Product Title
          </label>
          <div className="w-full my-2">
            <Input
              id="title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              type="text"
              placeholder="Title"
              className="!border !border-gray-300 bg-white rounded-none py-6 text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
              labelProps={{
                className: "hidden",
              }}
              containerProps={{ className: "min-w-[100px]" }}
            />
          </div>
          <div className="flex gap-5 my-10">
            <div className="w-full">
              <label htmlFor="new_price" className="my-3">
                New Price
              </label>
              <div className="w-full my-2">
                <Input
                  id="new_price"
                  onChange={(e) => setNew_price(e.target.value)}
                  value={new_price}
                  type="number"
                  placeholder="New Price"
                  className="!border !border-gray-300 bg-white rounded-none py-6 text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                  labelProps={{
                    className: "hidden",
                  }}
                  containerProps={{ className: "min-w-[100px]" }}
                />
              </div>
            </div>
            <div className="w-full">
              <label htmlFor="old_price" className="my-3">
                Old Price
              </label>
              <div className="w-full my-2">
                <Input
                  id="old_price"
                  onChange={(e) => setOld_price(e.target.value)}
                  value={old_price}
                  type="number"
                  placeholder="Old Price"
                  className="!border !border-gray-300 bg-white rounded-none py-6 text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                  labelProps={{
                    className: "hidden",
                  }}
                  containerProps={{ className: "min-w-[100px]" }}
                />
              </div>
            </div>
          </div>
          <div className="relative inline-block w-1/3">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              className="block mt-2 appearance-none w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              onChange={(e) => setCategory(e.target.value)}
              value={category}
            >
              <option value="">Select option</option>
              <option value="men">Men</option>
              <option value="women">Women</option>
              <option value="kid">Kid</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"></div>
          </div>

          <div className="my-6 w-2/3">
            <label htmlFor="image" className="my-3">
              Image url
            </label>
            <div className="w-full my-2">
              <Input
                id="image"
                type="text"
                onChange={(e) => setImage(e.target.value)}
                value={image}
                placeholder="Image url"
                className="!border !border-gray-300 bg-white rounded-none py-6 text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                labelProps={{
                  className: "hidden",
                }}
                containerProps={{ className: "min-w-[100px]" }}
              />
            </div>
          </div>

          <Button type="submit" className="rounded-none py-3.5 mt-4 px-10" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit'}
          </Button>
        </form>
      </Card>
    </div>
  );
}
