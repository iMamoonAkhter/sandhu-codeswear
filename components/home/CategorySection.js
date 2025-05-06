// components/CategorySection.js
import ProductCard from './ProductCard';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';

export default function CategorySection({ title, products }) {
    if (!products || products.length === 0) {
        return null; // Don't render the section if there are no products
    }
  return (
    <section className="mb-16">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold capitalize">{title}</h2>
        <Link 
          href={`/${products[0]?.category}`}
          className="flex items-center text-primary hover:underline"
        >
          View all
          <FiArrowRight className="ml-1" />
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.slice(0, 4).map(product => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
}