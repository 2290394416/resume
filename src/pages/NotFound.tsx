import { Link } from 'react-router-dom';

export default function NotFound() {
  return(
    <div id="error-page">
      <h1>您的页面不存在</h1>
      <p>
        <Link to={'/resume/'}>返回首页</Link>
      </p>
    </div>
  )
}