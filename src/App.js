import React, { useRef, useState } from "react";
import "./App.css";

import ReplayIcon from "@mui/icons-material/Replay";
import a from "./leseappsounds/A.mp3";
import e from "./leseappsounds/E.mp3";
import i from "./leseappsounds/I.mp3";
import o from "./leseappsounds/O.mp3";
import u from "./leseappsounds/U.mp3";
import m from "./leseappsounds/M.mp3";
import p from "./leseappsounds/P.mp3";

import k from "./leseappsounds/K.mp3";
import l from "./leseappsounds/L.mp3";

import r from "./leseappsounds/R.mp3";
import s from "./leseappsounds/S.mp3";
import t from "./leseappsounds/T.mp3";

import stille from "./leseappsounds/stille.mp3";

//-------------------------Bilder------------------

import raupe from "./images/omni1.jpg";

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

import T from "./images/T.png";

import omnidroid from "./images/omni1.jpg";

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
    { id: 1, name: "A", sound: a, image: A },

    { id: 2, name: "E", sound: e, image: E },
    { id: 3, name: "I", sound: i, image: I },
    { id: 4, name: "O", sound: o, image: O },
    { id: 5, name: "U", sound: u, image: U },

    { id: 6, name: "K", sound: k, image: K },

    { id: 7, name: "L", sound: l, image: L },

    { id: 8, name: "M", sound: m, image: M },

    { id: 9, name: "P", sound: p, image: P },

    { id: 10, name: "R", sound: r, image: R },

    { id: 11, name: "S", sound: s, image: S },
    { id: 12, name: "T", sound: t, image: T },
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

      {buttonGesperrt ? <img className="omnidroid" src={omnidroid} /> : null}
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
            <img className="birnenimage" src={item.image} />
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
                  background: "#C9D668",
                  fontSize: "2em",
                  color: "#605E5E",
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
