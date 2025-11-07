import { useState } from "react"
import UserDrawer from "./UserDrawer"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { DropdownMenuCheckboxes } from "./Dropdown"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import api from "@/server/api"
import { toast } from "sonner"

export function TableDemo() {
    const queryClient = useQueryClient()
    const [open, setOpen] = useState(false)
    const [selectedUser, setSelectedUser] = useState<any>(null)

    const { data: admin, isLoading: isGetting } = useQuery({
        queryKey: ["admins"],
        queryFn: async () => {
            const { data } = await api.get("/dashboard/users/admins")
            return data
        },
    })

    const { data, isLoading } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const { data } = await api.get("/dashboard/users/all")
            return data
        },
    })

    const { mutateAsync: deleteAsync } = useMutation({
        mutationFn: async ({ id }: { id: string }) => {
            const res = await api.delete(`/dashboard/users/delete/${id}`)
            return res.data
        },
        async onMutate({ id }) {
            await queryClient.cancelQueries({ queryKey: ["users"] })
            const oldData = queryClient.getQueryData(["users"])
            queryClient.setQueryData(["users"], (old: any = []) =>
                old.filter((u: any) => u._id !== id)
            )
            return { oldData }
        },
        onError(err: any, _, context) {
            queryClient.setQueryData(["users"], context?.oldData)
            toast.error(err.response?.data?.message)
        },
        onSuccess(data: { message: string }) {
            toast.success(data.message)
        },
    })

    async function deleteUsers(id: string) {
        await deleteAsync({ id })
    }

    function handleDoubleClick(user: any) {
        setSelectedUser(user)
        setOpen(true)
    }

    return (
        <>
            <div className="flex items-center w-[150vh]">
                {/* --- ADMIN TABLE --- */}
                <Table className="w-full">
                    <TableCaption>Bular jami adminlar</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Ismlar</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead className="text-right">Status</TableHead>
                            <TableHead className="text-right">Sozlamalar</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isGetting && (
                            <TableCaption className="text-center animate-pulse">
                                Ma'lumotlar olinmoqda...
                            </TableCaption>
                        )}
                        {admin?.map((user: any) => (
                            <TableRow
                                key={user._id}
                                onDoubleClick={() => handleDoubleClick(user)}
                                className="cursor-pointer"
                            >
                                <TableCell>{user.username}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.role}</TableCell>
                                <TableCell className="text-right">{user.status}</TableCell>
                                <TableCell className="text-right">
                                    <DropdownMenuCheckboxes
                                        data={user}
                                        onDelete={() => deleteUsers(user._id)}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                <div className="w-1 h-[190px] bg-slate-600"></div>

                {/* --- USERS TABLE --- */}
                <Table className="w-full">
                    <TableCaption>Bular jami foydalanuvchilar</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Ismlar</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead className="text-right">Status</TableHead>
                            <TableHead className="text-right">Sozlamalar</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading && (
                            <TableCaption className="text-center animate-pulse">
                                Ma'lumotlar olinmoqda...
                            </TableCaption>
                        )}
                        {data?.map((user: any) => (
                            <TableRow
                                key={user._id}
                                onDoubleClick={() => handleDoubleClick(user)}
                                className="cursor-pointer"
                            >
                                <TableCell>{user.username}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.role}</TableCell>
                                <TableCell className="text-right">{user.status}</TableCell>
                                <TableCell className="text-right">
                                    <DropdownMenuCheckboxes
                                        data={user}
                                        onDelete={() => deleteUsers(user._id)}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* DRAWER */}
            <UserDrawer open={open} onOpenChange={setOpen} data={selectedUser} />
        </>
    )
}
