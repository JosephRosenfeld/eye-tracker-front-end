import "./PopupButtons.css";

const PopupButtons = ({ editable, setEditable, reset, onSubmit }) => {
  console.log(editable);
  return (
    <div className='popup-buttons-section'>
      {!editable && (
        <button className='edit-button' onClick={() => setEditable(true)}>
          Edit
        </button>
      )}
      {editable && (
        <>
          <button
            className='cancel-button'
            onClick={() => {
              setEditable(false);
              reset();
            }}
          >
            Cancel
          </button>
          <button
            className='save-button'
            onClick={(e) => {
              setEditable(false);
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
