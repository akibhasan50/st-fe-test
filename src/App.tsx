import { useState, useEffect, useRef } from "react"
import { Header } from "@/components/Header"
import { SearchBar } from "@/components/SearchBar"
import { CategorySelect } from "@/components/CategorySelect"
import { ProductGrid, ProductGridSkeleton, ProductGridError } from "@/components/ProductGrid"
import { Pagination } from "@/components/Pagination"
import { useProducts } from "@/hooks/useProducts"
import { useDebounce } from "@/hooks/useDebounce"
import { useURLState } from "@/hooks/useUrlState"

function ProductListContent({ 
  debouncedSearch, 
  categoryInput, 
  page, 
  onPageChange,
  isFetching
}: {
  debouncedSearch: string
  categoryInput: string
  page: number
  onPageChange: (p: number) => void
  isFetching: boolean
}) {
  const { data, isLoading } = useProducts({
    page,
    limit: 12,
    search: debouncedSearch,
    category: categoryInput
  })

  // Show skeleton only on initial load, not on filter changes
  if (isLoading && !data) {
    return <ProductGridSkeleton />
  }

  return (
    <>
      {data && <ProductGrid data={data} isRefetching={isFetching} />}
      {data && (
        <Pagination
          currentPage={page}
          totalPages={data.totalPages}
          onPageChange={onPageChange}
        />
      )}
    </>
  )
}

function App() {
  const [searchInput, setSearchInput] = useState("")
  const [categoryInput, setCategoryInput] = useState("")
  const [page, setPage] = useState(1)
  const [isScrolled, setIsScrolled] = useState(false)
  const isInitialized = useRef(false)
  
  // Get URL state management
  const { getStateFromURL, updateURL } = useURLState((state) => {
    setSearchInput(state.search || "")
    setCategoryInput(state.category || "")
    setPage(1)
  })

  // Initialize from URL on first load (once)
  useEffect(() => {
    if (!isInitialized.current) {
      const urlState = getStateFromURL()
      setSearchInput(urlState.search || "")
      setCategoryInput(urlState.category || "")
      isInitialized.current = true
    }
  }, [])
  
  // Debounce the actual search value sent to API
  const debouncedSearch = useDebounce(searchInput, 500)

  // Reset page when filters change
  useEffect(() => {
    setPage(1)
  }, [debouncedSearch, categoryInput])

  // Track scroll position for enhanced sticky styling (with throttling)
  useEffect(() => {
    let rafId: number
    const handleScroll = () => {
      rafId = requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 50)
      })
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", handleScroll)
      cancelAnimationFrame(rafId)
    }
  }, [])

  // Update URL when search or category changes
  useEffect(() => {
    updateURL({
      search: searchInput,
      category: categoryInput,
    })
  }, [searchInput, categoryInput, updateURL])

  // Single hook call for data fetching
  const { 
    error,
    isFetching
  } = useProducts({
    page,
    limit: 12,
    search: debouncedSearch,
    category: categoryInput
  })

  // Handle search
  const handleSearch = (value: string) => {
    setSearchInput(value)
  }

  // Handle category change
  const handleCategoryChange = (value: string) => {
    setCategoryInput(value)
  }

  // Handle retry
  const handleRetry = () => {
    setPage(1)
    setSearchInput("")
    setCategoryInput("")
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
            isFetching ? "ring-2 ring-primary/30" : ""
          }`}
        />

        <CategorySelect
          value={categoryInput}
          onChange={handleCategoryChange}
          className={`transition-all duration-300 shadow-lg shadow-black/5 ${
            isFetching ? "ring-2 ring-primary/30" : ""
          }`}
        />
      </section>

      <main className={`transition-opacity duration-200 ${
        isFetching ? "opacity-50" : "opacity-100"
      }`}>
        {error ? (
          <ProductGridError error={error} onRetry={handleRetry} />
        ) : (
          <ProductListContent
            debouncedSearch={debouncedSearch}
            categoryInput={categoryInput}
            page={page}
            onPageChange={setPage}
            isFetching={isFetching}
          />
        )}
      </main>
    </div>
  )
}

export default App
