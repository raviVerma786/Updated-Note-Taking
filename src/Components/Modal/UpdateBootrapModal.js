import React, { useContext, useState } from "react";
import { app } from "../../firebase";
import { getDatabase, set, ref } from "firebase/database";
import { Button, Modal } from "react-bootstrap";
import { UserContext } from "../../Context/UserCredentials";

const UpdateBootrapModal = (props) => {
  const [inputValue, setInputValue] = useState("");
  useState(() => {
    setInputValue(props.notedata);
    return () => setInputValue("");
  }, [props.noteData]);

  const userDetails = useContext(UserContext);

  const updateFromDatabase = () => {
    const date = new Date();
    // const mm = date.getMonth() + 1;
    // const dd = date.getDate();
    // const yy = date.getFullYear();
    // const hh = date.getHours();
    // const min = date.getMinutes();
    // const dt = `${dd}/${mm}/${yy}`;
    // const t = `${hh}:${min}`;
    const timeZone = "Asia/Kolkata";

    const t = new Intl.DateTimeFormat("en-US", {
      timeStyle: "short",
      timeZone,
    }).format(date);
    const dt = new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
      timeZone,
    }).format(date);
    
    const db = getDatabase(app);
    set(ref(db, `${userDetails.user}/Notes/` + props.id), {
      id: props.id,
      note: inputValue,
      url: props.imgurl,
      date: dt,
      time: t,
    })
      .then(() => {
        console.log("Note Updated uccessfully !");
      })
      .catch((error) => {
        console.log(error);
      });
    props.onHide();
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" className="text-info">
          Update Note
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input
          ref={(ref) => ref && ref.focus()}
          onFocus={(e) =>
            e.currentTarget.setSelectionRange(
              e.currentTarget.value.length,
              e.currentTarget.value.length
            )
          }
          className="form-control updateInput"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />

        {/* <textarea ref={ref => ref && ref.focus()} onFocus={(e)=>e.currentTarget.setSelectionRange(e.currentTarget.value.length, e.currentTarget.value.length)} className="form-control" id="exampleFormControlTextarea1" rows="3" value={inputValue} onChange={(e)=>setInputValue(e.target.value)} ></textarea> */}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide} className="bg-success">
          Close
        </Button>
        <Button className="bg-primary" onClick={updateFromDatabase}>
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateBootrapModal;
