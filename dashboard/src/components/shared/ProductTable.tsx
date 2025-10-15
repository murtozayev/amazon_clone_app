"use client"

import * as React from "react"
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal, ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useMutation, useQuery } from "@tanstack/react-query"
import api from "@/server/api"
import { toast } from "sonner"
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu"

type Product = {
    _id: string
    name: string
    image: string
    price: number
}

export function ProductTable() {
    const [search, setSearch] = React.useState("")
    const [columnVisibility, setColumnVisibility] = React.useState<Record<string, boolean>>({
        image: true,
        name: true,
        price: true,
        actions: true,
    })
    const [selectedIds, setSelectedIds] = React.useState<string[]>([])

    const { data: products = [], isLoading, refetch } = useQuery({
        queryKey: ["products"],
        queryFn: async () => {
            const { data } = await api.get("/client/all")
            return data
        },
    })

    const deleteMutation = useMutation({
        mutationFn: async (ids: string[]) => {
            await api.post("/client/delete-many", { ids })
        },
        onSuccess: () => {
            toast.success("Tanlangan mahsulotlar o‘chirildi ✅")
            refetch()
            setSelectedIds([])
        },
        onError: () => toast.error("O‘chirishda xatolik yuz berdi ❌"),
    })

    const columns: ColumnDef<Product>[] = [
        {
            id: "select",
            header: ({ table }) => (
                <Checkbox
                    checked={
                        table.getRowModel().rows.length > 0 &&
                        selectedIds.length === table.getRowModel().rows.length
                    }
                    onCheckedChange={(value) => {
                        if (value) {
                            setSelectedIds(table.getRowModel().rows.map((r) => r.original._id))
                        } else {
                            setSelectedIds([])
                        }
                    }}
                    aria-label="Select all"
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={selectedIds.includes(row.original._id)}
                    onCheckedChange={(checked) => {
                        setSelectedIds((prev) =>
                            checked
                                ? [...prev, row.original._id]
                                : prev.filter((id) => id !== row.original._id)
                        )
                    }}
                    aria-label="Select row"
                />
            ),
        },
        {
            accessorKey: "image",
            header: "Image",
            cell: ({ row }) =>
                columnVisibility.image ? (
                    <img
                        src={row.original.image}
                        alt={row.original.name}
                        className="w-12 h-12 rounded-md object-cover"
                    />
                ) : null,
        },
        {
            accessorKey: "name",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) =>
                columnVisibility.name ? (
                    <div className="font-medium">{row.original.name}</div>
                ) : null,
        },
        {
            accessorKey: "price",
            header: () => <div className="text-right">Price</div>,
            cell: ({ row }) =>
                columnVisibility.price ? (
                    <div className="text-right font-semibold">
                        ${row.original.price.toFixed(2)}
                    </div>
                ) : null,
        },
        {
            id: "actions",
            header: "Settings",
            cell: ({ row }) =>
                columnVisibility.actions ? (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                                onClick={() =>
                                    navigator.clipboard.writeText(row.original._id)
                                }
                            >
                                Copy ID
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Edit Product</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-500">
                                Delete Product
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ) : null,
        },
    ]

    const table = useReactTable({
        data:
            products.filter(
                (p: Product) =>
                    p.name.toLowerCase().includes(search.toLowerCase()) ||
                    p._id.toLowerCase().includes(search.toLowerCase())
            ) ?? [],
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
    })

    if (isLoading) {
        return (
            <div className="py-10 text-center text-gray-500">Loading products...</div>
        )
    }

    return (
        <div className="w-full border rounded-lg p-4 shadow-sm space-y-4">
            {/* Search va filter */}
            <div className="flex items-center gap-4">
                <Input
                    placeholder="Search by name or ID..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="max-w-sm"
                />

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            Columns <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {Object.keys(columnVisibility).map((key) => (
                            <DropdownMenuCheckboxItem
                                key={key}
                                checked={columnVisibility[key]}
                                onCheckedChange={(value) =>
                                    setColumnVisibility((prev) => ({
                                        ...prev,
                                        [key]: value,
                                    }))
                                }
                                className="capitalize"
                            >
                                {key}
                            </DropdownMenuCheckboxItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>

                {selectedIds.length > 0 && (
                    <Button
                        variant="destructive"
                        onClick={() => deleteMutation.mutate(selectedIds)}
                    >
                        Delete Selected ({selectedIds.length})
                    </Button>
                )}
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-md border">
                <Table>
                    <TableHeader className="bg-gray-50">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id} className="text-left">
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id} className="align-middle">
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="text-center py-8 text-gray-500"
                                >
                                    No products found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
