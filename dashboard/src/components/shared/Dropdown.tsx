"use client"

import * as React from "react"
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"

import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { EllipsisVertical } from "../animate-ui/icons/ellipsis-vertical"
import SpamDialog from "./SpamDialog"
import BanDialog from "./BanDialog"
import RoleChange from "./Role"

type Checked = DropdownMenuCheckboxItemProps["checked"]

interface Props {
    onDelete: React.MouseEventHandler<HTMLDivElement>
    data: object
}

export function DropdownMenuCheckboxes({ onDelete, data }: Props) {
    const [showStatusBar, setShowStatusBar] = React.useState<Checked>(true)
    const [showActivityBar, setShowActivityBar] = React.useState<Checked>(false)
    const [showPanel, setShowPanel] = React.useState<Checked>(false)

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <EllipsisVertical animateOnHover />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel></DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem
                    className="cursor-target"
                    checked={showStatusBar}
                    onCheckedChange={setShowStatusBar}
                >
                    Yozish
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                    className="cursor-target"
                    checked={showStatusBar}
                    onCheckedChange={setShowStatusBar}
                    onSelect={e => e.preventDefault()}
                >
                    <RoleChange data={data as { _id: string }}>
                        Rolni almashtirish
                    </RoleChange>
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                    className="cursor-target"
                    checked={showActivityBar}
                    onCheckedChange={setShowActivityBar}
                    onClick={onDelete}
                >
                    O'chirish
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                    className="cursor-target"
                    checked={showPanel}
                    onCheckedChange={setShowPanel}
                    onSelect={e => e.preventDefault()}
                >
                    <SpamDialog data={data as { _id: string }}>Spam berish</SpamDialog>
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                    className="cursor-target"
                    checked={showPanel}
                    onCheckedChange={setShowPanel}
                    onSelect={e => e.preventDefault()}
                >
                    <BanDialog data={data as { _id: string }}>
                        Ban berish
                    </BanDialog>
                </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
