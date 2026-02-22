import { useState } from "react";
import "./Information.css";
// overview
import girlsImg from "../assets/girls.png";
import girls2Img from "../assets/girls2.png";

// periods
import period1 from "../assets/period.png";
import period2 from "../assets/period2.png";

// sexual health
import sexual1 from "../assets/health.png";
import sexual2 from "../assets/health2.png";

// pregnancy
import pregnancy1 from "../assets/pregnancy.png";
import pregnancy2 from "../assets/pregnancy2.png";

// menopause
import menopause1 from "../assets/menopause.png";
import menopause2 from "../assets/menopause2.png";

// domestic violence
import dv1 from "../assets/dv.png";
import dv2 from "../assets/dv2.png";

// cancers
import cancer1 from "../assets/cancer.png";
import cancer2 from "../assets/cancer2.png";

const SECTIONS = [
    {key: "overview", label: "Overview"},
    {key: "periods", label: "Periods"},
    {key: "sexual", label: "Sexual Health"},
    {key: "pregnancy", label: "Pregnancy"},
    {key: "menopause", label: "Menopause"},
    {key: "dv", label: "DV"},
    {key: "cancers", label: "Gynecologic\nCancers"}
];

const CONTENT = {
  overview: {
    topTitle: "Overall Information",
    topText:
      "The Information section provides supportive guidance on important areas of women’s health and well-being. Each topic in the sidebar focuses on a stage of life or issue that many women experience throughout their journey.",

    bottomTitle: "Summary",
    bottomText:
      "Explore Periods, Sexual Health, Pregnancy, Menopause, Domestic Violence, and Gynecologic Cancers. Each section is designed to offer foundational knowledge, promote awareness, and empower women to make informed decisions about their health.",

    imgTop: girls2Img,
    imgBottom: girlsImg,
  },

  periods: {
    topTitle: "Understanding Your Cycle",
    topText:
      "This section explains the menstrual cycle, common symptoms like cramps and mood changes, and what is considered normal. Understanding your cycle helps you recognize patterns in your body and better manage your health.",

    bottomTitle: "Managing Symptoms & When to Seek Help",
    bottomText:
      "While discomfort can be normal, severe pain or extremely heavy bleeding is not. Tracking symptoms and knowing when to consult a healthcare provider is an important step in self-care.",

    imgTop: period1,
    imgBottom: period2,
  },

  sexual: {
    topTitle: "Sexual Health & Wellness",
    topText:
      "Sexual health includes understanding consent, protection, STI prevention, and reproductive wellness. Knowledge allows women to make informed and confident decisions regarding their bodies.",

    bottomTitle: "Empowerment Through Education",
    bottomText:
      "Healthy relationships involve respect and communication. This section encourages safe practices, body autonomy, and awareness of available healthcare resources.",

    imgTop: sexual1,
    imgBottom: sexual2,
  },

  pregnancy: {
    topTitle: "Pregnancy Journey",
    topText:
      "Pregnancy involves physical, hormonal, and emotional changes. This section introduces prenatal care basics, common experiences, and healthy lifestyle practices to support both mother and baby.",

    bottomTitle: "Support & Preparation",
    bottomText:
      "From medical appointments to mental wellness, preparation plays an important role in a healthy pregnancy. Understanding available support systems can reduce stress and increase confidence.",

    imgTop: pregnancy1,
    imgBottom: pregnancy2,
  },

  menopause: {
    topTitle: "Navigating Menopause",
    topText:
      "Menopause is a natural biological transition that may bring symptoms such as hot flashes, mood changes, and sleep disturbances. Learning about these changes can make the transition less overwhelming.",

    bottomTitle: "Comfort & Care",
    bottomText:
      "Lifestyle adjustments and professional guidance can ease symptoms. This section focuses on understanding what is happening in the body and exploring available management options.",

    imgTop: menopause1,
    imgBottom: menopause2,
  },

  dv: {
    topTitle: "Recognizing Domestic Violence",
    topText:
      "Domestic violence can take many forms including emotional, financial, verbal, and physical abuse. Recognizing warning signs is the first step toward safety and healing.",

    bottomTitle: "Finding Support",
    bottomText:
      "You are not alone. This section emphasizes awareness, safety planning, and seeking trusted support resources when needed.",

    imgTop: dv1,
    imgBottom: dv2,
  },

  cancers: {
    topTitle: "Gynecologic Cancer Awareness",
    topText:
      "Gynecologic cancers affect different parts of the female reproductive system. Education about symptoms, risk factors, and screenings is vital for early detection.",

    bottomTitle: "Prevention & Screening",
    bottomText:
      "Regular medical checkups and awareness of bodily changes can significantly improve outcomes. This section encourages proactive health monitoring and informed conversations with healthcare providers.",

    imgTop: cancer1,
    imgBottom: cancer2,
  },
};

export default function Information(){
    const [active, setActive] = useState("overview");
    const current = CONTENT[active] ?? CONTENT.overview;

    return(
        <div className="about-page">
            {/* Sidebar */}
            <aside className="about-sidebar">
                {SECTIONS.map((s) => (
                    <button key={s.key} className={`about-side-btn ${active === s.key ? "active" : ""}`} onClick={() => setActive(s.key)}>
                        {s.label}
                    </button>
                ))}
            </aside>

            {/* Main */}
            <main className="about-content">
                <section className="info-top">
                    <div className="info-text">
                        <h2>{current.topTitle}</h2>
                        <p>{current.topText}</p>
                    </div>

                    <img src={current.imgTop} alt="" className="info-img info-img-top" />
                </section>

                <section className="info-bottom">
                    <img src={current.imgBottom} alt="" className="info-img info-img-bottom" />

                    <div className="info-text">
                        <h2>{current.bottomTitle}</h2>
                        <p>{current.bottomText}</p>
                    </div>
                </section>
            </main>
        </div>
    );
}