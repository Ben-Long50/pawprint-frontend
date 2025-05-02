import { useContext } from 'react';
import PawIcon from '../assets/PawIcon';
import Logo from '../components/Logo';
import { LayoutContext } from '../components/LayoutContext';

const AuthFormLayout = (props) => {
  const { layoutSize } = useContext(LayoutContext);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-16 p-4">
      {layoutSize !== 'xsmall' && layoutSize !== 'small' && (
        <div className="logo-load flex grow-0 items-center justify-center gap-8">
          <Logo textSize="text-5xl md:text-8xl " />
          <PawIcon className="size-16 md:size-32" />
        </div>
      )}
      <form
        className="form-load bg-secondary-2 shadow-medium box-border flex w-full max-w-lg flex-col gap-8 rounded-xl px-10 py-6 md:gap-10 md:px-12 md:py-8"
        onSubmit={props.handleSubmit}
      >
        {(layoutSize === 'xsmall' || layoutSize === 'small') && (
          <div className="flex grow items-center justify-center gap-4">
            <Logo textSize="text-5xl md:text-8xl " />
            <PawIcon className="size-16 md:size-32" />
          </div>
        )}
        <h1 className="text-primary text-2xl font-medium md:text-4xl">
          {props.label}
        </h1>
        {props.children}
        {props.errors?.length > 0 && (
          <div className="flex flex-col gap-3 self-start">
            <span className="text-primary">Error signing in</span>
            {props.errors.map((error, index) => (
              <p key={index} className="text-error">
                {error}
              </p>
            ))}
          </div>
        )}
      </form>
    </div>
  );
};

export default AuthFormLayout;
