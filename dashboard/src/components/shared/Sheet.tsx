import { useState, FormEvent, ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { Loader } from "lucide-react"
import api from "@/server/api"

interface Product {
    _id?: string
    name: string
    desc: string
    image?: string
    category: {
        name: string
        icon: string
        desc: string
    }
    price: number
    hasVariants: boolean
    variants: {
        variantImg?: string
        variantDesc?: string
    }[]
    isDiscount: boolean
    discount?: {
        percent: number
        price: number
    } | null
    optimistic?: boolean
}

export default function SheetUI({ children }: { children: ReactNode }) {
    const [isHasVariant, setIsHasVariant] = useState(false)
    const [isHasDiscount, setIsHasDiscount] = useState(false)
    const [open, setOpen] = useState(false)
    const queryClient = useQueryClient()

    const { mutateAsync: createAsync, isPending } = useMutation<
        { message: string; newProduct: Product },
        Error,
        Product,
        { prevProducts: Product[] | undefined }
    >({
        mutationFn: async (data) => {
            const res = await api.post("/dashboard/product/create", data, {
                headers: { "Content-Type": "application/json" },
            })
            return res.data
        },

        async onMutate(newProduct) {
            await queryClient.cancelQueries({ queryKey: ["products"] })

            const prevProducts = queryClient.getQueryData<Product[]>(["products"])

            const optimisticProduct = {
                ...newProduct,
                _id: `temp-${Date.now()}`,
                optimistic: true,
            }

            queryClient.setQueryData<Product[]>(["products"], (old = []) => [
                ...old,
                optimisticProduct,
            ])

            return { prevProducts }
        },

        onError(error, _data, context) {
            toast.error("Xato: " + error.message)
            if (context?.prevProducts) {
                queryClient.setQueryData(["products"], context.prevProducts)
            }
        },

        onSuccess(data) {
            queryClient.setQueryData<Product[]>(["products"], (old = []) =>
                old.map((p) =>
                    p.optimistic ? data.newProduct : p
                )
            )

            toast.success(data.message)
            setOpen(false)
        },
    })


    async function onCreate(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const formData = new FormData(e.target as HTMLFormElement)
        const data = Object.fromEntries(formData.entries())

        const productData: Product = {
            name: data.name as string,
            desc: data.desc as string,
            image: data.image as string,
            category: {
                name: data["category-name"] as string,
                icon: data["category-icon"] as string,
                desc: data["category-desc"] as string,
            },
            price: Number(data.price),
            hasVariants: data.hasVariants === "has",
            variants:
                data.hasVariants === "has"
                    ? [
                        {
                            variantImg: data["variant-img"] as string,
                            variantDesc: data["variant-desc"] as string,
                        },
                    ]
                    : [],
            isDiscount: data.hasDiscount === "has",
            discount:
                data.hasDiscount === "has"
                    ? {
                        percent: Number(data.precent),
                        price: Number(data["dis-price"]),
                    }
                    : null,
        }

        await createAsync(productData)
    }

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>{children}</SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Yangi mahsulot qo‘shish</SheetTitle>
                    <SheetDescription>
                        Ma’lumotlarni to‘ldirib, yangi mahsulot qo‘shing.
                    </SheetDescription>
                </SheetHeader>

                <form
                    id="create"
                    onSubmit={onCreate}
                    className="grid flex-1 auto-rows-min gap-6 px-4 overflow-y-auto"
                >
                    <div className="grid gap-3">
                        <Label htmlFor="name">Nomi</Label>
                        <Input
                            id="name"
                            name="name"
                            required
                            placeholder="Misol: Telefon"
                        />
                    </div>

                    <div className="grid gap-3">
                        <Label htmlFor="category-icon">Kategoriya</Label>
                        <Input
                            id="category-icon"
                            name="category-icon"
                            required
                            placeholder="Rasm URL"
                        />
                        <Input
                            id="category-name"
                            name="category-name"
                            required
                            placeholder="Kategoriya nomi"
                        />
                        <Textarea
                            id="category-desc"
                            name="category-desc"
                            required
                            placeholder="Kategoriya ta’rifi"
                        />
                    </div>

                    <div className="grid gap-3">
                        <Label htmlFor="image">Rasm</Label>
                        <Input id="image" name="image" placeholder="Rasm URL" />
                    </div>

                    <div className="grid gap-3">
                        <Label htmlFor="price">Narxi</Label>
                        <Input
                            id="price"
                            name="price"
                            type="number"
                            required
                            placeholder="Masalan: 299"
                        />
                    </div>

                    <div className="grid gap-3">
                        <Label>Variantlar bormi?</Label>
                        <select
                            name="hasVariants"
                            onChange={(e) => setIsHasVariant(e.target.value === "has")}
                        >
                            <option value="no">Yo‘q</option>
                            <option value="has">Ha</option>
                        </select>
                    </div>

                    {isHasVariant && (
                        <div className="grid gap-3">
                            <Label htmlFor="variant-img">Variant rasmi</Label>
                            <Input id="variant-img" name="variant-img" placeholder="Rasm URL" />
                            <Label htmlFor="variant-desc">Variant ta’rifi</Label>
                            <Textarea id="variant-desc" name="variant-desc" placeholder="Ta’rif" />
                        </div>
                    )}

                    <div className="grid gap-3">
                        <Label>Chegirma bormi?</Label>
                        <select
                            name="hasDiscount"
                            onChange={(e) => setIsHasDiscount(e.target.value === "has")}
                        >
                            <option value="no">Yo‘q</option>
                            <option value="has">Ha</option>
                        </select>
                    </div>

                    {isHasDiscount && (
                        <div className="grid gap-3">
                            <Label htmlFor="precent">Foiz (%)</Label>
                            <Input id="precent" name="precent" type="number" placeholder="Masalan: 10" />
                            <Label htmlFor="dis-price">Chegirmali narx</Label>
                            <Input
                                id="dis-price"
                                name="dis-price"
                                type="number"
                                placeholder="Masalan: 249"
                            />
                        </div>
                    )}

                    <div className="grid gap-3">
                        <Label htmlFor="desc">Tavsif</Label>
                        <Textarea id="desc" name="desc" placeholder="Mahsulot ta’rifi" />
                    </div>
                </form>

                <SheetFooter>
                    <Button form="create" type="submit" disabled={isPending}>
                        {isPending ? <Loader className="animate-spin" size={16} /> : "Yaratish"}
                    </Button>
                    <SheetClose asChild>
                        <Button variant="outline">Bekor qilish</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
