// pages/index.js
import CategorySection from '@/components/home/CategorySection';
import Head from 'next/head';
import Image from 'next/image';

export default function Home({ hoodies, tshirts, mugs, stickers }) {
  return (
    <div>
      <Head>
        <title>Sandhu CodesWear - Premium Coding Merchandise</title>
        <meta name="description" content="Wear the code with our premium t-shirts, hoodies, and mugs for developers" />
      </Head>

      {/* Hero Banner */}
      <div className="mb-12">
        <Image 
          width={2000} 
          height={600} 
          src="/home_banner.png" 
          alt="Coding merchandise" 
          className="w-full h-auto"
          priority
        />
      </div>

      <div className="container mx-auto px-4">
        <CategorySection title="Hoodies" products={hoodies} />
        <CategorySection title="T-Shirts" products={tshirts} />
        <CategorySection title="Mugs" products={mugs} />
        <CategorySection title="Stickers" products={stickers} />
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  // Fetch all categories in parallel
  const categories = ['hoodies', 'tshirts', 'mugs', 'stickers'];
  const requests = categories.map(category => 
    fetch(`${process.env.NEXT_PUBLIC_HOST}/api/products/${category}`).then(res => res.json())
  );

  try {
    const [hoodiesRes, tshirtsRes, mugsRes, stickersRes] = await Promise.all(requests);
    
    return {
      props: {
        hoodies: hoodiesRes.products,
        tshirts: tshirtsRes.products,
        mugs: mugsRes.products,
        stickers: stickersRes.products
      }
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    return {
      props: {
        hoodies: [],
        tshirts: [],
        mugs: [],
        stickers: []
      }
    };
  }
}