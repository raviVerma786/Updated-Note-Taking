import React, { useEffect, useState, useContext } from "react";
import "../App.css";
import { List } from "./List";
import { app, imgDb } from "../firebase";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { UserContext } from "../Context/UserCredentials";
import { useNavigate } from "react-router-dom";
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";

const db = getDatabase(app);
let noteId = 0;
export default function Home() {
  const [inputData, setinputData] = useState("");
  const [notesData, setNotesData] = useState(null);
  const [img, setImg] = useState(null);
  const [imgUrl, setImgUrl] = useState("");

  const navigate = useNavigate();
  const userDetails = useContext(UserContext);

  useEffect(() => {
    const dbref = ref(db, `${userDetails.user}/Notes`);
    const token = localStorage.getItem("token");

    if (token) {
      userDetails.setSignedIn(true);
      userDetails.setUser(localStorage.getItem("userId"));
    } else {
      userDetails.setSignedIn(false);
      navigate("/login");
    }

    onValue(dbref, (snapshot) => {
      const data = snapshot.val();
      setNotesData(data);

      if (data) {
        const allKeys = Object.keys(data);
        noteId = Number(allKeys[allKeys.length - 1]) + 1;
      }
    });
  }, [navigate, userDetails]);

  const handleInputNoteChange = (event) => {
    setinputData(event.target.value);
  };

  const putDataIntoDatabase = async () => {
    //storing image into database
    if (img) {
      const imgRef = storageRef(imgDb, ` ${userDetails.user}/Notes/` + noteId);
      await uploadBytes(imgRef, img)
        .then((file) => {
          console.log(file);
          return getDownloadURL(file.ref);
        })
        .then((url) => {
          setImgUrl(url);
          // setting time and date
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
          // Now putting everything into Firebase Realtime Database
          return set(ref(db, `${userDetails.user}/Notes/` + noteId), {
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
        ref(db, `${userDetails.user}/Notes/` + noteId),
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

  // const putDataIntoDatabase = () => {

  //   //storing image into database
  //   if (img) {
  //     const imgRef = storageRef(imgDb, `${userDetails.user}/Notes/` + noteId);
  //     uploadBytes(imgRef, img)
  //       .then((file) => {
  //         console.log(file);
  //         getDownloadURL(file.ref).then((val) => {
  //           setImgUrl(val);
  //         });
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }

  //   //setting time and date
  //   const date = new Date();
  //   const timeZone = "Asia/Kolkata";
  //   const t = new Intl.DateTimeFormat("en-US", {
  //     timeStyle: "short",
  //     timeZone,
  //   }).format(date);
  //   const dt = new Intl.DateTimeFormat("en-US", {
  //     dateStyle: "medium",
  //     timeZone,
  //   }).format(date);
  //   // console.log(tme.format(date));

  //   // const mm = date.getMonth() + 1;
  //   // const dd = date.getDate();
  //   // const yy = date.getFullYear();
  //   // const hh = date.getHours();
  //   // const min = date.getMinutes();

  //   // const dt = `${dd}/${mm}/${yy}`;
  //   // const t = `${hh}:${min}`;

  //   //Now putting everything into firebase realtime database
  //   set(ref(db, `${userDetails.user}/Notes/` + noteId), {
  //     id: noteId,
  //     note: inputData,
  //     url: imgUrl,
  //     date: dt,
  //     time: t,
  //   })
  //     .then(() => {
  //       console.log("Note added successfully !");
  //       setinputData("");
  //       setImg(null);
  //       setImgUrl("");
  //       document.getElementById("fileInput").value = null;
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  return (
    userDetails.signedIn && (
      <>
        <div className="mainDiv">
          <div className="centerDiv">
            <br />
            {userDetails.signedIn && <h2>Welcome To NoteTaking App</h2>}
            <br />
            <input
              id="noteInput"
              type="text"
              placeholder="Create New Note"
              onChange={handleInputNoteChange}
              value={inputData}
            />
            <input
              onChange={(e) => setImg(e.target.files[0])}
              type="file"
              id="fileInput"
            />
            <button
              disabled={inputData.length === 0}
              className="btn btn-success mx-2 rounded-pill"
              onClick={putDataIntoDatabase}
            >
              ➕
            </button>
            <div className="mt-5">
              {notesData && (
                <div className="todo_style">
                  {Object.entries(notesData).map(([key, value]) => {
                    return (
                      <List
                        noteVal={value.note}
                        key={key}
                        id={key}
                        UploadImgUrl={value.url}
                        date={value.date}
                        time={value.time}
                      />
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
