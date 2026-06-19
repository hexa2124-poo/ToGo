import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import HeroSlider from '@/components/home/HeroSlider'
import FeaturedProducts from '@/components/home/FeaturedProducts'
import RatingSection from '@/components/home/RatingSection'
import LocationSection from '@/components/home/LocationSection'
import InstagramSection from '@/components/home/InstagramSection'
import CartDrawer from '@/components/cart/CartDrawer'
import FloatingCartButton from '@/components/cart/FloatingCartButton'

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSlider />
        <FeaturedProducts />
        <RatingSection />
        <LocationSection />
        <InstagramSection />
      </main>
      <Footer />
      <CartDrawer />
      <FloatingCartButton />
    </>
  )
}
