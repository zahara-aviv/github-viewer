/**
 * File Name: Display.tsx
 * Author: Zahara
 * Date: 06/2023
 * Description: Main Display container
 */
import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import NavBar from '@/components/NavBar';
import Tile from '@/components/Tile';
import SearchBar from '@/components/SearchBar';

function Display() {
  const [searchTerm, setSearchTerm] = useState('');
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    console.log('submitting...', searchTerm);
    e.preventDefault();
    // call API for query of results
  };
  return (
    <div>
      <NavBar
        title='GitView'
        iconType='github'
        link='https://github.com/zahara-aviv/github-viewer/tree/main'
      />
      <div className='flex w-full justify-center '>
        <SearchBar text={searchTerm} onChange={onChange} onSubmit={onSubmit} />
      </div>
      <div className='p-6 flex justify-between flex-row flex-wrap'>
        <Tile />
      </div>
    </div>
  );
}

export default Display;
