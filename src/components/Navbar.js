function Navbar() {
  return (
    <nav className="bg-black text-white py-4 px-6 w-full fixed top-0 left-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <a href="/" className="text-xl font-bold">
          Food App
        </a>
        <div>
          <a href="/" className="mx-4 text-lg hover:text-yellow-400">
            Home
          </a>
          <a href="/favorite" className="mx-4 text-lg hover:text-yellow-400">
            Favorite
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
