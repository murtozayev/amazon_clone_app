import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function page() {
    return (
        <div className="py-[3vw] flex gap-[5vw]">
            <aside className="w-[20vw]">
                <div className="w-[20vw] h-[20vw] bg-slate-300 rounded-[0.5vw] text-green-400 text-[10vw] flex items-center justify-center">J</div>

                <h1 className="font-semibold text-[1vw] my-[1vw]">Jahongir</h1>
                <h2 className="font-light text-[0.8vw]">jahongirmurtozayev777@gmail.com</h2>
                <h2 className="font-light text-[0.8vw]">Role: admin</h2>
                <Button className="w-full h-[3vw] bg-[green] rounded-[0.2vw] font-light mt-[0.5vw]">Buyurtmalarim</Button>
                <Button className="w-full h-[3vw] bg-[green] rounded-[0.2vw] font-light mt-[0.5vw]">Savatcham</Button>
                <Button className="w-full h-[3vw] border-[green] bg-transparent border-[0.1vw] text-black rounded-[0.2vw] font-light mt-[0.5vw]">Chiqib ketish</Button>
            </aside>

            <form>
                <h1 className="font-semibold text-[2vw]">Profil</h1>

                <div className="flex flex-col">
                    <label className="text-[1vw] font-light" htmlFor='name'>Foydalanuvchi nomi</label>
                    <Input id='name' className="w-[40vw] !text-[1vw] font-light h-[3vw]" defaultValue="Jahongir" />
                </div>
                <div className="flex flex-col mt-[1vw]">
                    <label className="text-[1vw] font-light" htmlFor='email'>Email</label>
                    <Input id='email' type="email" className="w-[40vw] !text-[1vw] font-light h-[3vw]" defaultValue="example@gmail.com" />
                </div>
                <div className="flex flex-col mt-[1vw]">
                    <label className="text-[1vw] font-light" htmlFor='name'>Role</label>
                    <Input id='name' type="email" className="w-[40vw] !text-[1vw] font-light h-[3vw]" readOnly value="user" />
                </div>

                <Button className="w-full bg-[green] text-[1vw] font-light rounded-[0.2vw] mt-[2vw] h-[3vw]">Saqlash</Button>
            </form>
        </div>
    )
}