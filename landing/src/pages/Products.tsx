import ProductCard from "../components/ProductCard"

const data = [
    {
        name: "Vecteezy shoes",
        img: "https://static.vecteezy.com/system/resources/previews/046/323/598/non_2x/pair-of-colorful-sports-shoes-for-active-lifestyle-png.png",
        sizes: [40, 41, 42, 43],
        price: 20
    },
    {
        name: "Runner sneakes",
        img: "https://png.pngtree.com/png-vector/20231230/ourmid/pngtree-dropshipping-men-hole-sole-jogging-shoes-png-image_11389148.png",
        sizes: [40, 41, 42, 43],
        price: 22
    },
    {
        name: "New mode",
        img: "https://pluspng.com/img-png/running-shoes-png-image-1200.png",
        sizes: [40, 41, 42, 43],
        price: 20
    },
    {
        name: "3D shoes",
        img: "https://static.vecteezy.com/system/resources/previews/021/275/832/non_2x/running-shoes-illustration-with-fire-shape-yellow-and-red-isolated-on-transparan-background-free-png.png",
        sizes: [40, 41, 42, 43],
        price: 12
    },
    {
        name: "Classic shoes",
        img: "https://parspng.com/wp-content/uploads/2023/02/shoespng.parspng.com-3.png",
        sizes: [40, 41, 42, 43],
        price: 20
    },
    {
        name: "Vecteezy shoes",
        img: "https://png.pngtree.com/png-clipart/20250307/original/pngtree-men-shoe-png-image_20592465.png",
        sizes: [40, 41, 42, 43],
        price: 20
    },
]

const Products = () => {
    return (
        <div className="bg-blue-500 flex flex-wrap justify-center p-10 gap-4">
            {data?.map((items) => (
                <ProductCard items={items} key={items.img} />
            ))}
        </div>
    )
}

export default Products