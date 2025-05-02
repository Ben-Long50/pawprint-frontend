import { mdiCircleSmall } from '@mdi/js';
import { Link } from 'react-router-dom';
import Icon from '@mdi/react';
import { useContext, useEffect, useState } from 'react';
import ProfilePic from './ProfilePic';
import PostDetail from './PostDetail';
import LikeButton from './LikeButton';
import CommentButton from './CommentButton';
import ShareButton from './ShareButton';
import BookmarkButton from './BookmarkButton';
import Timestamp from './Timestamp';
import { AuthContext } from './AuthContext';
import { GlobalContext } from './GlobalContext';
import useCommentMutation from '../hooks/useCommentMutation';
import useLikeStatusMutation from '../hooks/useLikeStatusMutation';
import Loading from './Loading';
import CloudinaryImage from './CloudinaryImage';

const Post = (props) => {
  const [likeStatus, setLikeStatus] = useState(false);
  const [commentInput, setCommentInput] = useState('');
  const [postOpen, setPostOpen] = useState(false);
  const { apiUrl } = useContext(AuthContext);
  const { activeProfile } = useContext(GlobalContext);

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
    'feed',
  );

  const createComment = useCommentMutation(
    props.post.id,
    props.post.profileId,
    activeProfile?.id,
    apiUrl,
  );

  const handleCreateComment = (comment) => {
    createComment.mutate(comment);
  };

  const togglePostOpen = () => {
    setPostOpen(!postOpen);
  };

  return (
    <>
      <div
        className={`${props.className} bg-secondary flex w-full max-w-xl flex-col border-b`}
      >
        <div className="flex items-center justify-between px-2 py-3 sm:px-0 sm:py-4">
          <div className="flex items-center">
            <Link
              to={`/profile/${props.post.profile.username}`}
              state={props.post.profile.id}
            >
              <ProfilePic
                image={props.post.profile.profilePicUrl}
                className="mr-4 size-10 md:mr-6"
              />
            </Link>
            <div className="flex items-center">
              <Link
                to={`/profile/${props.post.profile.username}`}
                state={props.post.profile.id}
              >
                <h3 className="text-lg font-semibold">
                  {props.post.profile.username}
                </h3>
              </Link>
              <Icon path={mdiCircleSmall} size={1} />
              <Timestamp date={props.post.createdAt} />
            </div>
          </div>
        </div>
        <CloudinaryImage
          className="-mx-4 w-full cursor-pointer self-center"
          url={props.post.mediaUrl}
          onClick={togglePostOpen}
        />
        <div className="flex flex-col gap-3 px-4 py-4 sm:px-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start gap-4">
              <div className="flex items-center gap-2">
                {toggleLikeStatus.isPending ? (
                  <Loading size={1.25} />
                ) : (
                  <LikeButton
                    likeStatus={likeStatus}
                    onClick={() => toggleLikeStatus.mutate()}
                  />
                )}
                <p className="text-primary">{props.post.likes?.length}</p>
              </div>
              <div className="flex items-center gap-2">
                <CommentButton onClick={togglePostOpen} />
                <p>{props.post.comments?.length}</p>
              </div>
              <ShareButton post={props.post} />
            </div>
            <BookmarkButton className="ml-auto" post={props.post} />
          </div>
          <p>{props.post.body}</p>
          <form className="flex items-center justify-between">
            <input
              className="w-full bg-transparent py-1 outline-none"
              type="text"
              placeholder="Add a comment..."
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
            />
            {createComment.isPending && (
              <Loading className="flex-1" size={1.25} />
            )}
            {commentInput?.length > 0 && (
              <button
                type="submit"
                className="text-accent font-semibold hover:underline"
                onClick={() => {
                  handleCreateComment(commentInput);
                  setCommentInput('');
                }}
              >
                Post
              </button>
            )}
          </form>
        </div>
      </div>
      <PostDetail
        post={props.post}
        profile={props.post.profile}
        likeStatus={likeStatus}
        toggleLikeStatus={toggleLikeStatus}
        postOpen={postOpen}
        togglePostOpen={togglePostOpen}
      />
    </>
  );
};

export default Post;
