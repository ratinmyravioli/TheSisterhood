import './Home.css';
import homeImg from "/src/assets/hero.png";

export default function Home(){
    return(
        <div className = "app-background">
                <div className="home-box">
                  <div className="home-text">
                    <h1>Welcome to</h1> <h1>The Sisterhood</h1>
                    <p>Testing</p>
                    <p>Healthcare Map</p>
                    <button className="home-button">Get Started</button>
                  </div>
                  <img src={homeImg} alt="" className="home-image"/>
                </div>
              </div>

    )
}