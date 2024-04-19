import React, { useState } from "react";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import { SignIn } from "./Components/SignIn";
import { Routes, Route } from "react-router-dom";

const App = () => {
  const [userSignedIn,setUserSignedIn] = useState(false);
  const [user,setUser] = useState(null);
  return (
    <>
      <Navbar setUserSignedIn={setUserSignedIn} userSignedIn={userSignedIn} setUser={setUser} user = {user}/>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route exact path="/login" element={<SignIn />} />
      </Routes>
    </>
  );
};

export default App;

// All below code is now added as a component 'Home'

// import React, { useEffect, useState } from "react";
// import "./App.css";
// import List from "./Components/List";
// import { List2 } from "./Components/List2";
// import { app } from "./firebase";
// import {
//   getDatabase,
//   ref,
//   set,
//   onValue,
//   remove,
//   update,
// } from "firebase/database";
// import { Navbar } from "./Components/Navbar";
// import { SignIn } from "./Components/SignIn";

// const db = getDatabase(app);
// let noteId = 0;

// export default function App() {
//   const [inputData, setinputData] = useState("");
//   const [notesData, setNotesData] = useState(null);
//   const [updating, setUpdating] = useState(false);

//   useEffect(() => {
//     const dbref = ref(db, "Notes");
//     onValue(dbref, (snapshot) => {
//       const data = snapshot.val();
//       setNotesData(data);

//       if (data) {
//         const allKeys = Object.keys(data);
//         noteId = Number(allKeys[allKeys.length - 1]) + 1;
//       }
//     });
//   }, []);

//   const handleInputNoteChange = (event) => {
//     setinputData(event.target.value);
//   };

//   const putDataIntoDatabase = () => {
//     set(ref(db, "Notes/" + noteId), {
//       id: noteId,
//       note: inputData,
//     })
//       .then(() => {
//         console.log("Note added successfully !");
//       })
//       .catch((error) => {
//         console.log(error);
//       });

//     setinputData("");
//   };

//   const deleteDataFromDatabase = (key) => {
//     const dbNoteRef = ref(db, "Notes/" + key);
//     if (window.confirm("Are you sure ?") === true) {
//       remove(dbNoteRef);
//     }
//   };

//   const updateDataFromDatabase = (key, noteValue) => {
//     // setUpdating(true);
//     // deleteDataFromDatabase(key);
//     // // const noteRef = ref(db,'Notes/' + key);
//     // setinputData(noteValue);
//     // // update(noteRef,{id:key,note:noteValue});
//     // setUpdating(false);
//     // setinputData("");
//   };

//   // Before firebase and using only usestate
//   // const listOfItems = () => {
//   //   if (inputData.length > 0) {
//   //     setItems((oldItems) => {
//   //       return [...oldItems, inputData];
//   //     });

//   //   }

//   //   setinputData("");
//   // };

//   // const deleteItems = (id) => {
//   //   setItems((oldItems) => {
//   //     return oldItems.filter((ele, idx) => {
//   //       return idx !== id;
//   //     });
//   //   });

//   //   deleteDataFromDatabase(id);
//   // };

//   return (
//     <>
//        <Navbar/>
//       <div className="mainDiv">
//         <div className="centerDiv">
//           <br />
//           {/* <h1>Note Taking App</h1> */}
//           <br />
//           <input
//             type="text"
//             placeholder="Create New Note"
//             onChange={handleInputNoteChange}
//             value={inputData}
//           />

//           <button
//             className="btn btn-secondary mx-2 rounded-pill"
//             onClick={putDataIntoDatabase}
//           >
//             {updating ? "Update" : "➕"}
//           </button>
//           <ol>
//             {notesData && (
//               <div className="todo_style">
//                 {Object.entries(notesData).map(([key, value]) => {
//                   return (
//                     <List2
//                       noteVal={value.note}
//                       key={key}
//                       id={key}
//                       onSelect={deleteDataFromDatabase}
//                       onUpdate={updateDataFromDatabase}
//                     />
//                   );
//                 })}
//               </div>
//             )}
//           </ol>
//         </div>
//       </div>
//     </>
//   );
// }
