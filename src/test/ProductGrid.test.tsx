import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProductGrid } from '@/components/ProductGrid';
import type { Product, PaginatedResponse } from '@/types/product';

describe('ProductGrid Component', () => {
  const createMockProduct = (id: string, name: string): Product =>
    ({
      id,
      name,
      category: 'Electronics',
      description: 'Test product description',
      imageUrl: 'https://picsum.photos/id/1015/600/600',
      price: 999,
    }) as Product;

  const mockProducts = Array.from({ length: 5 }, (_, i) =>
    createMockProduct(`product-${i + 1}`, `Product ${i + 1}`),
  );

  // Full PaginatedResponse shape (required by your type)
  const emptyData: PaginatedResponse<Product> = {
    data: [],
    total: 0,
    page: 1,
    limit: 20,
    totalPages: 0,
  };

  const populatedData: PaginatedResponse<Product> = {
    data: mockProducts,
    total: mockProducts.length,
    page: 1,
    limit: 20,
    totalPages: 1,
  };

  it('renders empty state when there are no products', () => {
    render(<ProductGrid data={emptyData} />);

    expect(screen.getByText('No products found')).toBeInTheDocument();
    expect(
      screen.getByText('Try adjusting your search or category filters.'),
    ).toBeInTheDocument();
  });

  it('renders empty state with correct styling', () => {
    const { container } = render(<ProductGrid data={emptyData} />);

    const emptyContainer = container.querySelector('.border-dashed');
    expect(emptyContainer).toBeInTheDocument();
    expect(emptyContainer).toHaveClass('border-[var(--border)]');
    expect(emptyContainer).toHaveClass('rounded-[16px]');
  });

  it('renders the product grid when products are available', () => {
    render(<ProductGrid data={populatedData} />);

    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 5')).toBeInTheDocument();
  });

  it('renders the correct number of ProductCard components', () => {
    render(<ProductGrid data={populatedData} />);

    const cards = screen.getAllByText(/Product \d+/);
    expect(cards).toHaveLength(5);
  });

  it('passes the correct index to each ProductCard', () => {
    render(<ProductGrid data={populatedData} />);

    const images = screen.getAllByRole('img');

    expect(images[0]).toHaveAttribute('loading', 'eager');
    expect(images[1]).toHaveAttribute('loading', 'eager');
    expect(images[2]).toHaveAttribute('loading', 'eager');
    expect(images[3]).toHaveAttribute('loading', 'eager');
    expect(images[4]).toHaveAttribute('loading', 'lazy');
  });

  it('applies correct grid layout classes', () => {
    const { container } = render(<ProductGrid data={populatedData} />);

    const grid = container.querySelector('.grid');
    expect(grid).toBeInTheDocument();
    expect(grid).toHaveClass('grid-cols-1');
    expect(grid).toHaveClass('sm:grid-cols-2');
    expect(grid).toHaveClass('lg:grid-cols-3');
    expect(grid).toHaveClass('xl:grid-cols-4');
    expect(grid).toHaveClass('gap-6');
    expect(grid).toHaveClass('animate-in');
    expect(grid).toHaveClass('fade-in');
    expect(grid).toHaveClass('duration-500');
  });

  it('renders ShimmerOverlay when isRefetching is true', () => {
    render(<ProductGrid data={populatedData} isRefetching={true} />);

    // Real ShimmerOverlay renders the message
    expect(screen.getByText('Updating results...')).toBeInTheDocument();
  });

  it('does not render ShimmerOverlay when isRefetching is false (default)', () => {
    render(<ProductGrid data={populatedData} />);

    expect(screen.queryByText('Updating results...')).not.toBeInTheDocument();
  });

  it('does not render ShimmerOverlay when data is empty', () => {
    render(<ProductGrid data={emptyData} isRefetching={true} />);

    expect(screen.getByText('No products found')).toBeInTheDocument();
    expect(screen.queryByText('Updating results...')).not.toBeInTheDocument();
  });
});
