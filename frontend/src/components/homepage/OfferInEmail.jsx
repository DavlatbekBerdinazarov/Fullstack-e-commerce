import React from "react";
import { Input, Button } from "@material-tailwind/react";
export default function OfferInEmail() {
  const [email, setEmail] = React.useState("");
  const onChange = ({ target }) => setEmail(target.value);
  return (
    <div className="bg-gradient-to-b from-[#fde1ff] to-[#ffffff] bg-opacity-60 h-[50vh]">
      <main className="md:container mx-auto lg:px-24 px-[30px] p-14 flex h-full justify-between select-none">
        <div className="flex flex-wrap w-full">
          <div className=" h-full w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0 text-center ">
            <h1 className="text-4xl font-bold text-gray-900 capitalize">
              Get Exclusive Offer on your email
            </h1>

            <p className=" font-semibold my-6 text-gray-800">
              Subscribe to our newsletter and stay updated
            </p>

            <form className="relative flex w-full max-w-[32rem] mx-auto">
              <Input
                type="email"
                placeholder="Email Address"
                className="!border !border-gray-300 rounded-full py-6 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
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
                className="!absolute right-1 top-1 rounded-full"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
