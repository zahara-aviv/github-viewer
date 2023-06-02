/**
 * File Name: SearchBar.tsx
 * Author: Zahara
 * Date: 06/2023
 * Description: Search Bar component for display
 */
import { ChangeEvent, FormEvent } from 'react';

function SearchBar(props: {
  text: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}) {
  const { text, onChange, onSubmit } = props;
  return (
    <form className='w-fit p-6 flex items-center' onSubmit={onSubmit}>
      <label htmlFor='voice-search' className='sr-only'>
        Search
      </label>
      <div className='relative w-full'>
        <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
          <svg
            aria-hidden='true'
            className='w-5 h-5 text-gray-500 dark:text-gray-400'
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fillRule='evenodd'
              d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
              clipRule='evenodd'
            ></path>
          </svg>
        </div>
        <input
          type='text'
          id='voice-search'
          className='bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          placeholder='Search for GitHub Repos...'
          onChange={onChange}
          value={text}
          required
        />
      </div>
    </form>
  );
}

export default SearchBar;
