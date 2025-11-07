"use client"

import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"

export function DrawerCardDemo({ data, open, setOpen }: { data: any, open: boolean, setOpen: (v: boolean) => void }) {
    if (!data) return null

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader>
                        <DrawerTitle>{data.name || "Product Details"}</DrawerTitle>
                        <DrawerDescription>
                            {data.description || "No description available."}
                        </DrawerDescription>
                    </DrawerHeader>

                    <div className="p-4 space-y-2 overflow-y-auto max-h-[300px]">
                        <p><strong>Price:</strong> ${data.price}</p>
                        <p><strong>ID:</strong> {data._id}</p>
                        {data.image && <img src={data.image} alt={data.name} className="rounded-md w-full" />}
                        {data.desc && <p><strong>Category:</strong> {data.desc}</p>}
                        {data?.likes && <p><strong>Likes:</strong> {data.likes.length}</p>}
                        {data?.variants && <div>
                            <p><strong>Variant Img:</strong> <img src={data.variants?.variantImg?.[0]} alt="" /></p>
                            <p><strong>Variant Desc:</strong> {data.variants?.variantDesc?.[0]}</p>
                        </div>}
                        {data?.discount && <div>
                            <p><strong>Precent: {data.discount.precent}%</strong></p>
                            <p><strong>$Price:</strong> {data.discount.price}</p>
                        </div>}
                    </div>

                    <DrawerFooter>
                        <DrawerClose asChild>
                            <Button variant="outline">Close</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    )
}
