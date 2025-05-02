import { useInfiniteQuery } from '@tanstack/react-query';
import getFollowedPosts from '../services/getFollowedPosts';

const useFeedPostQuery = (activeId, apiUrl) => {
  return useInfiniteQuery({
    queryKey: ['feedPosts'],
    queryFn: ({ pageParam }) => {
      const result = getFollowedPosts(activeId, apiUrl, pageParam);
      return result ? result : { posts: [], hasMore: false, totalPosts: 0 };
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      return lastPage.hasMore ? pages?.length + 1 : undefined;
    },
  });
};

export default useFeedPostQuery;
