import React, { useRef, useState } from "react";
import "./App.css";

import a from "./leseappsounds/A.mp3";
import e from "./leseappsounds/E.mp3";
import i from "./leseappsounds/I.mp3";
import o from "./leseappsounds/O.mp3";
import u from "./leseappsounds/U.mp3";
import k from "./leseappsounds/K.mp3";
import l from "./leseappsounds/L.mp3";
import m from "./leseappsounds/M.mp3";
import p from "./leseappsounds/P.mp3";
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
import M from "./images/M.gif";

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
    { id: 1, name: "A", sound: a, image: A, color: "#7ECFCBFF" },
    { id: 2, name: "B", sound: stille, image: kb, color: "#E39D35FF" },
    { id: 3, name: "C", sound: stille, image: kb, color: "#355DE3FF" },
    { id: 4, name: "L", sound: l, image: kb, color: "#CFD3CDFF" },
    { id: 5, name: "S", sound: s, image: kb, color: "#E3CC35FF" },

    { id: 6, name: "EI", sound: stille, image: kb, color: "#7ECFCBFF" },
    { id: 7, name: "P", sound: p, image: kb, color: "#E39D35FF" },
    { id: 8, name: "G", sound: stille, image: kb, color: "#64A1DAFF" },
    { id: 9, name: "M", sound: m, image: M, color: "#C0BFBBFF" },
    { id: 10, name: "ST", sound: stille, image: kb, color: "#E3CC35FF" },

    { id: 11, name: "I", sound: i, image: I, color: "#F87777FF" },
    { id: 12, name: "D", sound: stille, image: kb, color: "#6FE335FF" },
    { id: 13, name: "K", sound: k, image: kb, color: "#355DE3FF" },
    { id: 14, name: "N", sound: stille, image: kb, color: "#C0BFBBFF" },
    { id: 15, name: "SP", sound: stille, image: kb, color: "#E3CC35FF" },

    { id: 16, name: "J", sound: stille, image: I, color: "#F87777FF" },
    { id: 17, name: "T", sound: stille, image: kb, color: "#6FE335FF" },
    { id: 18, name: "Q", sound: stille, image: kb, color: "#355DE3FF" },
    { id: 19, name: "R", sound: r, image: kb, color: "#2A0A62FF" },
    { id: 20, name: "SCH", sound: stille, image: kb, color: "#E3CC35FF" },

    { id: 21, name: "Y", sound: stille, image: I, color: "#F87777FF" },
    { id: 22, name: "O", sound: o, image: O, color: "#EDD05AFF" },
    { id: 24, name: "F", sound: stille, image: kb, color: "#10795DFF" },
    { id: 23, name: "CH", sound: stille, image: kb, color: "#2A0A62FF" },
    { id: 25, name: "", sound: stille, image: kb, color: "#FFFFFFFF" },

    { id: 26, name: "IE", sound: stille, image: I, color: "#F87777FF" },
    { id: 27, name: "U", sound: u, image: U, color: "#EDD05AFF" },
    { id: 28, name: "V", sound: stille, image: kb, color: "#10795DFF" },
    { id: 29, name: "H", sound: stille, image: kb, color: "#2A0A62FF" },
    { id: 30, name: "", sound: stille, image: kb, color: "#FFFFFFFF" },

    { id: 31, name: "E", sound: e, image: E, color: "#F87777FF" },
    { id: 32, name: "EU", sound: stille, image: kb, color: "#EDD05AFF" },
    { id: 33, name: "W", sound: stille, image: kb, color: "#10795DFF" },
    { id: 34, name: "", sound: stille, image: kb, color: "#FFFFFFFF" },
    { id: 35, name: "", sound: stille, image: kb, color: "#FFFFFFFF" },
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
      <h1> Zieh die Buchstaben zur Roboterspinne!</h1>
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
        <h2
          style={{
            minWidth: "70px",
            height: "75px",
            background: "#7DAB34D1",
            color: "white",
            textAlign: "center",
            borderRadius: "10px",
            alignContent: "center",
          }}
        >
          LOS
        </h2>
        <Button
          className="raupe"
          style={{
            width: "95vw",
            height: "200px",
            position: "absolute",
            border: "2px solid grey",
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
            minWidth: "70px",
            height: "75px",
            position: "absolute",
            top: "55%",
            left: "50%",
            background: "#323131EB",
          }}
          variant="contained"
          onClick={() => {
            reset();
          }}
        >
          <h3>RESET</h3>
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
