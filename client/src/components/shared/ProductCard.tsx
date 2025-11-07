import React from 'react'
import { Card, CardContent, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Heart } from 'lucide-react'

const ProductCard = () => {
    return (
        <Card className='w-[20vw] border-none shadow-none cursor-pointer hover:scale-[1.05] transition
         hover:shadow rounded-none flex flex-col items-center relative'>
            <img className='w-[20vw] h-[20vw] object-contain' src="https://static.vecteezy.com/system/resources/thumbnails/024/841/285/small_2x/wireless-headphone-isolated-on-transparent-background-high-quality-bluetooth-headphone-for-advertising-and-product-catalogs-generative-ai-png.png" alt="" />
            <CardContent className='w-full'>
                <CardTitle className='text-[1.3vw]'>Title</CardTitle>

                <strong className='text-[2vw] text-[#54c43e]' >00.00$</strong>
                <strong className='text-[2vw] text-[#4b3ec470] ml-[1vw] line-through' >00.00$</strong>

                <div className='flex items-center gap-[1vw]'>
                    <Button className='text-[1vw] w-[8vw] h-[3vw]'>Buy now</Button>
                    <Button className='bg-[#4B3EC4] text-[1vw] w-[8vw] h-[3vw]'>Add to Cart</Button>
                </div>

                <Heart className='absolute top-0 right-0' />
            </CardContent>
        </Card>
    )
}

export default ProductCard