import React, { useRef, useState } from "react";
import "./App.css";

import ReplayIcon from "@mui/icons-material/Replay";
import a from "./leseappsounds/A.mp3";
import e from "./leseappsounds/E.mp3";
import i from "./leseappsounds/I.mp3";
import o from "./leseappsounds/O.mp3";
import u from "./leseappsounds/U.mp3";

import k from "./leseappsounds/K.mp3";
// import ka from "./leseappsounds/KA.mp3";
import l from "./leseappsounds/L.mp3";
// import li from "./leseappsounds/li.mp3";
// import lo from "./leseappsounds/lo.mp3";
import m from "./leseappsounds/M.mp3";
// import ma from "./leseappsounds/ma.mp3";
// import mi from "./leseappsounds/mi.mp3";
import p from "./leseappsounds/P.mp3";
// import pa from "./leseappsounds/pa.mp3";

import r from "./leseappsounds/R.mp3";
import s from "./leseappsounds/S.mp3";

import stille from "./leseappsounds/stille.mp3";

//-------------------------bilder------------------

import raupe from "./images/omni1.png";

import kb from "./images/kb.jpg";

import A from "./images/A.png";
import E from "./images/E.png";
import I from "./images/I.jpg";
import O from "./images/O.jpg";
import U from "./images/U.jpg";
import K from "./images/K.jpg";
import L from "./images/L.jpg";
import M from "./images/M.gif";
import P from "./images/P.gif";
import R from "./images/R.jpg";
import S from "./images/S.jpg";

import omnidroid from "./images/omni1.png";

import { Button } from "@mui/material";

function App() {
  // states--------------------------------------------------------
  const [dragging, setDragging] = useState(false);
  const [draggedItem, setDraggedItem] = useState(null);
  const [droppedItems, setDroppedItems] = useState([
    { id: 0, name: "", sound: stille, image: raupe },
  ]);
  const audioRef = useRef();
  const soundData = [
    { id: 1, name: "D", sound: a, image: A, color: "#C0BFBBFF" },
    { id: 2, name: "SP", sound: o, image: O, color: "#E39D35FF" },
    { id: 3, name: "S", sound: u, image: U, color: "#E39D35FF" },
    { id: 4, name: "E", sound: e, image: E, color: "#6CE335FF" },
    { id: 5, name: "C", sound: stille, image: kb, color: "#E3CC35FF" },

    { id: 6, name: "B", sound: stille, image: kb, color: "#F87777FF" },
    { id: 7, name: "P", sound: stille, image: kb, color: "#F87777FF" },
    { id: 8, name: "Z", sound: stille, image: kb, color: "#802E2EFF" },
    { id: 9, name: "I", sound: i, image: I, color: "#6CE335FF" },
    { id: 10, name: "CK", sound: stille, image: kb, color: "#E3CC35FF" },

    { id: 11, name: "T", sound: stille, image: kb, color: "#802E2EFF" },
    { id: 12, name: "F", sound: stille, image: kb, color: "#35E3CCFF" },
    { id: 13, name: "W", sound: stille, image: kb, color: "#35E3CCFF" },
    { id: 14, name: "Y", sound: stille, image: M, color: "#6CE335FF" },
    { id: 15, name: "G", sound: stille, image: kb, color: "#E3CC35FF" },

    { id: 16, name: "M", sound: stille, image: kb, color: "#E335DAFF" },
    { id: 17, name: "N", sound: stille, image: kb, color: "#C0BFBBFF" },
    { id: 18, name: "U", sound: stille, image: kb, color: "#355DE3FF" },
    { id: 19, name: "A", sound: stille, image: kb, color: "#355DE3FF" },
    { id: 20, name: "K", sound: stille, image: kb, color: "#E3CC35FF" },

    { id: 21, name: "CH", sound: stille, image: kb, color: "#2A0A62FF" },
    { id: 22, name: "SCH", sound: stille, image: kb, color: "#2A0A62FF" },
    { id: 24, name: "O", sound: stille, image: kb, color: "#2A0A62FF" },
    { id: 23, name: "ST", sound: stille, image: kb, color: "#2A0A62FF" },
    { id: 25, name: "X", sound: stille, image: kb, color: "#E3CC35FF" },
  ];
  const [currentSoundIndex, setCurrentSoundIndex] = useState(0);
  const currentSound = droppedItems[currentSoundIndex];
  const [buttonGesperrt, setButtonGesperrt] = useState(false);
  // funktionen---------------------------------------------------
  const handleDragStart = (event, item) => {
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", JSON.stringify(item));
    setDraggedItem(item);
    setDragging(true);
  };

  const handleDragEnd = () => {
    setDragging(false);
    setDraggedItem(null);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const data = event.dataTransfer.getData("text/plain");
    const item = JSON.parse(data);
    setDroppedItems([...droppedItems, item]);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handlePlay = (audio) => {
    audio.play();
  };

  const handleEnded = () => {
    // Wenn der aktuelle Sound beendet ist, zum nächsten Sound gehen.

    if (currentSoundIndex < droppedItems?.length - 1) {
      audioRef.current.play();
      setCurrentSoundIndex((currentSoundIndex) => currentSoundIndex + 1);
    }
  };

  const playall = () => {
    setButtonGesperrt(true);
    setTimeout(() => setButtonGesperrt(false), 3000);
    setCurrentSoundIndex(0);
    handleEnded();
  };
  const reset = () => {
    setCurrentSoundIndex(0);
    setDroppedItems([{ id: 0, name: "", sound: stille, image: raupe }]);
  };

  // UI-------------------------------------------------------------
  return (
    <div className="wrapper">
      <div>
        <audio
          ref={audioRef}
          src={currentSound.sound}
          onEnded={handleEnded}
          autoPlay
        />
      </div>

      {buttonGesperrt ? (
        <img className="omnidroid" src={omnidroid} alt="omni" />
      ) : null}
      {/* lesezone----------------------------------------- */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className={dragging ? "drop-zone dragging" : "drop-zone"}
        style={{
          display: "flex",
          position: "relative",
          top: "50px",
          width: "100vw",
          height: "350px",

          overflowX: "scroll",
        }}
      >
        <div />
        <Button
          className="raupe"
          style={{
            width: "100vw",
            height: "200px",
            position: "absolute",
          }}
          variant="text"
          color="primary"
          onClick={() => {
            playall();
          }}
          disabled={buttonGesperrt}
        />

        <Button
          style={{
            minWidth: "100px",
            height: "100px",
            position: "absolute",
            top: "55%",
            left: "50%",
            background: "#7DAB34EB",
          }}
          variant="contained"
          onClick={() => {
            reset();
          }}
        >
          <ReplayIcon fontSize="large" />
        </Button>
        {droppedItems.map((item, index) => (
          <div className="lesezone_divs" key={index}>
            <img className="birnenimage" src={item.image} alt="zone" />
            <p className="item">{item.name}</p>
          </div>
        ))}
      </div>
      {/* --------------- auswahlzone----------------*/}
      <div className="drag-items">
        {soundData.map((item) => (
          <div
            key={item.id}
            draggable
            onDragStart={(event) => handleDragStart(event, item)}
            onDragEnd={handleDragEnd}
            className={
              draggedItem && draggedItem.id === item.id ? "dragging" : ""
            }
          >
            <div>
              <Button
                className="Button_auswahl"
                style={{
                  width: "15vw",
                  height: "10vh",
                  background: item.color,
                  fontSize: "2em",
                  color: "#F2EDEDFF",
                }}
                variant="contained"
                onClick={() => handlePlay(new Audio(item.sound))}
              >
                {item.name}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
