import { useState } from 'react'
import s from './index.module.scss'

interface RadioProps {
  value: string,
  selects: string[],
  onChange: (v: any) => any,
  disabled: boolean
}
export default function Radio(props: RadioProps) {
  const {value, selects, onChange, disabled } = props
  let i = selects.indexOf(value)
  const [current, setCurrent] = useState(i)

  function click(index: number) {
    if(!disabled) {
      if (current === index) return
      setCurrent(index)
      onChange(selects[index])
    }
  }
  return(
    <div className={s.post}>
      {selects.map((item, index) => (
        <div key={item} className={s.radioBtn} onClick={() => click(index)}>
          <div className={current === index ? `${s.radio} ${s.active}` : s.radio}></div>
          <div className={s.text}>{item}</div>
        </div>
      ))}
    </div>   
  )
}