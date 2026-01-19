// src\pages\Collections.tsx
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";
import PageHero from "@/components/shared/PageHero";
import CollectionFilters, {
  FilterState,
} from "@/components/shared/CollectionFilters";
import ContactFormSection from "@/components/home/ContactFormSection";
import { motion } from "framer-motion";
import { collections, products, categories } from "@/data/products";
import { Link, useSearchParams } from "react-router-dom";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";

export default function Collections() {
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get("category");

  const [filters, setFilters] = useState<FilterState>({
    style: [],
    deliveryTime: [],
    budget: "",
    language: [],
    religion: [],
    region: [],
    subOccasion: "",
    sortBy: "best-selling",
  });

  const filteredCollections = categoryFilter
    ? collections.filter((c) => c.category === categoryFilter)
    : collections;

  // Get products for filtered collections and apply additional filters
  const filteredProducts = useMemo(() => {
    let result = products.filter((p) => {
      // Filter by category if specified
      if (categoryFilter && p.category !== categoryFilter) return false;

      // Apply style filter
      if (
        filters.style.length > 0 &&
        !filters.style.some((s) => p.styles.includes(s as any))
      )
        return false;

      // Apply language filter
      if (
        filters.language.length > 0 &&
        !filters.language.some((l) => p.languages.includes(l as any))
      )
        return false;

      // Apply religion filter
      if (
        filters.religion.length > 0 &&
        !filters.religion.some((r) => p.religion?.includes(r as any))
      )
        return false;

      // Apply region filter
      if (
        filters.region.length > 0 &&
        !filters.region.some((reg) => p.region?.includes(reg as any))
      )
        return false;

      // Apply subOccasion filter (single)
      if (
        filters.subOccasion &&
        !p.subOccasion?.includes(filters.subOccasion)
      )
        return false;

      // Apply budget filter
      if (filters.budget) {
        if (filters.budget === "under-1000" && p.priceFrom >= 1000)
          return false;
        if (
          filters.budget === "1000-3000" &&
          (p.priceFrom < 1000 || p.priceFrom > 3000)
        )
          return false;
        if (filters.budget === "above-3000" && p.priceFrom <= 3000)
          return false;
      }

      return true;
    });

    // Sort
    switch (filters.sortBy) {
      case "newest":
        result = result
          .filter((p) => p.isNew)
          .concat(result.filter((p) => !p.isNew));
        break;
      case "price-low":
        result = result.sort((a, b) => a.priceFrom - b.priceFrom);
        break;
      case "price-high":
        result = result.sort((a, b) => b.priceFrom - a.priceFrom);
        break;
      case "best-selling":
      default:
        result = result
          .filter((p) => p.bestSeller)
          .concat(result.filter((p) => !p.bestSeller));
        break;
    }

    return result;
  }, [categoryFilter, filters]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <PageHero
          title="Our Collections"
          subtitle="Explore our curated collections of premium digital invitations for every celebration"
          backgroundImage="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1920&q=80"
        />

        <div className="container-custom section-padding px-4">
          {/* Category tabs */}
          <div className="flex justify-center gap-2 sm:gap-4 mb-8 flex-wrap">
            <Link to="/collections">
              <Button
                variant={!categoryFilter ? "default" : "outline"}
                size="sm"
                className="text-xs sm:text-sm"
              >
                All
              </Button>
            </Link>
            {categories.map((cat) => (
              <Link key={cat.id} to={`/collections?category=${cat.slug}`}>
                <Button
                  variant={categoryFilter === cat.slug ? "default" : "outline"}
                  size="sm"
                  className="text-xs sm:text-sm"
                >
                  {cat.title}
                </Button>
              </Link>
            ))}
          </div>

          {/* Filters */}
          <CollectionFilters
            onFilterChange={setFilters}
            currentFilters={filters}
            collectionSlug={categoryFilter || ""}
          />

          {/* Collections grid */}
          <div className="mb-12">
            <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-6">
              Browse Collections
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {filteredCollections.map((collection, index) => (
                <motion.div
                  key={collection.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={`/collections/${collection.slug}`}
                    className="group block card-luxury rounded-xl overflow-hidden"
                  >
                    <div className="aspect-[4/3] relative">
                      <img
                        src={collection.thumbnail}
                        alt={collection.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3">
                        <h3 className="font-heading text-base md:text-lg text-background mb-0.5">
                          {collection.title}
                        </h3>
                        <p className="text-background/70 text-xs">
                          {collection.productCount} templates
                        </p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Products grid */}
          <div>
            <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-6">
              All Templates ({filteredProducts.length})
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                >
                  <Link
                    to={`/product/${product.slug}`}
                    className="group block card-luxury rounded-xl overflow-hidden"
                  >
                    <div className="aspect-[4/5] relative">
                      <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-2 left-2 flex flex-wrap gap-1">
                        {product.bestSeller && (
                          <span className="bg-primary text-primary-foreground text-[10px] font-semibold px-2 py-0.5 rounded-full">
                            Best Seller
                          </span>
                        )}
                        {product.isNew && (
                          <span className="bg-accent text-accent-foreground text-[10px] font-semibold px-2 py-0.5 rounded-full">
                            New
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="p-3 md:p-4">
                      <h3 className="font-semibold text-sm md:text-base text-foreground group-hover:text-primary transition-colors line-clamp-1">
                        {product.title}
                      </h3>
                      <p className="text-primary font-bold text-sm md:text-base">
                        Starting at ₹{product.priceFrom.toLocaleString()}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {product.deliveryTime} delivery
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <ContactFormSection variant="full" />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}