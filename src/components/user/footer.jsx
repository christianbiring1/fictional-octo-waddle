import logo from '../../assets/urne.jpeg';
import './footer.css';

const Footer = () => {
  return (
    <footer className="block block--dark footer" style={{marginTop: '3rem'}}>
      <div className="container grid footer__sections">
        <section className="collapsible footer__section">
          <header className="collapsible__header">
            <h2 className="collapsible__heading footer__heading">Item1</h2>
            <div className="collapsible__chevron">
              <img src="./images/down-arrow.png" alt="" className="icon" />
            </div>
          </header>
          <div className="collapsible__content">
            <ul className="list">
              <li><a href="#">Our mission</a></li>
              <li><a href="#">How we are doing</a></li>
              <li><a href="#">Proceedures</a></li>
            </ul>
          </div>
        </section>
        <section className="collapsible footer__section">
          <header className="collapsible__header">
            <h2 className="collapsible__heading footer__heading">Item2</h2>
            <div className="collapsible__chevron">
              <img src="./images/down-arrow.png" alt="" className="icon" />
            </div>
          </header>
          <div className="collapsible__content">
            <ul className="list">
              <li><a href="#">Our mission</a></li>
              <li><a href="#">How we are doing</a></li>
              <li><a href="#">Proceedures</a></li>
            </ul>
          </div>
        </section>
        <section className="collapsible footer__section">
          <header className="collapsible__header">
            <h2 className="collapsible__heading footer__heading">Item3</h2>
            <div className="collapsible__chevron">
              <img src="./images/down-arrow.png" alt="" className="icon" />
            </div>
          </header>
          <div className="collapsible__content">
            <ul className="list">
              <li><a href="#">Our mission</a></li>
              <li><a href="#">How we are doing</a></li>
              <li><a href="#">Proceedures</a></li>
            </ul>
          </div>
        </section>
        <section className="footer__brand">
          <img src={logo} alt="" style={{ borderRedius: '50%'}}/>
          <p className="footer__copyright">Copyright 2023</p>
        </section>
      </div>
    </footer>
  );
}
 
export default Footer;