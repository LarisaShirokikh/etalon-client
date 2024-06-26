"use client";
import React, { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { IProduct } from "@/interface/Product";

interface CartContextType {
  cartItems: IProduct[];
  addToCart: (product: IProduct) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
}

const initialContext: CartContextType = {
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
};

interface CartProviderProps {
  children: ReactNode;
}

const CartContext = createContext<CartContextType>(initialContext);

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<IProduct[]>([]);

  const addToCart = (product: IProduct) => {
    setCartItems((prevCartItems) => {
      const updatedCart = [...prevCartItems, product];
      console.log("Обновленные элементы корзины:", updatedCart);
      return updatedCart;
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems((prevCartItems) =>
      prevCartItems.filter((item) => item.id !== productId)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  useEffect(() => {
    console.log("Элементы корзины изменились:", cartItems);
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
