// index.js (Servicio A)
require('./tracing'); // <-- SIEMPRE PRIMERO

const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 8080;

// URL local del servicio B (o la URL de Cloud Run cuando lo subas)
const SERVICIO_B_URL = process.env.SERVICIO_B_URL || 'http://localhost:8081';

app.get('/public-api', async (req, res) => {
  try {
    console.log("Servicio A recibió petición. Llamando al Servicio B...");
    
    // OpenTelemetry inyectará automáticamente el Trace ID en las cabeceras HTTP de Axios
    const response = await axios.get(`${SERVICIO_B_URL}/internal-data`);
    
    res.json({
      message: "Respuesta desde el Servicio A",
      b_data: response.data
    });
  } catch (error) {
    console.error("Error llamando al Servicio B:", error.message);
    res.status(500).json({ error: "Falló la comunicación con Servicio B" });
  }
});

app.listen(PORT, '0.0.0.0', () => console.log(`Servicio A escuchando en puerto ${PORT}`));