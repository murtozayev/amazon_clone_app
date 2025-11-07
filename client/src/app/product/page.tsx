import ProductCard from "@/components/shared/ProductCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription } from "@/components/ui/card";

export default function page() {
    return (
        <>
            <Card>
                <main className="m-[2vw] mx-[2vw] flex gap-[2vw]">
                    <figure>
                        <img src="https://cdn.mos.cms.futurecdn.net/CdSqhuDyzkSBvS2cizjC4i.jpg" className="w-[40vw] h-[40vw] object-contain" />
                    </figure>

                    <CardContent className="w-[30vw]">
                        <h1 className="font-light text-[2vw]">Iphone 13 pro max</h1>
                        <strong className="text-[4vw] mt-[1vw] text-[green]">1222$</strong>
                        <strong className="text-[3.5vw] mt-[1vw] ml-[2vw] text-green-200 line-through">1222$</strong>

                        <CardDescription className="text-center font-light text-[1vw] border-[0.3vw] border-blue-500 rounded-[1vw]">
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora placeat aperiam, sed esse modi magnam vero id distinctio, exercitationem, necessitatibus recusandae veritatis. Consectetur eos aperiam voluptates non at obcaecati id reiciendis, facere molestias, cum consequuntur libero minima pariatur accusamus repellendus.
                        </CardDescription>

                        <Button className="w-full h-[3vw] text-[1vw] font-light mt-[1vw]">Savatga qo'sing</Button>
                        <h4 className="mt-[1vw] text-center font-light text-[1vw]">Yoki</h4>
                        <Button className="w-full bg-[blue] h-[3vw] text-[1vw] font-light mt-[1vw]">Xoziroq harid qiling</Button>
                    </CardContent>
                </main>
            </Card>
            <h1 className="font-light text-[2vw] my-[2vw]">Sizga yoqishi mumkin</h1>
            <div className="flex gap-[2vw] flex-wrap">
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
            </div>
        </>
    )
}