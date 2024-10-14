import React, { useState, useEffect, useContext } from 'react';

export function Favorite() {
    const [fav, setFav] = useState("unfav");
    const [heart, setHeart] = useState('♡');

    const handleClick = () => {
      setFav(fav === 'fav' ? "unfav" : 'fav');
    };
   
    useEffect(() => {
      switch (fav) {
        case 'unfav':
            setHeart('♡');
            break;
        case 'fav':
            setHeart('❤️');
            break;
        default:
            setHeart('♡');
            break;
      }
    }, [fav]);
   
    return (
      <div>
        <button onClick={handleClick}>{heart}</button>
      </div>
    );
   }