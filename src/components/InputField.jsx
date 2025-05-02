import { useRef } from 'react';

const InputField = (props) => {
  const inputRef = useRef(null);

  return (
    <div className="relative">
      <input
        ref={inputRef}
        className={`${props.className} text-secondary timing peer w-full rounded-lg border border-transparent bg-zinc-300 p-3 outline-none ring-emerald-400 invalid:ring-red-400 focus:bg-transparent focus:ring-2 dark:bg-zinc-700 dark:ring-emerald-300`}
        type={props.type}
        name={props.name}
        id={props.name}
        value={props.value}
        onChange={props.onChange}
        minLength={props.minLength}
      />
      <label
        className={`${inputRef.current?.value?.length > 0 && 'text-transparent'} timing peer-focus:bg-secondary-2 absolute left-3 top-3 transform cursor-text bg-transparent px-1 text-gray-400 transition-all peer-focus:-translate-y-7 peer-focus:text-emerald-400 peer-focus:peer-invalid:text-red-400 dark:peer-focus:text-emerald-300`}
        htmlFor={props.name}
      >
        {props.label}
      </label>
    </div>
  );
};

export default InputField;
