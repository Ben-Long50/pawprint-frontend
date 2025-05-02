import ListMenuItem from './ListMenuItem';
import { mdiHeart, mdiHeartOutline, mdiMagnify, mdiMenu } from '@mdi/js';
import Logo from './Logo';
import PawIcon from '../assets/PawIcon';
import Searchbar from './Searchbar';
import Notificationbar from './Notificationbar';
import SettingsMenu from './SettingsMenu';
import { useContext } from 'react';
import { GlobalContext } from './GlobalContext';
import { AuthContext } from './AuthContext';
import useNotificationQuery from '../hooks/useNotificationQuery';
import { LayoutContext } from './LayoutContext';

const NavHeader = (props) => {
  const { apiUrl } = useContext(AuthContext);
  const { activeProfile } = useContext(GlobalContext);
  const { layoutSize } = useContext(LayoutContext);

  const notifications = useNotificationQuery(activeProfile?.id, apiUrl);

  const toggleSearchbar = () => {
    if (props.searchVisibility) {
      props.setActiveItem(props.prevActiveItem);
    } else if (!props.searchVisibility) {
      if (
        props.activeItem !== 'search' &&
        props.activeItem !== 'notifications' &&
        props.activeItem !== 'menu'
      ) {
        props.setPrevActiveItem(props.activeItem);
      }
      props.setActiveItem('search');
    }
    props.setNotificationVisibility(false);
    props.setMenuVisibility(false);
    props.setSearchVisibility(!props.searchVisibility);
  };

  const toggleNotificationbar = () => {
    if (props.notificationVisibility) {
      props.setActiveItem(props.prevActiveItem);
    } else if (!props.notificationVisibility) {
      if (
        props.activeItem !== 'search' &&
        props.activeItem !== 'notifications' &&
        props.activeItem !== 'menu'
      ) {
        props.setPrevActiveItem(props.activeItem);
      }
      props.setActiveItem('notifications');
    }
    props.setSearchVisibility(false);
    props.setMenuVisibility(false);
    props.setNotificationVisibility(!props.notificationVisibility);
  };

  const toggleMenuVisibility = () => {
    if (props.menuVisibility) {
      props.setActiveItem(props.prevActiveItem);
    } else if (!props.menuVisibility) {
      if (
        props.activeItem !== 'search' &&
        props.activeItem !== 'notifications' &&
        props.activeItem !== 'menu'
      ) {
        props.setPrevActiveItem(props.activeItem);
      }
      props.setActiveItem('menu');
    }
    props.setSearchVisibility(false);
    props.setNotificationVisibility(false);
    props.setMenuVisibility(!props.menuVisibility);
  };

  if (notifications.isPending || notifications.isLoading) {
    return <span></span>;
  }

  return (
    <div className="sticky top-0 z-20">
      <nav className="bg-secondary sticky top-0 z-20 row-span-1 flex w-dvw items-center justify-between border-b px-3 py-1">
        {props.layoutSize === 'small' ? (
          <Logo className="absolute left-3" textSize="text-3xl" />
        ) : (
          <PawIcon className="absolute left-3 size-12" />
        )}
        <div className="z-10 ml-auto flex items-center gap-3">
          <ListMenuItem
            ariaLabel="search"
            activeItem={props.activeItem}
            icon={mdiMagnify}
            label="Search"
            onClick={() => {
              toggleSearchbar();
            }}
          />
          <ListMenuItem
            ariaLabel="notifications"
            className="w-auto"
            activeItem={props.activeItem}
            icon={
              props.activeItem === 'notifications' ? mdiHeart : mdiHeartOutline
            }
            label="Notifications"
            notifications={notifications.data?.length}
            onClick={() => {
              toggleNotificationbar();
            }}
          />
          <ListMenuItem
            ariaLabel="settings menu"
            className={`${props.menuVisibility && '-rotate-90'}`}
            activeItem={props.activeItem}
            icon={mdiMenu}
            label="More"
            onClick={toggleMenuVisibility}
          />
        </div>
      </nav>
      <Searchbar
        className={`${props.searchVisibility ? 'visible translate-y-full opacity-100' : 'invisible shadow-none'} timing } absolute bottom-0 left-0 z-10 h-auto w-full opacity-0`}
        layoutSize={layoutSize}
        toggleSearchbar={toggleSearchbar}
      />
      <Notificationbar
        className={`${props.notificationVisibility ? 'visible translate-y-full opacity-100' : 'invisible shadow-none'} timing absolute bottom-0 left-0 z-10 h-auto w-full opacity-0`}
        layoutSize={layoutSize}
        toggleNotificationbar={toggleNotificationbar}
        notifications={notifications.data}
      />
      <SettingsMenu
        className={`${props.menuVisibility ? 'visible translate-y-full opacity-100' : 'invisible shadow-none'} timing absolute bottom-0 left-0 z-10 h-auto w-full rounded-none opacity-0`}
        toggleMenuVisibility={toggleMenuVisibility}
      />
    </div>
  );
};

export default NavHeader;
