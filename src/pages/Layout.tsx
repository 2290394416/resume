import { Outlet, useNavigate } from 'react-router-dom';
import MyLink from './MyLink';
import { SmileTwoTone } from '@ant-design/icons';

export default function Layout() {
  const navigate = useNavigate()

  const gohome = () => {
    navigate('/')
  }
 
  const nav = [
    {
      path: '',
      text: '首页',
    }, {
      path: 'article',
      text: '沸点'
    }, {
      path: 'about',
      text: '课程'
    }, {
      path: 'board',
      text: '直播'
    }, {
      path: 'shop',
      text: '商城'
    }, {
      path: 'user',
      text: '用户管理'
    }, {
      path: 'loadingList',
      text: '加载列表'
    }, {
      path: 'shadow',
      text: '竞赛'
    }
  ]

  return(
    <div className='container'>
      <div className="header">
        <div className="logo" onClick={gohome}>
          <SmileTwoTone style={{ fontSize: '30px'}}/>
          <span>Logo</span>
        </div>
        <div className="nav">
          <div className="nav-list">
            {nav.map((item) => (
              <MyLink key={item.path} to={`/resume/${item.path}`} className={'nav-btn'}>{item.text}</MyLink>
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
