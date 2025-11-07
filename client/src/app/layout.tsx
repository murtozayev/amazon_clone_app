import Navbar from "@/components/shared/Navbar"
import "../assets/css/globals.css"
import type { Metadata } from "next"
import AD from "../components/AD"

export const metadata: Metadata = {
    title: "Amazon",
    description: "Created by Jahongir",
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>
                <AD />
                <div className="px-[5vw]">
                    <header>
                        <Navbar />
                    </header>
                    <main>{children}</main>
                </div>
                <footer className="bg-[#4B3EC4] h-[10vw] text-white text-[2vw] flex items-center justify-center ">Footer © 2025</footer>
            </body>
        </html>
    )
}
