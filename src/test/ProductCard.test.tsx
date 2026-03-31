import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProductCard } from '@/components/ProductGrid/ProductCard';
import type { Product } from '@/types/product';

describe('ProductCard Component', () => {
  // Mock product that matches the shape used by the component
  const mockProduct: Product = {
    imageUrl: 'https://picsum.photos/id/1015/600/600',
    name: 'Wireless Headphones',
    category: 'Audio',
    description:
      'Premium noise-cancelling wireless headphones with 40-hour battery life.',
    price: 2999,
  } as Product;

  it('renders the product card', () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText('Wireless Headphones')).toBeInTheDocument();
  });

  it('renders product image with correct src and alt', () => {
    render(<ProductCard product={mockProduct} />);

    const image = screen.getByAltText('Wireless Headphones');

    expect(image).toHaveAttribute('src', mockProduct.imageUrl);
    expect(image).toHaveAttribute('alt', mockProduct.name);
  });

  it('uses above-the-fold optimizations (eager loading) when index < 4', () => {
    render(<ProductCard product={mockProduct} index={0} />);

    const image = screen.getByAltText(mockProduct.name);

    expect(image).toHaveAttribute('loading', 'eager');
    expect(image).toHaveAttribute('decoding', 'sync');
    expect(image).toHaveAttribute('fetchPriority', 'high');
  });

  it('uses below-the-fold optimizations (lazy loading) when index >= 4', () => {
    render(<ProductCard product={mockProduct} index={5} />);

    const image = screen.getByAltText(mockProduct.name);

    expect(image).toHaveAttribute('loading', 'lazy');
    expect(image).toHaveAttribute('decoding', 'async');
    expect(image).toHaveAttribute('fetchPriority', 'auto');
  });

  it('defaults to above-the-fold optimizations when index is not provided', () => {
    render(<ProductCard product={mockProduct} />);

    const image = screen.getByAltText(mockProduct.name);

    expect(image).toHaveAttribute('loading', 'eager');
    expect(image).toHaveAttribute('decoding', 'sync');
    expect(image).toHaveAttribute('fetchPriority', 'high');
  });

  it('displays the category', () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText('Audio')).toBeInTheDocument();
  });

  it('displays the product name with title attribute for accessibility', () => {
    render(<ProductCard product={mockProduct} />);

    const nameElement = screen.getByText('Wireless Headphones');

    expect(nameElement).toHaveAttribute('title', mockProduct.name);
    expect(nameElement.tagName.toLowerCase()).toBe('h3');
    expect(nameElement).toHaveClass('line-clamp-2');
  });

  it('displays the description with title attribute for accessibility', () => {
    render(<ProductCard product={mockProduct} />);

    const descriptionElement = screen.getByText(mockProduct.description);

    expect(descriptionElement).toHaveAttribute(
      'title',
      mockProduct.description,
    );
    expect(descriptionElement).toHaveClass('line-clamp-2');
  });

  it('displays the formatted price with Taka symbol', () => {
    render(<ProductCard product={mockProduct} />);

    // 2999.toLocaleString() → "2,999"
    expect(screen.getByText('৳ 2,999')).toBeInTheDocument();
  });

  it('applies hover scale effect and transition to the image', () => {
    render(<ProductCard product={mockProduct} />);

    const image = screen.getByAltText(mockProduct.name);

    expect(image).toHaveClass('hover:scale-105');
    expect(image).toHaveClass('transition-transform');
    expect(image).toHaveClass('duration-300');
  });

  it('image container maintains square aspect ratio (padding-bottom: 100%)', () => {
    const { container } = render(<ProductCard product={mockProduct} />);

    // The first relative div inside the card is the image container
    const imageContainer = container.querySelector(
      'div[style*="padding-bottom"]',
    ) as HTMLElement;

    expect(imageContainer).toBeInTheDocument();
    expect(imageContainer.style.paddingBottom).toBe('100%');
  });

  it('applies correct base card styling', () => {
    const { container } = render(<ProductCard product={mockProduct} />);

    const card = container.querySelector('div'); // outermost Card element

    expect(card).toHaveClass('overflow-hidden');
    expect(card).toHaveClass('border-none');
    expect(card).toHaveClass('shadow-sm');
    expect(card).toHaveClass('rounded-card');
    expect(card).toHaveClass('ring-0');
  });

  it('renders the full product content structure', () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText(mockProduct.category)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.description)).toBeInTheDocument();
    expect(screen.getByText('৳ 2,999')).toBeInTheDocument();
  });
});
