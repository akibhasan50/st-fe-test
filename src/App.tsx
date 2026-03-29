import { useState } from "react"
import { Header } from "@/components/header"
import { SearchBar } from "@/components/search-bar"
import { CategorySelect } from "@/components/category-select"
import { ProductGrid } from "@/components/product-grid"

function App() {
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("")

  return (
    <div className="min-h-screen p-8 bg-[var(--background)] text-[var(--text-main)]">
      <Header
        title="Premium Products"
        description="Browse our collection. Handling the flaky API gracefully is part of the challenge."
      />

      <section className="flex gap-4 mb-8">
        <SearchBar
          value={search}
          onChange={setSearch}
          className="flex-1 max-w-md"
        />

        <CategorySelect
          value={category}
          onChange={setCategory}
        />
      </section>

      <main>
        <ProductGrid products={[]} isLoading={false} />
      </main>
    </div>
  )
}

export default App
