import { Link } from 'react-router-dom';
import s from './index.module.scss'

export default function NotFound() {
  return(
    <div className={s.wrapper} >
      <div className={s.container}>
        <h1>您访问的页面不存在</h1>
          <Link className={s.backhome} to={'/resume/'}>返回首页</Link>
      </div>
    </div>
  )
}