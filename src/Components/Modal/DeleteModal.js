import React, { useEffect } from "react";
import "./DeleteModal.css";
import { app } from "../../firebase";
import { getDatabase, remove, ref } from "firebase/database";

const DeleteModal = (props) => {
  useEffect(() => {
    document.body.style.overflowY = "hidden";

    return () => {
      document.body.style.overflowY = "scroll";
    };
  }, []);

  const deleteFromDatabase = () => {
    const db = getDatabase(app);
    const dbNoteRef = ref(db, "Notes/" + props.id);

    remove(dbNoteRef);
  };

  return (
    <div className="deleteModalContainer">
      <div className="deleteModal">
        <h3>Are you sure ?</h3>
        <p>After deleting you will not be able to get the data.</p>

        <div className="buttons">
          <button
            className="btn btn-primary m-2 bg-danger"
            onClick={deleteFromDatabase}
          >
            Delete
          </button>
          <button
            className="btn btn-primary m-2"
            onClick={() => props.setDeleting(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
