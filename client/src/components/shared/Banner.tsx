"use client"

import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

const uris = [
    "https://marketplace.canva.com/EAGvuu-TbOk/1/0/1600w/canva-blue-and-purple-modern-fashion-store-banner-TM-tB2NAXLE.jpg",
    "https://img.freepik.com/free-vector/gradient-shopping-discount-horizontal-sale-banner_23-2150321996.jpg?semt=ais_hybrid&w=740&q=80",
    "https://t3.ftcdn.net/jpg/04/65/46/52/360_F_465465254_1pN9MGrA831idD6zIBL7q8rnZZpUCQTy.jpg",
    "https://www.shutterstock.com/image-vector/3d-shopping-sale-promotion-banner-260nw-2056851833.jpg",
    "https://img.freepik.com/free-vector/gradient-social-media-sale-post-template_23-2149034969.jpg?semt=ais_hybrid&w=740&q=80"
]

export default function Banner() {
    const plugin = React.useRef(
        Autoplay({ delay: 2000, stopOnInteraction: true })
    )

    return (
        <Carousel
            plugins={[plugin.current]}
            className="w-full"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
        >
            <CarouselContent>
                {uris.map((img: string, index: number) => (
                    <CarouselItem key={index}>
                        <img src={img} className="w-[100vw] h-[45vw] mt-[3vw] object-cover" alt="Image" />
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="w-[5vw] h-[5vw]" />
            <CarouselNext className="w-[5vw] h-[5vw]" />
        </Carousel>
    )
}
