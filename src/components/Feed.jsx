import Post from './Post';
import { useContext } from 'react';
import 'react-perfect-scrollbar/dist/css/styles.css';
import '../styles/custom-scrollbar.css';
import { GlobalContext } from './GlobalContext';
import { AuthContext } from './AuthContext';
import Loading from './Loading';
import Button from './Button';
import { Link } from 'react-router-dom';
import useFeedPostQuery from '../hooks/useFeedPostQuery';
import { InView } from 'react-intersection-observer';

const Feed = () => {
  const { activeProfile } = useContext(GlobalContext);
  const { apiUrl } = useContext(AuthContext);

  const feedPosts = useFeedPostQuery(activeProfile?.id, apiUrl);

  if (feedPosts.isPending || feedPosts.isLoading) {
    return <Loading />;
  }

  if (!feedPosts.data || feedPosts.data.pages[0].totalPosts === 0) {
    return (
      <div className="fade-in-bottom mt-4 flex flex-col items-center gap-4 px-2 md:mt-8">
        <h2 className="text-primary text-center text-2xl font-semibold">
          Your current profile does not follow anyone actively posting
        </h2>
        <p className="text-secondary text-center text-lg">
          Check out the explore page to find other members to follow!
        </p>
        <Link className="w-1/2" to="/explore">
          <Button className="w-full p-2">Explore</Button>
        </Link>
      </div>
    );
  }

  return (
    <>
      {feedPosts.data.pages?.map((page) =>
        page.posts?.map((post) => (
          <Post className="fade-in-bottom" key={post.id} post={post} />
        )),
      )}
      {feedPosts.hasNextPage && (
        <InView
          as="div"
          onChange={(inView) => {
            if (inView) {
              feedPosts.fetchNextPage();
            }
          }}
        >
          {feedPosts.isFetchingNextPage ? (
            <Loading />
          ) : (
            <p className="my-2"></p>
          )}
        </InView>
      )}
      {!feedPosts.hasNextPage && (
        <h2 className="fade-in-bottom text-tertiary my-4 text-2xl">
          End of feed
        </h2>
      )}
    </>
  );
};

export default Feed;
