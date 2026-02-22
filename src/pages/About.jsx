import { useNavigate } from "react-router-dom";
import "./About.css";


export default function About(){
    const navigate = useNavigate();
    return(
                <div className="about-text" style={{margin: '0px 0'}} >
                    <h1 style={{ color: '#4b2732', margin: '130px 0'}} >Our Purpose</h1>
                    <p>Developed at the University of Florida for WiNGHacks, we hope to help women, both young and old, realize that we don't have to be alone in our experiences.
                        <br /><br /><br />
                        <p>We aspire to create a community formed of education, self love, and the ability to express oneself in the best of ways. With our forum, extensive resources about women's health, rights, and wellbeing, and the ability to pick out
                            what may be needed. It's easier than ever to belong.</p>
                        
                    </p>
        </div>
    )
}