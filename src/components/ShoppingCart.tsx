"use client";

import { useState, createContext, useContext, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X, Minus, Plus, ShoppingCart as CartIcon } from "lucide-react";

interface CartTrack {
  id: number;
  title: string;
  artist: string;
  price: number;
  licenseType: 'standard' | 'extended';
  cover?: string;
}

interface CartContextType {
  items: CartTrack[];
  addToCart: (track: CartTrack) => void;
  removeFromCart: (trackId: number, licenseType: string) => void;
  updateLicense: (trackId: number, oldLicense: string, newLicense: 'standard' | 'extended') => void;
  clearCart: () => void;
  getItemCount: () => number;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartTrack[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('vibetone-cart');
    if (savedCart) {
      setItems(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem('vibetone-cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (track: CartTrack) => {
    setItems(prev => {
      const existingItem = prev.find(item =>
        item.id === track.id && item.licenseType === track.licenseType
      );

      if (existingItem) {
        return prev; // Item already exists, don't add duplicate
      }

      return [...prev, track];
    });
  };

  const removeFromCart = (trackId: number, licenseType: string) => {
    setItems(prev => prev.filter(item =>
      !(item.id === trackId && item.licenseType === licenseType)
    ));
  };

  const updateLicense = (trackId: number, oldLicense: string, newLicense: 'standard' | 'extended') => {
    setItems(prev => prev.map(item => {
      if (item.id === trackId && item.licenseType === oldLicense) {
        const prices = { standard: 29, extended: 49 };
        return { ...item, licenseType: newLicense, price: prices[newLicense] };
      }
      return item;
    }));
  };

  const clearCart = () => {
    setItems([]);
  };

  const getItemCount = () => items.length;

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + item.price, 0);
  };

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateLicense,
      clearCart,
      getItemCount,
      getTotalPrice
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

interface ShoppingCartProps {
  trigger?: React.ReactNode;
}

export default function ShoppingCart({ trigger }: ShoppingCartProps) {
  const { items, removeFromCart, updateLicense, clearCart, getTotalPrice } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  const handleCheckout = () => {
    // Simulate checkout process
    alert(`Checkout mit ${items.length} Artikeln für €${getTotalPrice().toFixed(2)}`);
    // Here you would integrate with Shopify or payment processor
    clearCart();
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        {trigger || (
          <Button variant="ghost" size="sm" className="relative">
            <CartIcon className="h-5 w-5" />
            {items.length > 0 && (
              <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs bg-lime-500 text-black">
                {items.length}
              </Badge>
            )}
          </Button>
        )}
      </SheetTrigger>

      <SheetContent className="w-[400px] sm:w-[540px] bg-zinc-950 border-zinc-800">
        <SheetHeader>
          <SheetTitle className="text-white">
            Warenkorb ({items.length} Artikel)
          </SheetTitle>
        </SheetHeader>

        <div className="mt-6 flex flex-col h-full">
          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center text-zinc-400">
                <CartIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Dein Warenkorb ist leer</p>
                <p className="text-sm mt-2">Füge Tracks hinzu um loszulegen</p>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-auto space-y-4">
                {items.map((item, index) => (
                  <Card key={`${item.id}-${item.licenseType}`} className="p-4 bg-zinc-900 border-zinc-700">
                    <div className="flex items-start space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-zinc-700 to-zinc-900 rounded-lg flex-shrink-0" />

                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-white truncate">{item.title}</h4>
                        <p className="text-sm text-zinc-400">{item.artist}</p>

                        <div className="mt-2 flex items-center justify-between">
                          <Select
                            value={item.licenseType}
                            onValueChange={(value: 'standard' | 'extended') =>
                              updateLicense(item.id, item.licenseType, value)
                            }
                          >
                            <SelectTrigger className="w-32 h-8 text-xs bg-zinc-800 border-zinc-700">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-zinc-800 border-zinc-700">
                              <SelectItem value="standard">Standard (€29)</SelectItem>
                              <SelectItem value="extended">Extended (€49)</SelectItem>
                            </SelectContent>
                          </Select>

                          <div className="flex items-center space-x-2">
                            <span className="font-semibold text-lime-400">
                              €{item.price.toFixed(2)}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFromCart(item.id, item.licenseType)}
                              className="h-8 w-8 p-0 text-zinc-400 hover:text-red-400"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Cart Summary */}
              <div className="border-t border-zinc-700 pt-4 mt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold text-white">Gesamt:</span>
                  <span className="text-xl font-bold text-lime-400">
                    €{getTotalPrice().toFixed(2)}
                  </span>
                </div>

                <div className="space-y-2">
                  <Button
                    onClick={handleCheckout}
                    className="w-full bg-lime-500 hover:bg-lime-600 text-black font-semibold"
                    size="lg"
                  >
                    Zur Kasse (€{getTotalPrice().toFixed(2)})
                  </Button>

                  <Button
                    variant="outline"
                    onClick={clearCart}
                    className="w-full border-zinc-600 text-zinc-300 hover:bg-zinc-800"
                  >
                    Warenkorb leeren
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

// Helper component for adding tracks to cart
interface AddToCartButtonProps {
  track: {
    id: number;
    title: string;
    artist: string;
  };
  licenseType: 'standard' | 'extended';
  className?: string;
}

export function AddToCartButton({ track, licenseType, className }: AddToCartButtonProps) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    const prices = { standard: 29, extended: 49 };
    addToCart({
      ...track,
      price: prices[licenseType],
      licenseType
    });
  };

  return (
    <Button
      onClick={handleAddToCart}
      className={className}
      size="sm"
    >
      <CartIcon className="h-4 w-4 mr-2" />
      Add to Cart
    </Button>
  );
}
