import { Link } from 'react-router-dom';
function Header() {
  return (
    <div className="header">
      <Link to={'/'}>TodoList</Link>
      <Link to={'/CoinTracker'}>CoinTracker</Link>
      <Link to={'/MovieApp'}>MovieApp</Link>
    </div>
  );
}
export default Header;
