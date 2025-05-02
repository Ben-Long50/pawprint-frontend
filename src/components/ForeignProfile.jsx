import { useContext, useEffect, useState } from 'react';
import Profile from './Profile';
import Button from './Button';
import { useLocation } from 'react-router-dom';
import { GlobalContext } from './GlobalContext';
import { AuthContext } from './AuthContext';
import Loading from './Loading';
import useForeignProfileQuery from '../hooks/useForeignProfileQuery';
import useFollowStatusMutation from '../hooks/useFollowingStatusMutation';
import useFollowStatusQuery from '../hooks/useFollowStatusQuery';

const ForeignProfile = () => {
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const { apiUrl } = useContext(AuthContext);
  const { activeProfile, activeFollowing } = useContext(GlobalContext);
  const location = useLocation();
  const state = location.state;

  const [profileId, setProfileId] = useState(
    state || JSON.parse(localStorage.getItem('profileId')),
  );

  const profile = useForeignProfileQuery(profileId, apiUrl);

  useEffect(() => {
    if (state) {
      localStorage.setItem('profileId', JSON.stringify(state));
      setProfileId(state);
    }
  }, [state]);

  const followStatus = useFollowStatusQuery(
    activeProfile?.id,
    profileId,
    apiUrl,
    true,
  );

  useEffect(() => {
    if (profile.data) {
      const followers = profile.data.followers.map(
        (follower) => follower.followerId,
      );
      const following = profile.data.following.map(
        (following) => following.profileId,
      );
      setFollowers(followers);
      setFollowing(following);
    }
  }, [profile.data, activeFollowing, profileId]);

  const setFollowingStatus = useFollowStatusMutation(
    activeProfile?.id,
    profileId,
    followStatus.data,
    apiUrl,
  );

  if (profile.isPending || profile.isLoading) {
    return <Loading />;
  }

  return (
    <Profile profile={profile.data} followers={followers} following={following}>
      {setFollowingStatus.isLoading || setFollowingStatus.isPending ? (
        <Loading size={1.25} />
      ) : (
        <Button
          className={`${followStatus.data && 'opacity-50'} px-3 py-1 text-sm font-semibold`}
          onClick={() => {
            setFollowingStatus.mutate(profileId);
          }}
        >
          {followStatus.data ? 'Unfollow' : 'Follow'}
        </Button>
      )}
    </Profile>
  );
};

export default ForeignProfile;
