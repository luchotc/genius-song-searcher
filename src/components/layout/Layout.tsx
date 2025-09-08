import { createContext, useContext } from 'react';
import { Navbar, MainContent } from './';
import { useGeniusSearch } from '../../hooks/useGeniusSearch';
import { useRecentSearches } from '../../hooks/useRecentSearches';
import { ReactNode } from 'react';

const AppContext = createContext<{
  geniusSearch: ReturnType<typeof useGeniusSearch>;
  recentSearches: ReturnType<typeof useRecentSearches>;
} | null>(null);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within Layout');
  }
  return context;
};

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const geniusSearch = useGeniusSearch();
  const recentSearches = useRecentSearches();

  return (
    <AppContext.Provider value={{ geniusSearch, recentSearches }}>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col">
        <Navbar />

        <MainContent>
          {children}
        </MainContent>
      </div>
    </AppContext.Provider>
  );
};

export default Layout;