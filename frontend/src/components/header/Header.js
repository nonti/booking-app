import React, { useState, useEffect } from 'react';
import './Header.css';
import logo_w from '../../assets/svg/logo.svg';
import logo_s from '../../assets/svg/logo-s.svg';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import LanguageIcon from '@mui/icons-material/Language';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import SearchIcon from '@mui/icons-material/Search';

const Header = () => {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  const handleSelectChange = (event) => {
    setSelectedLocation(event.target.value);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
    <div className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className='header-top'>
        <div className='logo'>
          <img src={isScrolled ? logo_s : logo_w} alt='Logo' />
        </div>
        {isScrolled ? (
          <div className='search-bar-container'>
            <div className="search-bar">
              <div className="search-bar-text">Anywhere</div>
              <div className="search-bar-text">Any Week</div>
              <div className="search-bar-text2">Add guests</div>
              <div className="search-icon-div">
                <SearchIcon className="search-icon" />
              </div>
            </div>
          </div>
        ) : (
          <div className='header-text'>
            <p>Places to Stay</p>
            <p>Experiences</p>
            <p>Online Experiences</p>
          </div>
        )}
        <div className='header-profile'>
          <div className='duo'>
            <p className={isScrolled ? 'scrolled-host-text' : ''}>Become a host</p>
            <LanguageIcon />
          </div>
          <div className='profile-div'>
            <div className='dropdown'>
              <MenuRoundedIcon className='dropdown-btn' />
              <div className="dropdown-content">
                <span>Sign in</span>
                <span>Sign up</span>
              </div>
            </div>
            <AccountCircleRoundedIcon className='profile-icon' />
          </div>
        </div>
      </div>
    </div>
    <div className={`header-bottom ${isScrolled ? 'hide' : ''}`}>
        <div className='multi-search-bar'>
          <div className='sbpart-location'>
            <p className='where'>Location</p>
            <select
              id="location-select"
              value={selectedLocation}
              onChange={handleSelectChange}
            >
              <option value="">Search destinations</option>
              <option value="all">All</option>
              {locations.map((location) => (
                <option key={location._id} value={location.location}>
                  {location.location}
                </option>
              ))}
            </select>
          </div>
          <div className='sbpart-checkin'>
            <p className='checkin'>Check in</p>
            <DatePicker
              placeholderText="Add dates"
              className="date-picker"
            />
          </div>
          <div className='sbpart-checkout'>
            <p className='checkout'>Check Out</p>
            <DatePicker
              placeholderText="Add dates"
              className="date-picker"
            />
          </div>
          <div className='sbpart-who'>
            <p className='who'>Guests</p>
            <input type='text' placeholder='Add guests' />
          </div>
          <div className='sbpart-search'>
            <div className='search-button'>
              <SearchIcon className='search-icon' />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
