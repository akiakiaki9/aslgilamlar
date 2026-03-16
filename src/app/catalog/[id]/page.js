import Navbar from '@/app/components/navbar/Navbar'
import React from 'react'
import CarpetDetailPage from './CatalogDetail'
import Footer from '@/app/components/footer/Footer'

export default function page() {
    return (
        <div>
            <Navbar />
            <CarpetDetailPage />
            <Footer />
        </div>
    )
};