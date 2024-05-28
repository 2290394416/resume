import {useSearchParams, Link, Outlet} from 'react-router-dom'
export default function About() {
const [params] = useSearchParams()
const id = params.get('id')
  return (
    <div>
      <p>this is about {id}</p>
      <Link to={'contact'}>用户信息</Link>
      <div>这是三级路由的出口</div>
      <Outlet />
    </div>
  )
}