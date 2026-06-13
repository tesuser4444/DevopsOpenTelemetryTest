// tracing.js
const { NodeTracerProvider } = require('@opentelemetry/sdk-trace-node');
const { SimpleSpanProcessor } = require('@opentelemetry/sdk-trace-node');
const { TraceExporter } = require('@google-cloud/opentelemetry-cloud-trace-exporter');
const { registerInstrumentations } = require('@opentelemetry/instrumentation');
const { ExpressInstrumentation } = require('@opentelemetry/instrumentation-express');
const { HttpInstrumentation } = require('@opentelemetry/instrumentation-http');

// 1. Configurar el exportador nativo de Google Cloud Trace
const exporter = new TraceExporter();

// 2. Inicializar el proveedor con el procesador (SimpleSpan es ideal para desarrollo/pruebas)
const provider = new NodeTracerProvider({
  spanProcessors: [new SimpleSpanProcessor(exporter)],
});

// 3. Registrar el proveedor en el ecosistema global de OpenTelemetry
provider.register();

// 5. Auto-instrumentar HTTP (para Axios/Fetch) y Express de manera automática
registerInstrumentations({
  instrumentations: [
    new HttpInstrumentation(),
    new ExpressInstrumentation(),
  ],
});

console.log("🚀 OpenTelemetry y Google Cloud Trace inicializados.");