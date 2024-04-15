import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa6";
import all_product from "../components/Assets/all_product";
import ProductDetails from "../components/ProuductDetails/ProductDetails";
import { ProductDescription } from "../components/ProuductDetails/ProductDescription";
import RelatedProducts from "../components/ProuductDetails/RelatedProducts";

export default function ProductDetailPage() {
  const [thisProduct, setThisProduct] = useState(null);
  const [thisObject, setThisObject] = useState(null);

  const paramsId = useParams().id;

  useEffect(() => {
    const selectedProduct = all_product.filter(product => product.id == paramsId);
    setThisProduct(selectedProduct);
  }, [paramsId]);

  useEffect(() => {
    if (thisProduct && thisProduct.length > 0) {
      const data = thisProduct[0];
      setThisObject(data);
    }
  }, [thisProduct]);

  const name = thisObject ? thisObject.name : '';
  const category = thisObject ? thisObject.category : ''; 

  return (
    <div className="md:container mx-auto lg:px-10 px-[15px] my-1">
      <header className="text-[#8B96A5] flex flex-wrap text-sm font-semibold gap-3 md:py-4 py-2">
        <Link to="/" className="flex items-center gap-2">
          Home <FaAngleRight />
        </Link>
        <Link to="/" className="flex items-center gap-2">
          Shop <FaAngleRight />
        </Link>
        <Link to={`/${category}s`} className="flex items-center gap-2 capitalize">
          {category} <FaAngleRight />
        </Link>
        <Link to="/" className="flex items-center gap-2 capitalize">
          {name} <FaAngleRight />
        </Link>
      </header>

      <main>
        <div>
          <ProductDetails data={thisProduct}/>
        </div>

        <div>
          <ProductDescription/>
        </div>

        <div>
          <RelatedProducts/>
        </div>
      </main>
    </div>
  );
}
