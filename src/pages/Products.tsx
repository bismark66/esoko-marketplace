import React, { useState, useEffect, KeyboardEvent, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import ProductFilters from "../components/ProductFilters";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useGetAllProducts } from "../utils/api/hooks";
import { ProductDetails } from "@/types";

// Updated Product interface to match backend response
interface Product {
  id: number;
  name: string;
  description: string;
  category: string;
  price: string;
  currency: string;
  stockQuantity: number;
  imagesUrls: string[];
  isActive: boolean;
}

// Updated pagination result interface
interface PaginationResult {
  data: Product[];
  pagination: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
  };
}

export default function Products() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();
  const { dispatch } = useCart();
  const { isAuthenticated } = useAuth();
  const [notification, setNotification] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Use the hook to get products data
  const { data: productsResponse, error, isLoading } = useGetAllProducts();

  // State for processed products
  const [products, setProducts] = useState<ProductDetails[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Process products when data changes
  useEffect(() => {
    if (productsResponse) {
      // Filter products based on category and search query
      let filteredProducts = productsResponse.data;

      // Apply category filter if not "all"
      if (activeCategory !== "all") {
        filteredProducts = filteredProducts.filter(
          (product) => product.category === activeCategory
        );
      }

      // Apply search filter if search query exists
      if (searchQuery) {
        filteredProducts = filteredProducts.filter(
          (product) =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            product.category.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      // Update pagination based on filtered results
      setTotalItems(filteredProducts.length);
      setTotalPages(Math.ceil(filteredProducts.length / itemsPerPage));

      // Paginate the filtered results
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

      setProducts(paginatedProducts);
    }
  }, [productsResponse, currentPage, activeCategory, searchQuery]);

  // Get unique categories for filter
  const categories = React.useMemo(() => {
    if (!productsResponse?.data) return [];
    const uniqueCategories = new Set(
      productsResponse.data.map((product) => product.category)
    );
    return Array.from(uniqueCategories);
  }, [productsResponse]);

  const handleAddToCart = (product: ProductDetails) => {
    if (!isAuthenticated) {
      navigate("/signin", { state: { from: "/products" } });
      return;
    }

    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: product.id.toString(),
        title: product.name,
        price: product.price,
        image: product.imagesUrls[0] || "",
      },
    });

    // Show notification
    setNotification(`${product.name} added to cart!`);
    setTimeout(() => setNotification(""), 3000);
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      // Trigger search
    }
  };

  // Pagination navigation
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo(0, 0);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo(0, 0);
    }
  };

  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  // Generate array of page numbers to display
  const getPageNumbers = () => {
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    // Adjust if we're near the end
    if (endPage === totalPages) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Agricultural Products
        </h1>
        <p className="mt-2 text-gray-600">
          Browse our selection of high-quality farm products
        </p>
      </div>

      {/* Notification */}
      {notification && (
        <div className="fixed top-20 right-4 bg-green-600 text-white px-4 py-2 rounded-md shadow-lg z-50">
          {notification}
        </div>
      )}

      {/* Search and Filter Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            onKeyPress={handleKeyPress}
            placeholder="Search products, categories..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
        </div>

        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          <Filter className="w-5 h-5" />
          <span>Filters</span>
        </button>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="mb-8">
          <ProductFilters />
        </div>
      )}

      {/* Category Navigation */}
      <div className="mb-8 border-b border-gray-200">
        <div className="flex space-x-8 overflow-x-auto pb-2">
          <button
            key="all"
            onClick={() => {
              setActiveCategory("all");
              setCurrentPage(1);
            }}
            className={`py-4 px-1 font-medium text-sm border-b-2 whitespace-nowrap ${
              activeCategory === "all"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            All Products
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setActiveCategory(category);
                setCurrentPage(1);
              }}
              className={`py-4 px-1 font-medium text-sm border-b-2 whitespace-nowrap ${
                activeCategory === category
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="text-center py-12 text-red-500">
          Error loading products. Please try again later.
        </div>
      ) : (
        <>
          {/* Products Grid */}
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="group bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="aspect-w-16 aspect-h-9 h-48 relative">
                    <img
                      src={
                        product.imagesUrls[0] ||
                        "https://via.placeholder.com/300"
                      }
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-blue-600 text-white px-2 py-1 rounded-full text-xs">
                      {product.category}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3
                      onClick={() => navigate(`/product/${product.id}`)}
                      className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 cursor-pointer"
                    >
                      {product.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                      {product.description}
                    </p>

                    <div className="mt-3 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                      <div className="text-blue-600 font-medium">
                        {product.currency} {product.price}
                      </div>
                      <div className="text-sm text-gray-500">
                        Stock: {product.stockQuantity}
                      </div>
                    </div>

                    <div className="mt-4 flex flex-col sm:flex-row gap-2">
                      <button
                        onClick={() => navigate(`/product/${product.id}`)}
                        className="w-full md:w-auto bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="w-full md:w-auto bg-primary-btn text-white px-4 py-2 rounded-md hover:bg-primary-btn-hover transition-colors"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No products found matching your criteria.
              </p>
            </div>
          )}
        </>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-12 space-x-2">
          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 1 || isLoading}
            className={`p-2 rounded-md ${
              currentPage === 1 || isLoading
                ? "text-gray-300 cursor-not-allowed"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Page numbers */}
          <div className="flex space-x-2">
            {getPageNumbers().map((page) => (
              <button
                key={page}
                onClick={() => goToPage(page)}
                disabled={isLoading}
                className={`px-3 py-1 rounded-md ${
                  currentPage === page
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages || isLoading}
            className={`p-2 rounded-md ${
              currentPage === totalPages || isLoading
                ? "text-gray-300 cursor-not-allowed"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Pagination info */}
      {!isLoading && products.length > 0 && (
        <div className="mt-4 text-center text-sm text-gray-500">
          Showing {(currentPage - 1) * itemsPerPage + 1}-
          {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}{" "}
          products
        </div>
      )}
    </div>
  );
}