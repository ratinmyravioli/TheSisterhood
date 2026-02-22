import { useNavigate } from "react-router-dom";
import './Home.css';
import homeImg from "/src/assets/hero.png";

export default function Home(){
    const navigate = useNavigate();
    return(
        <div className = "app-background">
                  <div className="home-text">
                    <h1 style={{ color: '#f99d9d', fontSize: '40px', textAlign: 'center'}}>Womenhood doesn't have to be alone.</h1>
                    <p>A site for any and every women.</p>
                    <button className="home-button" onClick={() => navigate("/information")}>Get Started</button>
                  </div>
                  <img src={homeImg} alt="" className="home-image"/>
              </div>

    )
}