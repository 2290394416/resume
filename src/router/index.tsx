import {createBrowserRouter} from 'react-router-dom'
import {board} from './board'

import Layout from '../pages/Layout'
import Home from '../pages/Home'
import Login from '../pages/Login'
import About from '../pages/About'
import Board from '../pages/Board'
import Article from '../pages/Article'
import NotFound from '../pages/NotFound'
import Contact from '../pages/Contact'
import Shadow from '../pages/Shadow/index'
import Shop from '../pages/Shop/index'
import Users from '../pages/Users/Index'
import LoadingList from '../pages/LoadingList/index'
//配置路由文件
const router = createBrowserRouter([
  {
    path: '/resume/',
    element: <Layout />,
    children: [
      {
        //默认显示二级路由的这个内容
        index: true,
        element: <Home />
      }, {
        path: 'article',
        element: <Article />,
      }, {
        path: 'Board',
        element: <Board />,
        children: board,
      }, {
        path: 'login',
        element: <Login />
      }, {
        path: 'shadow',
        element: <Shadow />
      }, {
        path: 'shop',
        element: <Shop />
      }, {
        path: 'user',
        element: <Users />
      }, {
        path: 'loadingList',
        element: <LoadingList />
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