import { forwardRef } from "react";

const UploadForm = forwardRef(
  ({ onSubmit, form, setForm, fileInputRef }, ref) => {
    const onChange = (e) => {
      setForm((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    };
    const onPrimaryFileChange = (e) => {
      setForm((prevState) => ({
        ...prevState,
        primaryFile: e.target.files[0],
      }));
    };
    const onAlternativeFilesChange = (e) => {
      setForm((prevState) => ({
        ...prevState,
        alternativeFiles: Array.from(e.target.files),
      }));
    };
    const onCheckChange = (e) => {
      setForm((prevState) => ({
        ...prevState,
        available: e.target.checked,
      }));
    };
    return (
      <form className="flex flex-col gap-4" onSubmit={onSubmit}>
        <label className="flex gap-4 items-center">
          PRIMARY IMAGE:
          <input
            required
            type="file"
            name="primaryFile"
            ref={fileInputRef}
            onChange={onPrimaryFileChange}
          />
        </label>
        <label className="flex gap-4 items-center">
          ALTERNATIVE IMAGES:
          <input
            type="file"
            name="alternativeFiles"
            multiple
            onChange={onAlternativeFilesChange}
          />
        </label>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={onChange}
        />
        <input
          type="text"
          name="altText"
          placeholder="Alt Text"
          value={form.altText}
          onChange={onChange}
        />
        <input
          type="number"
          name="width"
          placeholder="Width"
          value={form.width}
          onChange={onChange}
        />
        <input
          type="number"
          name="height"
          placeholder="Height"
          value={form.height}
          onChange={onChange}
        />
        <input
          type="text"
          name="medium"
          placeholder="Medium"
          value={form.medium}
          onChange={onChange}
        />
        <input
          type="number"
          name="year"
          placeholder="Year"
          value={form.year}
          onChange={onChange}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={onChange}
        ></textarea>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="available"
            value="available"
            checked={form.available}
            onChange={onCheckChange}
          />
          AVAILABLE
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="type"
            value="artwork"
            checked={form.type === "artwork"}
            onChange={onChange}
            required
          />
          ARTWORK
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="type"
            value="photograph"
            checked={form.type === "photograph"}
            onChange={onChange}
            required
          />
          PHOTOGRAPH
        </label>
        <button className="border bg-slate-100" type="submit">
          SUBMIT
        </button>
      </form>
    );
  }
);

export default UploadForm;
