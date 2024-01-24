/* eslint-disable react/jsx-key */
"use client";
import { loadGetInitialProps } from "next/dist/shared/lib/utils";
import React, { useState } from "react";

const Page = () => {
  const [title, settitle] = useState("");
  const [desc, setdesc] = useState("");

  //ab hum tasks show karne ke liye hum yaha pe ek array hook banayenge
  const [mainTask, setMainTask] = useState([]);

  // form submit karne ke baad page reload na ho uske liye hum ek function bana rahe hai
  const submitHandler = (e) => {
    //jese hei mai form pe click kar raha hu toh woh turant page reload kar de raha hai, preventDefault ek inbuilt method hai jo hamara form submit hone se rook leti hai
    e.preventDefault();
    // console.log(title);
    // console.log(desc);

    // "..." we are using spread operator, because mai nahi chahata ki jab mai 1st task ke baad second task likhu tab mera pehele wala task gayab ho jaye
    setMainTask([...mainTask, { title, desc }]);

    // settitle("") ki madat se mai form ki values ko waps clear kar pa raha hu
    settitle("");
    setdesc("");

    console.log(mainTask);
  };

  // Deleted Item ko handle karne ke liye
  const deleteHandler = (i) => {
    //kyuki array ek refrence variable hota hai, isliye maine copytask ke andar sare task ko copy kar liya jo mainTask ke andar store the
    let copytask = [...mainTask];

    // splice ke help se hum kisi bhi array ke element ko bich se delete kar sakte hai indexNum pass kar ke, kyuki pop hamesha array ke last elements ko remove karta hai isliye hum uska use nahi karenge
    // splice({indexNumber}, {numberOfElement jitne delete karna hai indexNumber se})
    copytask.splice(i, 1);
    setMainTask(copytask);
  };

  const completeHandler = (i) => {
    let copytask = [...mainTask];
    copytask[i].completed = !copytask[i].completed;
    setMainTask(copytask);
  };

  let renderTask = <h2 className="text-center font-bold text-2xl font-mono">No Task Added</h2>;

  // mainTask hamara ek array hai jisko access karne ke liye ab map method ka use karenge, map(function({currentValue},{index}))
  if (mainTask.length > 0) {
    renderTask = mainTask.map(function (t, i) {
      return (
        // key haar ek elements ko unique id deta hai jisse react elements mai diffrentiate kar pata hai. And iss case mai array ka index ek unique id ke jese kam karega tak hum specific task ko delete kar sake
        // <li key={i} className="flex items-center justify-between mb-5">
        <li key={i} className="flex items-center justify-between mb-5">
          <div className={`w-2/4 ${t.completed ? "line-through" : ""}`}>
            <h5 className="text-2xl font-semibold">{t.title}</h5>
            <p className="text-xl font-light">{t.desc}</p>
          </div>
          <div className="flex flex-grow justify-between">
            <button
              onClick={() => {
                deleteHandler(i);
              }}
              className="bg-red-400 text-white px-4 py-2 rounded font-bold "
            >
              Delete
            </button>
            <button
              onClick={() => {
                completeHandler(i);
              }}
              className="bg-green-400 text-white px-4 py-2 rounded font-bold "
            >
              {t.completed ? "Undo" : "Complete"}
            </button>
          </div>
        </li>
      );
    });
  }

  return (
    <>
      <h1 className="bg-cyan-950 text-white p-5 text-5xl font-bold text-center">
        Your&apos;s Todo List
      </h1>
      <form onSubmit={submitHandler}>
        <div className="text-center">
          <input
            type="text"
            className="text-xl border-zinc-800 border-4 m-8 px-4 py-2"
            value={title}
            onChange={(e) => {
              /* yaha pe mai title ki value ko change karke user ke input ki value add kar raha hu. And this method is called Two-Way-Binding */
              settitle(e.target.value);
            }}
            placeholder="Enter Task Here"
          />
          <input
            type="text"
            className="text-xl border-zinc-800 border-4 m-8 px-4 py-2"
            value={desc}
            onChange={(e) => {
              setdesc(e.target.value);
            }}
            placeholder="Enter Description Here"
          />
          <button className="bg-cyan-950 text-white px-4 py-3 text-2xl font-bold rounded m-5">
            Add Task
          </button>
        </div>
      </form>
      <hr />
      {/* yaha se mere sare tasks show honge */}
      <div className="p-8 bg-slate-200">
        <ul>{renderTask}</ul>
      </div>
    </>
  );
};

export default Page;
