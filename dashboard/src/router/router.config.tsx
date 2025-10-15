import { Outlet, RootRoute, Route, Router } from "@tanstack/react-router"
import ProtectedRoute from "./ProtectedRoute"
import Auth from "@/pages/Auth"
import Dashboard from "@/pages/dashboard/Dashboard"
import Users from "@/pages/dashboard/Users"
import Products from "@/pages/dashboard/Products"

const rootRoute = new RootRoute({
    component: () => <div>
        <Outlet />
    </div>
})

export const authRoute = new Route({
    getParentRoute: () => rootRoute,
    path: "/auth",
    component: () => (
        <ProtectedRoute>
            <Auth />
        </ProtectedRoute>
    )
})

export const dashboardRoute = new Route({
    getParentRoute: () => rootRoute,
    path: "/",
    component: () => (
        <ProtectedRoute>
            <Dashboard />
        </ProtectedRoute>
    )
})

export const employee = new Route({
    getParentRoute: () => dashboardRoute,
    path: "/employee",
    component: () => <Users />
})

export const products = new Route({
    getParentRoute: () => dashboardRoute,
    path: "/products",
    component: () => <Products />
})


const routeTree = rootRoute.addChildren([authRoute, dashboardRoute.addChildren([employee, products])])

const router = new Router({ routeTree })

export default router

declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router
    }
}