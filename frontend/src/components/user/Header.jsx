import SearchBar from './SearchBar';

function Header({ searchQuery, onSearchChange }) {
  return (
    <header className="explore-header">
      <div className="explore-header-inner">

        <div className="explore-header-brand">
          <div className="explore-header-logo">
            <h1 className="explore-header-title">
              Sarees By<span> Kalyani</span>
            </h1>
          </div>
          <p className="explore-header-tagline">
            The Saree Catalog
          </p>
        </div>

        <div className="explore-header-ornament" aria-hidden="true">
          ❧
        </div>

        <div className="explore-header-search">
          <SearchBar value={searchQuery} onChange={onSearchChange} />
        </div>

      </div>
    </header>
  );
}

export default Header;