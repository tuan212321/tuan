import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Input, toggle } from "@nextui-org/react";
import { useTheme } from "next-themes";
import axios from 'axios';
import withRouter from '../utils/withRouter';
import { Switch } from "@nextui-org/react";
import { MoonIcon } from "../images/moonIcon";
import { SunIcon } from "../images/sunIcon";
function Menu() {
  const [categories, setCategories] = useState([]);
  const [txtKeyword, setTxtKeyword] = useState('');
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    apiGetCategories();
  }, []);

  // const setThemeHandler = (selectedTheme) => {
  //   setTheme(selectedTheme);
  // };

  const cates = categories.map((item) => (
    <li key={item._id} className="menu hover:border-b-2 border-black text-black">
      <Link to={'/product/category/' + item._id}>
        {item.name}
      </Link>
    </li>
  ));

  const btnSearchClick = (e) => {
    e.preventDefault();
    if (txtKeyword !== '') {
      // navigate logic here
    } else {
      // Keyword is empty, don't navigate
    }
  };

  const apiGetCategories = () => {
    axios.get('/api/customer/categories').then((res) => {
      const result = res.data;
      setCategories(result);
    });
  };
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };
  if (!mounted) return null;

  return (
    <div className="flex flex-row items-center justify-between py-2 w-5/6 mx-auto">
      <div className="float-left">
        <ul className="menu">
          <li className="menu font-bold">
            <Link to='/'>Home</Link>
          </li>
          {cates}
        </ul>
      </div>
      <div className="">
        <form className='search flex flex-row items-center gap-3'>
          <Input label="Search" type="search" className='h-8 self-start' variant='bordered' value={txtKeyword} onChange={(e) => setTxtKeyword(e.target.value)} />
          <button type="submit" className="bg-slate-950 font-bold text-white text-sm px-4 pt-3 rounded-full flex flex-row h-10" value='SEARCH' onClick={btnSearchClick}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 inline-block align-top mr-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            SEARCH
          </button>
        </form>
      </div>
      <div>
        {/* The current theme is: {theme}
        <button onClick={() => setThemeHandler('light')}>Light Mode</button>
        <button onClick={() => setThemeHandler('dark')}>Dark Mode</button> */}
        <Switch
          defaultSelected
          size="lg"
          color="secondary"
          onChange={toggleTheme}
          thumbIcon={({ isSelected, className }) =>
            isSelected ? (
              <SunIcon className={className} />
            ) : (
              <MoonIcon className={className} />
            )
          }
        >
        </Switch>
      </div>
    </div>
  );
}

export default withRouter(Menu);
