import { Search } from "lucide-react"

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  className?: string
}

export function SearchBar({ value, onChange, className }: SearchBarProps) {
  return (
    <div className={`glass-panel flex items-center px-6 h-[48px] rounded-full ${className || ""}`}>
      <Search size={20} className="mr-3 text-[var(--text-muted)] shrink-0" />
      <input
        type="text"
        placeholder="Search products..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-transparent border-none outline-none text-[var(--text-main)] text-base w-full placeholder:text-[var(--text-muted)] h-full"
      />
    </div>
  )
}
