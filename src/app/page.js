import Carousel from "./components/carousel/Carousel";
import FeaturedCatalog from "./components/catalog/Catalog";
import QuickContacts from "./components/contacts/QuickContacts";
import Footer from "./components/footer/Footer";
import HeroHeader from "./components/header/Header";
import Navbar from "./components/navbar/Navbar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <HeroHeader />
      <FeaturedCatalog />
      <Carousel />
      <QuickContacts />
      <Footer />
    </div>
  );
};