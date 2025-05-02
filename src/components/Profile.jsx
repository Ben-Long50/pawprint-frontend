import { useContext, useEffect, useState } from 'react';
import Icon from '@mdi/react';
import { mdiCircleSmall, mdiViewGrid } from '@mdi/js';
import { useOutletContext } from 'react-router-dom';
import ProfilePic from './ProfilePic';
import { AuthContext } from './AuthContext';
import PostCard from './PostCard';
import Loading from './Loading';
import ProfileList from './ProfileList';
import ProfilePicDetail from './ProfilePicDetail';
import usePostQuery from '../hooks/usePostQuery';

const Profile = (props) => {
  const { apiUrl } = useContext(AuthContext);
  const [layoutSize] = useOutletContext();
  const [followingProfiles, setFollowingProfiles] = useState([]);
  const [followedProfiles, setFollowedProfiles] = useState([]);
  const [followersOpen, setFollowersOpen] = useState(false);
  const [followingOpen, setFollowingOpen] = useState(false);
  const [profilePicDetailOpen, setProfilePicDetailOpen] = useState(false);

  const posts = usePostQuery(props.profile.id, apiUrl);

  useEffect(() => {
    setFollowingProfiles(() => {
      return props.profile.followers.map((follower) => follower.following);
    });
    setFollowedProfiles(() => {
      return props.profile.following.map((following) => following.follower);
    });
  }, [props.profile]);

  const toggleFollowersOpen = () => {
    setFollowersOpen(!followersOpen);
  };

  const toggleFollowingOpen = () => {
    setFollowingOpen(!followingOpen);
  };

  const toggleProfilePicDetailOpen = () => {
    setProfilePicDetailOpen(!profilePicDetailOpen);
  };

  if (posts.isPending || posts.isLoading) {
    return <Loading />;
  }

  return (
    <div className="text-primary w-full md:p-6 lg:p-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col">
        {layoutSize !== 'small' && layoutSize !== 'xsmall' ? (
          <>
            <div className="flex items-center justify-center">
              <ProfilePic
                image={props.profile.profilePicUrl}
                className="fade-in-left mr-12 size-48"
                onClick={toggleProfilePicDetailOpen}
              />
              <ProfilePicDetail
                profile={props.profile}
                modalOpen={profilePicDetailOpen}
                toggleProfilePicDetailOpen={toggleProfilePicDetailOpen}
                className="text-gray-50"
              />
              <div className="fade-in-right flex h-full flex-col items-start justify-between gap-4">
                <div className="flex items-center justify-start gap-2">
                  <h2 className="text-primary mr-4 text-2xl">
                    {props.profile.username}
                  </h2>
                  {props.children}
                </div>
                <div className="flex items-center justify-start gap-8">
                  <div className="flex items-center justify-center gap-2">
                    <h2 className="text-primary text-xl">
                      {posts.data?.length}
                    </h2>
                    <h3 className="text-tertiary text-lg">Posts</h3>
                  </div>
                  <div
                    className="flex cursor-pointer items-center justify-center gap-2"
                    onClick={toggleFollowersOpen}
                  >
                    <h2 className="text-primary text-xl">
                      {props.followers?.length}
                    </h2>
                    <h3 className="text-tertiary text-lg">Followers</h3>
                    <ProfileList
                      className="min-w-96"
                      title="Followers"
                      profiles={followingProfiles}
                      modalOpen={followersOpen}
                      toggleModal={toggleFollowersOpen}
                    />
                  </div>
                  <div
                    className="flex cursor-pointer items-center justify-center gap-2"
                    onClick={toggleFollowingOpen}
                  >
                    <h2 className="text-primary text-xl">
                      {props.following?.length}
                    </h2>
                    <h3 className="text-tertiary text-lg">Following</h3>
                    <ProfileList
                      className="min-w-96"
                      title="Following"
                      profiles={followedProfiles}
                      modalOpen={followingOpen}
                      toggleModal={toggleFollowingOpen}
                    />
                  </div>
                </div>
                <div className="flex w-full items-center justify-start">
                  <p className="text-primary text-xl font-semibold">
                    {props.profile.petName}
                  </p>
                  {props.profile.species && (
                    <>
                      <Icon path={mdiCircleSmall} size={1} />
                      <p className="text-secondary text-center">
                        {props.profile.species}
                      </p>
                    </>
                  )}
                  {props.profile.breed && (
                    <>
                      <Icon path={mdiCircleSmall} size={1} />
                      <p className="text-tertiary text-center">
                        ({props.profile.breed})
                      </p>
                    </>
                  )}
                </div>
                <p className="text-secondary text-lg">{props.profile.bio}</p>
              </div>
            </div>
            <hr className="fade-in-bottom bg-secondary col-start-2 col-end-3 mt-12 w-full" />
            <div className="fade-in-bottom my-2 flex items-center justify-center gap-3">
              <Icon path={mdiViewGrid} size={1.3} />
              <h3 className="text-center text-2xl">Posts</h3>
            </div>
            <hr className="fade-in-bottom bg-secondary w-full" />
          </>
        ) : (
          <>
            <div className="mx-auto flex flex-col items-start px-4 pt-4">
              <div className="flex items-center">
                <ProfilePic
                  image={props.profile.profilePicUrl}
                  className="fade-in-left mr-8 w-[clamp(125px,25vw,200px)] shrink-0"
                  onClick={toggleProfilePicDetailOpen}
                />
                <ProfilePicDetail
                  profile={props.profile}
                  modalOpen={profilePicDetailOpen}
                  toggleProfilePicDetailOpen={toggleProfilePicDetailOpen}
                  className="text-gray-50"
                />
                <div className="fade-in-right flex h-full flex-col items-start justify-center gap-3 sm:gap-4">
                  <div className="flex items-center justify-start gap-2">
                    <h2 className="text-2xl">{props.profile.username}</h2>
                  </div>
                  <div className="flex flex-wrap items-start gap-4">
                    {props.children}
                  </div>
                  <div className="flex w-full items-center justify-start">
                    <p className="text-primary text-xl font-semibold">
                      {props.profile.petName}
                    </p>
                    {props.profile.species && (
                      <>
                        <Icon path={mdiCircleSmall} size={1} />
                        <p className="text-secondary text-center">
                          {props.profile.species}
                        </p>
                      </>
                    )}
                    {props.profile.breed && (
                      <>
                        <Icon path={mdiCircleSmall} size={1} />
                        <p className="text-tertiary text-left">
                          ({props.profile.breed})
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="fade-in-bottom mt-3 flex w-full flex-col gap-2 px-2 text-lg">
                <p className="text-secondary">{props.profile.bio}</p>
              </div>
            </div>
            <hr className="fade-in-bottom bg-secondary my-4" />
            <div className="fade-in-bottom -my-2 grid grid-cols-3 items-center gap-8 px-4">
              <div className="flex flex-col items-center justify-center">
                <h2 className="text-primary text-lg">{posts.data?.length}</h2>
                <h3 className="text-tertiary">Posts</h3>
              </div>
              <div
                className="flex cursor-pointer flex-col items-center justify-center"
                onClick={toggleFollowersOpen}
              >
                <h2 className="text-primary text-lg">
                  {props.followers?.length}
                </h2>
                <h3 className="text-tertiary">Followers</h3>
                <ProfileList
                  className="w-full"
                  title="Followers"
                  profiles={followingProfiles}
                  modalOpen={followersOpen}
                  toggleModal={toggleFollowersOpen}
                />
              </div>
              <div
                className="flex cursor-pointer flex-col items-center justify-center"
                onClick={toggleFollowingOpen}
              >
                <h2 className="text-primary text-lg">
                  {props.following?.length}
                </h2>
                <h3 className="text-tertiary">Following</h3>
                <ProfileList
                  className="w-full"
                  title="Following"
                  profiles={followedProfiles}
                  modalOpen={followingOpen}
                  toggleModal={toggleFollowingOpen}
                />
              </div>
            </div>
            <hr className="fade-in-bottom bg-secondary mb-2 mt-4" />
            <div className="fade-in-bottom mb-2 flex items-center justify-center gap-3">
              <Icon path={mdiViewGrid} size={0.9} />
              <h3 className="text-center">Posts</h3>
            </div>
            <hr className="fade-in-bottom bg-secondary w-full" />
          </>
        )}

        {posts.data?.length > 0 ? (
          <div className="fade-in-bottom bg-secondary grid w-full grid-cols-3 gap-0.5 md:gap-1">
            {posts.data.map((post, index) => (
              <PostCard
                key={index}
                post={post}
                layoutSize={layoutSize}
                profile={props.profile}
                postFetching={posts.isFetching}
                type="post"
              />
            ))}
          </div>
        ) : (
          <h2 className="fade-in-bottom mt-4 w-full text-center text-lg font-semibold sm:text-2xl">
            This profile currently has no posts
          </h2>
        )}
      </div>
    </div>
  );
};

export default Profile;
