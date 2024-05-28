import {Link, useMatch, useResolvedPath} from 'react-router-dom'

function MyLink({children, className, to, onClick, ...props}: any) {
  let resolved = useResolvedPath(to)
  let active = useMatch({
    path: resolved.pathname,
    end: false
  })

  if (active && to === '/' && location.pathname !== '/') {
    active = null
  }

  function __handler(e: any) {
    if (active) {
      e.preventDefault()
    }
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