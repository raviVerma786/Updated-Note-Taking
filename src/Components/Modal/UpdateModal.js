import React, { useEffect } from "react";
import "./UpdateModal.css";
import { useState } from "react";
import { app } from "../../firebase";
import { getDatabase,ref,set } from "firebase/database";

const UpdateModal = (props) => {
  const [inputValue, setInputValue] = useState("");
  useEffect(() => {
    document.body.style.overflowY = "hidden";
    setInputValue(props.noteData);
    console.log("ravi");
    return () => {
      document.body.style.overflowY = "scroll";
    };
  }, [props.noteData]);

  const updateFromDatabase = () => {
    const date = new Date();
    const mm = date.getMonth() + 1;
    const dd = date.getDate();
    const yy = date.getFullYear();
    const hh = date.getHours();
    const min = date.getMinutes();
    const dt = `${dd}/${mm}/${yy}`;
    const t = `${hh}:${min}`;
    
    const db = getDatabase(app);
    set(ref(db, "Notes/" + props.id), {
        id: props.id,
        note: inputValue,
        date: dt,
        time: t,
      })
        .then(() => {
          console.log("Note Updated uccessfully !");
        })
        .catch((error) => {
          console.log(error);
        });

    setInputValue("");
    props.setUpdating(false);
  };

  return (
    <div className="updateModalContainer">
      <div className="updateModal">
        <h3>Want to update ?</h3>
        <input
          value={inputValue}
          type="text"
          onChange={(e) => setInputValue(e.target.value)}
        />
        <div className="buttons">
          <button className="btn btn-primary m-2 bg-primary" onClick={updateFromDatabase}>
            Update
          </button>
          <button
            className="btn btn-primary m-2"
            onClick={() => props.setUpdating(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateModal;
