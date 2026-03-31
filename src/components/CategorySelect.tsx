import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

interface CategorySelectProps {
  value: string
  onChange: (value: string) => void
  className?: string
}

const categories = [
  { value: "", label: "All Categories" },
  { value: "electronics", label: "Electronics" },
  { value: "clothing", label: "Clothing" },
  { value: "home", label: "Home" },
  { value: "outdoors", label: "Outdoors" },
]

export function CategorySelect({ value, onChange, className }: CategorySelectProps) {
  return (
    <Select value={value} onValueChange={(val) => onChange(val || "")}>
      <SelectTrigger 
        className={cn(
          "glass-panel px-6 h-[48px] w-full sm:w-[220px] text-[var(--text-main)] text-muted-foreground rounded-full !ring-0 focus:!ring-0 border-[var(--border)] flex justify-between items-center",
          className
        )}
      >
        <SelectValue placeholder="All Categories" />
      </SelectTrigger>
      <SelectContent className="bg-white/80 backdrop-blur-xl border border-[var(--border)] rounded-2xl shadow-xl z-50">
        {categories.map((category) => (
          <SelectItem 
            key={category.value} 
            value={category.value}
            className="focus:bg-[var(--surface-hover)] focus:text-[var(--text-main)] cursor-pointer rounded-lg px-4 py-2 mx-1 my-0.5 transition-colors"
          >
            {category.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
