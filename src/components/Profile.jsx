import { useContext } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Icon from '@mdi/react';
import { mdiCircleSmall, mdiViewGrid } from '@mdi/js';
import { useOutletContext } from 'react-router-dom';
import ProfilePic from './ProfilePic';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from './AuthContext';
import getPosts from '../services/getPosts';
import PostCard from './PostCard';

const Profile = (props) => {
  const { apiUrl } = useContext(AuthContext);
  const [layoutSize] = useOutletContext();

  const posts = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const result = await getPosts(props.profile.id, apiUrl);

      if (result) {
        return result.posts;
      } else {
        return [];
      }
    },
  });

  if (posts.isPending) {
    return <div>...Loading</div>;
  }

  return (
    <PerfectScrollbar className="text-primary w-full overflow-y-auto md:p-6 lg:p-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col">
        {layoutSize !== 'small' && layoutSize !== 'xsmall' ? (
          <>
            <div className="flex items-center justify-center">
              <ProfilePic
                image={props.profile.profilePicUrl}
                className="fade-in-left mr-12 size-40"
              />
              <div className="fade-in-right flex h-full flex-col items-start justify-between gap-2">
                <div className="flex items-center justify-start gap-2">
                  <h2 className="text-primary mr-4 text-2xl">
                    {props.profile.username}
                  </h2>
                  {props.children}
                </div>
                <div className="flex items-center justify-start gap-8">
                  <div className="flex items-center justify-center gap-2">
                    <h2 className="text-primary text-xl">{posts.length}</h2>
                    <h3 className="text-tertiary text-lg">Posts</h3>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <h2 className="text-primary text-xl">
                      {props.followers?.length}
                    </h2>
                    <h3 className="text-tertiary text-lg">Followers</h3>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <h2 className="text-primary text-xl">
                      {props.following?.length}
                    </h2>
                    <h3 className="text-tertiary text-lg">Following</h3>
                  </div>
                </div>
                <div className="flex w-full flex-col gap-2 text-lg">
                  <div className="flex w-full items-center justify-start">
                    <p className="text-primary text-xl font-semibold">
                      {props.profile.petName}
                    </p>
                    {props.profile.species && (
                      <>
                        <Icon path={mdiCircleSmall} size={1} />
                        <p className="text-secondary">
                          {props.profile.species}
                        </p>
                      </>
                    )}
                    {props.profile.breed && (
                      <>
                        <Icon path={mdiCircleSmall} size={1} />
                        <p className="text-tertiary">({props.profile.breed})</p>
                      </>
                    )}
                  </div>
                  <p className="text-secondary">{props.profile.bio}</p>
                </div>
              </div>
            </div>
            <hr className="fade-in-bottom bg-secondary col-start-2 col-end-3 mt-12 w-full" />
            <div className="fade-in-bottom my-4 flex items-center justify-center gap-3">
              <Icon path={mdiViewGrid} size={1.3} />
              <h3 className="text-center text-2xl">Posts</h3>
            </div>
            <div className="grid w-full grid-cols-3 gap-1">
              {posts.data.length > 0 &&
                posts.data.map((post, index) => (
                  <PostCard key={index} image={post.mediaUrl} />
                ))}
            </div>
          </>
        ) : (
          <>
            <div className="mx-auto flex flex-col items-start gap-4 px-4 pt-4">
              <div className="flex items-center">
                <ProfilePic className="fade-in-left mr-8 w-[clamp(100px,20vw,200px)] shrink-0" />
                <div className="fade-in-right flex h-full flex-col items-start justify-center gap-4">
                  <div className="flex items-center justify-start gap-2">
                    <h2 className="text-2xl">{props.profile.username}</h2>
                  </div>
                  <div className="flex flex-wrap items-start gap-2">
                    {props.children}
                  </div>
                </div>
              </div>
              <div className="fade-in-bottom flex w-full flex-col gap-2 px-2 text-lg">
                <div className="flex w-full items-center justify-start">
                  <p className="text-primary text-xl font-semibold">
                    {props.profile.petName}
                  </p>
                  <Icon path={mdiCircleSmall} size={1} />
                  <p className="text-secondary">
                    {props.profile.species} ({props.profile.breed})
                  </p>
                </div>
                <p className="text-secondary">{props.profile.bio}</p>
              </div>
            </div>
            <hr className="fade-in-bottom bg-secondary my-4" />
            <div className="fade-in-bottom -my-2 grid grid-cols-3 items-center gap-8 px-4">
              <div className="flex flex-col items-center justify-center">
                <h2 className="text-primary text-lg">
                  {props.profile.posts.length}
                </h2>
                <h3 className="text-tertiary">Posts</h3>
              </div>
              <div className="flex flex-col items-center justify-center">
                <h2 className="text-primary text-lg">
                  {props.profile.posts?.length}
                </h2>
                <h3 className="text-tertiary">Followers</h3>
              </div>
              <div className="flex flex-col items-center justify-center">
                <h2 className="text-primary text-lg">
                  {props.profile.posts?.length}
                </h2>
                <h3 className="text-tertiary">Following</h3>
              </div>
            </div>
            <hr className="fade-in-bottom bg-secondary mb-2 mt-4" />
            <div className="fade-in-bottom mb-2 flex items-center justify-center gap-3">
              <Icon path={mdiViewGrid} size={0.9} />
              <h3 className="text-center">Posts</h3>
            </div>
            <div className="grid w-full grid-cols-3 gap-1">
              {posts.data.length > 0 &&
                posts.data.map((post, index) => (
                  <PostCard key={index} image={post.mediaUrl} />
                ))}
            </div>
          </>
        )}
      </div>
    </PerfectScrollbar>
  );
};

export default Profile;
