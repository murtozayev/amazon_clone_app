"use client"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FormEvent, ReactNode, useState } from "react"
import { Textarea } from "../ui/textarea"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import api from "@/server/api"
import { Loader } from "lucide-react"
import { toast } from "sonner"

export function DialogDemo({ data, children }: { data: any; children: ReactNode }) {
    const [open, setOpen] = useState(false)

    const useClient = useQueryClient()

    const { mutateAsync, isPending } = useMutation({
        mutationFn: async ({ _id, payload }: { _id: string; payload: object }) => {
            const res = await api.put(`/dashboard/product/update/${_id}`, payload, {
                headers: { "Content-Type": "application/json" },
            })
            return res.data
        },
        onSuccess(data: Record<string, any>) {
            toast.success(data?.message)
        },
        async onMutate({ _id, payload }) {
            await useClient.cancelQueries({ queryKey: ["products"] })
            const oldData = await useClient.getQueryData(["products"])
            await useClient.setQueryData(["products"], (old: any[] | undefined) => {
                if (!old) return []
                return old.map((item) =>
                    item._id === _id ? { ...item, ...payload } : item
                )
            })
            return { oldData }
        },
        onError(err, _, context) {
            if (context?.oldData) {
                useClient.setQueryData(["products"], context.oldData)
            }
            //@ts-ignore
            toast.error(err.response.data.message)
        },
    })

    async function onUpdate(e: FormEvent<HTMLFormElement>, _id: string) {
        e.preventDefault()
        const formData = new FormData(e.target as HTMLFormElement)
        const payload = Object.fromEntries(formData.entries())
        await mutateAsync({ _id, payload })
        setOpen(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent
                className="sm:max-w-[425px] max-h-[80vh] overflow-y-auto" // ✅ scroll qo‘shildi
            >
                <DialogHeader>
                    <DialogTitle>Mahsulotni tahrirlash</DialogTitle>
                    <DialogDescription>
                        Adashganlaringizni tuzating va saqlang.
                    </DialogDescription>
                </DialogHeader>

                <form
                    onSubmit={(e) => onUpdate(e, data?._id)}
                    className="space-y-4"
                >
                    <div className="grid gap-3">
                        <Label htmlFor="name">Nomi</Label>
                        <Input id="name" name="name" defaultValue={data?.name} />
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="desc">Mahsulot haqida</Label>
                        <Textarea id="desc" name="desc" defaultValue={data?.desc} />
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="price">Mahsulot narxi</Label>
                        <Input
                            id="price"
                            name="price"
                            defaultValue={data?.price}
                            type="number"
                        />
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="image">Rasm URL</Label>
                        <Input
                            id="image"
                            name="image"
                            defaultValue={data?.image}
                            type="text"
                        />
                    </div>

                    <DialogFooter className="pt-4">
                        <DialogClose asChild>
                            <Button variant="outline" type="button">
                                Bekor qilish
                            </Button>
                        </DialogClose>
                        <Button type="submit" disabled={isPending}>
                            {isPending ? (
                                <Loader className="animate-spin" />
                            ) : (
                                "O'zgarishlarni saqlash"
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
