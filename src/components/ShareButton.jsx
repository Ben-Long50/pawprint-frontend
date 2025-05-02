import Icon from '@mdi/react';
import { mdiShareOutline } from '@mdi/js';
import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from './GlobalContext';
import ProfileList from './ProfileList';
import Button from './Button';
import { AuthContext } from './AuthContext';
import useShareMutation from '../hooks/useShareMutation';

const ShareButton = (props) => {
  const { activeProfile } = useContext(GlobalContext);
  const { apiUrl } = useContext(AuthContext);
  const [followingOpen, setFollowingOpen] = useState(false);
  const [followedProfiles, setFollowedProfiles] = useState([]);
  const [shareList, setShareList] = useState([]);

  const shareProfile = useShareMutation(
    activeProfile?.id,
    props.post.id,
    apiUrl,
  );

  useEffect(() => {
    setFollowedProfiles(() => {
      return activeProfile?.following?.map((following) => following.follower);
    });
  }, [activeProfile]);

  const handleShare = () => {
    shareProfile.mutate(shareList);
    toggleFollowingOpen();
  };

  const toggleFollowingOpen = () => {
    setFollowingOpen(!followingOpen);
    setShareList([]);
  };

  return (
    <>
      <button
        aria-label="Share post"
        className="text-primary"
        onClick={toggleFollowingOpen}
      >
        <Icon path={mdiShareOutline} size={1.4} />
      </button>
      <ProfileList
        className="w-full"
        title="Share with following"
        profiles={followedProfiles}
        modalOpen={followingOpen}
        toggleModal={toggleFollowingOpen}
        shareList={shareList}
        setShareList={setShareList}
        onClick={(e) => {
          e.preventDefault();
        }}
      >
        <div className="flex w-full justify-end p-3">
          <Button className="w-1/2 px-3 py-2" onClick={handleShare}>
            Share
          </Button>
        </div>
      </ProfileList>
    </>
  );
};

export default ShareButton;
