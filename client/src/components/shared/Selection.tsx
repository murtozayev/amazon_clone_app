import * as React from "react"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export function SelectDemo() {
    return (
        <Select>
            <SelectTrigger className="w-[15vw] !h-[3.5vw] !text-[1vw] rounded-l-full bg-slate-300 !text-black">
                <SelectValue placeholder="Barcha Kategoriyalar" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup className="!text-[1vw]">
                    <SelectLabel className="!text-[1vw]">Kategoriyalar</SelectLabel>
                    <SelectItem className="!text-[1vw]" value="banana">Banana</SelectItem>
                    <SelectItem className="!text-[1vw]" value="apple">Apple</SelectItem>
                    <SelectItem className="!text-[1vw]" value="blueberry">Blueberry</SelectItem>
                    <SelectItem className="!text-[1vw]" value="grapes">Grapes</SelectItem>
                    <SelectItem className="!text-[1vw]" value="pineapple">Pineapple</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
