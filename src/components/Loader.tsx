const loaderStyle = {
  height: "100vh",
  width: "100vw",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

function Loader() {
  return (
    <div style={loaderStyle}>
      Loading...
    </div>
  );
}

export default Loader;
