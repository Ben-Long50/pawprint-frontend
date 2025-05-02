const LandingPageImage = (props) => {
  return (
    <div
      className={`${props.className} flex aspect-square w-1/2 shrink-0 items-center justify-center overflow-hidden rounded-xl shadow-md shadow-gray-300 dark:shadow-black`}
      onClick={props.onClick}
    >
      <img className="min-h-full min-w-full object-cover" src={props.image} />
    </div>
  );
};

export default LandingPageImage;
