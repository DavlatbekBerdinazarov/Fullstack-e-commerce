import exclusiveImg from "../Assets/exclusive_image.png";
import { Button } from "@material-tailwind/react";
export default function ExclusiveOffer() {
  return (
    <div className="bg-gradient-to-b from-[#fde1ff] to-[#ffffff] bg-opacity-60 md:h-[80vh]">
      <main className="md:container mx-auto lg:px-24 md:px-[30px] py-5 flex items-center h-full justify-between select-none">
        <div className="flex justify-between items-center flex-wrap w-full p-5">
          <div className="lg:w-1/2 h-full w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
            <div className=" tracking-tighter font-semibold text-6xl">
              <div className="flex py-4 ">
                <span className="">Exclusive</span>
              </div>
              <div className="flex py-4 ">
                <span className="">Offers For You</span>
              </div>
              <h1 className="text-gray-900 text-lg font-semibold title-font uppercase mb-4 tracking-tighter">
                only on best sellers products
              </h1>
              <Button className=" tracking-normal bg-red-600 rounded-full px-6 py-4 mt-5">
                <span className=" capitalize text-[#e5dfdf] text-[14px]">
                  Check now
                </span>
              </Button>
            </div>
          </div>
          <img
            alt="ecommerce"
            className="md:w-1/3 h-auto object-cover object-center rounded select-none"
            src={exclusiveImg}
          />
        </div>
      </main>
    </div>
  );
}
