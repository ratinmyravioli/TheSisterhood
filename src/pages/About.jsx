import { useState } from "react";
import "./About.css";

const SECTIONS = [
    {key: "periods", label: "Periods"},
    {key: "sexual", label: "Sexual Health"},
    {key: "pregnacy", label: "Pregnancy"},
    {key: "menopause", label: "Menopause"},
    {key: "dv", label: "DV"},
    {key: "cancers", label: "Gynecologic\nCancers"}
];


export default function About(){
    const [active, setActive] = useState("pregnancy");

    return(
        <div className="about-page">
            {/* Sidebar */}
            <aside className="about-sidebar">
                {SECTIONS.map((s) => (
                    <button key={s.key} className={'about-side-btn ${active === s.key ? "active" : ""}'} onClick={() => setActive(s.key)}>
                        {s.label}
                    </button>
                ))}
            </aside>

            {/* Main */}
            <main className="about-content">
                {active == "pregnancy" ?(
                    <>
                        <section className="about-top">
                            <div className="about-text">
                                <p>
                                    type here type here type here type here type here
                                </p>
                                <p>
                                    type here type here type here type here
                                </p>
                            </div>
                            {/* place image here */}
                        </section>

                        <section className="about-bottom">
                            {/* place image here */}
                            <div className="about-text">
                                <p>
                                    type here type here
                                </p>
                            </div>
                        </section>
                    </>
                ) : (
                    <section className="about-placehold">
                        <h1 className="about-title">
                            {SECTIONS.find((s) => s.key === active)?.label}
                        </h1>
                        <p>
                            Put your info for <b>{active}</b> here. This text changes when you click a sidebar button.
                        </p>
                    </section>
                )}
            </main>
        </div>
    );
}