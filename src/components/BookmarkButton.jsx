import Icon from '@mdi/react';
import { mdiBookmark, mdiBookmarkOutline } from '@mdi/js';
import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from './GlobalContext';
import { AuthContext } from './AuthContext';
import useBookmarkMutation from '../hooks/useBookmarkMutation';
import Loading from './Loading';

const BookmarkButton = (props) => {
  const [bookmarkedStatus, setBookmarkedStatus] = useState(false);
  const { apiUrl } = useContext(AuthContext);
  const { activeProfile } = useContext(GlobalContext);

  const toggleBookmarkStatus = useBookmarkMutation(
    activeProfile?.id,
    props.post.id,
    apiUrl,
  );

  const handleBookmarkStatus = () => {
    toggleBookmarkStatus.mutate(bookmarkedStatus);
  };

  useEffect(() => {
    let status = false;
    activeProfile?.bookmarks.forEach((bookmark) => {
      if (bookmark.postId === props.post.id) {
        status = true;
      }
    });
    setBookmarkedStatus(status);
  }, [props.post, activeProfile]);

  return toggleBookmarkStatus.isPending ? (
    <Loading className={props.className} size={1.25} />
  ) : (
    <button
      aria-label="Bookmark post"
      className="text-primary"
      onClick={() => {
        handleBookmarkStatus();
      }}
    >
      <Icon
        className={`${bookmarkedStatus && 'text-red-600'}`}
        path={bookmarkedStatus ? mdiBookmark : mdiBookmarkOutline}
        size={1.25}
      />
    </button>
  );
};

export default BookmarkButton;
