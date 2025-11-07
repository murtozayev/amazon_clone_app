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
    DropdownMenuItem,
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
import SheetUI from "./Sheet"
import { DrawerCardDemo } from "./Drawe"
import { DialogDemo } from "./Dialog"

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
    const [openRowId, setOpenRowId] = React.useState<string | null>(null)

    const { data: products = [], isLoading, refetch } = useQuery({
        queryKey: ["products"],
        queryFn: async () => {
            const { data } = await api.get("/client/all")
            return data
        },
    })

    const deleteMutation = useMutation({
        mutationFn: async (ids: string[]) => {
            const res = await api.post(
                "/dashboard/product/delete-many",
                { ids },
                { headers: { "Content-Type": "application/json" } }
            )
            return res.data
        },
        onSuccess: () => {
            toast.success("Tanlangan mahsulotlar o'chirildi ✅")
            refetch()
            setSelectedIds([])
        },
        onError: () => toast.error("Xatolik yuz berdi ❌"),
    })

    const filteredData = React.useMemo(() => {
        return (products ?? []).filter(
            (p: Product) =>
                p.name.toLowerCase().includes(search.toLowerCase()) ||
                p._id.toLowerCase().includes(search.toLowerCase())
        )
    }, [products, search])

    const columns = React.useMemo<ColumnDef<Product>[]>(() => [
        {
            id: "select",
            header: ({ table }) => {
                const allIds = table.getRowModel().rows.map((r) => r.original._id)
                const allSelected = allIds.length > 0 && allIds.every((id) => selectedIds.includes(id))
                return (
                    <Checkbox
                        checked={allSelected}
                        onCheckedChange={(checked) => {
                            if (checked === true) setSelectedIds(allIds)
                            else setSelectedIds([])
                        }}
                    />
                )
            },
            cell: ({ row }) => (
                <Checkbox
                    checked={selectedIds.includes(row.original._id)}
                    onCheckedChange={(checked) => {
                        setSelectedIds((prev) =>
                            checked === true
                                ? [...prev, row.original._id]
                                : prev.filter((id) => id !== row.original._id)
                        )
                    }}
                />
            ),
            size: 50,
        },
        {
            accessorKey: "image",
            header: "Image",
            cell: ({ row }) =>
                columnVisibility.image ? (
                    <img
                        src={row.original.image}
                        alt={row.original.name}
                        className="w-12 h-12 rounded-md object-cover border"
                    />
                ) : null,
            size: 80,
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
                columnVisibility.name ? <div className="font-medium">{row.original.name}</div> : null,
            size: 200,
        },
        {
            accessorKey: "price",
            header: () => <div className="text-right">Price</div>,
            cell: ({ row }) =>
                columnVisibility.price ? (
                    <div className="text-right font-semibold">${row.original?.price}</div>
                ) : null,
            size: 100,
        },
        {
            id: "actions",
            header: "Settings",
            cell: ({ row }) =>
                columnVisibility.actions ? (
                    <DropdownMenu modal={false}>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                                onClick={() => {
                                    navigator.clipboard.writeText(row.original._id)
                                    toast.info("Mahsulot ID clipboardga nusxalandi 📋")
                                }}
                            >
                                Copy ID
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DialogDemo data={row.original}>
                                <DropdownMenuItem onSelect={e => e.preventDefault()} onClick={e => e.stopPropagation()}>Edit Product</DropdownMenuItem>
                            </DialogDemo>
                            <DropdownMenuItem
                                className="text-red-500 focus:text-red-500"
                                onClick={() => deleteMutation.mutate([row.original._id])}
                            >
                                Delete Product
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ) : null,
            size: 100,
        },
    ], [selectedIds, columnVisibility, deleteMutation])

    const table = useReactTable({
        data: filteredData.reverse(),
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        columnResizeMode: "onChange",
    })

    if (isLoading)
        return <div className="py-10 text-center text-gray-500">Loading products...</div>

    return (
        <div className="w-full border rounded-lg p-4 shadow-sm space-y-4">
            {/* 🔍 Top control bar */}
            <div className="flex flex-wrap items-center gap-4">
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
                                    setColumnVisibility((prev) => ({ ...prev, [key]: value === true }))
                                }
                                className="capitalize"
                            >
                                {key}
                            </DropdownMenuCheckboxItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>

                <SheetUI>
                    <Button>Create new Product</Button>
                </SheetUI>

                {selectedIds.length > 0 && (
                    <Button
                        variant="destructive"
                        onClick={() => deleteMutation.mutate(selectedIds)}
                        disabled={deleteMutation.isPending}
                    >
                        {deleteMutation.isPending ? "Deleting..." : `Delete Selected (${selectedIds.length})`}
                    </Button>
                )}
            </div>

            {/* 🔹 Table */}
            <div className="overflow-x-auto rounded-md border">
                <Table className="min-w-full text-sm border-collapse">
                    <TableHeader className="bg-gray-50">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead
                                        key={header.id}
                                        className="px-4 py-3 text-left font-semibold border-b border-gray-200"
                                        style={{ width: header.getSize() }}
                                    >
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>

                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <React.Fragment key={row.original._id}>
                                    <TableRow
                                        onDoubleClick={() => setOpenRowId(row.original._id)}
                                        className="cursor-pointer hover:bg-gray-50 transition-colors"
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell
                                                key={cell.id}
                                                className="px-4 py-3 align-middle border-b border-gray-100"
                                                style={{ width: cell.column.getSize() }}
                                            >
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
                                        ))}
                                    </TableRow>

                                    <DrawerCardDemo
                                        data={row.original}
                                        open={openRowId === row.original._id}
                                        setOpen={(val) => setOpenRowId(val ? row.original._id : null)}
                                    />
                                </React.Fragment>
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
