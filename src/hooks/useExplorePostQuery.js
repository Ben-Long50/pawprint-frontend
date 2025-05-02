import { useInfiniteQuery } from '@tanstack/react-query';
import getExplorePosts from '../services/getExplorePosts';

const useExplorePostQuery = (activeId, apiUrl) => {
  return useInfiniteQuery({
    queryKey: ['explorePosts', activeId],
    queryFn: ({ pageParam }) => {
      const result = getExplorePosts(activeId, apiUrl, pageParam);
      return result ? result : { posts: [], hasMore: false, totalPosts: 0 };
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      return lastPage.hasMore ? pages?.length + 1 : undefined;
    },
  });
};

export default useExplorePostQuery;
