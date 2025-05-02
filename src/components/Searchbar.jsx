import { mdiClose, mdiCloseCircle } from '@mdi/js';
import Icon from '@mdi/react';
import { useContext, useState } from 'react';
import { AuthContext } from './AuthContext';
import { GlobalContext } from './GlobalContext';
import Loading from './Loading';
import ProfileCard from './ProfileCard';
import ScrollBar from 'react-perfect-scrollbar';
import useSearchHistoryQuery from '../hooks/useSearchHistoryQuery';
import useSearchResultsMutation from '../hooks/useSearchResultsMutation';
import useCreateSearchMutation from '../hooks/useCreateSearchMutation';
import useDeleteSearchMutation from '../hooks/useDeleteSearchMutation';
import useDeleteSearchHistory from '../hooks/useDeleteSearchHistory';

const Searchbar = (props) => {
  const [searchString, setSearchString] = useState('');
  const [results, setResults] = useState([]);
  const { apiUrl } = useContext(AuthContext);
  const { activeProfile } = useContext(GlobalContext);

  const searchHistory = useSearchHistoryQuery(activeProfile?.id, apiUrl);

  const searchResults = useSearchResultsMutation(apiUrl);

  const handleSearch = async (searchQuery) => {
    if (searchQuery?.length > 0) {
      const result = await searchResults.mutateAsync(searchQuery);
      setSearchString(searchQuery);
      setResults(result || []);
    } else {
      setSearchString('');
      setResults([]);
    }
  };

  const createSearch = useCreateSearchMutation(activeProfile?.id, apiUrl);

  const handleCreateSearch = (searchedId) => {
    createSearch.mutate(searchedId);
  };

  const deleteSearch = useDeleteSearchMutation(activeProfile?.id, apiUrl);

  const handleDeleteSearch = (searchedId) => {
    deleteSearch.mutate(searchedId);
  };

  const deleteSearchHistory = useDeleteSearchHistory(activeProfile?.id, apiUrl);

  if (searchHistory.isPending || searchHistory.isLoading) {
    return <span></span>;
  }

  return props.layoutSize === 'xsmall' || props.layoutSize === 'small' ? (
    <div
      className={`${props.className} bg-secondary flex max-h-dvh-65 min-w-96 flex-col overflow-y-auto shadow-md md:h-dvh md:max-h-full md:min-w-96 md:shadow-md-right dark:shadow-gray-950`}
      style={props.style}
    >
      <search className="bg-secondary border-b p-6">
        <div className="bg-secondary-2 flex w-full items-center justify-between rounded-lg p-2">
          <input
            className="text-secondary grow border-none bg-transparent text-lg outline-none"
            type="text"
            placeholder="Search"
            onChange={(e) => {
              handleSearch(e.target.value);
            }}
            value={searchString}
          />
          <button
            aria-label="Clear search input"
            className="text-tertiary cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              setSearchString('');
              setResults([]);
            }}
          >
            <Icon path={mdiCloseCircle} size={1} />
          </button>
        </div>
      </search>
      <div className="flex flex-col gap-2 p-4">
        {results?.length < 1 ? (
          <>
            <div className="flex items-center justify-between p-2">
              <h3
                aria-label="Recent search history"
                className="text-primary text-xl font-semibold"
              >
                Recent
              </h3>
              <button
                aria-label="Clear search history"
                className="timing md:hover:text-primary cursor-pointer text-lg text-blue-500"
                onClick={() => deleteSearchHistory.mutate()}
              >
                Clear all
              </button>
            </div>
            {searchHistory.isLoading ? (
              <Loading />
            ) : (
              searchHistory.data?.length > 0 &&
              searchHistory.data.map((search) => {
                const profile = search.searchedProfile;
                return (
                  <ProfileCard
                    key={profile.id}
                    profile={profile}
                    onClick={() => {
                      props.toggleSearchbar();
                    }}
                  >
                    <button
                      aria-label={`Delete profile ${profile.username} from search history`}
                      className="ml-auto p-2"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleDeleteSearch(profile.id);
                      }}
                    >
                      <Icon
                        className="text-tertiary"
                        path={mdiClose}
                        size={0.9}
                      />
                    </button>
                  </ProfileCard>
                );
              })
            )}
          </>
        ) : (
          results.map((profile) => {
            if (profile.id !== activeProfile?.id) {
              return (
                <ProfileCard
                  key={profile.id}
                  profile={profile}
                  onClick={() => {
                    props.toggleSearchbar();
                    setSearchString('');
                    setResults([]);
                    handleCreateSearch(profile.id);
                  }}
                />
              );
            }
          })
        )}
      </div>
    </div>
  ) : (
    <ScrollBar
      className={`${props.className} bg-secondary flex max-h-dvh-65 min-w-96 flex-col overflow-y-auto shadow-md md:h-dvh md:max-h-full md:min-w-96 md:shadow-md-right dark:shadow-gray-950`}
      style={props.style}
    >
      <search className="bg-secondary flex flex-col items-start gap-6 border-b p-6">
        <h1 className="text-primary text-3xl font-semibold">Search</h1>
        <div className="bg-secondary-2 flex w-full items-center justify-between rounded-lg p-2">
          <input
            className="text-secondary grow border-none bg-transparent text-lg outline-none"
            type="text"
            placeholder="Search"
            onChange={(e) => {
              handleSearch(e.target.value);
            }}
            value={searchString}
          />
          <button
            className="text-tertiary cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              setSearchString('');
              setResults([]);
            }}
          >
            <Icon path={mdiCloseCircle} size={1} />
          </button>
        </div>
      </search>
      <div className="flex flex-col gap-2 p-4">
        {results?.length < 1 ? (
          <>
            <div className="flex items-center justify-between p-2">
              <h3 className="text-primary text-xl font-semibold">Recent</h3>
              <button
                className="timing md:hover:text-primary cursor-pointer text-lg text-blue-500"
                onClick={() => deleteSearchHistory.mutate()}
              >
                Clear all
              </button>
            </div>
            {searchHistory.isLoading ? (
              <Loading />
            ) : (
              searchHistory.data?.length > 0 &&
              searchHistory.data.map((search) => {
                const profile = search.searchedProfile;
                return (
                  <ProfileCard
                    key={profile.id}
                    profile={profile}
                    onClick={() => {
                      props.toggleSearchbar();
                    }}
                  >
                    <button
                      className="ml-auto p-2"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleDeleteSearch(profile.id);
                      }}
                    >
                      <Icon
                        className="text-tertiary"
                        path={mdiClose}
                        size={0.9}
                      />
                    </button>
                  </ProfileCard>
                );
              })
            )}
          </>
        ) : (
          results.map((profile) => {
            if (profile.id !== activeProfile?.id) {
              return (
                <ProfileCard
                  key={profile.id}
                  profile={profile}
                  onClick={() => {
                    props.toggleSearchbar();
                    setSearchString('');
                    setResults([]);
                    handleCreateSearch(profile.id);
                  }}
                />
              );
            }
          })
        )}
      </div>
    </ScrollBar>
  );
};

export default Searchbar;
