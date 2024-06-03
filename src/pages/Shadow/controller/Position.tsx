import { useRef, useState } from 'react'
import s from '../index.module.scss'
import {useStore} from '../store'

export default function ScrollBar() {
  const [elementX, setElementX] = useState(150)
  const [elementY, setElementY] = useState(160)
  const moveX = useRef(0)
  const moveY = useRef(0)
  const lightref = useRef(null)
  const x = useRef(0)
  const y = useRef(0)

  const seth = useStore((state) => (state.seth))
  const setv = useStore((state) => (state.setv))

  function start(e: any) {
    moveX.current= e.clientX
    moveY.current = e.clientY

    document.addEventListener('mousemove',move,false)
    document.addEventListener('mouseup',end,false)
    // console.log(lightref.current.clientHeight)
    // console.log(lightref.current.clientWidth)
    // console.log(lightref.current.getBoundingClientRect())
  }
  function move(e) {
    let disX = e.clientX - moveX.current
    let disY = e.clientY - moveY.current
    let nowX = elementX + disX
    let nowY = elementY + disY
    x.current = nowX -150
    y.current = nowY -160
    setElementX(nowX)
    setElementY(nowY)
    if (nowX < 0) {
      setElementX(0)
      x.current = -150
    }
    if (nowX > lightref.current.clientWidth) {
      setElementX(lightref.current.clientWidth)
      x.current = 150
    }
    if (nowY < 0) {
      setElementY(0)
      y.current = -160
    }
    if (nowY > lightref.current.clientHeight) {
      setElementY(lightref.current.clientHeight)
      y.current = 160
    }
    seth(x.current)
    setv(y.current)
  }
  function end() {
    document.removeEventListener('mousemove',move)
    document.removeEventListener('mouseup',end)
  }


  return (
    <div className={s.light} ref={lightref}>
      <div className={s.row_line}></div>
      <div className={s.column_line}></div>
      <div 
        className={s.circle}
        onMouseDown={start}
        style={{ top: `${elementY}px`,left: `${elementX}px`}}
      ></div>
      <div>x:{x.current}</div>
      <div>y:{y.current}</div>
    </div>
  )
}