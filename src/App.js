import React, { useEffect, useState } from 'react';
import './AppStyle.css';

function App() {
  const [state, setState] = useState({
    quote: [],
    newQuote: "This is quote",
    newAuthor: "This is author",
    bgColor: "white"
  });
  useEffect(() => {
    fetch('https://type.fit/api/quotes')
      .then((res) => res.json())
      .then(
        (data) => {
          console.log("Received data from https://type.fit/api/quotes")
          let i = Math.floor(Math.random() * data.length);
          setState({
            ...state, 
            quote: data, 
            newQuote: data[i].text,
            newAuthor: data[i].author.substring(0, data[i].author.length - 10),
            bgColor: getRandomColor()
          })
        }
      );
  }, []);
  const handleTweet = () => {
    console.log("handleTweet has been called");
    let url = "https://twitter.com/intent/tweet?text=" + '"' + state.newQuote + '" - ' + state.newAuthor;
    window.open(url, "_blank");
  }
  const handleCopy = () => {
    navigator.clipboard.writeText('"' + state.newQuote + '" - ' + state.newAuthor);
  }
  const handleNewQuote = () => {
    let i = Math.floor(Math.random() * state.quote.length);
    while (state.quote[i].text == state.newQuote){
      i = Math.floor(Math.random() * state.quote.length);
    }
    let q = state.quote[i];
    if (state.quote[i].author.length - 10 <= 0) { 
      setState({...state, 
        newQuote: q.text,
        newAuthor: q.author, 
        bgColor: getRandomColor()
      }); 
    }
    else { 
      setState({...state, 
        newQuote: q.text,
        newAuthor: q.author.substring(0, q.author.length - 10), 
        bgColor: getRandomColor()
      }); 
    }
  }
  const btnBg = { backgroundColor: state.bgColor, transition: ".5s ease-in" };
  return (
    <div className='container' style={{ backgroundColor: state.bgColor }}>
      <div className="quoteBox" style={{ color: state.bgColor }}>
        <div className='quoteAndAuthor'>
          <div id='text'>
            <h1>" </h1>
            <h2>{state.newQuote}</h2>
          </div>
          <p id='author'>- {state.newAuthor}</p>
        </div>
        <div className='buttons'>
          <div className='icon'>
          <button className='buttonIcon' onClick={() => handleTweet()} style={btnBg} title='Tweet this quote'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" id="twitter" height={"16px"} width={"40px"}>
            <path fill="#fff" d="M16 3.539a6.839 6.839 0 0 1-1.89.518 3.262 3.262 0 0 0 1.443-1.813 6.555 6.555 0 0 1-2.08.794 3.28 3.28 0 0 0-5.674 2.243c0 .26.022.51.076.748a9.284 9.284 0 0 1-6.761-3.431 3.285 3.285 0 0 0 1.008 4.384A3.24 3.24 0 0 1 .64 6.578v.036a3.295 3.295 0 0 0 2.628 3.223 3.274 3.274 0 0 1-.86.108 2.9 2.9 0 0 1-.621-.056 3.311 3.311 0 0 0 3.065 2.285 6.59 6.59 0 0 1-4.067 1.399c-.269 0-.527-.012-.785-.045A9.234 9.234 0 0 0 5.032 15c6.036 0 9.336-5 9.336-9.334 0-.145-.005-.285-.012-.424A6.544 6.544 0 0 0 16 3.539z"></path></svg></button>
          <button className='buttonIcon' onClick={() => handleCopy()} style={btnBg} title="Copy to clipboard"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" id="copy" height="18px" width="40px">
            <path fill="#fff" d="M4.00029246,4.08524952 L4,10.5 C4,11.8254834 5.03153594,12.9100387 6.33562431,12.9946823 L6.5,13 L10.9143985,13.000703 C10.7082819,13.5829319 10.1528467,14 9.5,14 L6,14 C4.34314575,14 3,12.6568542 3,11 L3,5.5 C3,4.84678131 3.41754351,4.29108512 4.00029246,4.08524952 Z M11.5,2 C12.3284271,2 13,2.67157288 13,3.5 L13,10.5 C13,11.3284271 12.3284271,12 11.5,12 L6.5,12 C5.67157288,12 5,11.3284271 5,10.5 L5,3.5 C5,2.67157288 5.67157288,2 6.5,2 L11.5,2 Z"></path></svg></button>
          </div>
          <button className='button' onClick={() => handleNewQuote()} style={btnBg}>New quote</button>
        </div>
      </div>
      <a target='_blank' href='https://github.com/AnhBigBrother/random-quote'>by big-bro</a>
    </div>
  );
}

const getRandomColor = () => {
  let r = 50 + Math.floor(Math.random() * 100);
  let g = 50 + Math.floor(Math.random() * 100);
  let b = 50 + Math.floor(Math.random() * 100);
  return "rgb(" + r + "," + g + "," + b + ")";
}

export default App;