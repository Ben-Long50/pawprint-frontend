import { Link } from 'react-router-dom';
import PawIcon from '../assets/PawIcon';
import Button from './Button';
import Logo from './Logo';
import { mdiChevronDoubleDown } from '@mdi/js';
import Icon from '@mdi/react';
import { useRef, useState } from 'react';
import ScrollBar from 'react-perfect-scrollbar';
import LandingPageImage from './LandingPageImage';

const LandingPage = () => {
  const [showInfoRef1, setShowInfoRef1] = useState(false);
  const [showInfoRef2, setShowInfoRef2] = useState(false);
  const [showInfoRef3, setShowInfoRef3] = useState(false);
  const infoRef1 = useRef(null);
  const infoRef2 = useRef(null);
  const infoRef3 = useRef(null);

  const handleScroll = () => {
    if (infoRef1.current) {
      const rect = infoRef1.current.getBoundingClientRect();
      if (rect.top < window.innerHeight / 1.5) {
        setShowInfoRef1(true);
      }
    }
    if (infoRef2.current) {
      const rect = infoRef2.current.getBoundingClientRect();
      if (rect.top < window.innerHeight / 1.5) {
        setShowInfoRef2(true);
      }
    }
    if (infoRef3.current) {
      const rect = infoRef3.current.getBoundingClientRect();
      if (rect.top < window.innerHeight / 1.5) {
        setShowInfoRef3(true);
      }
    }
  };

  return (
    <ScrollBar
      onScrollY={handleScroll}
      className="h-dvh w-full overflow-y-auto overflow-x-hidden"
    >
      <div className="flex h-svh flex-col items-center justify-center gap-8">
        <p className="fade-in-welcome text-primary text-center text-xl font-semibold opacity-0 md:text-3xl">
          Welcome to
        </p>
        <div className="fade-in-welcome flex grow-0 items-center justify-center gap-4 opacity-0 md:gap-8">
          <Logo textSize="text-6xl md:text-8xl " />
          <PawIcon className="size-20 md:size-32" />
        </div>
        <div className="fade-in-welcome flex w-full flex-col items-center opacity-0 md:mt-4">
          <Link className="mt-4 w-1/2 max-w-80 md:w-1/3" to="/signin">
            <Button className="w-full px-3 py-2 text-xl">Sign in</Button>
          </Link>
          <Link className="mt-4 w-1/2 max-w-80 md:w-1/3" to="/signup">
            <Button className="w-full px-3 py-2 text-xl">Sign up</Button>
          </Link>
        </div>
        <div className="fade-in-logo absolute bottom-0 mb-4 flex flex-col items-center opacity-0 md:mb-8">
          <p className="text-tertiary text-sm">Scroll to</p>
          <p className="text-tertiary text-sm">learn more</p>
          <Icon
            className="text-tertiary fade-in-scroll"
            path={mdiChevronDoubleDown}
            size={2}
          />
        </div>
      </div>
      <section className="mx-auto mt-20 flex max-w-5xl flex-col py-8 text-lg max-md:p-4 md:mt-0 md:gap-40 md:text-3xl">
        <div ref={infoRef1} className={`flex flex-col gap-8`}>
          <div
            className={`${showInfoRef1 ? 'fade-in-infoRight' : 'opacity-0'} bg-secondary-2 col-start-2 flex w-full flex-col items-start gap-4 self-end overflow-hidden rounded-xl p-4 shadow-md shadow-gray-300 md:w-3/4 md:p-6 dark:shadow-black`}
          >
            <div className="flex items-center gap-4 md:gap-10">
              <h3 className="text-primary font-logo text-3xl md:text-4xl">
                A pet focused community
              </h3>
              <PawIcon className="size-10 md:size-14" />
            </div>
            <div className="bg-secondary rounded-lg p-2 text-xl shadow-md shadow-gray-300 md:p-4 md:text-2xl dark:shadow-black">
              <p className="text-secondary leading-normal">
                Join the social media community where your pets are the star!{' '}
                <span className="text-tertiary mt-2 text-sm md:mt-6 md:text-xl">
                  (Please keep posts on theme)
                </span>
              </p>
            </div>
          </div>
          <div className="-gap-8 grid max-md:grid-rows-3 md:grid-cols-3">
            <LandingPageImage
              className={`${showInfoRef1 ? 'opacity-100 md:translate-x-8' : 'opacity-0 max-md:translate-y-16 md:translate-x-[15rem]'} z-10 transition-all delay-[.5s] duration-[2s] max-md:justify-self-start md:w-full`}
              image="https://res.cloudinary.com/dm4tmla72/image/upload/v1731182849/pawprint/twohmchvwb9apit5izzd.jpg"
            />
            <LandingPageImage
              className={`${showInfoRef1 ? 'opacity-100 max-md:-translate-y-16 md:translate-x-0' : 'opacity-0 max-md:translate-y-16 md:translate-x-[17rem]'} z-20 transition-all delay-[1s] duration-[2s] max-md:justify-self-center md:w-full md:translate-y-8`}
              image="https://res.cloudinary.com/dm4tmla72/image/upload/v1734901118/pawprint/vhcllqkmbqttry4omf3n.jpg"
            />
            <LandingPageImage
              className={`${showInfoRef1 ? 'opacity-100 max-md:-translate-y-32 md:-translate-x-8' : 'opacity-0 max-md:translate-y-0 md:translate-x-[19rem]'} z-30 transition-all delay-[1.5s] duration-[2s] max-md:justify-self-end md:w-full md:translate-y-16`}
              image="https://res.cloudinary.com/dm4tmla72/image/upload/v1734900914/pawprint/cuh7pqcnxbtboympykha.jpg"
            />
          </div>
        </div>
        <div ref={infoRef2} className={`flex flex-col gap-8`}>
          <div
            className={`${showInfoRef2 ? 'fade-in-infoLeft' : 'opacity-0'} bg-secondary-2 col-start-2 flex w-full flex-col items-start gap-4 self-start overflow-hidden rounded-xl p-4 shadow-md shadow-gray-300 md:w-3/4 md:p-8 dark:shadow-black`}
          >
            <div className="flex items-center gap-4 md:gap-8">
              <PawIcon className="size-10 md:size-14" />
              <h3 className="text-primary font-logo text-3xl md:mb-4 md:mr-12 md:text-4xl">
                One account, many pets
              </h3>
            </div>
            <div className="bg-secondary rounded-lg p-2 text-xl shadow-md shadow-gray-300 md:p-4 md:text-2xl dark:shadow-black">
              <p className="text-secondary leading-normal">
                With one account you can manage multiple profiles each dedicated
                to a different pet
              </p>
            </div>
          </div>
          <div className="grid max-md:grid-rows-3 md:grid-cols-3">
            <LandingPageImage
              className={`${showInfoRef2 ? 'opacity-100 md:-translate-x-8' : 'opacity-0 max-md:translate-y-16 md:-translate-x-[15rem]'} z-30 transition-all delay-[1.5s] duration-[2s] max-md:z-10 max-md:justify-self-end max-md:delay-[.5s] md:w-full md:translate-y-16`}
              image="https://res.cloudinary.com/dm4tmla72/image/upload/v1731620285/pawprint/nvvoodlb3dhekixmoj5y.jpg"
            />
            <LandingPageImage
              className={`${showInfoRef2 ? 'opacity-100 max-md:-translate-y-16 md:translate-x-0' : 'opacity-0 max-md:translate-y-16 md:-translate-x-[17rem]'} " z-20 transition-all delay-[1s] duration-[2s] max-md:justify-self-center md:w-full md:translate-y-8`}
              image="https://res.cloudinary.com/dm4tmla72/image/upload/v1731362333/pawprint/kwudu6g20ctl96j2q3sp.jpg"
            />
            <LandingPageImage
              className={`${showInfoRef2 ? 'opacity-100 max-md:-translate-y-32 md:translate-x-8' : 'opacity-0 max-md:translate-y-0 md:-translate-x-[19rem]'} z-10 transition-all delay-[.5s] duration-[2s] max-md:z-30 max-md:justify-self-start max-md:delay-[1.5s] md:w-full md:-translate-x-8`}
              image="https://res.cloudinary.com/dm4tmla72/image/upload/v1731094920/pawprint/h8crzzbvtooet29abwnm.jpg"
            />
          </div>
        </div>
        <div
          ref={infoRef3}
          className={`${showInfoRef3 ? 'fade-in-infoRight' : 'opacity-0'} mb-8 flex flex-col gap-6`}
        >
          <div
            className={`bg-secondary-2 col-start-2 flex w-full flex-col items-start gap-4 self-end overflow-hidden rounded-xl p-4 shadow-md shadow-gray-300 md:w-3/4 md:p-8 dark:shadow-black`}
          >
            <div className="flex items-center gap-4 md:gap-8">
              <PawIcon className="size-10 md:size-14" />
              <h3 className="text-primary font-logo text-3xl md:mb-4 md:mr-12 md:text-4xl">
                Just stopping by?
              </h3>
            </div>
            <div className="bg-secondary rounded-lg p-2 text-xl shadow-md shadow-gray-300 md:p-4 md:text-2xl dark:shadow-black">
              <p className="text-secondary leading-normal">
                Sign in using the guest option to easily experience a fully
                featured version of the app with no commitments!{' '}
                <span className="text-tertiary mt-2 text-sm md:mt-6 md:text-2xl">
                  (Guest accounts are automatically deleted on logout or after 4
                  hours)
                </span>
              </p>
            </div>
          </div>
        </div>
        <Link className="mx-auto w-1/2 max-w-80" to="/signin">
          <Button className="w-full px-3 py-2 text-xl md:m-4">
            Get started
          </Button>
        </Link>
      </section>
    </ScrollBar>
  );
};

export default LandingPage;
