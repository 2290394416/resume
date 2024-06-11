import { useRef, useState } from 'react'
import s from '../index.module.scss'
import {useStore} from '../store'

export default function ScrollBar() {
  const [elementX, setElementX] = useState(150)
  const [elementY, setElementY] = useState(160)
  const moveX = useRef(0)
  const moveY = useRef(0)
  const lightref = useRef(null)
  const [x, setX] = useState(0)
  const [y, setY] = useState(0)

  const seth = useStore((state: any) => (state.seth))
  const setv = useStore((state: any) => (state.setv))

  function start(e: any) {
    moveX.current= e.clientX
    moveY.current = e.clientY

    document.addEventListener('mousemove',move,false)
    document.addEventListener('mouseup',end,false)
  }
  function move(e: any) {
    let disX = e.clientX - moveX.current
    let disY = e.clientY - moveY.current
    let nowX = elementX + disX
    let nowY = elementY + disY
    setElementX(nowX)
    setElementY(nowY)
    let posX = nowX - 150
    let posY = nowY - 160
    setX(posX)
    setY(posY)
    seth(posX)
    setv(posY)
    if (nowX < 0) {
      setElementX(0)
      setX(-150)
      seth(-150)
    }
    if (nowX > lightref.current.clientWidth) {
      setElementX(lightref.current.clientWidth)
      setX(150)
      seth(150)
    }
    if (nowY < 0) {
      setElementY(0)
      setY(-160)
      setv(-160)
    }
    if (nowY > lightref.current.clientHeight) {
      setElementY(lightref.current.clientHeight)
      setY(160)
      setv(160)
    }
  }
  function end() {
    document.removeEventListener('mousemove',move)
    document.removeEventListener('mouseup',end)
  }
  function click(e: any) {
    const lightLeft = lightref.current.getBoundingClientRect().left
    const lightTop = lightref.current.getBoundingClientRect().top
    let __x = e.clientX - lightLeft
    let __y = e.clientY - lightTop
    if( __y < 0) {
      return
    } else {
      setElementX(__x)
      setElementY(__y)
      setX(__x - 150)
      setY(__y - 160)
      seth(__x - 150)
      setv(__y - 160)
    }
  }

  return (
    <div className={s.light} ref={lightref} onClick={click}>
      <div className={s.row_line}></div>
      <div className={s.column_line}></div>
      <div 
        className={s.circle}
        onMouseDown={start}
        style={{ top: `${elementY}px`,left: `${elementX}px`}}
      ></div>
      <div className={s.position}>
        <div className={s.text}>position:</div>
        <div className={s.coordinate}>
          <div>x:{x}</div>
          <div>y:{y}</div>
        </div>
      </div>
    </div>
  )
}