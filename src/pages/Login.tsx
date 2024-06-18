import {useNavigate} from 'react-router-dom'
export default function Login() {
  const navigate = useNavigate()
  const goAbout = () => {
    //第一个参数是跳转的地址
    //第二个参数是是否替换掉上路由
    // navigate('/about', { replace: true })
    //路由传参，searchParams
    navigate('/resume/about?id=10086')
  }
  return (
    <div>
      this is login
      <button onClick={goAbout}>go about</button>
      </div>
  )
}