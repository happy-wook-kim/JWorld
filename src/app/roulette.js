'use client'
import { useEffect, useState } from 'react'
import styles from './rouletter.module.css'

export default function Roulette () {

  const [items, setItems] = useState([])  

  const addItem = () => {
    const random = (Math.random() * 100).toFixed(0)
    setItems([random, ...items])
  }

  useEffect(() => {
    makeBoard()
  }, [items])

  const colors = [
    "#3f297e", "#1d61ac", "#169ed8",
    "#209b6c ", "#60b236", "#efe61f",
    "#f7a416", "#e6471d", "#dc0936",
    "#e5177b", "#be107f", '#881f7e'
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

      ctx.save();

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
    if(items?.length > 1) {
      const canvas = document.querySelector("#canvas");
      canvas.style.transform = `initial`;
      canvas.style.transition = `initial`;
      
      setTimeout(() => {
        const ran = Math.floor(Math.random() * items.length);
        const round = Math.floor(Math.random() * 10)
        const degree = Math.floor(Math.random() * 100)
        const arc = 360 / items.length;
  
        // const rotate = (ran * arc) + 1800 + (arc * (items.length / 3));
        const rotate = 720 + (round * 360) + (items.length * degree);

        console.log(items)
        console.log(rotate % 360, arc, Math.floor((rotate % 360) / arc), items[Math.floor((rotate % 360) / arc)])
        
        canvas.style.transform = `rotate(-${rotate}deg)`;
        canvas.style.transition = `2s`;

        
        // setTimeout(() => alert(`${items[ran]}`), 2000);
      }, );
    }else {
      alert('no items')
    }
  };
  
  const fun = () => {
    var defaults = {
      angle: 0,
      angleOffset: -45,
      speed: 5000,
      easing: "easeInOutElastic",
    };

    var opt = $.extend(defaults, options);

    return this.each(function() {
      var o = opt;

      var data = [
        {
          color: '#3f297e',
          text: 'N분의 1'
        },
        {
          color: '#1d61ac',
          text: '요즘것들'
        },
        {
          color: '#169ed8',
          text: '도박'
        },
        {
          color: '#209b6c',
          text: '젓가락'
        },
        {
          color: '#60b236',
          text: '거북선'
        },
        {
          color: '#efe61f',
          text: '겁'
        },
        {
          color: '#f7a416',
          text: 'Day Day'
        },
        {
          color: '#e6471d',
          text: '호랑나비'
        },
        {
          color: '#dc0936',
          text: 'Okey Dokey'
        },
        {
          color: '#e5177b',
          text: '오빠차'
        },
        {
          color: '#be107f',
          text: 'RESPECT'
        },
        {
          color: '#881f7e',
          text: '작두'
        }
      ];

      var $wrap = $(this);
      var $btnStart = $wrap.find("#btn-start");
      var $roulette = $wrap.find(".roulette");
      var wrapW = $wrap.width();
      var angle = o.angle;
      var angleOffset = o.angleOffset;
      var speed = o.speed;
      var esing = o.easing;
      var itemSize = data.length;
      var itemSelector = "item";
      var labelSelector = "label";
      var d = 360 / itemSize;
      var borderTopWidth = wrapW;
      var borderRightWidth = tanDeg(d);

      for (i = 1; i <= itemSize; i += 1) {
        var idx = i - 1;
        var rt = i * d + angleOffset;
        var itemHTML = $('<div class="' + itemSelector + '">');
        var labelHTML = '';
            labelHTML += '<p class="' + labelSelector + '">';
            labelHTML += '	<span class="text">' + data[idx].text + '<\/span>';
            labelHTML += '<\/p>';

        $roulette.append(itemHTML);
        $roulette.children("." + itemSelector).eq(idx).append(labelHTML);
        $roulette.children("." + itemSelector).eq(idx).css({
          "left": wrapW / 2,
          "top": -wrapW / 2,
          "border-top-width": borderTopWidth,
          "border-right-width": borderRightWidth,
          "border-top-color": data[idx].color,
          "transform": "rotate(" + rt + "deg)"
        });

        var textH = parseInt(((2 * Math.PI * wrapW) / d) * .5);

        $roulette.children("." + itemSelector).eq(idx).children("." + labelSelector).css({
          "height": textH + 'px',
          "line-height": textH + 'px',
          "transform": 'translateX(' + (textH * 1.3) + 'px) translateY(' + (wrapW * -.3) + 'px) rotateZ(' + (90 + d * .5) + 'deg)'
        });

      }

      function tanDeg(deg) {
        var rad = deg * Math.PI / 180;
        return wrapW / (1 / Math.tan(rad));
      }


      $btnStart.on("click", function() {
        rotation();
      });

      function rotation() {

        var completeA = 360 * r(5, 10) + r(0, 360);

        $roulette.rotate({
          angle: angle,
          animateTo: completeA,
          center: ["50%", "50%"],
          easing: $.easing.esing,
          callback: function() {
            var currentA = $(this).getRotateAngle();

            console.log(currentA);

          },
          duration: speed
        });
      }

      function r(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }

    });
  }
  
  return (
    <section className={`${styles.game}`}>
      <canvas width={'550'} height={'550px'} id="canvas" className={styles.canvas}></canvas>
      <div className={styles.arrow}></div>
      <button className={styles.rotate} onClick={rotate}>돌리기</button>
      <button className={styles.add} onClick={addItem}>추가</button>
    </section>
  )
}