import { Route, Routes, useLocation } from "react-router-dom";
import HomePage from "./pages/home";

import Events from "./pages/events";
import EventPage from "./pages/events/eventPage";
import Blogs from "./pages/blogs";
import BlogPage from "./pages/blogs/blogPage";

import PhotoReels from "./pages/photoreel";
import Header from "./components/header";

import Footer from "./components/footer";
import PortfolioPage from "./pages/portfolio/portfolio";
import IndividualPortfolio from "./pages/portfolio/individualPortfolio";
import { ThemeProvider } from "./context/ThemeContext";
import PortfolioLayout from "./pages/portfolio/index";
import Login from "./pages/login/login";
import Register from "./pages/register/register";

export default function App() {
  const location = useLocation();

  // Pages that should NOT show the header/footer chrome
  const hideChrome = ["/login", "/register"].includes(location.pathname);

  return (
    <div>
      <ThemeProvider>
        <div className="bg-complementPrimary">

          {/* Header hidden on login/register */}
          {!hideChrome && <Header />}

          {/* pt-[65px] offsets the fixed header height — not needed on login */}
          <div className={!hideChrome ? "pt-[65px]" : ""}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/portfolio" element={<PortfolioLayout />}>
                <Route index element={<PortfolioPage />} />
                <Route path=":id" element={<IndividualPortfolio />} />
              </Route>
              <Route path="/photo-reels" element={<PhotoReels />} />

              <Route path="/events" element={<Events />}>
                <Route path=":id" element={<EventPage />} />
              </Route>
              <Route path="/blogs" element={<Blogs />}>
                <Route path=":id" element={<BlogPage />} />
              </Route>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<HomePage />} />
            </Routes>
          </div>

          {/* Footer hidden on login/register */}
          {!hideChrome && <Footer />}

        </div>
      </ThemeProvider>
    </div>
  );
}
