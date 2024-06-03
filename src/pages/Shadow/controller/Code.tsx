import s from '../index.module.scss'
import {useStore} from '../store'
export default function Code() {
  const { h_shadow, v_shadow, blur, spread, color, inset, opacity } = useStore((state: any) => ({
    h_shadow: state.h_shadow,
    v_shadow: state.v_shadow,
    blur: state.blur,
    spread: state.spread,
    color: state.color,
    inset: state.inset,
    opacity: state.opacity
  }))
  return(
    <div className={s.code_box}>
      <div className={s.box_1}>
        <div className={`${s.code_parcel} ${s.code_title}`}>{'.box-1 {'}</div>
        <div className={s.code}>
          <div className={s.shadow_code}>box-shadow: <div className={s.code_text}>{h_shadow / 10}px {v_shadow / 10}px {blur}px {spread}px {color} {inset ? 'inset' : ''}</div>;</div>
          <div className={s.opac_code}>opacity: <div className={s.code_text}>{opacity}</div>;</div>
        </div>
        <div className={s.code_parcel}>{'}'}</div>
      </div>
      <div className={s.box_2}>
        <div className={`${s.code_parcel} ${s.code_title}`}>{'.box-2 {'}</div>
        <div className={s.code}>
          <div className={s.shadow_code}>box-shadow: <div className={s.code_text}>{h_shadow / 5}px {v_shadow / 5}px {blur}px {spread}px {color} {inset ? 'inset' : ''}</div>;</div>
          <div className={s.opac_code}>opacity: <div className={s.code_text}>{opacity}</div>;</div>
        </div>
        <div className={s.code_parcel}>{'}'}</div>
      </div>
      <div className={s.box_3}>
        <div className={`${s.code_parcel} ${s.code_title}`}>{'.box-3 {'}</div>
        <div className={s.code}>
          <div className={s.shadow_code}>box-shadow: <div className={s.code_text}>{h_shadow / 2}px {v_shadow / 2}px {blur}px {spread}px {color} {inset ? 'inset' : ''}</div>;</div>
          <div className={s.opac_code}>opacity: <div className={s.code_text}>{opacity}</div>;</div>
        </div>
        <div className={s.code_parcel}>{'}'}</div>
      </div>
    </div>
  )
}