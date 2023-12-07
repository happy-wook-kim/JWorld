'use client'
import { useEffect, useRef, useState } from 'react'
import styles from './rouletter.module.scss'
import Script from 'next/script'

export default function Roulette () {
  const colors = [
    "#3f297e", "#1d61ac", "#169ed8",
    "#209b6c ", "#60b236", "#efe61f",
    "#f7a416", "#e6471d", "#dc0936",
    "#e5177b", "#be107f", '#881f7e'
  ]
  let itemCount = 0
  const [isDraw, setDraw] = useState(false)
  const [radius, setRadius] = useState(0)
  const [fontSize, setFontSize] = useState(0)
  // const radius = window.innerWidth > window.innerHeight ? window.innerHeight / 3.6 : window.innerWidth / 3.6
  // const fontSize = Math.floor(radius / 11)

  const [items, setItems] = useState([])  
  const [theWheel, setTheWheel] = useState(undefined);
  const [result, setResult] = useState('');
  const [isRotating, setIsRotating] = useState(false)
  const [inputTextGuide, setInputTextGuide] = useState({
    show: false,
    text: '',
  })
  const [mode, setMode] = useState('') 

  const arrow = useRef(null)
  const resultH1 = useRef(null)
  const canvas = useRef(null)
  const inputItem = useRef(null)

  const addItem = () => {
    if(inputItem.current.value.trim().length > 0) {
      const value = inputItem.current.value
      inputItem.current.value = ''
      const form =  {
        'strokeStyle': '#00ff0000',
        'fillStyle' : colors[10 - items?.length % 10],
        // 'fillStyle' : `#${Math.round(Math.random() * 0xffffff).toString(16)}`,
        'text' : value.slice(0, 9),
        'textFontWeight' : value === '준노' ? '800' : '100'
      }
      setItems([form, ...items])
    }else {
      setInputTextGuide({show: true, text: '텍스트를 입력해주세요'})
      setTimeout(() => {
        setInputTextGuide({show: false, text: '텍스트를 입력해주세요'})
      }, 1000)
    }
  }
  
  useEffect(() => {
    setDraw(true)
    setRadius(window.innerWidth > window.innerHeight ? window.innerHeight / 3.6 : window.innerWidth / 3.6)
    setFontSize(Math.floor((window.innerWidth > window.innerHeight ? window.innerHeight / 3.6 : window.innerWidth / 3.6) / 11))
  }, [])
  useEffect(() => {
    setRoulette()
  }, [items])

  const rotate = () => {
    if(items?.length > 1) {
      setIsRotating(true)
      theWheel.startAnimation();
      setResult('')
      setRoulette()
    }else {
      alert('아이템을 추가해 주세요')
    }
  };
  
  const setRoulette = () => {
    if(items.length > 0) {
      arrow.current.style.top = `calc(50% - ${radius * 1.15}px)`;
      arrow.current.style.left = `calc(41% - ${fontSize / 2}px)`;
      resultH1.current.style.top = `calc(50% - ${radius * 1.3}px)`;
      resultH1.current.style.width = `${window.innerWidth / 1.8}px`;
      setTheWheel(new Winwheel({
        'outerRadius'     : radius,        // Set outer radius so wheel fits inside the background.
        'innerRadius'     : 0,         // Make wheel hollow so segments dont go all way to center.
        'textFontSize'    : items.length > 12 ? fontSize / 1.3 : fontSize * 1.2,         // Set default font size for the segments.
        'textOrientation' : items.length > 6 ? 'vertical' : 'curved', // Make text vertial so goes down from the outside of wheel.
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
          'callbackSound'    : check,   // Called when the tick sound is to be played.
          // 'soundTrigger'     : 'pin',        // Specify pins are to trigger the sound.
        },
        'pins' :                // Turn pins on.
        {
          'number'     : items?.length,
          'fillStyle'  : 'silver',
          'outerRadius': fontSize / 4,
        }
      }))
    }
  }

  const check = () => {
    if(theWheel){
      itemCount++
      
      let result = (items.length - 1) - (itemCount % items.length)
      if(result === items.length - 1) {
        result = 0
      }else {
        result++
      }
      setResult(items[result].text)
      resultH1.current.style.color = items[result].fillStyle
      arrow.current.style.fill = items[result].fillStyle
    }
  }
  
  // Called when the animation has finished.
  function alertPrize(indicatedSegment) {
    setResult(indicatedSegment.text)
    itemCount = 0
    setIsRotating(false)
  }

  const getSize = (type) => {
    let size
    if(typeof window !== 'undefined')
    {
      size = type === 'w' ? window.innerWidth / 1.8 : window.innerHeight / 1.1
    }
    return size
  }

  /**
   * event
   */

  const handleItemChange = (e) => {
    if(e.target.value.length > 8) {
      setInputTextGuide({
        show: true,
        text: '8글자 이내로 입력해주세요'
      })
      setTimeout(() => {
        setInputTextGuide({
          show: false,
          text: '8글자 이내로 입력해주세요'
        })
      }, 1000)
    }
  }
  const handleItemKeyPress = (e) => {
    if(e.key === 'Enter') {
      addItem()
    }
  }
  
  return (
    <>
      <Script src={'https://cdnjs.cloudflare.com/ajax/libs/gsap/2.0.2/TweenMax.min.js'} />
      <Script src={'Winwheel.min.js'} onLoad={setRoulette}/>
      <div className={styles.game}>
        <section className={styles.sectionBoard}>
          {isDraw ? <canvas id="canvas" width={getSize('w')} height={getSize('h')} className={styles.canvas} ref={canvas}></canvas> : <></>}
          {items.length === 0 ? <h3 className={styles.noItemGuide} active={items.length}>아이템을 추가해 주세요</h3> : <></>}
          <div className={styles.arrow}>
            <h1 className={styles.result} ref={resultH1}>{result}</h1>
            <svg active={items.length} ref={arrow} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
              <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
            </svg>
          </div>
        </section>
        <section className={styles.sectionInput}>
          <div className={styles.inputDiv}>
            <div className={styles.sectionInput__item}>
              <span active={inputTextGuide.show === false ? 'false' : 'true'} className={styles.inputTextGuide}>{inputTextGuide.text}</span>
              <input id="inputName" placeholder='아이템' type="text" disabled={isRotating} maxLength={8} ref={inputItem} 
                onChange={handleItemChange} onKeyPress={handleItemKeyPress}/>
              <button className={styles.add} onClick={addItem} disabled={isRotating}>추가</button>
            </div>
            <div>
              {/* <label htmlFor="inputName">메뉴 :</label>
              <input id="inputName" placeholder='메뉴' type="text"></input> */}
            </div>
          </div>
          <div className={styles.rotateDiv}>
            <button className={styles.rotate} onClick={rotate} disabled={isRotating}>돌리기</button>
          </div>
        </section>
      </div>
    </>
  )
}