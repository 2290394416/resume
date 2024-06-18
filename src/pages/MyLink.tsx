import {Link, useMatch, useResolvedPath} from 'react-router-dom'

function MyLink({children, className, to, onClick, ...props}: any) {
  let resolved = useResolvedPath(to)
  let active = useMatch({
    path: resolved.pathname,
    end: false
  })

  if (active && to === '/resume/' && location.pathname !== '/resume/') {
    active = null
  }

  function __handler(e: any) {
    if (active) {
      //如果是选中状态，取消默认行为，link 是 a 链接，就不会跳转了
      e.preventDefault()
    }
    // 当点击的不是选中的按钮，就会执行a链接跳转
    onClick && onClick()
  }

  return (
    <Link onClick={__handler} className={active ? `active ${className}` : className} to={to} {...props}>
      {children}
    </Link>
  )
}

export default MyLink

// 没点击，路由传不进来  current==       to 每一项   