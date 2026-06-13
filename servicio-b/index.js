// index.js (Servicio B)
require('./tracing'); // <-- SIEMPRE PRIMERO

const express = require('express');
const app = express();
const PORT = process.env.PORT || 8081;

// Función para simular retraso de procesamiento (ej. query pesada)
const delay = ms => new Promise(res => setTimeout(res, ms));

app.get('/internal-data', async (req, res) => {
  console.log("Servicio B recibió la petición del Servicio A.");
  
  // Simulamos una latencia artificial de 350 milisegundos
  await delay(350); 
  
  res.json({
    status: "success",
    data: ["item1", "item2", "item3"],
    processedBy: "Servicio B"
  });
});

app.listen(PORT, '0.0.0.0', () => console.log(`Servicio B escuchando en puerto ${PORT}`));