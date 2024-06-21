import { useNavigate } from 'react-router-dom'
import s from './index.module.scss'

export default function Login() {
  const navigate = useNavigate()
  const gohome = () => {
   
    navigate('/resume/')
  }
  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        <h1>个人网站</h1>
        <div> 这是一个练习时使用的网站</div>
        <div className={s.gohome} onClick={gohome}>进入页面</div>
      </div>
    </div>
  )
}