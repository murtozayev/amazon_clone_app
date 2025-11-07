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
import { FormEvent, ReactNode } from "react"
import { Textarea } from "../ui/textarea"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Loader2 } from "lucide-react"
import api from "@/server/api"
import { toast } from "sonner"
import { Task } from "@/pages/dashboard/Tasks"

export default function CreateTaskDialog({ children }: { children: ReactNode }) {

    const queryClient = useQueryClient()

    const { isPending, mutateAsync: createTask } = useMutation({
        async mutationFn({ payload }: { payload: object }) {
            const res = await api.post("/dashboard/task/create", payload, { headers: { "Content-Type": "application/json" } })

            return res.data
        },
        async onMutate({ payload }) {
            await queryClient.cancelQueries({ queryKey: ["tasks"] })

            const oldData = queryClient.getQueryData(["tasks"])

            queryClient.setQueryData(['tasks'], (old: Task[] = []) => [...old, payload])


            return { oldData }
        },
        onError(err: { response: { data: { message: string } } }, _, context) {
            if (context?.oldData) {
                queryClient.setQueryData(["tasks"], context.oldData)
            }

            toast.error(err.response.data.message)
        },
        onSuccess(data: { message: string }) {
            toast.success(data.message)
        }
    })

    async function onSubmitTasks(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const formdata = new FormData(e.target as HTMLFormElement)
        const payload = Object.fromEntries(formdata.entries())

        await createTask({ payload })
    }

    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    {children}
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Vazifa yaratish</DialogTitle>
                        <DialogDescription>
                            Adminlar uchun vazifalar yasab bering va ularni ish bilan band qiling
                        </DialogDescription>
                    </DialogHeader>
                    <form id="tasks" onSubmit={onSubmitTasks} className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="title">Vazifa nomi</Label>
                            <Input id="title" name="title" />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="desc">Malumot</Label>
                            <Textarea id="desc" name="desc" />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="to">Kimga?</Label>
                            <Input id="to" name="to" />
                        </div>
                    </form>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Bekor qilish</Button>
                        </DialogClose>
                        <Button form="tasks" type="submit">
                            {isPending ? <Loader2 className="animate-spin" /> : "Vazifani yaratish"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}
