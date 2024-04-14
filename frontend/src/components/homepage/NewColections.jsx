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
        {newCollectinsData.map((girls) => {
          return (
            <div key={girls.id} className=" col-span-1">
              <img src={girls.image} alt="girl 1" />
              <h2 className="text-sm font-semibold leading-6">
                {girls.name}
              </h2>
              <h2 className=" text-black font-semibold">
                ${girls.new_price}{" "}
                <span className="ml-4 text-gray-500 line-through">${girls.old_price}</span>
              </h2>
            </div>
          );
        })}
      </main>
    </section>
  );
}
