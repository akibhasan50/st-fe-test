import { useEffect } from "react";

interface UseURLStateOptions {
  search?: string;
  category?: string;
}

export function useURLState(
  onStateChange: (state: UseURLStateOptions) => void
) {
  // Get initial state from URL - React 19 compiler optimizes this automatically
  const getStateFromURL = (): UseURLStateOptions => {
    if (typeof window === "undefined") return {};
    
    const params = new URLSearchParams(window.location.search);
    return {
      search: params.get("search") || "",
      category: params.get("category") || "",
    };
  };

  // Update URL without page reload
  const updateURL = (state: UseURLStateOptions) => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams();
    
    if (state.search) {
      params.set("search", state.search);
    }
    if (state.category) {
      params.set("category", state.category);
    }

    const queryString = params.toString();
    const newURL = queryString 
      ? `${window.location.pathname}?${queryString}`
      : window.location.pathname;

    window.history.replaceState(null, "", newURL);
  };

  // Listen for browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      onStateChange(getStateFromURL());
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [onStateChange]);

  return {
    getStateFromURL,
    updateURL,
  };
}