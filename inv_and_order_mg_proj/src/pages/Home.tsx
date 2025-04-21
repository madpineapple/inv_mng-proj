function Home() {
  return (
    <div className="hero">
      <div className="triangle-wrapper">
        <div className="triangle-bg"></div>
        <div className="ai-eye"></div>
      </div>
      <div className="content">
        <h1 className="hero-title">Auto Mata</h1>
        <h3 className="hero-text">Inventory Managment Assitant</h3>
        <form className="query-form">
          <input placeholder="Ask me anything..." />
          <button type="submit">Go</button>
        </form>
      </div>
    </div>
  );
}
export default Home;
