import {createBrowserRouter} from 'react-router-dom'
import {board} from './board'

import Layout from '../pages/Layout'
import Login from '../pages/Login'
import About from '../pages/About'
import Board from '../pages/Board'
import Article from '../pages/Article'
import NotFound from '../pages/NotFound'
import Contact from '../pages/Contact'
//配置路由文件
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: (<div>首页</div>)
      },
      {
        path: 'article',
        element: <Article />,
      },
      {
        //默认显示二级路由的这个内容
        path: 'Board',
        element: <Board />,
        children: board,
      }, {
        path: 'login',
        element: <Login />
      }, {
        path: '123',
        element: <div>123</div>
      }, {
        path: 'shop',
        element: <div>shop</div>
      }, {
        path: 'about',
        element: <About />,
        children: [
          {
            path: "contact",
            index: true,
            element: <Contact />
          }
        ]
      }
    ]
  }, {
    path: '*',
    element: <NotFound />
  }
])

export default router