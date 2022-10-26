import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch } from 'react-icons/fi';


const Searchbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${searchTerm}`);
  };

  return (
    <form
      className="p-2 text-gray-400 focus-within:text-gray-600"
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <label htmlFor="search-field" className="sr-only">
        Search all
      </label>
      <div className="flex flex-row justify-start items-center">
        <FiSearch aria-hidden="true" className="w-5 h-5 ml-4" />
        <input
          type="search"
          name="search-field"
          autoComplete="off"
          id="search-field"
          className="flex-1 bg-transparent border-none outline-none placeholder-gray-500 text-base text-white p-4"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </form>
  )
};

export default Searchbar;
