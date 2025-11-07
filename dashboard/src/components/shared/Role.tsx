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

export default function RoleChange({ children, data }: PROPS) {

    const useClient = useQueryClient()

    const { mutateAsync: setAdminAsync, isPending: isSetting } = useMutation({
        async mutationFn({ id, role }: { id: string, role: "admin" | "user" }) {
            const res = await api.post(`/dashboard/users/setadmin/${id}`, { role }, { headers: { "Content-Type": "application/json" } })

            return res.data
        },
        async onMutate({ id, role }) {
            await useClient.cancelQueries({ queryKey: ["users"] })

            const prev = useClient.getQueryData(['users'])

            useClient.setQueryData(["users"], (old: { _id: string }[]) =>
                old.map(user =>
                    user._id === id
                        ? { ...user, role }
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

    async function onAdmin(e: FormEvent<HTMLFormElement>, id: string) {
        e.preventDefault()
        const formData = new FormData(e.target as HTMLFormElement)

        const payload = Object.fromEntries(formData.entries())

        //@ts-ignore
        await setAdminAsync({ id, role: payload.role })
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <span>{children}</span>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Rolni almashtirish</DialogTitle>
                    <DialogDescription>
                        O'zinggiz uchun yangi yordamchilar tayyorlang
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={(e) => onAdmin(e, data._id)} className="flex items-center gap-2">
                    <div className="grid flex-1 gap-2">
                        <Label htmlFor="link" className="sr-only">
                            Link
                        </Label>
                        <Input
                            id="link"
                            placeholder="Role ni yozing"
                            name="role"
                            //@ts-ignore
                            value={data?.role === "admin" ? "user" : "admin"}
                            readOnly
                        />
                    </div>
                    <Button type="submit">
                        {isSetting ? <Loader className="animate-spin" /> : "Rolni almashtirish"}
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
