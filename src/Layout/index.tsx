import "./index.css";
import { Button, Space } from "antd";
import { Link, Outlet, useLocation } from "react-router-dom";

export default function Layout() {
  let path = useLocation().pathname;

  let linkList = [
    {
      url: "/pos",
      title: "POS",
    },
    {
      url: "/history",
      title: "Tarix",
    },
    {
      url: "/settings",
      title: "Sozlash",
    },
  ];

  function menuItemActiveEffect() {
    return <div style={{
      width: "24px",
      height: "5px",
      backgroundColor: "#1677ff",
      position: "absolute",
      left: 0,
      right: 0,
      margin: "auto",
      borderRadius: "0 0 10px 10px",
      bottom: "-16px",
    }}></div>
  }

  return (
    <div className="layout">
      <Space size={"large"} className="top-nav">
        {linkList.map((e, index) => (
          <Link to={e.url} style={{position:"relative"}}>
            <Button
              type={"ghost"}
              size="large"
              style={{fontWeight: 600}}
            >
              {e.title}
            </Button>
            {
              path.startsWith(e.url) ? menuItemActiveEffect() : ""
            }            
          </Link>
        ))}
      </Space>
      
      {/* <Divider></Divider> */}

      <Outlet />
    </div>
  );
}
