import { useState, useEffect, useTransition } from "react"
import { Header } from "@/components/header"
import { SearchBar } from "@/components/search-bar"
import { CategorySelect } from "@/components/category-select"
import { ProductGrid } from "@/components/product-grid"
import { Pagination } from "@/components/pagination"
import { useProducts } from "@/hooks/use-products"
import { useDebounce } from "@/hooks/use-debounce"

function App() {
  const [searchInput, setSearchInput] = useState("")
  const [categoryInput, setCategoryInput] = useState("")
  const [page, setPage] = useState(1)
  const [isScrolled, setIsScrolled] = useState(false)
  
  // useTransition for non-blocking async updates
  const [isPending, startTransition] = useTransition()
  
  // Debounce the actual search value sent to API
  const debouncedSearch = useDebounce(searchInput, 500)

  // Reset page when filters change
  useEffect(() => {
    setPage(1)
  }, [debouncedSearch, categoryInput])

  // Track scroll position for enhanced sticky styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const { 
    data, 
    isLoading, 
    error, 
    refetch,
    isFetching
  } = useProducts({
    page,
    limit: 12,
    search: debouncedSearch,
    category: categoryInput
  })

  // Handle search with non-blocking transition
  const handleSearch = (value: string) => {
    startTransition(() => {
      setSearchInput(value)
    })
  }

  // Handle category change with non-blocking transition
  const handleCategoryChange = (value: string) => {
    startTransition(() => {
      setCategoryInput(value)
    })
  }

  // Handle retry with transition
  const handleRetry = () => {
    startTransition(() => {
      refetch()
    })
  }

  return (
    <div className="min-h-screen p-8 bg-[var(--background)] text-[var(--text-main)]">
      <Header
        title="Premium Products"
        description="Browse our collection. Handling the flaky API gracefully is part of the challenge."
      />

      <section className={`
        flex flex-col sm:flex-row gap-4 mb-8 sticky top-0 z-10
        transition-all duration-300 ease-out
        ${isScrolled 
          ? "bg-white/40 dark:bg-slate-950/60 backdrop-blur-lg rounded-2xl p-4 shadow-2xl shadow-black/10 border border-white/20" 
          : "p-0 rounded-none bg-transparent shadow-none border-none"
        }
      `}>
        <SearchBar
          value={searchInput}
          onChange={handleSearch}
          className={`flex-1 max-w-md shadow-lg shadow-black/5 transition-all duration-300 ${
            (isPending || isFetching) ? "ring-2 ring-primary/30" : ""
          }`}
        />

        <CategorySelect
          value={categoryInput}
          onChange={handleCategoryChange}
          className={`transition-all duration-300 shadow-lg shadow-black/5 ${
            (isPending || isFetching) ? "ring-2 ring-primary/30" : ""
          }`}
        />
      </section>

      <main className={`transition-opacity duration-200 ${
        isFetching ? "opacity-50" : "opacity-100"
      }`}>
        <ProductGrid 
          products={data?.data} 
          isLoading={isLoading} 
          error={error as Error}
          onRetry={handleRetry}
        />
        
        {data && (
          <Pagination
            currentPage={page}
            totalPages={data.totalPages}
            onPageChange={setPage}
          />
        )}
      </main>
    </div>
  )
}

export default App
