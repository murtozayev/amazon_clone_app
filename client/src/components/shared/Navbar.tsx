import { Heart, History, Search, ShoppingBag, ShoppingCart, Store, UserCircle } from "lucide-react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { SelectDemo } from "./Selection"

const Navbar = () => {
    return (
        <>
            <nav className="flex items-center justify-between">
                <figure className="flex items-center gap-[2vw]">
                    <img
                        alt="Icon"
                        src={"https://www.freeiconspng.com/thumbs/amazon-icon/amazon-icon--socialmedia-iconset--uiconstock-0.png"}
                        className="w-[5vw] h-[5vw] "
                    />
                    <header>
                        <h1 className=" text-[2vw] font-extrabold ">Woo</h1>
                        <p className=" text-[1.2vw] font-semibold ">Internet rohat</p>
                    </header>
                </figure>

                <form className="flex items-center">
                    <SelectDemo />
                    <Input className="!h-[3.5vw] text-[1vw] placeholder:text-[1vw] font-extralight w-[20vw] rounded-r-full" placeholder="Istaganinggizni izlang..." />
                    <Button className="w-[3.5vw] h-[3.5vw] rounded-full relative right-[3.5vw] bg-[#4B3EC4] ">
                        <Search className="w-[3vw] h-[3vw]" />
                    </Button>
                </form>

                <div className="flex items-center gap-[1vw]" >
                    <UserCircle className="w-[3.5vw] h-[3.5vw] text-[#4B3EC4]" />
                    <div>
                        <p className="text-[1vw] font-semibold">Hotline 24/7</p>
                        <a className="font-bold text-[1.3vw] text-[#4B3EC4]" href="tel:+998977753122">Owner</a>
                    </div>
                </div>

                <div className="flex items-center gap-[2vw] text-[#4B3EC4]">
                    <Heart className="w-[2vw] h-[2vw]" />
                    <ShoppingCart className="w-[2vw] h-[2vw]" />
                </div>
            </nav>

            <hr className="!border-slate-400 mt-[2vw]" />

            <div className="mt-[1vw] mb-[2vw] flex items-center justify-between">
                <article className="flex items-center gap-[2vw] text-[1vw] font-light">
                    <a href="#">Mahsulotlar</a>
                    <a href="#">Kontakt</a>
                </article>

                <div className="flex items-center gap-[3vw]">
                    <div className="flex items-center gap-[0.5vw] cursor-pointer">
                        <Store className="text-slate-600 w-[2vw] h-[2vw]" />
                        <span className="text-slate-600 font-light text-[1vw]">WOO da sotish</span>
                    </div>
                    <div className="flex items-center gap-[0.5vw] cursor-pointer">
                        <ShoppingBag className="text-slate-600 w-[2vw] h-[2vw]" />
                        <span className="text-slate-600 font-light text-[1vw]">Buyurtmalar</span>
                    </div>
                    <div className="flex items-center gap-[0.5vw] cursor-pointer">
                        <History className="text-slate-600 w-[2vw] h-[2vw]" />
                        <span className="text-slate-600 font-light text-[1vw]">Oxirgi ko'rilganlar</span>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Navbar