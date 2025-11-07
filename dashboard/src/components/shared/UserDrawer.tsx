"use client"
import { Button } from "@/components/ui/button"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer"

export default function UserDrawer({
    open,
    onOpenChange,
    data,
}: {
    open: boolean
    onOpenChange: (val: boolean) => void
    data: any
}) {
    if (!data) return null

    return (
        <Drawer open={open} onOpenChange={onOpenChange}>
            <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader>
                        <DrawerTitle>{data.username}</DrawerTitle>
                        <DrawerDescription>{data.email}</DrawerDescription>
                    </DrawerHeader>

                    <div className="p-4 space-y-2">
                        <p><strong>Role:</strong> {data.role}</p>
                        <p><strong>Status:</strong> {data.status}</p>
                    </div>

                    <DrawerFooter>
                        <Button onClick={() => alert(`User ID: ${data._id}`)}>More Info</Button>
                        <DrawerClose asChild>
                            <Button variant="outline">Yopish</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    )
}
