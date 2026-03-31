import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchBar } from '@/components/SearchBar';
import { useState } from 'react';

describe('SearchBar Component', () => {
  const renderSearchBarWithControl = (initialValue = '') => {
    const onChange = vi.fn();
    const user = userEvent.setup();

    const Wrapper = () => {
      const [value, setValue] = useState(initialValue);

      const handleChange = (newValue: string) => {
        setValue(newValue);
        onChange(newValue);
      };

      return <SearchBar value={value} onChange={handleChange} />;
    };

    const utils = render(<Wrapper />);

    return {
      onChange,
      user,
      ...utils,
    };
  };

  it('renders the search input with placeholder text', () => {
    const onChange = vi.fn();
    render(<SearchBar value="" onChange={onChange} />);

    expect(
      screen.getByPlaceholderText('Search products...'),
    ).toBeInTheDocument();
  });

  it('renders the search icon', () => {
    const onChange = vi.fn();
    const { container } = render(<SearchBar value="" onChange={onChange} />);

    const searchIcon = container.querySelector('svg');
    expect(searchIcon).toBeInTheDocument();
    expect(searchIcon).toHaveClass('lucide-search');
  });

  it('displays the current value', () => {
    const onChange = vi.fn();
    render(<SearchBar value="laptop" onChange={onChange} />);

    expect(screen.getByDisplayValue('laptop')).toBeInTheDocument();
  });

  it('calls onChange when user types', async () => {
    const { onChange, user } = renderSearchBarWithControl('');

    const input = screen.getByPlaceholderText('Search products...');
    await user.type(input, 'phone');

    expect(onChange).toHaveBeenCalledTimes(5); // Called once for each character
    // Check that onChange was called with each character progressively
    expect(onChange).toHaveBeenNthCalledWith(1, 'p');
    expect(onChange).toHaveBeenNthCalledWith(2, 'ph');
    expect(onChange).toHaveBeenNthCalledWith(3, 'pho');
    expect(onChange).toHaveBeenNthCalledWith(4, 'phon');
    expect(onChange).toHaveBeenNthCalledWith(5, 'phone');
  });

  it('updates value when prop changes', () => {
    const onChange = vi.fn();
    const { rerender } = render(
      <SearchBar value="electronics" onChange={onChange} />,
    );

    expect(screen.getByDisplayValue('electronics')).toBeInTheDocument();

    rerender(<SearchBar value="clothing" onChange={onChange} />);

    expect(screen.getByDisplayValue('clothing')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const onChange = vi.fn();
    const customClass = 'custom-search-class';

    const { container } = render(
      <SearchBar value="" onChange={onChange} className={customClass} />,
    );

    const searchContainer = container.querySelector('div');
    expect(searchContainer).toHaveClass(customClass);
  });

  it('handles empty string value correctly', () => {
    const onChange = vi.fn();
    render(<SearchBar value="" onChange={onChange} />);

    const input = screen.getByPlaceholderText('Search products...');
    expect(input).toHaveValue('');
  });

  it('does not call onChange on mount', () => {
    const onChange = vi.fn();
    render(<SearchBar value="" onChange={onChange} />);

    expect(onChange).not.toHaveBeenCalled();
  });

  it('clears input and calls onChange with empty string', async () => {
    const { onChange, user } = renderSearchBarWithControl('laptop');

    const input = screen.getByDisplayValue('laptop');
    await user.clear(input);

    expect(onChange).toHaveBeenLastCalledWith('');
  });

  it('handles special characters in search', async () => {
    const { onChange, user } = renderSearchBarWithControl('');

    const input = screen.getByPlaceholderText('Search products...');
    await user.type(input, 'phone & accessories');

    // Check that the last call includes the full string with special characters
    const lastCall = onChange.mock.calls[onChange.mock.calls.length - 1][0];
    expect(lastCall).toContain('phone');
    expect(lastCall).toContain('&');
    expect(lastCall).toContain('accessories');
  });

  it('has correct aria-label for accessibility', () => {
    const onChange = vi.fn();
    render(<SearchBar value="" onChange={onChange} />);

    const input = screen.getByLabelText('Search products');
    expect(input).toBeInTheDocument();
  });

  it('maintains focus state', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();

    render(<SearchBar value="" onChange={onChange} />);

    const input = screen.getByPlaceholderText('Search products...');
    await user.click(input);

    expect(input).toHaveFocus();
  });

  it('handles rapid successive changes', async () => {
    const { onChange, user } = renderSearchBarWithControl('');

    const input = screen.getByPlaceholderText('Search products...');
    await user.type(input, 'test');

    expect(onChange).toHaveBeenCalledTimes(4);
    // Verify it was called with each character progressively
    expect(onChange).toHaveBeenNthCalledWith(1, 't');
    expect(onChange).toHaveBeenNthCalledWith(2, 'te');
    expect(onChange).toHaveBeenNthCalledWith(3, 'tes');
    expect(onChange).toHaveBeenNthCalledWith(4, 'test');
  });

  it('has search input type', () => {
    const onChange = vi.fn();
    render(<SearchBar value="" onChange={onChange} />);

    const input = screen.getByPlaceholderText('Search products...');
    expect(input).toHaveAttribute('type', 'search');
  });

  it('applies glass-panel class to container', () => {
    const onChange = vi.fn();
    const { container } = render(<SearchBar value="" onChange={onChange} />);

    const searchContainer = container.querySelector('div');
    expect(searchContainer).toHaveClass('glass-panel');
  });
});
