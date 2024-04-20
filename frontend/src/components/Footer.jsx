import { Button } from "@material-tailwind/react";
import big_logo from "../components/Assets/logo_big.png";
import cart_icon from "../components/Assets/cart_icon.png";
import { Link, useLocation } from "react-router-dom";
import whatsappIcon from './Assets/whatsapp_icon.png'
import instagramIcon from './Assets/instagram_icon.png'
import pinterestIcon from './Assets/pintester_icon.png'


export default function Footer() {
  const path = useLocation()

  return (
    <footer className={`w-full py-2 border-b shadow-sm mt-12 pt-6 ${path.pathname == '/login' ? 'hidden' : 'null'}`}>
      <div className="md:container mx-auto lg:px-10 px-[15px] ">
        <div className="flex flex-col gap-6 items-center mb-8">
          <Link to='/' className="flex items-center gap-2">
            <img className="w-12 md:w-14" src={big_logo} alt="big logo" />
            <h1 className="uppercase text-2xl md:text-3xl font-semibold md:font-medium">Shopper</h1>
          </Link>

          {/* category */}
          <ul className="flex gap-6 font-medium">
            <li>
              <Link to="#">
                Company
              </Link>
            </li>
            <li>
              <Link to="#">
                Products
              </Link>
            </li>
            <li>
              <Link to="#">
                Offices
              </Link>
            </li>
            <li>
              <Link to="#">
                About
              </Link>
            </li>
            <li>
              <Link to="#">
                Contact
              </Link>
            </li>
          </ul>

          {/* cart login */}
          <div className="flex gap-8 items-center select-none">
            <Link to="#">
              <img className="w-6 h-6" src={instagramIcon} alt="insta" />
            </Link>

            <Link to="#" className="relative active:bg-blue-gray-50">
              <img className="w-6 h-6" src={pinterestIcon} alt="pinterest" />
            </Link>
            <Link to="#" className="relative active:bg-blue-gray-50">
              <img className="w-6 h-6" src={whatsappIcon} alt="watsapp" />
            </Link>
          </div>
        </div>
        <div className="py-4 border-t-2 border-gray-700 mb-4">
          <h2 className="font-semibold text-center text-gray-700">Copyrights @2024 - All rights reserved.</h2>
        </div>
      </div>
  </footer>
  )
}
