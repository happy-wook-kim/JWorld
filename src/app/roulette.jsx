'use client'
import { useEffect, useRef, useState } from 'react'
import styles from './rouletter.module.css'
import Script from 'next/script'

export default function Roulette () {
  const colors = [
    "#3f297e", "#1d61ac", "#169ed8",
    "#209b6c ", "#60b236", "#efe61f",
    "#f7a416", "#e6471d", "#dc0936",
    "#e5177b", "#be107f", '#881f7e'
  ]
  const radius = window.innerWidth > window.innerHeight ? window.innerHeight / 3.6 : window.innerWidth / 3.6
  const fontSize = Math.floor(radius / 11)

  const [items, setItems] = useState([
    {
      'strokeStyle': '#00ff0000',
      'fillStyle' : colors[10],
      'text' : '돈까스',
    },
    {
      'strokeStyle': '#00ff0000',
      'fillStyle' : colors[9],
      'text' : '김밥천국',
    },{
      'strokeStyle': '#00ff0000',
      'fillStyle' : colors[8],
      'text' : '가나다라마바사아자',
    }
  ])  
  const [theWheel, setTheWheel] = useState([])
  const [result, setResult] = useState('')

  const arrow = useRef(null)
  const resultH1 = useRef(null)
  const canvas = useRef(null)

  const addItem = () => {
    const random = (Math.random() * 100).toString()
    const form =  {
      'strokeStyle': '#00ff0000',
      'fillStyle' : colors[10 - items?.length % 10],
      'text' : random.slice(0, 9),
    }
    setItems([form, ...items])
    //   {'strokeStyle': '#00ff0000', 'fillStyle' : '#000000', 'text' : '6', 'textFillStyle' : '#ffffff', 'textFontWeight': 200},
  }

  useEffect(() => {
    if(items.length > 3){
      setRoulette()
    }
  }, [items])

  const rotate = () => {
    if(items?.length > 1) {
      theWheel.startAnimation();
      setRoulette()
      // const canvas = document.querySelector("#canvas");
      // canvas.style.transform = `initial`;
      // canvas.style.transition = `initial`;
    }else {
      alert('no items')
    }
  };
  
  const setRoulette = () => {
    arrow.current.style.top = `calc(50% - ${radius}px)`;
    arrow.current.style.left = `calc(41% - ${fontSize / 4}px)`;
    resultH1.current.style.top = `calc(50% - ${radius * 1.2}px)`;
    resultH1.current.style.width = `${window.innerWidth / 1.8}px`;
    resultH1.current.innerText = '2312312321'
    setTheWheel(new Winwheel({
      'outerRadius'     : radius,        // Set outer radius so wheel fits inside the background.
      'innerRadius'     : 0,         // Make wheel hollow so segments dont go all way to center.
      'textFontSize'    : items.length > 12 ? fontSize / 1.3 : fontSize * 1.2,         // Set default font size for the segments.
      'textOrientation' : 'vertical', // Make text vertial so goes down from the outside of wheel.
      'textAlignment'   : 'outer',    // Align text to outside of wheel.
      'textFontFamily'  : 'NotoSans KR',
      'textFillStyle'   : '#FFF',
      'numSegments'     : items?.length,         // Specify number of segments.
      'segments'        : items,           // Define segments including colour and text. font size and text colour overridden on backrupt segments.
      'animation' :           // Specify the animation to use.
      {
        'type'     : 'spinToStop',
        'duration' : 8,
        'spins'    : 5,
        'callbackFinished' : alertPrize,  // Function to call whent the spinning has stopped.
        // 'callbackSound'    : check,   // Called when the tick sound is to be played.
        // 'soundTrigger'     : 'pin'        // Specify pins are to trigger the sound.
        'callbackAfter' : check()
      },
      'pins' :                // Turn pins on.
      {
        'number'     : items?.length,
        'fillStyle'  : 'silver',
        'outerRadius': fontSize / 4,
      }
    }))
  }

  const check = (e) => {
    console.log(e)
  }
  
  // Called when the animation has finished.
  function alertPrize(indicatedSegment)
  {
    // if (indicatedSegment.text == 'LOOSE TURN') {
    //   alert('Sorry but you loose a turn.');
    // } else if (indicatedSegment.text == 'BANKRUPT') {
    //   alert('Oh no, you have gone BANKRUPT!');
    // } else {
    //   alert("You have won " + indicatedSegment.text);
    // }
    setResult(indicatedSegment.text)
  }

  const getSize = (type) => {
    const size = type === 'w' ? window.innerWidth / 1.8 : window.innerHeight
    return size
  }
  
  return (
    <>
      <Script src={'https://cdnjs.cloudflare.com/ajax/libs/gsap/2.0.2/TweenMax.min.js'} />
      <Script src={'Winwheel.min.js'} onLoad={setRoulette}/>
      <div className={styles.game}>
        <section className={styles.sectionBoard}>
          <canvas id="canvas" width={getSize('w')} height={getSize('h')} className={styles.canvas} ref={canvas}></canvas>
          <div className={styles.arrow}>
            <h1 className={styles.result} ref={resultH1}>{result}</h1>
            <svg ref={arrow} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
              <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
            </svg>
          </div>
        </section>
        <section className={styles.sectionInput}>
          <div>
            <div>
              <label htmlFor="inputName">메뉴 :</label>
              <input id="inputName" placeholder='메뉴' type="text"></input>
            </div>
            <div>
              {/* <label htmlFor="inputName">메뉴 :</label>
              <input id="inputName" placeholder='메뉴' type="text"></input> */}
            </div>
          </div>
          <div>
            <button className={styles.rotate} onClick={rotate}>돌리기</button>
            <button className={styles.add} onClick={addItem}>추가</button>
          </div>
        </section>
      </div>
    </>
  )
}