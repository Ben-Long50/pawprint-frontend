import RootPortal from '../layouts/RootPortal';
import ScrollBar from 'react-perfect-scrollbar';
import ProfileCard from './ProfileCard';
import { useEffect, useState } from 'react';
import Icon from '@mdi/react';
import { mdiCloseCircle } from '@mdi/js';

const ProfileList = (props) => {
  const [profiles, setProfiles] = useState([]);
  const [filteredProfiles, setFilteredProfiles] = useState([]);
  const [searchString, setSearchString] = useState('');

  useEffect(() => {
    setProfiles(props.profiles);
    setFilteredProfiles(props.profiles);
  }, [props.profiles]);

  const handleSearch = (query) => {
    if (query?.length > 0) {
      setFilteredProfiles(
        profiles.filter((profile) =>
          profile.username.toLowerCase().includes(query.toLowerCase()),
        ),
      );
    } else {
      setFilteredProfiles(props.profiles);
    }
  };

  if (!props.modalOpen) return null;

  return (
    <RootPortal modalOpen={props.modalOpen} onClick={() => props.toggleModal()}>
      <div
        className={`${props.className} fade-in-bottom bg-secondary mx-auto my-auto flex max-h-dvh-75 max-w-xl flex-col md:rounded-xl`}
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="text-primary bg-secondary sticky top-0 border-b p-4 text-2xl font-semibold md:rounded-t-xl">
          {props.title}
        </h1>
        <search className="bg-secondary border-b p-6">
          <div className="bg-secondary-2 flex w-full items-center justify-between rounded-lg p-2">
            <input
              className="text-secondary grow border-none bg-transparent text-lg outline-none"
              type="text"
              placeholder="Search"
              onChange={(e) => {
                setSearchString(e.target.value);
                handleSearch(e.target.value);
              }}
              value={searchString}
            />
            <button
              className="text-tertiary cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                setSearchString('');
                setFilteredProfiles(profiles);
              }}
            >
              <Icon path={mdiCloseCircle} size={1} />
            </button>
          </div>
        </search>
        <ScrollBar className="flex flex-col gap-1 overflow-y-auto p-2">
          {filteredProfiles?.length > 0 ? (
            filteredProfiles.map((profile) => {
              return (
                <ProfileCard
                  className={`${props.shareList && props.shareList.includes(profile.id) && 'ring-2 ring-inset ring-emerald-400'}`}
                  key={profile.id}
                  profile={profile}
                  toggleModal={props.toggleModal}
                  onClick={
                    props.shareList
                      ? (e) => {
                          props.onClick(e);
                          props.setShareList((prevShareList) => [
                            ...prevShareList,
                            profile.id,
                          ]);
                        }
                      : () => {
                          props.toggleModal();
                        }
                  }
                />
              );
            })
          ) : (
            <p className="text-secondary p-1 text-xl">{`No profiles found`}</p>
          )}
        </ScrollBar>
        {props.children}
      </div>
    </RootPortal>
  );
};

export default ProfileList;
