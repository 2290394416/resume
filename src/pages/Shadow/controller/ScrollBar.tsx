import { useEffect, useRef, useState } from 'react'
import s from '../index.module.scss'


interface BarProps  {
  className?: string,
  text: string,
  set?: any,
  step?: number,
  defaultnum?: number,
  defaultx?: number
} 
export default function ScrollBar(props: BarProps) {
  const {className, text, set, step = 10, defaultnum = 0, defaultx = 0 } = props
  const [elementx, setElementx] = useState(defaultx)
  const startx = useRef(defaultx)
  const [num, setNum] = useState(defaultnum)
  const ele = useRef<HTMLDivElement>(null)


  function start(e: any) {
    startx.current = e.clientX
    document.addEventListener('mousemove', move, false)
    document.addEventListener('mouseup', end, false)
  }
  function move(e: any) {
    let disx = e.clientX - startx.current
    //圆的 x 坐标
    let x = elementx + disx
    let number = Math.round(x / step * 100) / 100
    let maxvertex = 300 / step
    setNum(number)
    set(number)

    setElementx(x)
    if (x < 0) {
      setElementx(0)
      setNum(0)
      set(0)

    }
    if (x > 300) {
      setElementx(300)
      setNum(maxvertex)
      set(maxvertex)
    }
  }

  function end(e: any) {
    startx.current = e.clientX
    document.removeEventListener('mousemove', move)
    document.removeEventListener('mouseup', end)
  }
  function click(e: any) {
    const eleLeft = ele.current?.getBoundingClientRect().left
    let __x = e.clientX - eleLeft
    let number = Math.round(__x / step * 100) / 100
    setElementx(__x)
    setNum(number)
    set(number)
  }
  useEffect(() => {
    let maxvertex = 300 / step
    if(elementx === 0) {
      set(0)
    }
    if(elementx === 300) {
      set(maxvertex)
    }
  },[])

  return(
    <div className={`${s.scrollBar} ${className} `}>
      <div className={s.textbox}>
        <div className={s.text}>{text}</div>
        <div className={s.num}>{num}</div>
      </div>
      <div className={s.slider}>
        <div className={s.line_box} onClick={(e) => click(e)}>
          <div className={s.line} ref={ele}></div>
        </div>
        <div
          className={s.circle_box}
          onMouseDown={start}
          style={{left: elementx}}
        >
          <div className={s.circle}></div>
        </div>
      </div>
    </div>
  )
}