import Navbar from '@/app/components/navbar/Navbar'
import React from 'react'
import CategoryPage from './Category'
import Footer from '@/app/components/footer/Footer'

export default function page() {
    return (
        <div>
            <Navbar />
            <CategoryPage />
            <Footer />
        </div>
    )
};