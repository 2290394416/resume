import { Outlet} from 'react-router-dom';
import MyLink from './MyLink';

export default function Layout() {

  const nav = [
    {
      path: '/',
      text: '首页',
    }, {
      path: '/article',
      text: '沸点'
    }, {
      path: '/about',
      text: '课程'
    }, {
      path: '/board',
      text: '直播'
    }, {
      path: '/login',
      text: '活动'
    }, {
      path: '/shadow',
      text: '竞赛'
    }, {
      path: '/shop',
      text: '商城'
    }, {
      path: '/user',
      text: '用户管理'
    }
  ]

  return(
    <div className='container'>
      <div className="header">
        <div className="logo">
          logo
        </div>
        <div className="nav">
          <div className="nav-list">
            {nav.map((item) => (
              <MyLink key={item.path} to={item.path} className={'nav-btn'}>{item.text}</MyLink>
            ))}
          </div>
          <div className='right-nav'></div>
        </div>
      </div>
      <div className="main">
         <div className='content-box'>
          <Outlet />
         </div>
      </div>
    </div>
  )
}
