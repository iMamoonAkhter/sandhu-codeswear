import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import Head from "next/head";
import { Router, useRouter } from "next/router";
import NProgress, { set } from 'nprogress';
import 'nprogress/nprogress.css';
import { useCallback, useEffect, useState } from "react";

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
  const [user, setUser] = useState({ value: null });
  const [key, setKey] = useState();
  const [userInfo, setUserInfo] = useState(null);

  
  const fetchUserDetails = async (token) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/users/getUser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(token),
      })

      const data = await response.json();
      setUserInfo(data.user);
    } catch (error) {
      console.error("Error fetching user details:", error);
      
    }
  }

  useEffect(() => {
    try {
      if (localStorage.getItem('cart')) {
        const storedCart = JSON.parse(localStorage.getItem('cart'));
        setCart(storedCart);
        saveCart(storedCart);
      }
    } catch (error) {
      localStorage.clear();
    }

    if(localStorage.getItem('token')) {
      setUser({ value: localStorage.getItem('token') });
      fetchUserDetails({ token: localStorage.getItem('token') });
    }else{
      setUser({ value: null });
    }
    
    setKey(Math.random());
  }, [router.query]);

  const saveCart = useCallback((myCart) => {
    localStorage.setItem('cart', JSON.stringify(myCart));
    let subt = 0;
    let keys = Object.keys(myCart);
    for (let i = 0; i < keys.length; i++) {
      subt += myCart[keys[i]].price * myCart[keys[i]].qty;
    }
    setSubTotal(subt);
  }, []);

  const addToCart = useCallback((id, slug, qty, price, name, category, size, variant, image) => {
    const itemCode = `${slug}~~${size}~~${variant}`;
    setCart(prevCart => {
      // Create a new cart object only if needed
      const newCart = JSON.parse(JSON.stringify(prevCart));
      
      if (newCart[itemCode]) {
        newCart[itemCode].qty += qty;
      } else {
        newCart[itemCode] = {
          id, slug, qty, price, name, category, size, variant, image
        };
      }
      
      saveCart(newCart);
      return newCart;
    });
  }, [saveCart]);

  const clearCart = () => {
    setCart({});
    saveCart({});
  };

  const logout = () => {
    localStorage.removeItem('token');
    setKey(Math.random());
    setUser({ value: null });
    router.push('/');
  };

  const removeFromCart = useCallback((itemCode, qty) => {
    setCart(prevCart => {
      const newCart = JSON.parse(JSON.stringify(prevCart));
      
      if (newCart[itemCode]) {
        newCart[itemCode].qty -= qty;
        if (newCart[itemCode].qty <= 0) {
          delete newCart[itemCode];
        }
      }
      
      saveCart(newCart);
      return newCart;
    });
  }, [saveCart]);

  const BuyNow = (product, selectedSize, selectedColor) => {
    setBuyNowItem({
      id: product._id,
      slug: product.slug,
      price: product.price,
      name: product.title,
      category: product.category,
      size: selectedSize,
      variant: selectedColor,
      image: product.img,
    });

    setCart({});
    saveCart({});
  };

  useEffect(() => {
    if (buyNowItem && Object.keys(cart).length === 0) {
      addToCart(
        buyNowItem.id,
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
  }, [cart, buyNowItem, addToCart, router]);

  return (
    <>
    <Head>
      <script src="https://js.stripe.com/v3/" async></script>
    </Head>
      {key &&
        <Navbar
          user={user}
          userInfo={userInfo}
          logout={logout}
          key={key}
          cart={cart}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
          clearCart={clearCart}
          subTotal={subTotal}
        />
      }
      <Component
        cart={cart}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
        subTotal={subTotal}
        BuyNow={BuyNow}
        user={user} // Pass user token
        userInfo={userInfo} // Pass user info to all pages
        {...pageProps}
      />
      <Footer />
    </>
  );
}