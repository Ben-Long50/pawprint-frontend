import { useContext, useEffect, useState } from 'react';
import PostDetail from './PostDetail';
import { GlobalContext } from './GlobalContext';
import { AuthContext } from './AuthContext';
import useLikeStatusMutation from '../hooks/useLikeStatusMutation';
import CloudinaryImage from './CloudinaryImage';

const PostCard = (props) => {
  const [likeStatus, setLikeStatus] = useState(false);
  const { activeProfile } = useContext(GlobalContext);
  const { apiUrl } = useContext(AuthContext);
  const [postOpen, setPostOpen] = useState(false);

  useEffect(() => {
    let status = false;
    props.post.likes.forEach((like) => {
      if (like.profileId === activeProfile?.id) {
        status = true;
      }
    });
    setLikeStatus(status);
  }, [props.post]);

  const toggleLikeStatus = useLikeStatusMutation(
    props.post.id,
    activeProfile?.id,
    apiUrl,
    likeStatus,
    props.type,
  );

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      if (!postOpen) {
        togglePostOpen();
      }
    }
  };

  const togglePostOpen = () => {
    setPostOpen(!postOpen);
  };

  return (
    <div
      tabIndex={0}
      className={`${props.className} timing flex aspect-square cursor-pointer items-center overflow-hidden bg-black object-cover md:hover:opacity-60`}
      onClick={togglePostOpen}
      onKeyDown={handleKeyDown}
    >
      <CloudinaryImage url={props.post.mediaUrl} />
      <PostDetail
        post={props.post}
        likeStatus={likeStatus}
        toggleLikeStatus={toggleLikeStatus}
        profile={props.profile}
        postOpen={postOpen}
        setPostOpen={setPostOpen}
        togglePostOpen={togglePostOpen}
        toggleNotificationbar={props.toggleNotificationbar}
      />
    </div>
  );
};

export default PostCard;
