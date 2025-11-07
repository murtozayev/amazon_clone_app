import { CursorDemo } from "./components/shared/CursorUI"
import ClickSpark from "./components/ClickSpark"
import TargetCursor from "./components/TargetCursor"
import { RouterProvider } from "@tanstack/react-router"
import router from "./router/router.config"
import { useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import api from "./server/api"
import useSettings from "./store"
import { toast } from "sonner"

const App = () => {

  const { data } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const res = await api.get("/profile/getme")

      return res.data
    }
  })

  const { setData } = useSettings()

  useEffect(() => {
    setData(data)

    async function checkAuth() {
      try {
        const res = await api.get("/auth/check")

        if (!res.data) {
          toast.error("Ro'yxatdan o'tmagansiz")
        }
      } catch (err) {
        toast.error((err as any).response.data.message)
      }
    }

    checkAuth()

  }, [data])

  return (
    <CursorDemo>
      <ClickSpark>
        <TargetCursor
          spinDuration={2}
          hideDefaultCursor={true}
        />
        <RouterProvider router={router} />
      </ClickSpark>
    </CursorDemo>
  )
}

export default App