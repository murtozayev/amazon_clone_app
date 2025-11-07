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
import api from "@/server/api"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Loader } from "lucide-react"
import { FormEvent, ReactNode } from "react"
import { toast } from "sonner"

interface PROPS {
    children: ReactNode
    data: { _id: string }
}

export default function BanDialog({ children, data }: PROPS) {

    const useClient = useQueryClient()

    const { mutateAsync: spamAsync, isPending: isSpamming } = useMutation({
        async mutationFn({ id, time }: { id: string, time: Date }) {
            const res = await api.post(`/dashboard/users/setban/${id}`, { status: "ban", time }, { headers: { "Content-Type": "application/json" } })

            return res.data
        },
        async onMutate({ id, time }) {
            await useClient.cancelQueries({ queryKey: ["users"] })

            const prev = useClient.getQueryData(['users'])

            useClient.setQueryData(["users"], (old: { _id: string, time: Date, status: string }[]) =>
                old.map(user =>
                    user._id === id
                        ? { ...user, status: "ban", time }
                        : user
                )
            );

            return { prev }
        },
        onError(err: { response: { data: { message: string } } }, _, context) {
            if (context?.prev) {
                useClient.setQueryData(["users"], context.prev)
            }


            toast.error(err.response.data.message)
        },
        onSuccess(data: { message: string }) {
            toast.message(data.message)
        }
    })

    async function onBan(e: FormEvent<HTMLFormElement>, id: string) {
        e.preventDefault()
        const formData = new FormData(e.target as HTMLFormElement)

        const payload = Object.fromEntries(formData.entries())

        //@ts-ignore
        await spamAsync({ id, time: payload?.time })
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <span>{children}</span>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Ban deb belgilash</DialogTitle>
                    <DialogDescription>
                        Foydalanuvchi qandaydir muammo qilgan bo'lsa uni imkoniyatlarini cheklash
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={(e) => onBan(e, data._id)} className="flex items-center gap-2">
                    <div className="grid flex-1 gap-2">
                        <Label htmlFor="link" className="sr-only">
                            Link
                        </Label>
                        <Input
                            id="link"
                            type="number"
                            min={0}
                            max={20}
                            placeholder="Oylarda belgilang"
                            name="time"
                        />
                    </div>
                    <Button type="submit">
                        {isSpamming ? <Loader className="animate-spin" /> : "Ban deb belgilash"}
                    </Button>
                </form>
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button type="button" variant={"outline"} className="btn btn-danger">
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
