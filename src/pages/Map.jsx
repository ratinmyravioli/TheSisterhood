import { useEffect, useState, useRef } from 'react';
import { APIProvider, Map, useMap, useMapsLibrary, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY_SUMMARY);

function SearchEngine({ query, onResults }) {
  const map = useMap();
  const placesLib = useMapsLibrary('places');

  useEffect(() => {
    if (!map || !placesLib || !query) return;

    // Listen for when the user stops dragging/zooming the map
    const listener = map.addListener('idle', () => {
      const service = new placesLib.PlacesService(map);
      
      // Now, this search is relative to where the map is CURRENTLY looking
      service.textSearch({ 
        query: query,
        bounds: map.getBounds() // Constrains results to the current view
      }, (results, status) => {
        if (status === placesLib.PlacesServiceStatus.OK) {
          onResults(results);
        }
      });
    });

    return () => {
      if (listener) listener.remove();
    };
  }, [query, map, placesLib, onResults]);

  return null;
}

export default function MapPage() {
  const [shelters, setShelters] = useState([]);
  const [details, setDetails] = useState({ title: "Welcome", content: "Select a filter." });
  const [activeQuery, setActiveQuery] = useState("");
  const lastRequestTime = useRef(0);

  const handleAIRequest = async (prompt, title) => {
    const now = Date.now();
    if (now - lastRequestTime.current < 15000) {
      setDetails({ title: "Please Wait", content: "To comply with API limits, please wait 15 seconds, then try again." });
      return;
    }
    lastRequestTime.current = now;

    setDetails({ title, content: "Consulting AI..." });
    try {
      // Using gemini-2.5-flash thanks to its quick capabilities to allow users to quickly see benefits of location and compare resources
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
      const result = await model.generateContent(prompt);
      setDetails({ title, content: result.response.text() });
    } catch (e) {
      console.error("AI Error:", e);
      setDetails({ title: "Error", content: "AI is currently unavailable." });
    }
  };

  return (
    <div style={{ display: 'flex', height: '85vh', gap: '20px', padding: '20px' }}>
      <div className="sidebar-panel" style={{ flex: 1 }}>
        <h3>Filters</h3>
        {["OBGYN", "Shelters", "Abortion Clinics", "Sexual Health"].map(f => (
          <button key={f} className="filter-btn" onClick={() => { setActiveQuery(f); setShelters([]); setDetails({title: f, content: "Searching nationally..."}) }}>{f}</button>
        ))}
        <h3>Legal Info</h3>
        {["Abortion Laws", "Restraining Order Laws"].map(f => (
          <button key={f} className="filter-btn" onClick={() => handleAIRequest(`Provide an extremely concise state-by-state list of ${f} in the USA. Use dashes ("-") as bullet points, but note you do not have access to 
            any markdown so please avoid it and use plain text only.`, f)}>{f}</button>
        ))}
      </div>

      <div style={{ flex: 3, borderRadius: '20px', overflow: 'hidden' }}>
        {/* IMPORTANT: Ensure 'places' is in the libraries array */}
        <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY} libraries={['places']}>
          <Map defaultCenter={{ lat: 39.8, lng: -98.5 }} defaultZoom={4} mapId="SISTERHOOD_MAP_ID">
            <SearchEngine query={activeQuery} onResults={setShelters} />
            {shelters.map(s => (
              <AdvancedMarker key={s.place_id} position={s.geometry.location} onClick={() => handleAIRequest(`Based on the Google Maps' reviews for ${s.name}, please first note the current star rating for this amenity. Then, write a 
              brief summary on its pros and cons and whether it seems like a trustworthy resource.`, s.name)}>
                <Pin background={'#ffadad'} />
              </AdvancedMarker>
            ))}
          </Map>
        </APIProvider>
      </div>

      <div className="sidebar-panel" style={{ flex: 1, overflowY: 'auto' }}>
        <h3>Details</h3>
        <h4>{details.title}</h4>
        <p style={{ whiteSpace: 'pre-line' }}>{details.content}</p>
      </div>
    </div>
  );
}