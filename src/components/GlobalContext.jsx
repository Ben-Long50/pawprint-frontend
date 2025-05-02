import { createContext, useContext, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import useProfileQuery from '../hooks/useProfileQuery.js';
import useActiveProfileQuery from '../hooks/useActiveProfileQuery.js';

export const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  const [activeFollowers, setActiveFollowers] = useState([]);
  const [activeFollowing, setActiveFollowing] = useState([]);
  const { apiUrl } = useContext(AuthContext);

  const profiles = useProfileQuery(apiUrl);

  const activeProfile = useActiveProfileQuery(apiUrl);

  useEffect(() => {
    if (activeProfile?.data) {
      const followers = activeProfile?.data.followers.map(
        (follower) => follower.followerId,
      );
      const following = activeProfile?.data.following.map(
        (following) => following.profileId,
      );
      setActiveFollowers(followers);
      setActiveFollowing(following);
    }
  }, [activeProfile?.data]);

  if (
    profiles.isPending ||
    profiles.isLoading ||
    activeProfile?.isPending ||
    activeProfile?.isLoading
  ) {
    return <span></span>;
  }

  return (
    <GlobalContext.Provider
      value={{
        profiles: profiles.data,
        activeProfile: activeProfile?.data,
        activeFollowers,
        activeFollowing,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
