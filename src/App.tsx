import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { SearchBar } from "@/components/search-bar"
import { CategorySelect } from "@/components/category-select"
import { ProductGrid } from "@/components/product-grid"
import { Pagination } from "@/components/pagination"
import { useProducts } from "@/hooks/use-products"
import { useDebounce } from "@/hooks/use-debounce"

function App() {
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("")
  const [page, setPage] = useState(1)
  const [isScrolled, setIsScrolled] = useState(false)
  
  const debouncedSearch = useDebounce(search, 500)

  // Reset page when filters change
  useEffect(() => {
    setPage(1)
  }, [debouncedSearch, category])

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
    isPlaceholderData 
  } = useProducts({
    page,
    limit: 12,
    search: debouncedSearch,
    category
  })

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
          value={search}
          onChange={setSearch}
          className="flex-1 max-w-md shadow-lg shadow-black/5 transition-all duration-300"
        />

        <CategorySelect
          value={category}
          onChange={setCategory}
          className="transition-all duration-300 shadow-lg shadow-black/5"
        />
      </section>

      <main className={isPlaceholderData ? "opacity-50 transition-opacity" : "transition-opacity"}>
        <ProductGrid 
          products={data?.data} 
          isLoading={isLoading} 
          error={error as Error}
          onRetry={() => refetch()}
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
