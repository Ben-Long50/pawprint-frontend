import {
  mdiAccount,
  mdiCompass,
  mdiCompassOutline,
  mdiHeart,
  mdiHeartOutline,
  mdiHomeVariant,
  mdiHomeVariantOutline,
  mdiMagnify,
  mdiMenu,
  mdiPlusBox,
  mdiPlusBoxOutline,
} from '@mdi/js';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import ListMenuItem from './ListMenuItem';
import { useEffect, useState, useRef, useContext } from 'react';
import PawIcon from '../assets/PawIcon';
import Searchbar from './Searchbar';
import Notificationbar from './Notificationbar';
import SettingsMenu from './SettingsMenu';
import { GlobalContext } from './GlobalContext';
import ProfilePic from './ProfilePic';
import useNotificationQuery from '../hooks/useNotificationQuery';
import { AuthContext } from './AuthContext';

const Navbar = (props) => {
  const [navWidth, setNavWidth] = useState(85);

  const navRef = useRef(null);
  const { apiUrl } = useContext(AuthContext);
  const { activeProfile } = useContext(GlobalContext);

  const notifications = useNotificationQuery(activeProfile?.id, apiUrl);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        props.setNavbarSize('large');
      } else if (window.innerWidth > 768 && window.innerWidth < 1280) {
        props.setNavbarSize('medium');
      }
      props.setSearchVisibility(false);
      props.setNotificationVisibility(false);
      props.setMenuVisibility(false);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleMenuVisibility = () => {
    props.setMenuVisibility(!props.menuVisibility);
  };

  const toggleSearchbar = () => {
    if (props.navbarSize === 'medium') {
      setNavWidth(navRef.current.offsetWidth);
    }
    if (props.searchVisibility) {
      if (props.layoutSize === 'large') {
        props.setNavbarSize('large');
      }
      props.setActiveItem(props.prevActiveItem);
    } else {
      props.setNavbarSize('medium');
    }
    if (props.notificationVisibility) {
      props.setNotificationVisibility(false);
    }
    props.setSearchVisibility(!props.searchVisibility);
  };

  const toggleNotificationbar = () => {
    if (props.navbarSize === 'medium') {
      setNavWidth(navRef.current.offsetWidth);
    }
    if (props.notificationVisibility) {
      if (props.layoutSize === 'large') {
        props.setNavbarSize('large');
      }
      props.setActiveItem(props.prevActiveItem);
    } else {
      props.setNavbarSize('medium');
    }
    if (props.searchVisibility) {
      props.setSearchVisibility(false);
    }
    props.setNotificationVisibility(!props.notificationVisibility);
  };

  if (notifications.isPending || notifications.isLoading) {
    return <span></span>;
  }

  return (
    <div className="relative flex w-full">
      <div
        className={`${props.navbarSize === 'large' && 'grow'} timing text-primary bg-secondary md:navbar-layout-md sticky top-0 z-20 grid h-dvh gap-14 border-r px-4 pb-6 pt-10`}
        ref={navRef}
      >
        <div className="flex">
          <Logo
            className={`timing h-14 ${
              props.navbarSize === 'medium'
                ? 'w-0 -translate-x-32 pl-0 opacity-0'
                : 'w-[150px] pl-4'
            }`}
            textSize="text-4xl"
          />
          <PawIcon
            className={`timing size-12 h-14 justify-self-center ${props.layoutSize === 'medium' || props.navbarSize === 'medium' ? 'opacity-100' : 'opacity-0'}`}
          />
        </div>

        <div className="flex w-full flex-col items-start justify-start gap-4">
          <Link tabIndex={-1} className="w-full" to="/home">
            <ListMenuItem
              ariaLabel="home feed"
              activeItem={props.activeItem}
              icon={
                props.activeItem === 'home'
                  ? mdiHomeVariant
                  : mdiHomeVariantOutline
              }
              label="Home"
              navbarSize={props.navbarSize}
              onClick={() => {
                props.changeActiveItem('home');
              }}
            />
          </Link>
          <ListMenuItem
            ariaLabel="search"
            activeItem={props.activeItem}
            icon={mdiMagnify}
            label="Search"
            onClick={() => {
              props.changeActiveItem('search');
              toggleSearchbar();
            }}
            navbarSize={props.navbarSize}
          />
          <Link tabIndex={-1} className="w-full" to="/explore">
            <ListMenuItem
              ariaLabel="explore feed"
              activeItem={props.activeItem}
              icon={
                props.activeItem === 'explore' ? mdiCompass : mdiCompassOutline
              }
              label="Explore"
              navbarSize={props.navbarSize}
              onClick={() => {
                props.changeActiveItem('explore');
              }}
            />
          </Link>
          <ListMenuItem
            ariaLabel="notifications"
            activeItem={props.activeItem}
            icon={
              props.activeItem === 'notifications' ? mdiHeart : mdiHeartOutline
            }
            label="Notifications"
            notifications={notifications.data?.length}
            onClick={() => {
              props.changeActiveItem('notifications');
              toggleNotificationbar();
            }}
            navbarSize={props.navbarSize}
          />
          <ListMenuItem
            ariaLabel="create post"
            activeItem={props.activeItem}
            icon={
              props.activeItem === 'create' ? mdiPlusBox : mdiPlusBoxOutline
            }
            label="Create"
            onClick={() => {
              props.changeActiveItem('create');
              props.setCreateOpen(true);
            }}
            navbarSize={props.navbarSize}
          />
          <Link tabIndex={-1} className="w-full" to={`/profile`}>
            <ListMenuItem
              ariaLabel="profile"
              activeItem={props.activeItem}
              icon={mdiAccount}
              label="Profile"
              navbarSize={props.navbarSize}
              onClick={() => {
                props.changeActiveItem('profile');
              }}
            >
              <ProfilePic
                className={`${props.activeItem === 'profile' && 'ring-2 ring-gray-900 dark:ring-gray-50'} size-10`}
                image={activeProfile?.profilePicUrl}
              />
            </ListMenuItem>
          </Link>
        </div>
        <div className="relative flex flex-col items-start justify-end">
          <ListMenuItem
            ariaLabel="settings menu"
            activeItem={props.activeItem}
            icon={mdiMenu}
            label="More"
            onClick={toggleMenuVisibility}
            navbarSize={props.navbarSize}
          />
          <SettingsMenu
            className={`${props.menuVisibility ? 'visible opacity-100' : 'invisible -translate-x-full opacity-0'} absolute bottom-115 left-0`}
            toggleMenuVisibility={toggleMenuVisibility}
            onClick={() => props.changeActiveItem('')}
          />
        </div>
      </div>
      <Searchbar
        className={`${props.searchVisibility ? 'visible opacity-100' : 'invisible -translate-x-full opacity-50'} timing fixed left-0 top-0 z-10`}
        style={{
          transform:
            props.searchVisibility &&
            `translateX(${navRef.current ? navWidth + 'px' : '0px'})`,
        }}
        toggleSearchbar={toggleSearchbar}
      />
      <Notificationbar
        className={`${props.notificationVisibility ? 'visible opacity-100' : 'invisible -translate-x-full opacity-50'} timing fixed left-0 top-0 z-10`}
        style={{
          transform:
            props.notificationVisibility &&
            `translateX(${navRef.current ? navWidth + 'px' : '0px'})`,
        }}
        notifications={notifications.data}
        toggleNotificationbar={toggleNotificationbar}
      />
    </div>
  );
};

export default Navbar;
