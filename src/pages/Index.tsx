import { useState } from "react";
import { Header } from "@/components/Header";
import { ProductCard, Product } from "@/components/ProductCard";
import { Cart, CartItem } from "@/components/Cart";
import { useToast } from "@/hooks/use-toast";

const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "RGB Gaming Pad",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=500&h=500&fit=crop",
    description: "Premium RGB mousepad with smooth glide surface",
  },
  {
    id: 2,
    name: "XL Desk Mat",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1625252252804-c8110ee3d906?w=500&h=500&fit=crop",
    description: "Extended gaming mouse pad for full desk coverage",
  },
  {
    id: 3,
    name: "Speed Edition",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=500&h=500&fit=crop",
    description: "Ultra-smooth surface for maximum speed",
  },
  {
    id: 4,
    name: "Control Pro",
    price: 27.99,
    image: "https://images.unsplash.com/photo-1593640495253-23196b27a87f?w=500&h=500&fit=crop",
    description: "Textured surface for precise control",
  },
  {
    id: 5,
    name: "Wireless Charging Pad",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop",
    description: "Mouse pad with built-in wireless charging",
  },
  {
    id: 6,
    name: "Minimalist Leather",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1600087626014-e652e18bbff2?w=500&h=500&fit=crop",
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
