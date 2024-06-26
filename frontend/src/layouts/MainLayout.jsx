import React, { createContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { SidebarWithBurgerMenu } from "../components/SidbarWithBurgerMenu";
import { useLocation } from "react-router-dom";

export const ShoppingCartContext = createContext();


export default function MainLayout() {
  // authorize data from token
  const [username, setUsername] = useState("");
  const location = useLocation();

  useEffect(() => {
    let loggedInUser = localStorage.getItem("user");
    let parsedUserData = JSON.parse(loggedInUser);
    if (parsedUserData && parsedUserData.username) {
      setUsername(parsedUserData.username);
    }
    console.log(JSON.parse(loggedInUser));
  }, [location]);

  const handleLogout = () => {
    // Remove user data from local storage
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    // Redirect to login page
    window.location.href = "/login";
  };


  // sidebar menu
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);
  const [isAuth, setIsAuth] = useState(false);


  // card Data
  const [cartData, setCartData] = useState(
    JSON.parse(localStorage.getItem("cartData")) || []
  );

  useEffect(() => {
    // Save cart data to local storage whenever it changes
    localStorage.setItem("cartData", JSON.stringify(cartData));
  }, [cartData]);

  const handleAddToCart = (selectedProduct) => {
    const productExists = cartData.some(
      (product) => product._id === selectedProduct._id
    );

    if (productExists) {
      // Agar mahsulot allaqachon savatda mavjud bo'lsa, uning quantity'sini o'zgartiramiz
      const updatedCartData = cartData.map((product) =>
        product._id === selectedProduct._id
          ? { ...product, quantity: product.quantity + 1 }
          : product
      );
      setCartData(updatedCartData);
    } else {
      // Agar mahsulot savatda mavjud emas bo'lsa, uni savatga qo'shamiz va quantity'sini 1 qilamiz
      setCartData((prevCartData) => [
        ...prevCartData,
        { ...selectedProduct, quantity: 1 },
      ]);
    }
  };

  const totalPrice = cartData.reduce(
    (total, product) => total + product.new_price * product.quantity,
    0
  );

  // my cart page
  const handleRemoveFromCart = (_id) => {
    const newCartData = cartData.filter((product) => product._id !== _id);
    setCartData(newCartData);
  };

  const handleRemoveQuantityFromCart = (_id) => {
    const updatedCartData = cartData.map((product) =>
      product._id === _id
        ? { ...product, quantity: Math.max(0, product.quantity - 1) }
        : product
    );
    setCartData(updatedCartData.filter((product) => product.quantity > 0));
  };

  // my cart page
  const removeAllItems = () => {
    setCartData([]);
  };

  // END my cart DATA

  return (
    <ShoppingCartContext.Provider
      value={{
        cartData,
        setCartData,
        handleAddToCart,
        handleRemoveFromCart,
        handleRemoveQuantityFromCart,
        removeAllItems,
        totalPrice,
        openDrawer,
        closeDrawer,
        isDrawerOpen,
        username,
        handleLogout,
        isAuth
      }}
    >
      <SidebarWithBurgerMenu/>
      <Navbar />
      <Outlet />
      <Footer />
    </ShoppingCartContext.Provider>
  );
}
