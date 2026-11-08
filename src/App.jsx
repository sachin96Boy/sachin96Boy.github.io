import { Route, Routes } from "react-router-dom";

import VerticalHeader from "./components/header/VerticalHeader";
import Sidebar from "./components/sidebar/Sidebar";
import Header from "./components/Header";
import Footer from "./components/footer/Footer";
import ScrollToTop from "./components/ScrollToTop";
import HomePage from "./components/pages/HomePage";
import Services from "./components/pages/Services";
import WorkHistory from "./components/pages/WorkHistory";
import Contact from "./components/pages/Contact";
import Portfolio from "./components/pages/Portfolio";
import NotFoundPage from "./components/body-comp/NotFoundPage";

function App() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:font-semibold focus:text-on-accent"
      >
        Skip to content
      </a>
      <ScrollToTop />
      <Sidebar />
      <Header />
      <main
        id="main"
        tabIndex={-1}
        className="flex min-h-[100dvh] flex-col focus-visible:ring-0 lg:pl-64 lg:pr-20"
      >
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<Services />} />
            <Route path="/portfolio/*" element={<Portfolio />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/workhistory" element={<WorkHistory />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
        <Footer />
      </main>
      <VerticalHeader />
    </>
  );
}

export default App;
