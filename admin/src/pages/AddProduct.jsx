import { Button, Card } from "@material-tailwind/react";
import { Input } from "@material-tailwind/react";
import { useState } from "react";

export default function AddProducts() {
  const [value, setValue] = useState("react");
  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="w-full pl-5 pt-5 ">
      <Card className="h-[85vh] w-3/4 py-8 px-16 bg-[#f5faff]">
        <h2 className="text-center font-semibold text-2xl text-black pb-4">
          Add Product
        </h2>
        <form className="max-h-full">
          <label htmlFor="title" className="my-3">
            Product Title
          </label>
          <div className="w-full my-2">
            <Input
              id="title"
              type="email"
              placeholder="Email Address"
              className="!border !border-gray-300 bg-white rounded-none py-6 text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
              labelProps={{
                className: "hidden",
              }}
              containerProps={{ className: "min-w-[100px]" }}
            />
          </div>
          <div className="flex gap-5 my-10">
            <div className="w-full">
              <label htmlFor="title" className="my-3">
                Price
              </label>
              <div className="w-full my-2">
                <Input
                  id="title"
                  type="email"
                  placeholder="Email Address"
                  className="!border !border-gray-300 bg-white rounded-none py-6 text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                  labelProps={{
                    className: "hidden",
                  }}
                  containerProps={{ className: "min-w-[100px]" }}
                />
              </div>
            </div>
            <div className="w-full">
              <label htmlFor="title" className="my-3">
                Offer Price
              </label>
              <div className="w-full my-2">
                <Input
                  id="title"
                  type="email"
                  placeholder="Email Address"
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
            <label htmlFor="">Category</label>
            <select
              className="block mt-2 appearance-none w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              value={selectedOption}
              onChange={handleChange}
            >
              <option value="">Select option</option>
              <option value="men">Men</option>
              <option value="women">Women</option>
              <option value="kid">Kid</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"></div>
          </div>

          <div className="my-6 w-2/3">
            <label htmlFor="title" className="my-3">
              Image url
            </label>
            <div className="w-full my-2">
              <Input
                id="title"
                type="text"
                placeholder="Image url"
                className="!border !border-gray-300 bg-white rounded-none py-6 text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                labelProps={{
                  className: "hidden",
                }}
                containerProps={{ className: "min-w-[100px]" }}
              />
            </div>
          </div>

          <Button type="submit" className="rounded-none py-3.5 mt-4 px-10">Submit</Button>
        </form>
      </Card>
    </div>
  );
}
