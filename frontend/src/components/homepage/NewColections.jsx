import { Link } from "react-router-dom";
import newCollectinsData from "../Assets/new_collections";

export default function NewCollections() {
  return (
    <section className="py-12">
      <div className="w-[400px] mx-auto flex justify-center flex-col items-center gap-2">
        <h1 className="text-center tracking-tighter font-semibold text-4xl uppercase">
          New Collections
        </h1>
        <div className="w-1/2 h-2 bg-black rounded-sm   "></div>
      </div>

      <main className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-16">
        {newCollectinsData.map((product) => {
          return (
            <Link to={`/product/${product.id}`} key={product.id} className=" col-span-1">
              <div className=" overflow-hidden">
                <img className=" hover:scale-[1.1] duration-200" src={product.image} alt="girl 1" />
              </div>
              <h2 className="text-sm font-semibold leading-6">
                {product.name}
              </h2>
              <h2 className=" text-black font-semibold">
                ${product.new_price}{" "}
                <span className="ml-4 text-gray-500 line-through">${product.old_price}</span>
              </h2>
            </Link>
          );
        })}
      </main>
    </section>
  );
}
