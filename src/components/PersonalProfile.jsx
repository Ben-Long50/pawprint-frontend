import Profile from './Profile';
import { Link } from 'react-router-dom';
import Button from './Button';
import { useContext } from 'react';
import { GlobalContext } from './GlobalContext';
import { mdiBookmarkOutline, mdiSquareEditOutline } from '@mdi/js';
import Icon from '@mdi/react';
import { LayoutContext } from './LayoutContext';

const PersonalProfile = () => {
  const { activeProfile, activeFollowers, activeFollowing } =
    useContext(GlobalContext);
  const { layoutSize } = useContext(LayoutContext);

  return (
    <Profile
      profile={activeProfile}
      followers={activeFollowers}
      following={activeFollowing}
      followStatus={true}
    >
      <Link
        tabIndex={-1}
        to={`${activeProfile?.username}/edit`}
        state={activeProfile}
      >
        <Button
          ariaLabel="Edit profile information"
          className="px-3 py-1 text-sm font-semibold"
        >
          {layoutSize !== 'xsmall' ? (
            <p>Edit profile</p>
          ) : (
            <Icon path={mdiSquareEditOutline} size={1.25} />
          )}
        </Button>
      </Link>
      <Link tabIndex={-1} to="bookmarks">
        <Button
          ariaLabel="bookmarks"
          className="px-3 py-1 text-sm font-semibold"
        >
          {layoutSize !== 'xsmall' ? (
            <p>View Bookmarks</p>
          ) : (
            <Icon path={mdiBookmarkOutline} size={1.25} />
          )}
        </Button>
      </Link>
    </Profile>
  );
};

export default PersonalProfile;
