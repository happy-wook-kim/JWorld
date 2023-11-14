'use client'
import { useEffect, useState } from 'react'
import styles from './rouletter.module.css'

export default function Roulette () {

  const [items, setItems] = useState([])  

  const addItem = () => {
    const random = (Math.random() * 100).toFixed(0)
    setItems([...items, random])
  }

  useEffect(() => {
    makeBoard()
  }, [items])

  const colors = [
    "#dc0936", "#e6471d", "#f7a416", 
    "#efe61f ", "#60b236", "#209b6c", 
    "#169ed8", "#3f297e", "#87207b", 
    "#be107f", "#e7167b"
  ]

  const makeBoard = () => {
    const canvas = document.querySelector("#canvas");
    const ctx = canvas.getContext(`2d`);
    const [cw, ch] = [canvas.width / 2, canvas.height / 2];
    const arc = Math.PI / (items.length / 2);
  
    // 룰렛 배경 그리기
    for (let i = 0; i < items.length; i++) {
      ctx.beginPath();
      ctx.fillStyle = colors[i % (colors.length -1)];
      ctx.moveTo(cw, ch);
      ctx.arc(cw, ch, cw, arc * (i - 1), arc * i);
      ctx.fill();
      ctx.closePath();
    }

    ctx.fillStyle = "#fff";
    ctx.font = "18px Pretendard";
    ctx.textAlign = "center";

    for (let i = 0; i < items.length; i++) {
      const angle = (arc * i) + (arc / 2);

      ctx.save()  ;

      ctx.translate(
        cw + Math.cos(angle) * (cw - 50),
        ch + Math.sin(angle) * (ch - 50),
      );

      ctx.rotate(angle + Math.PI / 2);

      items[i].split(" ").forEach((text, j) => {
        ctx.fillText(text, 0, 20 * j);
      });

      ctx.restore();
    }
  }

  const rotate = () => {
    const canvas = document.querySelector("#canvas");
    canvas.style.transform = `initial`;
    canvas.style.transition = `initial`;
    
    setTimeout(() => {
      const ran = Math.floor(Math.random() * items.length);
      const arc = 360 / items.length;

      // const rotate = (arc * ran)

      const rotate = (ran * arc) + 1800 + (arc * (items.length / 3));
      
      canvas.style.transform = `rotate(-${rotate}deg)`;
      canvas.style.transition = `2s`;

      console.log(items[ran], rotate)
      
      // setTimeout(() => alert(`오늘의 야식은?! ${items[ran]} 어떠신가요?`), 2000);
    }, 1);
  };


  return (
    <section className={`${styles.game} border-2 border-solid border-purple-500 hover:border-gray-500`}>
      <canvas width={'550'} height={'550px'} id="canvas" className={styles.canvas}></canvas>
      <div className={styles.arrow}></div>
      <button className={styles.rotate} onClick={rotate}>돌리기</button>
      <button className={styles.add} onClick={addItem}>추가</button>
    </section>
  )
}