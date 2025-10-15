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

type Checked = DropdownMenuCheckboxItemProps["checked"]

export function DropdownMenuCheckboxes() {
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
                    checked={showActivityBar}
                    onCheckedChange={setShowActivityBar}
                >
                    O'chirish
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                className="cursor-target"
                    checked={showPanel}
                    onCheckedChange={setShowPanel}
                >
                    Spam berish
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                className="cursor-target"
                    checked={showPanel}
                    onCheckedChange={setShowPanel}
                >
                    Ban berish
                </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
