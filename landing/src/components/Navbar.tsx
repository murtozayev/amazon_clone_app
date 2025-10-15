const Navbar = () => {
    return (
        <nav className="px-2 navbar bg-white p-2">
            <img
                className="w-30"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png"
                alt="ICON"
            />

            <ul className="flex gap-5 items-center text-black font-semibold cursor-pointer">
                <li><a href="#"></a>Home</li>
                <li><a href="#"></a>About</li>
                <li><a href="#"></a>AD</li>
                <li><a href="#"></a>Products</li>
            </ul>

            <button className="w-40 h-10 bg-green-500 rounded-lg font-semibold text-white animate active:translate-y-[5px] active:shadow-none transition">
                Shopping now
            </button>
        </nav>
    )
}

export default Navbar