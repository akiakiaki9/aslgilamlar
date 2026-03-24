import Footer from '../components/footer/Footer';
import Navbar from '../components/navbar/Navbar';
import ContactsClient from './ContactsClient';

export const metadata = {
    title: 'Контакты - Магазин ковров в Бухаре | Asl Gilamlar',
    description: 'Свяжитесь с нами по телефону, email или посетите наш шоурум в Бухаре. Мы всегда рады помочь вам выбрать идеальный ковер ручной работы.',
    keywords: 'контакты магазин ковров Бухара, адрес шоурум ковров, телефон купить ковер, ковры Бухара контакты',
    openGraph: {
        title: 'Контакты - Asl Gilamlar Bukhara',
        description: 'Посетите наш шоурум в историческом центре Бухары',
        images: ['/images/contacts-og.jpg'],
    },
    alternates: {
        canonical: 'https://aslgilamlarbukhara.uz/contacts',
    },
};

export default function ContactsPage() {
    return (
        <div>
            <Navbar />
            <ContactsClient />
            <Footer />
        </div>
    )
};