import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CategorySelect } from '@/components/CategorySelect';

describe('CategorySelect Component', () => {
  it('renders the select trigger with placeholder text', () => {
    const onChange = vi.fn();
    render(<CategorySelect value="" onChange={onChange} />);

    expect(screen.getByText('All Categories')).toBeInTheDocument();
  });

  it('displays the selected value', () => {
    const onChange = vi.fn();
    render(<CategorySelect value="electronics" onChange={onChange} />);

    expect(screen.getByDisplayValue('electronics')).toBeInTheDocument();
  });

  it('calls onChange when a category is selected', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();

    render(<CategorySelect value="" onChange={onChange} />);

    const trigger = screen.getByRole('combobox');
    await user.click(trigger);

    const clothingOption = await screen.findByText('Clothing');
    await user.click(clothingOption);

    expect(onChange).toHaveBeenCalledWith('clothing');
  });

  it('renders all category options', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();

    render(<CategorySelect value="" onChange={onChange} />);

    const trigger = screen.getByRole('combobox');
    await user.click(trigger);

    // Check for all category options - "All Categories" appears twice (trigger + dropdown)
    expect(screen.getAllByText('All Categories').length).toBeGreaterThanOrEqual(
      2,
    );
    expect(screen.getByText('Electronics')).toBeInTheDocument();
    expect(screen.getByText('Clothing')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Outdoors')).toBeInTheDocument();
  });

  it('handles empty string value correctly', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();

    render(<CategorySelect value="" onChange={onChange} />);

    const trigger = screen.getByRole('combobox');
    await user.click(trigger);

    // Find and click the "All Categories" option in the dropdown
    const allCategoriesOptions = await screen.findAllByText('All Categories');
    const dropdownOption = allCategoriesOptions[1]; // The second one is in the dropdown menu
    await user.click(dropdownOption);

    expect(onChange).toHaveBeenCalledWith('');
  });

  it('applies custom className', () => {
    const onChange = vi.fn();
    const customClass = 'custom-test-class';

    render(
      <CategorySelect value="" onChange={onChange} className={customClass} />,
    );

    const trigger = screen.getByRole('combobox');
    expect(trigger).toHaveClass(customClass);
  });

  it('updates when value prop changes', () => {
    const onChange = vi.fn();
    const { rerender } = render(
      <CategorySelect value="electronics" onChange={onChange} />,
    );

    expect(screen.getByDisplayValue('electronics')).toBeInTheDocument();

    rerender(<CategorySelect value="home" onChange={onChange} />);

    expect(screen.getByDisplayValue('home')).toBeInTheDocument();
  });

  it('handles all category options correctly', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();

    const categories = ['', 'electronics', 'clothing', 'home', 'outdoors'];

    for (const category of categories) {
      const { unmount } = render(
        <CategorySelect value={category} onChange={onChange} />,
      );

      const trigger = screen.getByRole('combobox');
      await user.click(trigger);

      await waitFor(() => {
        const options = screen.getAllByRole('option');
        expect(options.length).toBe(5);
      });

      unmount();
    }
  });

  it('does not call onChange on mount', () => {
    const onChange = vi.fn();
    render(<CategorySelect value="" onChange={onChange} />);

    expect(onChange).not.toHaveBeenCalled();
  });

  it('maintains selection state after closing and reopening', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();

    render(<CategorySelect value="clothing" onChange={onChange} />);

    const trigger = screen.getByRole('combobox');

    // First open
    await user.click(trigger);
    expect(screen.getByText('Clothing')).toBeInTheDocument();

    // Close by clicking outside
    await user.keyboard('{Escape}');

    // Reopen
    await user.click(trigger);
    expect(screen.getByText('Clothing')).toBeInTheDocument();
  });
});
