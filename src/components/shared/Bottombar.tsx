import { bottombarLinks } from '@/constants';
import React from 'react'
import { useLocation, Link } from 'react-router-dom';

const Bottombar = () => {
  const { pathname } = useLocation();

  return (
    <section className='bottom-bar'>
      {bottombarLinks.map((link) => {
              const isDisplayed = pathname === link.route;
              // isDisplayed is a variable to check which route 
              // currently is displayed in the page
              return (
                  <Link
                      to={link.route}
                      key={link.label} className={`bottombar-link ${ 
                        isDisplayed && 'bg-primary-500'}`}
                >
                  <img
                    src={link.imgURL}
                    alt={link.label}
                    width={30}
                    className={`${isDisplayed && 'invert-white'}`}
                    />
                    <p className="tiny-medium text-light-2">{link.label}</p>
                  </Link>
              )
                })};
    </section>
  )}

export default Bottombar;