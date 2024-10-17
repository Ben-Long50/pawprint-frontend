import Icon from '@mdi/react';
import { mdiClose, mdiCircleSmall } from '@mdi/js';
import { Link } from 'react-router-dom';
import ProfilePic from './ProfilePic';
import LikeButton from './LikeButton';
import CommentButton from './CommentButton';
import ShareButton from './ShareButton';
import BookmarkButton from './BookmarkButton';
import { useContext, useEffect, useState } from 'react';
import Timestamp from './Timestamp';
import Comment from './Comment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { GlobalContext } from './GlobalContext';
import RootPortal from '../layouts/RootPortal';

const PostDetail = (props) => {
  const [followStatus, setFollowStatus] = useState(props.followStatus || false);
  const [commentInput, setCommentInput] = useState('');
  const { activeProfile, activeFollowing } = useContext(GlobalContext);

  useEffect(() => {
    if (
      activeFollowing.includes(props.profile.id) ||
      activeProfile.id === props.profile.id
    ) {
      setFollowStatus(true);
    } else {
      setFollowStatus(false);
    }
  }, [activeFollowing, props.profile.id]);

  if (!props.postOpen) return null;

  return (
    <RootPortal onClick={() => props.togglePostOpen()}>
      <div
        className="fade-in-bottom bg-secondary-2 z-30 m-auto flex min-h-dvh max-w-7xl flex-col bg-black md:grid md:h-auto md:max-h-dvh-95 md:min-h-dvh-75 md:grid-cols-3"
        onClick={(e) => e.stopPropagation()}
      >
        {(props.layoutSize === 'small' || props.layoutSize === 'xsmall') && (
          <div className="bg-secondary sticky left-0 top-0 z-30">
            <div className="flex items-center p-4">
              <Link
                to={
                  activeProfile.id === props.profile.id
                    ? `/profile`
                    : `/profile/${props.profile.username}`
                }
                state={props.profile.id}
              >
                <ProfilePic
                  image={props.profile.profilePicUrl}
                  className="mr-4 size-10"
                />
              </Link>
              <div className="text-primary flex items-center">
                <Link
                  to={
                    activeProfile.id === props.profile.id
                      ? `/profile`
                      : `/profile/${props.profile.username}`
                  }
                  state={props.profile.id}
                >
                  <h3 className="text-lg font-semibold">
                    {props.profile.username}
                  </h3>
                </Link>
                {!followStatus && (
                  <>
                    <Icon path={mdiCircleSmall} size={1} />
                    <button
                      className="text-accent"
                      onClick={() => {
                        props.setFollowingStatus.mutate(props.profile.id);
                        setFollowStatus(true);
                      }}
                    >
                      Follow
                    </button>
                  </>
                )}
              </div>
            </div>
            <hr className="text-tertiary w-full self-center" />
          </div>
        )}
        <div className="my-auto flex aspect-square items-center justify-center md:col-span-2">
          <img
            className="w-full self-center"
            src={props.post.mediaUrl}
            alt="post image"
          />
        </div>
        <div className="bg-secondary col-span-1 flex grow flex-col items-start justify-start md:max-h-dvh-95">
          {props.layoutSize !== 'small' && props.layoutSize !== 'xsmall' && (
            <>
              <div className="flex items-center p-4">
                <Link
                  to={
                    activeProfile.id === props.profile.id
                      ? `/profile`
                      : `/profile/${props.profile.username}`
                  }
                  state={props.profile}
                >
                  <ProfilePic
                    image={props.profile.profilePicUrl}
                    className="mr-4 size-10"
                  />
                </Link>
                <div className="text-primary flex items-center">
                  <Link
                    to={
                      activeProfile.id === props.profile.id
                        ? `/profile`
                        : `/profile/${props.profile.username}`
                    }
                    state={props.profile}
                  >
                    <h3 className="text-lg font-semibold">
                      {props.profile.username}
                    </h3>
                  </Link>
                  {!followStatus && (
                    <>
                      <Icon path={mdiCircleSmall} size={1} />
                      <button
                        className="text-accent"
                        onClick={() => {
                          props.setFollowingStatus.mutate(props.profile.id);
                          setFollowStatus(true);
                        }}
                      >
                        Follow
                      </button>
                    </>
                  )}
                </div>
              </div>
              <hr className="text-tertiary w-full self-center" />
            </>
          )}
          <PerfectScrollbar className="flex h-full w-full grow flex-col gap-4 overflow-y-scroll p-4">
            <Comment
              profile={props.profile}
              body={props.post.body}
              date={props.post.createdAt}
            />
            {props.post.comments.map((comment) => {
              return (
                <Comment
                  key={comment.id}
                  id={comment.id}
                  likes={comment.likes}
                  profile={comment.profile}
                  body={comment.body}
                  date={comment.createdAt}
                />
              );
            })}
          </PerfectScrollbar>
          <div className="bg-secondary sticky bottom-0 w-full">
            <hr className="text-tertiary mt-auto w-full self-center" />
            <div className="w-full p-3">
              <div className="flex w-full items-center justify-between md:mb-3">
                <div className="flex items-center justify-start gap-4">
                  <LikeButton
                    likedStatus={props.likedStatus}
                    onClick={() => props.toggleLikedStatus.mutate()}
                  />
                  <CommentButton />
                  <ShareButton />
                </div>
                <div className="flex items-center gap-2">
                  {(props.layoutSize === 'small' ||
                    props.layoutSize === 'xsmall') && (
                    <p className="text-primary font-semibold">
                      {props.post.likes.length +
                        '  ' +
                        (props.post.likes.length === 1 ? 'like' : 'likes')}
                    </p>
                  )}
                  <BookmarkButton />
                </div>
              </div>

              {props.layoutSize !== 'small' &&
                props.layoutSize !== 'xsmall' && (
                  <>
                    <p className="text-primary font-semibold">
                      {props.post.likes.length +
                        '  ' +
                        (props.post.likes.length === 1 ? 'like' : 'likes')}
                    </p>
                    <Timestamp date={props.post.createdAt} />
                  </>
                )}
            </div>
            <hr className="text-tertiary w-full self-center" />
            <form className="text-primary flex w-full items-center justify-between p-3">
              <input
                className="bg-transparent py-1 outline-none"
                type="text"
                placeholder="Add a comment..."
                onChange={(e) => setCommentInput(e.target.value)}
                value={commentInput}
              />
              {commentInput.length > 0 && (
                <button
                  className="text-accent font-semibold hover:underline"
                  onClick={(e) => {
                    e.preventDefault();
                    props.comment.mutate(commentInput);
                    setCommentInput('');
                  }}
                >
                  Post
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </RootPortal>
  );
};

export default PostDetail;
