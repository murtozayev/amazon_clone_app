import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Minus, Plus, Trash } from "lucide-react";

export default function page() {
    return (
        <div className='flex'>
            <main className="flex flex-col gap-[1vw] h-screen overflow-y-auto w-[62vw]">
                <div className="flex w-[60vw] border-[0.1vw] rounded-[1vw] relative py-[3vw]">
                    <img className="w-[20vw] h-[20vw] object-contain " src="https://cdn.mos.cms.futurecdn.net/CdSqhuDyzkSBvS2cizjC4i.jpg" />
                    <CardContent>
                        <CardTitle className='text-[1.4vw]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis, incidunt!</CardTitle>
                        <hr className="!border-[#ff00003f]" />
                        <strong className='text-[green] text-[2vw]'>122$</strong>
                        <strong className='text-[red] line-through text-[1.7vw] ml-[2vw]'>122$</strong>
                        <hr className="!border-[#ff00003f]" />
                        <div className="border rounded w-[10vw] h-[3vw] mt-[2vw] flex items-center justify-between">
                            <Button className="w-[3vw] h-[3vw] rounded-l bg-[green]">
                                <Plus />
                            </Button>
                            <span className="text-[1.3vw] font-light">1</span>
                            <Button className="w-[3vw] h-[3vw] rounded-r bg-[red]">
                                <Minus />
                            </Button>
                        </div>
                        <div className="absolute flex items-center top-0 right-0">
                            <Input type="checkbox" className="w-[3vw] h-[3vw]" />
                            <Button className="w-[3vw] h-[3vw] bg-[red]">
                                <Trash />
                            </Button>
                        </div>
                    </CardContent>
                </div>
                <div className="flex w-[60vw] border-[0.1vw] rounded-[1vw] relative py-[3vw]">
                    <img className="w-[20vw] h-[20vw] object-contain " src="https://cdn.mos.cms.futurecdn.net/CdSqhuDyzkSBvS2cizjC4i.jpg" />
                    <CardContent>
                        <CardTitle className='text-[1.4vw]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis, incidunt!</CardTitle>
                        <hr className="!border-[#ff00003f]" />
                        <strong className='text-[green] text-[2vw]'>122$</strong>
                        <strong className='text-[red] line-through text-[1.7vw] ml-[2vw]'>122$</strong>
                        <hr className="!border-[#ff00003f]" />
                        <div className="border rounded w-[10vw] h-[3vw] mt-[2vw] flex items-center justify-between">
                            <Button className="w-[3vw] h-[3vw] rounded-l bg-[green]">
                                <Plus />
                            </Button>
                            <span className="text-[1.3vw] font-light">1</span>
                            <Button className="w-[3vw] h-[3vw] rounded-r bg-[red]">
                                <Minus />
                            </Button>
                        </div>
                        <div className="absolute flex items-center top-0 right-0">
                            <Input type="checkbox" className="w-[3vw] h-[3vw]" />
                            <Button className="w-[3vw] h-[3vw] bg-[red]">
                                <Trash />
                            </Button>
                        </div>
                    </CardContent>
                </div>
                <div className="flex w-[60vw] border-[0.1vw] rounded-[1vw] relative py-[3vw]">
                    <img className="w-[20vw] h-[20vw] object-contain " src="https://cdn.mos.cms.futurecdn.net/CdSqhuDyzkSBvS2cizjC4i.jpg" />
                    <CardContent>
                        <CardTitle className='text-[1.4vw]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis, incidunt!</CardTitle>
                        <hr className="!border-[#ff00003f]" />
                        <strong className='text-[green] text-[2vw]'>122$</strong>
                        <strong className='text-[red] line-through text-[1.7vw] ml-[2vw]'>122$</strong>
                        <hr className="!border-[#ff00003f]" />
                        <div className="border rounded w-[10vw] h-[3vw] mt-[2vw] flex items-center justify-between">
                            <Button className="w-[3vw] h-[3vw] rounded-l bg-[green]">
                                <Plus />
                            </Button>
                            <span className="text-[1.3vw] font-light">1</span>
                            <Button className="w-[3vw] h-[3vw] rounded-r bg-[red]">
                                <Minus />
                            </Button>
                        </div>
                        <div className="absolute flex items-center top-0 right-0">
                            <Input type="checkbox" className="w-[3vw] h-[3vw]" />
                            <Button className="w-[3vw] h-[3vw] bg-[red]">
                                <Trash />
                            </Button>
                        </div>
                    </CardContent>
                </div>
                <div className="flex w-[60vw] border-[0.1vw] rounded-[1vw] relative py-[3vw]">
                    <img className="w-[20vw] h-[20vw] object-contain " src="https://cdn.mos.cms.futurecdn.net/CdSqhuDyzkSBvS2cizjC4i.jpg" />
                    <CardContent>
                        <CardTitle className='text-[1.4vw]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis, incidunt!</CardTitle>
                        <hr className="!border-[#ff00003f]" />
                        <strong className='text-[green] text-[2vw]'>122$</strong>
                        <strong className='text-[red] line-through text-[1.7vw] ml-[2vw]'>122$</strong>
                        <hr className="!border-[#ff00003f]" />
                        <div className="border rounded w-[10vw] h-[3vw] mt-[2vw] flex items-center justify-between">
                            <Button className="w-[3vw] h-[3vw] rounded-l bg-[green]">
                                <Plus />
                            </Button>
                            <span className="text-[1.3vw] font-light">1</span>
                            <Button className="w-[3vw] h-[3vw] rounded-r bg-[red]">
                                <Minus />
                            </Button>
                        </div>
                        <div className="absolute flex items-center top-0 right-0">
                            <Input type="checkbox" className="w-[3vw] h-[3vw]" />
                            <Button className="w-[3vw] h-[3vw] bg-[red]">
                                <Trash />
                            </Button>
                        </div>
                    </CardContent>
                </div>
                <div className="flex w-[60vw] border-[0.1vw] rounded-[1vw] relative py-[3vw]">
                    <img className="w-[20vw] h-[20vw] object-contain " src="https://cdn.mos.cms.futurecdn.net/CdSqhuDyzkSBvS2cizjC4i.jpg" />
                    <CardContent>
                        <CardTitle className='text-[1.4vw]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis, incidunt!</CardTitle>
                        <hr className="!border-[#ff00003f]" />
                        <strong className='text-[green] text-[2vw]'>122$</strong>
                        <strong className='text-[red] line-through text-[1.7vw] ml-[2vw]'>122$</strong>
                        <hr className="!border-[#ff00003f]" />
                        <div className="border rounded w-[10vw] h-[3vw] mt-[2vw] flex items-center justify-between">
                            <Button className="w-[3vw] h-[3vw] rounded-l bg-[green]">
                                <Plus />
                            </Button>
                            <span className="text-[1.3vw] font-light">1</span>
                            <Button className="w-[3vw] h-[3vw] rounded-r bg-[red]">
                                <Minus />
                            </Button>
                        </div>
                        <div className="absolute flex items-center top-0 right-0">
                            <Input type="checkbox" className="w-[3vw] h-[3vw]" />
                            <Button className="w-[3vw] h-[3vw] bg-[red]">
                                <Trash />
                            </Button>
                        </div>
                    </CardContent>
                </div>
                <div className="flex w-[60vw] border-[0.1vw] rounded-[1vw] relative py-[3vw]">
                    <img className="w-[20vw] h-[20vw] object-contain " src="https://cdn.mos.cms.futurecdn.net/CdSqhuDyzkSBvS2cizjC4i.jpg" />
                    <CardContent>
                        <CardTitle className='text-[1.4vw]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis, incidunt!</CardTitle>
                        <hr className="!border-[#ff00003f]" />
                        <strong className='text-[green] text-[2vw]'>122$</strong>
                        <strong className='text-[red] line-through text-[1.7vw] ml-[2vw]'>122$</strong>
                        <hr className="!border-[#ff00003f]" />
                        <div className="border rounded w-[10vw] h-[3vw] mt-[2vw] flex items-center justify-between">
                            <Button className="w-[3vw] h-[3vw] rounded-l bg-[green]">
                                <Plus />
                            </Button>
                            <span className="text-[1.3vw] font-light">1</span>
                            <Button className="w-[3vw] h-[3vw] rounded-r bg-[red]">
                                <Minus />
                            </Button>
                        </div>
                        <div className="absolute flex items-center top-0 right-0">
                            <Input type="checkbox" className="w-[3vw] h-[3vw]" />
                            <Button className="w-[3vw] h-[3vw] bg-[red]">
                                <Trash />
                            </Button>
                        </div>
                    </CardContent>
                </div>
                <div className="flex w-[60vw] border-[0.1vw] rounded-[1vw] relative py-[3vw]">
                    <img className="w-[20vw] h-[20vw] object-contain " src="https://cdn.mos.cms.futurecdn.net/CdSqhuDyzkSBvS2cizjC4i.jpg" />
                    <CardContent>
                        <CardTitle className='text-[1.4vw]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis, incidunt!</CardTitle>
                        <hr className="!border-[#ff00003f]" />
                        <strong className='text-[green] text-[2vw]'>122$</strong>
                        <strong className='text-[red] line-through text-[1.7vw] ml-[2vw]'>122$</strong>
                        <hr className="!border-[#ff00003f]" />
                        <div className="border rounded w-[10vw] h-[3vw] mt-[2vw] flex items-center justify-between">
                            <Button className="w-[3vw] h-[3vw] rounded-l bg-[green]">
                                <Plus />
                            </Button>
                            <span className="text-[1.3vw] font-light">1</span>
                            <Button className="w-[3vw] h-[3vw] rounded-r bg-[red]">
                                <Minus />
                            </Button>
                        </div>
                        <div className="absolute flex items-center top-0 right-0">
                            <Input type="checkbox" className="w-[3vw] h-[3vw]" />
                            <Button className="w-[3vw] h-[3vw] bg-[red]">
                                <Trash />
                            </Button>
                        </div>
                    </CardContent>
                </div>
                <div className="flex w-[60vw] border-[0.1vw] rounded-[1vw] relative py-[3vw]">
                    <img className="w-[20vw] h-[20vw] object-contain " src="https://cdn.mos.cms.futurecdn.net/CdSqhuDyzkSBvS2cizjC4i.jpg" />
                    <CardContent>
                        <CardTitle className='text-[1.4vw]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis, incidunt!</CardTitle>
                        <hr className="!border-[#ff00003f]" />
                        <strong className='text-[green] text-[2vw]'>122$</strong>
                        <strong className='text-[red] line-through text-[1.7vw] ml-[2vw]'>122$</strong>
                        <hr className="!border-[#ff00003f]" />
                        <div className="border rounded w-[10vw] h-[3vw] mt-[2vw] flex items-center justify-between">
                            <Button className="w-[3vw] h-[3vw] rounded-l bg-[green]">
                                <Plus />
                            </Button>
                            <span className="text-[1.3vw] font-light">1</span>
                            <Button className="w-[3vw] h-[3vw] rounded-r bg-[red]">
                                <Minus />
                            </Button>
                        </div>
                        <div className="absolute flex items-center top-0 right-0">
                            <Input type="checkbox" className="w-[3vw] h-[3vw]" />
                            <Button className="w-[3vw] h-[3vw] bg-[red]">
                                <Trash />
                            </Button>
                        </div>
                    </CardContent>
                </div>
            </main>

            <Card className="w-[30vw] h-[30vw] p-[2vw] border-[green] rounded-[1vw]">
                <CardTitle className="text-[1.3vw]">Order summary</CardTitle>

                <div className=" w-full pb-[1vw] flex items-center justify-between border-b-[0.1vw]">
                    <span className='text-[1vw] font-light text-slate-500'>Mahsulot narx:</span>
                    <strong className="text-[1.2vw]">122$</strong>
                </div>
                <div className=" w-full pb-[1vw] flex items-center justify-between border-b-[0.1vw]">
                    <span className='text-[1vw] font-light text-slate-500'>Chegirma:</span>
                    <strong className="text-[1.2vw]">122$</strong>
                </div>
                <div className=" w-full pb-[1vw] flex items-center justify-between border-b-[0.1vw]">
                    <span className='text-[1vw] font-light text-slate-500'>Yetkazib berish:</span>
                    <strong className="text-[1.2vw]">Bepul</strong>
                </div>
                <div className=" w-full pb-[1vw] flex items-center justify-between">
                    <span className='text-[1.3vw] font-light text-[black]'>Jami narx:</span>
                    <strong className="text-[1.4vw]">1212$</strong>
                </div>

                <Button className="bg-[green] h-[3vw] text-[1vw] font-light">Tasdiqlash</Button>
            </Card>
        </div>
    )
}