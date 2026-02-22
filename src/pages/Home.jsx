import { useNavigate } from "react-router-dom";
import './Home.css';
import homeImg from "/src/assets/homeImage.png";

export default function Home(){
    const navigate = useNavigate();
    return(
        <div className="home-container">
                  <div className="home-text">
                    <h1 className="home-title"  style={{ fontFamily: "'GlacialIndifference', sans-serif "}}>Womanhood doesn't<br />have to be alone.</h1>
                    <p>We know the taboos. We've faced them too.</p>
                    <button className="home-button" onClick={() => navigate("/information")}>Get Started</button>
                  </div>
                  <div className="home-image-wrapper">
                    <img src={homeImg} alt="" className="home-image"/>
                  </div>
              </div>

    )
}