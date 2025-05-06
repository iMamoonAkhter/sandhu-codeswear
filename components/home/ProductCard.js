import Image from 'next/image';
import Link from 'next/link';

export default function ProductCard({ product }) {
  return (
    <div className="border border-gray-200 p-4 rounded-lg hover:shadow-md transition-all">
      {product && <Link href={`/product/${product.category}/${product.slug}`}>
        <div className="relative aspect-square mb-3">
          <Image 
            src={product.img} 
            alt={product.title}
            fill
            className="object-contain"
          />
        </div>
        <h3 className="font-medium text-lg">{product.title}</h3>
        <p className="text-gray-600">${product.price}</p>
        {product.availableQty < 10 && (
          <p className="text-xs text-red-500 mt-1">Only {product.availableQty} left!</p>
        )}
      </Link>}
    </div>
  );
}

