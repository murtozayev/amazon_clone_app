import { useNavigate } from "@tanstack/react-router"
import Cookies from "js-cookie"
import { useEffect, useState, ReactNode } from "react"

interface ProtectedRouteProps {
    children: ReactNode
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const [isAuth, setIsAuth] = useState<boolean | null>(null)
    const navigate = useNavigate()

    useEffect(() => {
        const token = Cookies.get("amazon_clone")

        if (token) {
            setIsAuth(true)
        } else {
            setIsAuth(false)
        }
    }, [])

    useEffect(() => {
        if (isAuth === false) {
            navigate({ to: "/auth" })
        } else {
            if ((window.location.pathname === "/" || window.location.pathname === "/auth") && isAuth === true) {
                navigate({ to: "/employee" })
            }
        }
    }, [isAuth, navigate])

    if (isAuth === null) {
        return <div>Yuklanmoqda...</div>
    }

    return <>{children}</>
}

export default ProtectedRoute
