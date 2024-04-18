import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa6";
import ProductDetails from "../components/ProuductDetails/ProductDetails";
import { ProductDescription } from "../components/ProuductDetails/ProductDescription";
import RelatedProducts from "../components/ProuductDetails/RelatedProducts";
import axios from "axios";

export default function ProductDetailPage() {
  const [thisProduct, setThisProduct] = useState(null);
  const [thisObject, setThisObject] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const paramsId = useParams().id;
  console.log(paramsId);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      const response = await axios.get("http://localhost:4545/api/allproducts");
      setData(response.data);
      setLoading(false); // Move setLoading to here so it triggers after data is set
    } catch (error) {
      setError(error.message);
      setLoading(false); // Set loading to false even in case of error
    }
  };

  useEffect(() => {
    if (data) {
      const selectedProduct = data.filter(product => product._id == paramsId);
      setThisProduct(selectedProduct);
    }

  }, [paramsId, data]);

  useEffect(() => {
    if (thisProduct && thisProduct.length > 0) {
      const data = thisProduct[0];
      setThisObject(data);
    }
  }, [thisProduct]);

  
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!thisProduct || thisProduct.length === 0) {
    return <div>No products available</div>;
  }


  const title = thisObject ? thisObject.title : '';
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
          {title} <FaAngleRight />
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
