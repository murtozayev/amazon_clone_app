const ProductCard = ({ items }: { items: { name: string, img: string, price: number, sizes: number[] } }) => {
    return (
        <div className="gradient w-[300px] bg-red-50 rounded-2xl shadow py-3 flex flex-col items-center gap-1 hover:scale-[1.2] transition">
            <img className="w-60 mx-auto object-contain" src={items.img} alt="Image" />
            <h1 style={{ fontSize: 25 }} className=" text-white ml-4 font-extrabold">{items.name}</h1>
            <h1 className="font-extrabold ml-3 text-white text-4xl ">${items.price}</h1>
            <div className="flex items-center justify-center gap-3">
                {items.sizes.map((size) => (
                    <span className="px-3 py-1 bg-amber-500 rounded-2xl font-bold cursor-pointer text-white" key={size}>{size}</span>
                ))}
            </div>

            <button className=" w-[90%] h-10 animate-red bg-red-500 transition active:translate-y-[5px] text-white rounded font-semibold">Purchase</button>
        </div>
    )
}

export default ProductCard