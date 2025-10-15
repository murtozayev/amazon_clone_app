import About from "./pages/About"
import AD from "./pages/AD"
import Categories from "./pages/Categories"
import Home from "./pages/Home"
import Products from "./pages/Products"

const App = () => {
  return (
    <div className="w-[1200px] p-2 mx-auto">
      <Home />
      <Categories />
      <About />
      <AD />
      <Products />
      <footer>
        <img src="https://53.fs1.hubspotusercontent-na1.net/hubfs/53/website-footer-28-20250123-243270.webp" alt="Footer" />
      </footer>
    </div>
  )
}

export default App