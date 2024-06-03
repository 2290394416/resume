import s from '../index.module.scss'
import {useStore} from '../store'

export default function Playground() {
  const { h_shadow, v_shadow, blur, spread, color, inset, opacity } = useStore((state: any) => ({
    h_shadow: state.h_shadow,
    v_shadow: state.v_shadow,
    blur: state.blur,
    spread: state.spread,
    color: state.color,
    inset: state.inset,
    opacity: state.opacity
  }))
  return (
    <div className={s.playground}>
      <div 
        className={`${s.box1} ${s.box}`}
        style={{
          boxShadow: `${h_shadow / 10}px ${v_shadow / 10}px ${blur}px ${spread}px ${color} ${inset ? 'inset' : ''}`,
          opacity: opacity
        }}
      ></div>
      <div 
        className={`${s.box2} ${s.box}`}
        style={{
          boxShadow: `${h_shadow / 5}px ${v_shadow / 5}px ${blur}px ${spread}px ${color} ${inset ? 'inset' : ''}`,
          opacity: opacity
        }}
      ></div>
      <div 
        className={`${s.box3} ${s.box}`}
        style={{ 
          boxShadow: `${h_shadow / 2}px ${v_shadow / 2}px ${blur}px ${spread}px ${color} ${inset ? 'inset' : ''}`, 
          opacity: opacity
        }}
        ></div>
    </div>
  )
}