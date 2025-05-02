import LikeButton from './LikeButton';
import CommentButton from './CommentButton';
import ShareButton from './ShareButton';
import BookmarkButton from './BookmarkButton';
import { useContext, useEffect, useRef, useState } from 'react';
import Timestamp from './Timestamp';
import Comment from './Comment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { GlobalContext } from './GlobalContext';
import RootPortal from '../layouts/RootPortal';
import PostHeader from './PostHeader';
import { AuthContext } from './AuthContext';
import Loading from './Loading';
import useFollowStatusQuery from '../hooks/useFollowStatusQuery';
import useCommentsQuery from '../hooks/useCommentsQuery';
import useDeletePostMutation from '../hooks/useDeletePostMutation';
import useDeleteCommentMutation from '../hooks/useDeleteCommentMutation';
import { LayoutContext } from './LayoutContext';
import useCommentMutation from '../hooks/useCommentMutation';
import CloudinaryImage from './CloudinaryImage';

const PostDetail = (props) => {
  const [commentInput, setCommentInput] = useState('');
  const [imageWidth, setImageWidth] = useState(null);
  const [imageHeight, setImageHeight] = useState(null);
  const [imageContainerHeight, setImageContainerHeight] = useState(null);
  const { apiUrl } = useContext(AuthContext);
  const { activeProfile } = useContext(GlobalContext);
  const { layoutSize } = useContext(LayoutContext);

  const imageRef = useRef(null);
  const imageContainerRef = useRef(null);
  const inputRef = useRef(null);

  const followStatus = useFollowStatusQuery(
    activeProfile?.id,
    props.profile.id,
    apiUrl,
    props.postOpen,
  );

  const comments = useCommentsQuery(props.post.id, apiUrl, props.postOpen);

  const deletePost = useDeletePostMutation(apiUrl, props.togglePostOpen);

  const deleteComment = useDeleteCommentMutation(apiUrl);

  const createComment = useCommentMutation(
    props.post.id,
    props.post.profileId,
    activeProfile?.id,
    apiUrl,
  );

  const handleCreateComment = (comment) => {
    createComment.mutate(comment);
  };

  const handleDeletePost = (postId) => {
    deletePost.mutate(postId);
  };

  const handleDeleteComment = (commentId) => {
    deleteComment.mutate(commentId);
  };

  useEffect(() => {
    if (imageRef.current && props.postOpen) {
      setImageWidth(imageRef.current.offsetWidth);
      setImageHeight(imageRef.current.offsetHeight);
      setImageContainerHeight(imageContainerRef.current.offsetHeight);
    }
  }, [props.postOpen, comments]);

  if (!props.postOpen) return null;

  return (
    <RootPortal
      onClick={() => props.togglePostOpen()}
      modalOpen={props.postOpen}
    >
      <div
        className="fade-in-bottom bg-secondary main-layout sticky top-0 z-30 grid h-dvh w-full md:m-auto md:grid md:h-auto md:max-h-dvh-95 md:min-h-dvh-75 md:max-w-7xl md:grid-cols-3 md:grid-rows-1 md:rounded-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {layoutSize === 'small' || layoutSize === 'xsmall' ? (
          <>
            <div className="bg-secondary sticky top-0 z-30 row-span-1 w-full border-b">
              <PostHeader
                activeProfile={activeProfile}
                profile={props.profile}
                followStatus={followStatus.data}
                togglePostOpen={props.togglePostOpen}
                toggleNotificationbar={props.toggleNotificationbar}
              />
            </div>
            <div
              className="bg-secondary row-span-1 w-full overflow-y-auto"
              onScroll={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
            >
              <div
                ref={imageContainerRef}
                className="flex items-center justify-center overflow-hidden bg-black"
              >
                <CloudinaryImage
                  ref={imageRef}
                  className="w-full self-center"
                  url={props.post.mediaUrl}
                />
              </div>
              <div className="bg-secondary flex grow flex-col border-t">
                <Comment
                  type="caption"
                  id={props.post.id}
                  profile={props.profile}
                  body={props.post.body}
                  date={props.post.createdAt}
                  mutate={handleDeletePost}
                  togglePostOpen={props.togglePostOpen}
                  toggleNotificationbar={props.toggleNotificationbar}
                />
                {comments.isLoading || comments.isPending ? (
                  <Loading />
                ) : (
                  comments?.data.map((comment) => (
                    <Comment
                      key={comment.id}
                      id={comment.id}
                      likes={comment.likes}
                      profile={comment.profile}
                      body={comment.body}
                      date={comment.createdAt}
                      mutate={handleDeleteComment}
                      togglePostOpen={props.togglePostOpen}
                      toggleNotificationbar={props.toggleNotificationbar}
                    />
                  ))
                )}
              </div>
            </div>
            <div className="bg-secondary sticky bottom-0 row-span-1 w-full border-t">
              <div className="w-full p-3">
                <div className="flex w-full items-center justify-between md:mb-3">
                  <div className="flex items-center justify-start gap-4">
                    {props.toggleLikeStatus.isPending ? (
                      <Loading size={1.25} />
                    ) : (
                      <LikeButton
                        likeStatus={props.likeStatus}
                        onClick={() => props.toggleLikeStatus.mutate()}
                      />
                    )}
                    <CommentButton onClick={() => inputRef.current.focus()} />
                    <ShareButton post={props.post} />
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-primary font-semibold">
                      {props.post.likes?.length +
                        '  ' +
                        (props.post.likes?.length === 1 ? 'like' : 'likes')}
                    </p>
                    <BookmarkButton post={props.post} />
                  </div>
                </div>
              </div>
              <form className="text-primary bg-secondary flex w-full items-center justify-between border-t p-3 md:rounded-br-xl">
                <input
                  ref={inputRef}
                  className="w-full grow bg-transparent py-1 outline-none"
                  type="text"
                  placeholder="Add a comment..."
                  onChange={(e) => setCommentInput(e.target.value)}
                  value={commentInput}
                />
                {createComment.isPending && (
                  <Loading className="ml-auto" size={1.25} />
                )}
                {commentInput?.length > 0 && (
                  <button
                    className="text-accent font-semibold hover:underline"
                    onClick={(e) => {
                      e.preventDefault();
                      setCommentInput('');
                      handleCreateComment(commentInput);
                    }}
                  >
                    Post
                  </button>
                )}
              </form>
            </div>
          </>
        ) : (
          <>
            <div
              ref={imageContainerRef}
              className="flex h-full items-center justify-center overflow-hidden rounded-l-xl bg-black md:col-span-2 md:my-auto"
            >
              <CloudinaryImage
                ref={imageRef}
                className={`${imageContainerHeight <= imageHeight && 'md:rounded-l-xl'} w-full self-center`}
                url={props.post.mediaUrl}
              />
            </div>
            <div className="bg-secondary col-span-1 flex h-full max-h-dvh-95 flex-col items-start justify-start rounded-r-xl">
              <PostHeader
                className="rounded-tr-xl border-b"
                activeProfile={activeProfile}
                profile={props.profile}
                followStatus={followStatus.data}
                togglePostOpen={props.togglePostOpen}
                toggleNotificationbar={props.toggleNotificationbar}
              />
              <PerfectScrollbar className="w-full overflow-y-auto">
                <div className="flex flex-col">
                  <Comment
                    type="caption"
                    id={props.post.id}
                    profile={props.profile}
                    body={props.post.body}
                    date={props.post.createdAt}
                    mutate={handleDeletePost}
                    togglePostOpen={props.togglePostOpen}
                    toggleNotificationbar={props.toggleNotificationbar}
                  />
                  {comments.isLoading || comments.isPending ? (
                    <Loading />
                  ) : (
                    comments?.data.map((comment) => (
                      <Comment
                        key={comment.id}
                        id={comment.id}
                        likes={comment.likes}
                        profile={comment.profile}
                        body={comment.body}
                        date={comment.createdAt}
                        mutate={handleDeleteComment}
                        togglePostOpen={props.togglePostOpen}
                        toggleNotificationbar={props.toggleNotificationbar}
                      />
                    ))
                  )}
                </div>
              </PerfectScrollbar>
              <div className="bg-secondary sticky bottom-0 row-span-1 w-full border-t md:rounded-br-xl">
                <div className="w-full p-3">
                  <div className="flex w-full items-center justify-between md:mb-3">
                    <div className="flex items-center justify-start gap-4">
                      {props.toggleLikeStatus.isPending ? (
                        <Loading size={1.25} />
                      ) : (
                        <LikeButton
                          likeStatus={props.likeStatus}
                          onClick={() => props.toggleLikeStatus.mutate()}
                        />
                      )}
                      <CommentButton onClick={() => inputRef.current.focus()} />
                      <ShareButton post={props.post} />
                    </div>
                    <div className="flex items-center gap-2">
                      <BookmarkButton post={props.post} />
                    </div>
                  </div>

                  <p className="text-primary font-semibold">
                    {props.post.likes?.length +
                      '  ' +
                      (props.post.likes?.length === 1 ? 'like' : 'likes')}
                  </p>
                  <Timestamp date={props.post.createdAt} />
                </div>
                <form className="text-primary bg-secondary flex w-full items-center justify-between border-t p-3 md:rounded-br-xl">
                  <input
                    ref={inputRef}
                    className="w-full grow bg-transparent py-1 outline-none"
                    type="text"
                    placeholder="Add a comment..."
                    onChange={(e) => setCommentInput(e.target.value)}
                    value={commentInput}
                  />
                  {createComment.isPending && (
                    <Loading className="flex-1" size={1.25} />
                  )}
                  {commentInput?.length > 0 && (
                    <button
                      className="text-accent font-semibold hover:underline"
                      onClick={(e) => {
                        e.preventDefault();
                        setCommentInput('');
                        handleCreateComment(commentInput);
                      }}
                    >
                      Post
                    </button>
                  )}
                </form>
              </div>
            </div>
          </>
        )}
      </div>
    </RootPortal>
  );
};

export default PostDetail;
