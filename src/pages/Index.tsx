import { useState } from "react";
import { Header } from "@/components/Header";
import { ProductCard, Product } from "@/components/ProductCard";
import { Cart, CartItem } from "@/components/Cart";
import { useToast } from "@/hooks/use-toast";
import mousepad1 from "@/assets/mousepad-1.jpg";
import mousepad2 from "@/assets/mousepad-2.jpg";
import mousepad3 from "@/assets/mousepad-3.jpg";
import mousepad4 from "@/assets/mousepad-4.jpg";
import mousepad5 from "@/assets/mousepad-5.jpg";
import mousepad6 from "@/assets/mousepad-6.jpg";

const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "RGB Gaming Pad",
    price: 3499,
    image: mousepad1,
    description: "Premium RGB mousepad with smooth glide surface",
  },
  {
    id: 2,
    name: "XL Desk Mat",
    price: 4499,
    image: mousepad2,
    description: "Extended gaming mouse pad for full desk coverage",
  },
  {
    id: 3,
    name: "Speed Edition",
    price: 2999,
    image: mousepad3,
    description: "Ultra-smooth surface for maximum speed",
  },
  {
    id: 4,
    name: "Control Pro",
    price: 3299,
    image: mousepad4,
    description: "Textured surface for precise control",
  },
  {
    id: 5,
    name: "Wireless Charging Pad",
    price: 5499,
    image: mousepad5,
    description: "Mouse pad with built-in wireless charging",
  },
  {
    id: 6,
    name: "Minimalist Leather",
    price: 3999,
    image: mousepad6,
    description: "Premium leather desk mat for professionals",
  },
];

const Index = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { toast } = useToast();

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) return;
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const handleRemove = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header cartCount={totalItems} onCartClick={() => setIsCartOpen(true)} />
      
      <main className="container mx-auto px-4 py-12">
        <section className="text-center space-y-4 mb-16">
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Premium Mousepads
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Elevate your gaming and productivity with our professional-grade mousepads
          </p>
        </section>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRODUCTS.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </main>

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemove={handleRemove}
      />
    </div>
  );
};

export default Index;
