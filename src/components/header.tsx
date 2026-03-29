interface HeaderProps {
  title: string
  description: string
}

export function Header({ title, description }: HeaderProps) {
  return (
    <header className="glass-panel p-8 mb-8">
      <h1 className="text-3xl font-semibold mb-2 text-[var(--text-main)]">
        {title}
      </h1>
      <p className="text-[var(--text-muted)]">
        {description}
      </p>
    </header>
  )
}
