import { useState } from 'react';
import { ColorPicker, Button } from 'antd';
import {useStore} from '../store'
import s from '../index.module.scss'

export default function Color() {
  const [color, setColor] = useState('#1677ff')
  const [active, setActive] = useState(false)

  const setshadow = useStore((state: any) => state.setshadow)
  const setinset = useStore((state: any) => state.setinset)

  const btnStyle: React.CSSProperties = {
    backgroundColor: color,
  };

  return(
    <div className={s.shadow}>
      <div className={s.text}>
        <div>shadow-color</div>
        <div>{color}</div>
      </div>
        <ColorPicker
          format='hex'
          onChangeComplete={(hsv) => {
            let text = hsv.toHexString()
            setColor(text)
            setshadow(text)
          }}
        >
          <Button type="primary" style={btnStyle} className={s.shadowBtn}>{color}</Button>
        </ColorPicker>
      <div className={s.inset}>
        <div>设置inset</div>
        <div className={s.inset_btn} onClick={() => {
          setActive(!active)
          setinset(!active)
        }}>
          <div className={active ? `${s.line} ${s.active}` : s.line}></div>
          <div className={active ? `${s.circle} ${s.active}`: s.circle}></div>
        </div>
      </div>
    </div>
  )
}