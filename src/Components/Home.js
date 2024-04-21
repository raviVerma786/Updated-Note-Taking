import React, { useEffect, useState, useContext } from "react";
import "../App.css";
import { List } from "./List";
import { app, imgDb } from "../firebase";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { useNavigate } from "react-router-dom";
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";
import useZustandStore from "../Context/ZustandStore";

const db = getDatabase(app);
let noteId = 0;
export default function Home() {
  const [inputData, setinputData] = useState("");
  const [notesData, setNotesData] = useState(null);
  const [img, setImg] = useState(null);
  const [imgUrl, setImgUrl] = useState("");

  const navigate = useNavigate();
  //zustand
  const {
    email,
    setEmail,
    user,
    setUser,
    signedIn,
    setSignedIn,
    searchInput,
    setSearchInput,
  } = useZustandStore((state) => ({
    email: state.email,
    setEmail: state.setEmail,
    user: state.user,
    setUser: state.setUser,
    signedIn: state.signedIn,
    setSignedIn: state.setSignedIn,
    searchInput: state.searchInput,
    setSearchInput: state.setSearchInput,
  }));

  useEffect(() => {
    const dbref = ref(db, `${user}/Notes`);
    const token = localStorage.getItem("token");
    if (token) {
      setSignedIn(true);
      setUser(localStorage.getItem("userId"));
    } else {
      setSignedIn(false);
      navigate("/login");
    }

    onValue(dbref, (snapshot) => {
      const data = snapshot.val();
      // console.log(data);
      setNotesData(data);

      if (data) {
        const allKeys = Object.keys(data);
        noteId = Number(allKeys[allKeys.length - 1]) + 1;
      }
    });
  }, [navigate]);

  const handleInputNoteChange = (event) => {
    setinputData(event.target.value);
  };

  const putDataIntoDatabase = async () => {
    if (img) {
      const imgRef = storageRef(imgDb, `${user}/Notes/` + noteId);
      await uploadBytes(imgRef, img)
        .then(async (file) => {
          return await getDownloadURL(file.ref);
        })
        .then((url) => {
          setImgUrl(url);
          const date = new Date();
          const timeZone = "Asia/Kolkata";
          const t = new Intl.DateTimeFormat("en-US", {
            timeStyle: "short",
            timeZone,
          }).format(date);
          const dt = new Intl.DateTimeFormat("en-US", {
            dateStyle: "medium",
            timeZone,
          }).format(date);
          return set(ref(db, `${user}/Notes/` + noteId), {
            id: noteId,
            note: inputData,
            url: url,
            date: dt,
            time: t,
          });
        })
        .then(() => {
          console.log("Note added successfully !");
          setinputData("");
          document.getElementById("fileInput").value = null;
          setImgUrl("");
          setinputData("");
          setImg(null);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      // handling the case when no image is uploaded
      const date = new Date();
      const timeZone = "Asia/Kolkata";
      const t = new Intl.DateTimeFormat("en-US", {
        timeStyle: "short",
        timeZone,
      }).format(date);
      const dt = new Intl.DateTimeFormat("en-US", {
        dateStyle: "medium",
        timeZone,
      }).format(date);
      set(
        ref(db, `${user}/Notes/` + noteId),
        {
          id: noteId,
          note: inputData,
          url: "",
          date: dt,
          time: t,
        },
        (error) => {
          if (error) {
            console.log(error);
          } else {
            console.log("Note added successfully !");
            document.getElementById("fileInput").value = null;
            setImgUrl("");
            setImg(null);
          }
        }
      );

      setinputData("");
    }
  };

  return (
    signedIn && (
      <>
        <div className="mainDiv">
          <div className="centerDiv">
            <br />
            {signedIn && <h2>Welcome To NoteTaking App</h2>}
            <br />
            <div className="operationControl">
              <input
                id="noteInput"
                type="text"
                placeholder="Create New Note"
                onChange={handleInputNoteChange}
                value={inputData}
              />
              <label
                htmlFor="fileInput"
                className={`btn btn-${!img ? "primary" : "success"}`}
              >
                {!img ? "Upload" : "Attached"}
              </label>
              <input
                onChange={(e) => setImg(e.target.files[0])}
                type="file"
                id="fileInput"
                style={{ display: "none" }}
              />
              <button
                disabled={inputData.length === 0 && !img}
                className="btn btn-success mx-2 rounded-pill"
                onClick={putDataIntoDatabase}
              >
                ➕
              </button>
            </div>
            <div className="mt-5">
              {notesData && (
                <div className="todo_style">
                  {Object.entries(notesData).map(([key, value]) => {
                    return (
                      value.note.indexOf(searchInput) !== -1 && (
                        <List
                          noteVal={value.note}
                          key={key}
                          id={key}
                          UploadImgUrl={value.url}
                          date={value.date}
                          time={value.time}
                        />
                      )
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    )
  );
}
