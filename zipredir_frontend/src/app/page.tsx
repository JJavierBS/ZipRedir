"use client";
import {useState} from "react";

export default function Home() {
  const [url,setUrl] = useState(""); //Variable para guardar la url original y la función que la actualiza
  const [shortUrl, setShortUrl] = useState(""); //Variable para guardar la url acortada y la función que la actualiza
  const API_URL = "https://zipredir.onrender.com/api/shorten"; //URL de la API de acortamiento de URLs

  const handleShorten = async () => { //Funcion que llama al backend
    const res = await fetch(API_URL,
      {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({origin: url}),
      });
      const data = await res.json();
      setShortUrl(data.shortUrl);
      try{
        const res = await fetch(API_URL, {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({origin: url}),
        });
        if(!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setShortUrl(data.shortUrl);
        } catch (error) {
        console.error("Error acortando la URL:", error);
        alert("No se pudo acortar la URL. Por favor, intenta de nuevo.");
        } 
      };
  return (
    <div className="page">
      <h1 className="title">ZipRedir</h1>
      <div className="box">
        <div>
          <input
            className="urlInput"
            type="text"
            placeholder="Introduce la URL a acortar"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button onClick={handleShorten}>Acortar</button>
        </div>
      </div>
      <div className="short">
        {shortUrl && (
          <p className="short">
            URL acortada: <a href={shortUrl} target="_blank" rel="noopener noreferrer">{shortUrl}</a>
          </p>
        )}
      </div>
      <style jsx>{`
        .page {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
        }
        .title{
          font-size: 2.5rem;
          margin-bottom: 2rem;
        }
        .box {
          padding: 20px;
          border: 1px solid #ccc;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .urlInput {
          width: 300px;
          margin-right: 1rem;
        }
        .short {
          margin-top: 1rem;
        }
      `}</style>
    </div>
  )
}