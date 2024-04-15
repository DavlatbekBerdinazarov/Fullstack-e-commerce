import { Button } from "@material-tailwind/react";
import big_logo from "../components/Assets/logo_big.png";
import cart_icon from "../components/Assets/cart_icon.png";
import { Link, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ShoppingCartContext } from "../layouts/MainLayout";

export default function Navbar() {
  const [activeNav, setActiveNav] = useState("/");
  const location = useLocation();

  const { cartData } = useContext(ShoppingCartContext)

  useEffect(() => {
    const pathname = location.pathname;
    setActiveNav(pathname);
  }, [location]);

  return (
    <header className="w-full py-2 border-b shadow-sm">
      <nav className="md:container mx-auto lg:px-10 px-[15px] flex justify-between items-center">
        <Link to='/' className="flex items-center gap-2">
          <img className="w-14" src={big_logo} alt="big logo" />
          <h1 className="uppercase text-3xl font-medium">Shopper</h1>
        </Link>

        {/* category */}
        <ul className="flex gap-6 font-medium">
          <li>
            <Link to="/">
              Shop{" "}
              {activeNav == "/" && (
                <span className="block h-[3px] w-full bg-red-600"></span>
              )}
            </Link>
          </li>
          <li>
            <Link to="/mens">
              Men{" "}
              {activeNav == "/mens" && (
                <span className="block h-[3px] w-full bg-red-600"></span>
              )}
            </Link>
          </li>
          <li>
            <Link to="/womens">
              Women{" "}
              {activeNav == "/womens" && (
                <span className="block h-[3px] w-full bg-red-600"></span>
              )}
            </Link>
          </li>
          <li>
            <Link to="/kids">
              Kids{" "}
              {activeNav == "/kids" && (
                <span className="block h-[3px] w-full bg-red-600"></span>
              )}
            </Link>
          </li>
        </ul>

        {/* cart login */}
        <div className="flex gap-5 items-center select-none">
          <Link to="/login">
            <Button
              variant="outlined"
              className="rounded-full capitalize font-medium text-sm px-8"
            >
              login
            </Button>
          </Link>

          <Link to="/cart" className="relative active:bg-blue-gray-50">
            <img className="w-8 h-8" src={cart_icon} alt="cart icon" />
            {cartData.length > 0 && <div className="absolute -top-0 left-6 h-5 w-5 bg-red-500 rounded-full text-white flex items-center justify-center text-sm">
              { cartData.length }
            </div>}
          </Link>
        </div>
      </nav>
    </header>
  );
}
