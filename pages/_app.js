import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import { Router, useRouter } from "next/router";
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { useEffect, useState } from "react";

// Configure NProgress
NProgress.configure({ showSpinner: false, speed: 1000 });

Router.events.on('routeChangeStart', () => {
  NProgress.start();
});
Router.events.on('routeChangeComplete', () => {
  NProgress.done();
});
Router.events.on('routeChangeError', () => {
  NProgress.done();
});

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [cart, setCart] = useState({});
  const [subTotal, setSubTotal] = useState(0);
  const [buyNowItem, setBuyNowItem] = useState(null);

  useEffect(() => {
    try {
      if (localStorage.getItem('cart')) {
        const storedCart = JSON.parse(localStorage.getItem('cart'));
        setCart(storedCart);
        saveCart(storedCart);
      }
    } catch (error) {
      console.log(error);
      localStorage.clear();
    }
  }, []);

  const saveCart = (myCart) => {
    localStorage.setItem('cart', JSON.stringify(myCart));
    let subt = 0;
    let keys = Object.keys(myCart);
    for (let i = 0; i < keys.length; i++) {
      subt += myCart[keys[i]].price * myCart[keys[i]].qty;
    }
    setSubTotal(subt);
  };

  const addToCart = (slug, qty, price, name, category, size, variant, image) => {
    const itemCode = `${slug}~~${size}~~${variant}`;
    let newCart = { ...cart };

    if (itemCode in newCart) {
      newCart[itemCode].qty += qty;
    } else {
      newCart[itemCode] = {
        slug,
        qty,
        price,
        name,
        category,
        size,
        variant,
        image,
      };
    }

    setCart(newCart);
    saveCart(newCart);
  };

  const clearCart = () => {
    setCart({});
    saveCart({});
  };

  const removeFromCart = (itemCode, qty) => {
    let newCart = { ...cart };
    if (itemCode in newCart) {
      newCart[itemCode].qty -= qty;
      if (newCart[itemCode].qty <= 0) {
        delete newCart[itemCode];
      }
    }
    setCart(newCart);
    saveCart(newCart);
  };

  const BuyNow = (product, selectedSize, selectedColor) => {
    // Save the item to be added later
    setBuyNowItem({
      slug: product.slug,
      price: product.price,
      name: product.title,
      category: product.category,
      size: selectedSize,
      variant: selectedColor,
      image: product.img,
    });

    // Clear the cart first
    setCart({});
    saveCart({});
  };

  // Watch for cart to become empty, then add item and go to checkout
  useEffect(() => {
    if (buyNowItem && Object.keys(cart).length === 0) {
      addToCart(
        buyNowItem.slug,
        1,
        buyNowItem.price,
        buyNowItem.name,
        buyNowItem.category,
        buyNowItem.size,
        buyNowItem.variant,
        buyNowItem.image
      );
      setBuyNowItem(null);
      router.push("/checkout");
    }
  }, [cart, buyNowItem]);

  return (
    <>
      <Navbar
        cart={cart}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
        subTotal={subTotal}
      />
      <Component
        cart={cart}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
        subTotal={subTotal}
        BuyNow={BuyNow}
        {...pageProps}
      />
      <Footer />
    </>
  );
}
