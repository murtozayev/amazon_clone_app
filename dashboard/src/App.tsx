import { CursorDemo } from "./components/shared/CursorUI"
import ClickSpark from "./components/ClickSpark"
import TargetCursor from "./components/TargetCursor"
import { RouterProvider } from "@tanstack/react-router"
import router from "./router/router.config"

const App = () => {
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