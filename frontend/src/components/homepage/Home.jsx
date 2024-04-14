
import heroImg from '../Assets/hero_image.png'
import handshake from '../Assets/hand_icon.png'
import arrow from '../Assets/arrow.png'
import { Button } from '@material-tailwind/react'
export default function Home() {
  return (
    <div className="bg-gradient-to-b from-[#fde1ff] to-[#ffffff] bg-opacity-60 h-[90vh]">
      <main className="md:container mx-auto lg:px-10 px-[15px] flex items-center h-full justify-between select-none">
          <div className="flex justify-between items-center flex-wrap w-full">
            <div className="lg:w-1/2 h-full w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
              <h1 className="text-gray-900 text-xl font-semibold title-font uppercase mb-4 tracking-tighter">
                New arrivals only
              </h1>

              <div className=' tracking-tighter font-semibold text-7xl'>
                <div className="flex py-2 ">
                    <span className="">new</span>
                    <img className='w-20 ml-3' src={handshake} alt="handshake" />
                </div>
                <div className="flex py-2 ">
                    <span className=" text-7xl">collections</span>
                </div>
                <div className="flex py-2 ">
                    <span className=" text-7xl">for everyone</span>
                </div>
                <Button className=' tracking-normal bg-red-600 rounded-full flex gap-4 px-6 py-4 mt-5'>
                    <span className=' capitalize text-[#e5dfdf] text-[14px]'>Latest Collections</span>
                    <img className=' w-sm' src={arrow} alt="arrow" />
                </Button>
              </div>
            </div>
            <img
              alt="ecommerce"
              className="lg:w-1/3 w-full lg:h-auto h-64 object-cover object-center rounded select-none"
              src={heroImg}
            />
          </div>
      </main>
    </div>
  )
}
