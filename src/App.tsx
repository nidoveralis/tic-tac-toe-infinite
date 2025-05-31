import MenuLink from './components/custom/menuLink/menuLink';

function App() {
  return (
    <section className="section">
      <h1 className="title">TIC TAC TOE</h1>
      <div className="menu">
        <MenuLink to="/login" content="Играть" />
        <MenuLink to="/history" content="История" />
      </div>
    </section>
  );
}

export default App;
