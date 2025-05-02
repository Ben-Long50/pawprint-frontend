import { Link } from 'react-router-dom';
import ProfilePic from './ProfilePic';
import Icon from '@mdi/react';
import { mdiCircleSmall } from '@mdi/js';
import useFollowStatusMutation from '../hooks/useFollowingStatusMutation';
import { useContext } from 'react';
import { AuthContext } from './AuthContext';
import { GlobalContext } from './GlobalContext';
import Loading from './Loading';

const PostHeader = (props) => {
  const { apiUrl } = useContext(AuthContext);
  const { activeProfile } = useContext(GlobalContext);

  const setFollowStatus = useFollowStatusMutation(
    activeProfile?.id,
    props.profile.id,
    props.followStatus,
    apiUrl,
  );

  return (
    <div
      className={`${props.className} bg-secondary flex w-full items-center p-4`}
    >
      <Link
        to={
          props.activeProfile?.id === props.profile.id
            ? `/profile`
            : `/profile/${props.profile.username}`
        }
        state={props.profile.id}
        onClick={() => {
          props.togglePostOpen();
          if (props.toggleNotificationbar) {
            props.toggleNotificationbar();
          }
        }}
      >
        <ProfilePic
          image={props.profile.profilePicUrl}
          className="mr-4 size-10"
        />
      </Link>
      <div className="text-primary flex items-center">
        <Link
          to={
            props.activeProfile?.id === props.profile.id
              ? `/profile`
              : `/profile/${props.profile.username}`
          }
          state={props.profile.id}
          onClick={() => {
            props.togglePostOpen();
            if (props.toggleNotificationbar) {
              props.toggleNotificationbar();
            }
          }}
        >
          <h3 className="text-lg font-semibold">{props.profile.username}</h3>
        </Link>
        {!props.followStatus &&
          (setFollowStatus.isLoading || setFollowStatus.isPending ? (
            <>
              <Icon className="shrink-0" path={mdiCircleSmall} size={1} />
              <Loading size={1.25} />
            </>
          ) : (
            <>
              <Icon path={mdiCircleSmall} size={1} />
              <button
                className="text-accent font-semibold"
                onClick={() => {
                  setFollowStatus.mutate();
                }}
              >
                Follow
              </button>
            </>
          ))}
      </div>
    </div>
  );
};

export default PostHeader;
