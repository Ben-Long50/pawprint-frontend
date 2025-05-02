import { useContext } from 'react';
import { GlobalContext } from './GlobalContext';
import Notification from './Notification';
import { AuthContext } from './AuthContext';
import useDeleteAllNotificationsMutation from '../hooks/useDeleteAllNotificationsMutation';
import ScrollBar from 'react-perfect-scrollbar';

const Notificationbar = (props) => {
  const { apiUrl } = useContext(AuthContext);
  const { activeProfile } = useContext(GlobalContext);

  const deleteAllNotifications = useDeleteAllNotificationsMutation(
    activeProfile?.id,
    apiUrl,
  );

  return props.layoutSize === 'xsmall' || props.layoutSize === 'small' ? (
    <div
      className={`${props.className} bg-secondary flex max-h-dvh-65 min-w-96 flex-col overflow-y-auto shadow-md md:h-dvh md:max-h-full md:shadow-md-right dark:shadow-gray-950`}
      style={props.style}
    >
      <div className="flex flex-col gap-4 p-6">
        <div className="flex items-center justify-between">
          <h3
            aria-label="Recent notifications"
            className="text-primary text-xl font-semibold"
          >
            Recent
          </h3>
          <button
            aria-label="Clear all notifications"
            className="md:hover:text-primary cursor-pointer text-lg text-blue-500"
            onClick={() => {
              deleteAllNotifications.mutate();
              props.toggleNotificationbar();
            }}
          >
            Clear all
          </button>
        </div>
        {props.notifications?.length > 0 &&
          props.notifications.map((notification) => {
            return (
              <Notification
                key={notification.id}
                notification={notification}
                profile={notification.profile}
                date={notification.createdAt}
                toggleNotificationbar={props.toggleNotificationbar}
              />
            );
          })}
      </div>
    </div>
  ) : (
    <ScrollBar
      className={`${props.className} bg-secondary flex max-h-dvh-65 min-w-96 flex-col overflow-y-auto shadow-md md:h-dvh md:max-h-full md:shadow-md-right dark:shadow-gray-950`}
      style={props.style}
    >
      <div className="bg-secondary flex flex-col items-start gap-10 border-b p-6">
        <h1 className="text-primary text-3xl font-semibold">Notifications</h1>
      </div>
      <div className="flex flex-col gap-4 p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-primary text-xl font-semibold">Recent</h3>
          <button
            className="md:hover:text-primary cursor-pointer text-lg text-blue-500"
            onClick={() => {
              deleteAllNotifications.mutate();
              props.toggleNotificationbar();
            }}
          >
            Clear all
          </button>
        </div>
        {props.notifications?.length > 0 &&
          props.notifications.map((notification) => {
            return (
              <Notification
                key={notification.id}
                notification={notification}
                profile={notification.profile}
                date={notification.createdAt}
                toggleNotificationbar={props.toggleNotificationbar}
              />
            );
          })}
      </div>
    </ScrollBar>
  );
};

export default Notificationbar;
