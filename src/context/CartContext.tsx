"use client";
import React, { ReactNode, createContext, useContext, useState } from "react";
import { IProduct } from "@/interface/Product";

// Define a new interface for cart items
interface CartProduct {
  _id: string;
  title: string;
  price: IProduct["price"];
  catalog: IProduct["catalog"];
  quantity: number;
  images?: string[];
  description?: string;
  design?: string;
  contours?: string;
}

interface CartContextType {
  cartItems: CartProduct[];
  addToCart: (product: IProduct) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  decreaseQuantity: (product: IProduct) => void;
}

const initialContext: CartContextType = {
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  decreaseQuantity: () => {},
};

const CartContext = createContext<CartContextType>(initialContext);

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<CartProduct[]>([]);

  const stripExtraProps = (product: IProduct): CartProduct => {
    return {
      _id: product._id,
      title: product.title,
      price: product.price,
      catalog: product.catalog,
      quantity: product.quantity,
      images: product.images,
      description: product.description,
      design: product.design,
      contours: product.contours,
    };
  };

  const addToCart = (product: IProduct) => {
    const existingProductIndex = cartItems.findIndex(
      (item) => item._id === product._id
    );

    if (existingProductIndex !== -1) {
      const updatedCartItems = cartItems.map((item, index) =>
        index === existingProductIndex
      //@ts-ignore
          ? stripExtraProps({ ...item, quantity: item.quantity + 1 })
          : item
      );
      setCartItems(updatedCartItems);
    } else {
      // If the product is added to the cart for the first time, set initial quantity to 1
      setCartItems((prevCartItems) => [
        ...prevCartItems,
        //@ts-ignore
        stripExtraProps({ ...product, quantity: 1 }),
      ]);
    }
  };

  const decreaseQuantity = (product: IProduct) => {
    const existingProductIndex = cartItems.findIndex(
      (item) => item._id === product._id
    );

    if (existingProductIndex !== -1) {
      // If the product exists in the cart, decrease its quantity
      const updatedCartItems = cartItems.map((item, index) =>
        index === existingProductIndex && item.quantity > 1
          ? //@ts-ignore
            stripExtraProps({ ...item, quantity: item.quantity - 1 })
          : item
      );
      setCartItems(updatedCartItems);
    }
  };

  const removeFromCart = (productId: string) => {
    const updatedCartItems = cartItems.filter((item) => item._id !== productId);
    setCartItems(updatedCartItems);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        decreaseQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
