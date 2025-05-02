import { Link } from 'react-router-dom';
import ProfilePic from './ProfilePic';
import { useContext } from 'react';
import { GlobalContext } from './GlobalContext';

const ProfileCard = (props) => {
  const { activeProfile } = useContext(GlobalContext);

  return (
    <Link
      to={
        activeProfile?.username !== props.profile.username
          ? `/profile/${props.profile.username}`
          : '/profile'
      }
      key={props.profile.id}
      className={`${props.className} timing md:hover:bg-secondary-2 flex cursor-pointer items-center gap-6 rounded-lg p-2`}
      state={props.profile.id}
      onClick={
        props.onClick
          ? props.onClick
          : () => {
              console.log('miss');
            }
      }
    >
      <ProfilePic
        image={props.profile.profilePicUrl}
        className="size-12 shrink-0"
      />
      <div>
        <p className="text-primary text-lg">{props.profile.username}</p>
        <p className="text-tertiary">{props.profile.petName}</p>
      </div>
      {props.children}
    </Link>
  );
};

export default ProfileCard;
