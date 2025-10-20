"use client";
import {useState} from "react";

export default function Home() {
  const [url,setUrl] = useState(""); //Variable para guardar la url original y la función que la actualiza
  const [shortUrl, setShortUrl] = useState(""); //Variable para guardar la url acortada y la función que la actualiza
  const [loading, setLoading] = useState(false); //Variable para controlar el estado de carga
  const API_URL = "https://zipredir.onrender.com/api/shorten"; //URL de la API de acortamiento de URLs

  const handleShorten = async () => { //Funcion que llama al backend
    setLoading(true); 
    setShortUrl(""); 
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
    } finally {
      setLoading(false); //Desactiva el estado de carga
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
        {loading && (
          <div className="loading-container">
            <div className="spinner"></div>
            <p className="loading-text">Conectando al backend, ten paciencia, la primera solicitud puede tardar entre 1 y 2 minutos, es un host gratuito...</p>
          </div>
        )}
        {shortUrl && !loading && (
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
        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          margin-top: 2rem;
        }
        .spinner {
          border: 4px solid #f3f3f3;
          border-top: 4px solid #3498db;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .loading-text {
          color: #666;
          font-size: 0.9rem;
          text-align: center;
          max-width: 300px;
        }
      `}</style>
    </div>
  )
}