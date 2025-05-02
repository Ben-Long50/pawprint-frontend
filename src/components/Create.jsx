import { mdiArrowLeft, mdiClose, mdiImagePlus } from '@mdi/js';
import Icon from '@mdi/react';
import { useContext, useState } from 'react';
import { AuthContext } from './AuthContext';
import { GlobalContext } from './GlobalContext';
import RootPortal from '../layouts/RootPortal';
import Button from './Button';
import useCreatePostMutation from '../hooks/useCreatePostMutation';

const Create = (props) => {
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [captionInput, setCaptionInput] = useState('');
  const { apiUrl } = useContext(AuthContext);
  const { activeProfile } = useContext(GlobalContext);

  const post = useCreatePostMutation(apiUrl);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]; // Get the selected file

    if (selectedFile) {
      setFile(selectedFile);

      // Create a URL for the selected file to preview
      const fileUrl = URL.createObjectURL(selectedFile);
      setImagePreview(fileUrl);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    if (file) {
      formData.append('image', file);
    }
    formData.append('caption', captionInput);
    formData.append('author', activeProfile?.id);
    post.mutate(formData);
    setFile(null);
    setImagePreview(null);
    setCaptionInput('');
    props.toggleCreateOpen();
  };

  if (!props.createOpen) return null;

  return (
    <RootPortal
      create={true}
      modalOpen={props.createOpen}
      onClick={() => props.toggleCreateOpen()}
    >
      <div
        className="fade-in-bottom bg-secondary-2 z-30 mx-auto h-auto max-h-dvh w-full max-w-4xl self-center md:max-h-dvh-95 md:rounded-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {!imagePreview ? (
          <div className="px-2">
            <h2 className="text-primary w-full py-2 text-center text-lg font-semibold">
              Create new post
            </h2>
            <button
              className="text-primary absolute right-0 top-0 m-2"
              onClick={() => props.toggleCreateOpen()}
            >
              <Icon path={mdiClose} size={1.3} />
            </button>
          </div>
        ) : (
          <div className="px-2">
            <button
              className="left-0-0 absolute top-0 m-2"
              onClick={() => setImagePreview(null)}
            >
              <Icon className="text-primary" path={mdiArrowLeft} size={1.25} />
            </button>
            <h2 className="text-primary w-full py-2 text-center text-lg font-semibold">
              Post details
            </h2>
            <button
              className="text-primary absolute right-0 top-0 m-2"
              onClick={() => props.toggleCreateOpen()}
            >
              <Icon path={mdiClose} size={1.3} />
            </button>
          </div>
        )}
        <hr className="bg-secondary" />
        {!imagePreview ? (
          <label className="flex aspect-square size-full cursor-pointer flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-center gap-2 pb-6 pt-5">
              <Icon className="text-tertiary" path={mdiImagePlus} size={5} />
              <p className="text-tertiary mb-2 text-sm">
                <span className="text-xl font-semibold">
                  Click anywhere to upload
                </span>
              </p>
              <p className="text-tertiary text-lg">SVG, PNG, JPG or GIF</p>
            </div>
            <input
              id="file"
              type="file"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        ) : (
          <div className="flex h-full flex-col justify-between">
            <div className="flex aspect-square max-w-4xl items-center justify-center overflow-hidden bg-black">
              <img
                className="fade-in-bottom"
                src={imagePreview}
                alt="Preview"
              />
            </div>

            <div className="m-4 flex flex-col items-start gap-4 md:m-6">
              <h3 className="fade-in-left text-primary text-xl font-semibold">
                Caption
              </h3>
              <div className="fade-in-right bg-secondary flex h-24 w-full gap-2 rounded-xl border p-4">
                <textarea
                  className="text-primary h-full w-full resize-none self-center overflow-auto bg-transparent outline-none"
                  type="text"
                  value={captionInput}
                  onChange={(e) => setCaptionInput(e.target.value)}
                  placeholder="Caption..."
                />
                <p className="text-tertiary self-end text-nowrap text-sm">
                  {captionInput?.length} / 150
                </p>
              </div>
            </div>
            <Button
              className="mb-4 mr-4 w-1/2 self-end p-2 md:mb-6 md:mr-6"
              onClick={handleSubmit}
            >
              Post
            </Button>
          </div>
        )}
      </div>
    </RootPortal>
  );
};

export default Create;
