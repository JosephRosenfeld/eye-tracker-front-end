import "./PopupButtons.css";

const PopupButtons = ({ editable, setEditable, reset, onSubmit }) => {
  return (
    <div className='popup-buttons-section'>
      {!editable && (
        <button
          type='button'
          className='edit-button'
          onClick={() => setEditable(true)}
        >
          Edit
        </button>
      )}
      {editable && (
        <>
          <button
            type='button'
            className='cancel-button'
            onClick={() => {
              setEditable(false);
              reset();
            }}
          >
            Cancel
          </button>
          <button
            type='submit'
            className='save-button'
            onClick={(e) => {
              onSubmit(e);
            }}
          >
            Save
          </button>
        </>
      )}
    </div>
  );
};

export default PopupButtons;
