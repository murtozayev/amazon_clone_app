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
import { useQuery } from "@tanstack/react-query"
import api from "@/server/api"


export function TableDemo() {

    const { data: admin, isLoading: isGetting } = useQuery({
        queryKey: ["admins"],
        queryFn: async () => {
            const { data } = await api.get("/dashboard/users/admins")

            return data
        }
    })

    const { data, isLoading } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const { data } = await api.get("/dashboard/users/all")

            return data
        }
    })

    return (
        <div className="flex items-center">
            <Table className="w-full">
                <TableCaption>Bular jami adminlar</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Ismlar</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                        <TableHead className="text-right">Sozlamalar</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {isGetting && <TableCaption className="text-center w-[20vw] animate-pulse">Malumotlar olinmoqda kuting...</TableCaption>}
                    {admin?.map((user: { username: string, email: string, role: string, _id: string, status: string }) => (
                        <TableRow key={user._id}>
                            <TableCell className="font-medium">{user.username}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.role}</TableCell>
                            <TableCell className="text-right">{user.status}</TableCell>
                            <TableCell className="text-right">
                                <DropdownMenuCheckboxes />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <div className="w-1 h-[190px] bg-slate-600">

            </div>

            <Table className="w-full">
                <TableCaption>Bular jami foydalanuvchilar</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Ismlar</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                        <TableHead className="text-right">Sozlamalar</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {isLoading && <TableCaption className="text-center w-[20vw] animate-pulse">Malumotlar olinmoqda kuting...</TableCaption>}
                    {data?.map((user: { username: string, email: string, role: string, _id: string, status: string }) => (
                        <TableRow key={user._id}>
                            <TableCell className="font-medium">{user.username}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.role}</TableCell>
                            <TableCell className="text-right">{user.status}</TableCell>
                            <TableCell className="text-right">
                                <DropdownMenuCheckboxes />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
