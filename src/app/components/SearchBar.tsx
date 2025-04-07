import { useState, FormEvent } from 'react';

export default function DuolingoSearchBar() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  
  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Searching for:', searchTerm);
  };

  return (
    <div className="w-full mb-4">
      <form onSubmit={handleSearch} className="flex justify-center">
        <input
          type="search"
          className="w-3/4 px-4 py-3 rounded-l-full border-2 border-r-0 border-blue-400 text-gray-800 text-lg shadow-md"
          placeholder="Search for lessons..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white font-bold rounded-r-full px-6 py-3 border-2 border-blue-500 shadow-md"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </button>
      </form>
    </div>
  );
}
