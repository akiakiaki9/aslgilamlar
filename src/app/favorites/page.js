import React from 'react'
import Navbar from '../components/navbar/Navbar'
import Footer from '../components/footer/Footer'
import FavoritesPage from './Favorites'

export default function page() {
    return (
        <div>
            <Navbar />
            <FavoritesPage />
            <Footer />
        </div>
    )
};