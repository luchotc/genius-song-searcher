import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import ArtistPage from './pages/ArtistPage';
import ArtistErrorPage from './pages/ArtistErrorPage';

/**
 * Create the router configuration
 */
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <HomePage />
      </Layout>
    ),
  },
  {
    path: "/artist/:id",
    element: (
      <Layout>
        <ArtistPage />
      </Layout>
    ),
    errorElement: (
      <Layout>
        <ArtistErrorPage />
      </Layout>
    ),
  },
]);

/**
 * Main application component with React Router
 * @returns {JSX.Element} Main app component
 */
function App() {
  return <RouterProvider router={router} />;
}

export default App;
