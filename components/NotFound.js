import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { FiArrowLeft, FiShoppingBag, FiFrown } from "react-icons/fi";

const NotFoundPage = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <FiFrown className="text-white text-3xl" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800">404 - Product Not Found</h1>
        <p className="text-gray-500 mt-2">{`We couldn't find what you're looking for.`}</p>
      </div>

      {/* Image */}
      <div className="mb-6">
        <Image
          src={"https://static.vecteezy.com/system/resources/previews/053/173/315/non_2x/illustration-of-404-not-found-with-people-engaged-in-activities-realizing-the-page-they-are-trying-to-reach-is-down-illustrated-with-the-404-error-text-free-vector.jpg"} // Replace with your own 404 illustration
          alt="404 Not Found"
          width={200}
          height={200}
          className="mx-auto"
        />
      </div>

      {/* Message */}
      <p className="text-gray-600 max-w-md text-center mb-6">
        {`The product you're searching for doesn't exist or may have been removed.
        Don't worry though — we have plenty of other amazing products for you!`}
      </p>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
        <button
          onClick={() => router.push('/')}
          className="flex items-center justify-center gap-2 cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-3 rounded-lg transition"
        >
          <FiArrowLeft />
          Go Back
        </button>

        <Link href="/" passHref legacyBehavior>
          <a className="flex items-center justify-center gap-2 bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-lg transition">
            <FiShoppingBag />
            Continue Shopping
          </a>
        </Link>
      </div>

      {/* Popular Categories */}
      <div className="text-center">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
          Popular Categories
        </h3>
        <div className="flex flex-wrap justify-center gap-2">
        {['tshirts', 'hoodies', 'mugs', 'stickers'].map((category) => (
    <Link
      key={category}
      href={`/products/${category}`}
      className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm capitalize transition"
    >
      {category}
    </Link>
  ))}
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
