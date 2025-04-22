import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import { Router } from "next/router";
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { useEffect, useState } from "react";
// Optional: customize speed or show spinner
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
  const [cart, setCart] = useState({})
  const [subTotal, setSubTotal] = useState(0)
  useEffect(() => {
    try {
      if(localStorage.getItem('cart')) {
        setCart(JSON.parse(localStorage.getItem('cart')))

        saveCart(JSON.parse(localStorage.getItem('cart')))

      }
    } catch (error) {
      console.log(error)
      localStorage.clear();
    }
    
  }, [])
  
  const saveCart = (myCart)=>{
    localStorage.setItem('cart', JSON.stringify(myCart))
    let subt = 0;
    let keys = Object.keys(myCart);
    for(let i=0; i<keys.length; i++){

      subt += myCart[keys[i]].price * myCart[keys[i]].qty;
    }
    setSubTotal(subt);
  }
  const addToCart = (itemCode, qty, price, name, size, variant, image) => {
    let newCart = cart;
    if(itemCode in newCart) {
      newCart[itemCode].qty += 1;
    }else{
      newCart[itemCode] = { qty: 1, price: price, name: name, size: size, variant: variant, image: image } 
    }
    setCart(newCart);
    saveCart(newCart);
  }

  const clearCart = ()=>{
    setCart({});
    saveCart({});
  }

  const removeFromCart = (itemCode, qty, price, name, size, variant, image) => {
    let newCart = cart;
    if(itemCode in cart) {
      newCart[itemCode].qty -= qty;
    }
    if(newCart[itemCode]["qty"] <= 0 ){
      delete newCart[itemCode];
    }
    setCart(newCart);
    saveCart(newCart);
  }
  return <>
    <Navbar key={subTotal} cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal}  />
    <Component cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal} {...pageProps} />
    <Footer />
  </>;
}
