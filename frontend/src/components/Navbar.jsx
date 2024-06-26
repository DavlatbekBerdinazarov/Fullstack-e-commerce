import { Button } from "@material-tailwind/react";
import big_logo from "../components/Assets/logo_big.png";
import cart_icon from "../components/Assets/cart_icon.png";
import { Link, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ShoppingCartContext } from "../layouts/MainLayout";
import IconButton from "@material-tailwind/react/components/IconButton";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";

export default function Navbar() {
  const [activeNav, setActiveNav] = useState("/");
  const location = useLocation();

  const { cartData, isDrawerOpen, openDrawer, username, handleLogout } = useContext(ShoppingCartContext);

  useEffect(() => {
    const pathname = location.pathname;
    setActiveNav(pathname);
  }, [location]);

  return (
    <header className="w-full py-2 border-b shadow-sm">
      <nav className="md:container mx-auto lg:px-10 px-[15px] flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <img className="w-10 md:w-14" src={big_logo} alt="big logo" />
          <h1 className="uppercase text-2xl md:text-3xl font-semibold md:font-medium">Shopper</h1>
        </Link>

        {/* category */}
        <ul className="lg:flex gap-6 font-medium hidden">
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
          <div className="hidden lg:block">
          {username ? (
            <div className="flex gap-3 items-center">
              <span className="mr-2 text-md font-semibold">{username}</span>
              <Link to="/logout">
                <Button
                  variant="outlined"
                  className="rounded-full capitalize font-medium text-sm px-8"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </Link>
            </div>
          ) : (
            <Link to="/login">
              <Button
                variant="outlined"
                className="rounded-full capitalize font-medium text-sm px-8"
              >
                Login
              </Button>
            </Link>
          )}
          </div>

          <Link to="/cart" className="relative active:bg-blue-gray-50">
            <img className="w-8 h-8" src={cart_icon} alt="cart icon" />
            {cartData.length > 0 && (
              <div className="absolute -top-0 left-6 h-5 w-5 bg-red-500 rounded-full text-white flex items-center justify-center text-sm">
                {cartData.length}
              </div>
            )}
          </Link>
          <IconButton
            className="block lg:hidden"
            variant="text"
            size="lg"
            onClick={openDrawer}
          >
            {isDrawerOpen ? (
              <XMarkIcon className="h-8 w-8 stroke-2" />
            ) : (
              <Bars3Icon className="h-8 w-8 stroke-2" />
            )}
          </IconButton>
        </div>
      </nav>
    </header>
  );
}
