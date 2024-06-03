import {Outlet, useNavigate} from 'react-router-dom'
import MyLink from './MyLink'
import { useEffect, useRef } from 'react'

let prepath = '/board/button'

export default function Board() {
  var navigate = useNavigate()
  const path = useRef(prepath)
  const sideBar = [
    {
      path: 'button',
      text: 'Button 按钮'
    }, {
      path: 'floatButton',
      text: 'FloatButton 悬浮按钮'
    }, {
      path: 'icon',
      text: 'Icon 图标'
    }, {
      path: 'menu',
      text: 'Menu 导航菜单'
    }, {
      path: 'steps',
      text: 'Steps 步骤条'
    }, {
      path: 'cascader',
      text: 'Cascader 级联选择'
    }, {
      path: 'checkbox',
      text: 'Checkbox 多选框'
    }, {
      path: 'switch',
      text: 'Switch 开关'
    }, {
      path: 'transfer',
      text: 'Transfer 穿梭框'
    }, {
      path: 'upload',
      text: 'Upload 上传'
    }, {
      path: 'avatar',
      text: 'Avatar 头像'
    }, {
      path: 'badge',
      text: 'Badge 徽标数'
    }, {
      path: 'card',
      text: 'Card 卡片'
    }, {
      path: 'carousel',
      text: 'Carousel 走马灯'
    }, {
      path: 'image',
      text: 'Image 图片'
    }, {
      path: 'list',
      text: 'List 列表'
    }, {
      path: 'popover',
      text: 'Popover 气泡卡片'
    }, {
      path: 'tour',
      text: 'Tour 漫游式导航'
    }, {
      path: 'tooltip',
      text: 'Tooltip 文字提示'
    }, {
      path: 'drawer',
      text: 'Drawe 抽屉'
    }, {
      path: 'skeleton',
      text: 'Skeleton 骨架屏'
    }, {
      path: 'spin',
      text: 'Spin 加载中'
    }
  ]
  useEffect(() => {
    if (location.pathname === '/board') {
      navigate(prepath)
    }
    return () => {
      prepath = path.current
    }
  }, [])

  return (
    <div className='board'>      
      <div className='sideBar'>
        <p className='title'>导航</p>
        {sideBar.map((item) => (
          <MyLink 
            key={item.path} 
            to={item.path} 
            className={'side-btn'}
            onClick={() => {
              path.current = `/board/${item.path}`
            }}
          >{item.text}</MyLink>
        ))}
      </div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  )
}