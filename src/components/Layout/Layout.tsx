import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useFavorites } from '../../hooks/useFavorites';

export const Layout = () => {
  const { favorites } = useFavorites();
  const navigate = useNavigate();

  // Handler para el logo: navega a /characters sin query params
  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault(); // Prevenir navegación por defecto del Link
    navigate('/characters', { replace: true }); // Navegar sin historial y sin params
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo - Click resetea filtros y página */}
            <a
              href="/characters"
              onClick={handleLogoClick}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer"
            >
              <span className="text-2xl font-bold text-blue-600">
                Rick & Morty Explorer
              </span>
            </a>

            {/* Navigation links */}
            <div className="flex gap-6">
              <NavLink
                to="/characters"
                className={({ isActive }) =>
                  `font-medium transition-colors py-2 ${
                    isActive
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-600 hover:text-blue-600'
                  }`
                }
              >
                Personajes
              </NavLink>
              
              <NavLink
                to="/favorites"
                className={({ isActive }) =>
                  `font-medium transition-colors flex items-center gap-2 py-2 ${
                    isActive
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-600 hover:text-blue-600'
                  }`
                }
              >
                Favoritos
                {favorites.length > 0 && (
                  <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full min-w-[24px] text-center">
                    {favorites.length}
                  </span>
                )}
              </NavLink>
            </div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-2">
            © 2026 Rick & Morty Explorer - Code Challenge Pink Technologies
          </p>
          <p className="text-sm text-gray-400">
            Datos de{' '}
            <a
              href="https://rickandmortyapi.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              rickandmortyapi.com
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};