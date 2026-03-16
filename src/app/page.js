import FeaturedCatalog from "./components/catalog/Catalog";
import Footer from "./components/footer/Footer";
import HeroHeader from "./components/header/Header";
import Navbar from "./components/navbar/Navbar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <HeroHeader />
      <FeaturedCatalog />
      <Footer />
    </div>
  );
};