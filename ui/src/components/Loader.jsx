const loaderstyle = { 
    position: "absolute", 
    width: "100%", 
    height: "100vh", 
    display: "flex", 
    justifyContent: "center", 
    alignItems: "center", 
    backdropFilter: "blur(2px)"
}
function Loader() {
  return (
    <div style={loaderstyle}>
      <div className="banter-loader">
        <div className="banter-loader__box"></div>
        <div className="banter-loader__box"></div>
        <div className="banter-loader__box"></div>
        <div className="banter-loader__box"></div>
        <div className="banter-loader__box"></div>
        <div className="banter-loader__box"></div>
        <div className="banter-loader__box"></div>
        <div className="banter-loader__box"></div>
        <div className="banter-loader__box"></div>
      </div>
    </div>
  );
}

export default Loader;
