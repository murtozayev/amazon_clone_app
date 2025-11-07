import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Task } from "@/pages/dashboard/Tasks"
import api from "@/server/api"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Pen, Trash } from "lucide-react"
import { ReactNode } from "react"
import { toast } from "sonner"
import EditTaskDialog from "./EditTaskDialog"

export default function TaskDropDown({ children, data }: { children: ReactNode, data: Task }) {

    const queryClient = useQueryClient()

    const { mutate: remove } = useMutation({
        async mutationFn({ id }: { id: string }) {
            const res = await api.delete("/dashboard/task/remove/" + id)

            return res.data
        },
        async onMutate({ id }) {
            await queryClient.cancelQueries({ queryKey: ["tasks"] })

            const prevData = queryClient.getQueryData<Task[]>(["tasks"])

            queryClient.setQueryData<Task[]>(["tasks"], (old = []) =>
                old.filter(t => t._id !== id)
            )

            return { prevData }
        },

        onError(err: { response: { data: { message: string } } }, _, context) {
            if (context?.prevData) {
                queryClient.setQueryData(["tasks"], context.prevData)
            }

            toast.error(err.response.data.message)
        },
        onSuccess(data: { message: string }) {
            toast.success(data.message)
        }
    })

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {children}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="start">
                <DropdownMenuLabel>Vazifalar</DropdownMenuLabel>
                <DropdownMenuGroup>
                    <DropdownMenuItem onSelect={e => e.preventDefault()} className="bg-blue-400 text-white">
                        <EditTaskDialog data={data}>
                            <button>Tahrirlash</button>
                        </EditTaskDialog>
                        <DropdownMenuShortcut>
                            <Pen className="text-white" />
                        </DropdownMenuShortcut>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                        onClick={() => remove({ id: data?._id })}
                        className="bg-red-400 text-white"
                    >
                        O'chirish
                        <DropdownMenuShortcut>
                            <Trash className="text-white" />
                        </DropdownMenuShortcut>
                    </DropdownMenuItem>

                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
