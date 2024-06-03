import s from  './index.module.scss'
import Playground from './controller/Playground'
import ScrollBar from './controller/ScrollBar'
import Position from './controller/Position'
import Color from './controller/Color'
import Code from './controller/Code'
import {useStore} from './store'

export default function Index() {
  const setblur = useStore((state: any) => state.setblur);
  const setspread = useStore((state: any) => state.setspread);
  const setopac = useStore((state: any) => state.setopac);

  return(
    <div className={s.wrapper}>
      <Playground />
      <div className={s.container}>
        <div className={s.controller}>
          <ScrollBar className={s.oomph} text='blur' set={setblur} />
          <ScrollBar className={s.crispy} text='spread' set={setspread} />
          <Position />
          <Color />
          <div className={s.opac}>
            <ScrollBar text='opacity' set={setopac} step={300} defaultnum={1} defaultx={300} />
          </div>
        </div>
        <Code />
      </div>
    </div>
  )
}