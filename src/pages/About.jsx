import { useNavigate } from "react-router-dom";
import "./About.css";


export default function About(){
    const navigate = useNavigate();
    return(
        <div className = "app-background">
            <div className="about-box">
                <div className="about-text">
                    <h1>Our Purpose</h1>
                    <p>The purpose of this website is to serve as a guide for all women alike. No matter what our differences are, at the end of the day we are all women and in a way sisters. 
                        The Sisterhood’s purpose is to connect all women with our day-to-day issues and the challenges we face while navigating today’s world. 
                        Access to knowledge, resources, and a supportive community can make all the difference when it comes to understanding our health, our rights, and our well-being. 
                        This platform was created to provide a safe and welcoming space where women can find reliable information about their bodies, their health, and the many stages of life we experience. 
                        Whether someone is looking for guidance on reproductive health, mental wellness, relationships, or personal safety, The Sisterhood aims to be a starting point for learning and empowerment. 
                        By bringing together trustworthy information and accessible tools, this website seeks to reduce confusion, fear, and isolation that many women face when searching for answers. 
                        </p><p>Beyond information, The Sisterhood is about connection. It exists to remind women that they are not alone in their experiences. 
                        Through shared knowledge and open dialogue, this space encourages support, understanding, and growth. 
                        The goal is not only to inform but also to uplift—creating a community where women feel seen, heard, and supported no matter where they are in their journey. Ultimately, The Sisterhood stands for empowerment through education and unity. 
                        By equipping women with knowledge and connecting them to helpful resources and one another, this platform strives to foster confidence, independence, and a stronger sense of belonging for women everywhere.
                    </p>
                    <button className="about-button" onClick={() => navigate("/")}>Go Back to Main Page</button>
                </div>
            </div>
        </div>
    )
}