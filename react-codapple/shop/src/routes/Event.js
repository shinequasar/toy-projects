import { Link, Routes, Route, Outlet } from "react-router-dom";

function Event() {
  return (
    <>
      <h2> 오늘의 이벤트 </h2> <Outlet> </Outlet>
      <div className="container">
        <Link to="/event/one" className="link">1</Link>
        <Link to="/event/two" className="link">2</Link>
      </div>
    </>
  );
}
export default Event;
