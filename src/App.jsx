import { useState } from "react";

const PREGUNTAS = [
  { id: 1, seccion: "Claridad Operativa", critica: false, texto: "La empresa tiene claridad sobre qué prácticas operativas ambientales existen actualmente dentro de su operación.", guia: "¿Saben qué están haciendo hoy en términos de prácticas operativas ambientales?" },
  { id: 2, seccion: "Claridad Operativa", critica: false, texto: "Las prácticas operativas ambientales tienen responsables identificados dentro del equipo.", guia: "¿Hay alguien específico encargado o 'lo hace quien puede'?" },
  { id: 3, seccion: "Claridad Operativa", critica: false, texto: "Existe claridad sobre cómo deben ejecutarse las prácticas operativas ambientales en el día a día.", guia: "¿El equipo sabe exactamente qué hacer y cómo hacerlo?" },
  { id: 4, seccion: "Criterio Distribuido", critica: true, texto: "Las prácticas operativas ambientales pueden mantenerse aunque ciertas personas clave no estén presentes.", guia: "Si el encargado falta una semana, ¿el sistema sigue funcionando?" },
  { id: 5, seccion: "Criterio Distribuido", critica: true, texto: "El criterio sobre la gestión ambiental está distribuido en el equipo y no concentrado en una sola persona.", guia: "¿Solo una persona sabe cómo se hace o el equipo comparte ese criterio?" },
  { id: 6, seccion: "Criterio Distribuido", critica: false, texto: "Las prácticas operativas ambientales forman parte de la operación diaria y no dependen de recordatorios constantes.", guia: "¿Alguien tiene que recordarle al equipo que lo haga cada vez?" },
  { id: 7, seccion: "Criterio Distribuido", critica: true, texto: "Las prácticas operativas ambientales se mantienen incluso cuando hay cambios de personal o rotación en el equipo.", guia: "Cuando entra alguien nuevo, ¿el sistema sobrevive o se detiene?" },
  { id: 8, seccion: "Criterio Distribuido", critica: true, texto: "La dirección o los tomadores de decisiones participan y respaldan activamente las prácticas operativas ambientales.", guia: "¿El dueño o gerente está involucrado o delega todo esto?" },
  { id: 9, seccion: "Organización", critica: false, texto: "Las prácticas operativas ambientales están organizadas y alineadas entre las distintas áreas de la empresa.", guia: "¿Las distintas áreas hacen lo mismo o cada una hace lo suyo?" },
  { id: 10, seccion: "Organización", critica: false, texto: "La empresa cuenta con lineamientos o criterios claros para ejecutar sus prácticas operativas ambientales.", guia: "¿Existe algo escrito o acordado sobre cómo se hace?" },
  { id: 11, seccion: "Organización", critica: true, texto: "Las prácticas operativas ambientales están integradas a la operación diaria y no se perciben como actividades separadas.", guia: "¿Se vive como parte del trabajo o como una carga extra?" },
  { id: 12, seccion: "Ejecución Real", critica: false, texto: "Las prácticas operativas ambientales realmente se aplican en la operación diaria.", guia: "¿Esto pasa de verdad o solo existe en papel?" },
  { id: 13, seccion: "Ejecución Real", critica: true, texto: "El equipo ejecuta las prácticas operativas ambientales de forma constante y no solo cuando hay supervisión.", guia: "¿Lo hacen porque alguien los está mirando o porque ya es parte de cómo trabajan?" },
  { id: 14, seccion: "Ejecución Real", critica: true, texto: "Las prácticas operativas ambientales implementadas se sostienen dentro de la operación diaria incluso después de varios meses.", guia: "¿Han logrado que algo dure más de tres meses sin que se pierda?" },
  { id: 15, seccion: "Capacidades Internas", critica: false, texto: "El equipo entiende qué hacer y cómo aplicar las prácticas operativas ambientales dentro de su rol.", guia: "¿Cada persona sabe qué le corresponde hacer a ella específicamente?" },
  { id: 16, seccion: "Capacidades Internas", critica: false, texto: "Las personas comprenden por qué las prácticas operativas ambientales impactan la operación y los recursos de la empresa.", guia: "¿Entienden el 'para qué' o solo siguen instrucciones?" },
  { id: 17, seccion: "Capacidades Internas", critica: true, texto: "Cuando ingresa personal nuevo, la empresa tiene una forma clara de enseñarle cómo ejecutar las prácticas operativas ambientales.", guia: "¿Existe un proceso de inducción ambiental o cada quien aprende solo?" },
  { id: 18, seccion: "Desperdicios y Recursos", critica: false, texto: "La empresa identifica claramente dónde está generando desperdicios o pérdidas de recursos.", guia: "¿Saben concretamente dónde se van el agua, la energía, los insumos?" },
  { id: 19, seccion: "Desperdicios y Recursos", critica: false, texto: "Existen acciones concretas para reducir desperdicios dentro de la operación.", guia: "¿Hay algo implementado actualmente para reducir esas pérdidas?" },
  { id: 20, seccion: "Alineación Normativa", critica: false, texto: "La empresa tiene identificados los requisitos normativos básicos relacionados con residuos, salubridad y manejo de recursos.", guia: "¿Saben qué les pide la ley en materia ambiental?" },
  { id: 21, seccion: "Alineación Normativa", critica: false, texto: "La empresa aplica prácticas operativas ambientales básicas relacionadas con residuos, limpieza y manejo de recursos para cumplir con requisitos normativos.", guia: "¿Lo están cumpliendo hoy o hay riesgos de incumplimiento?" },
  { id: 22, seccion: "Alineación Normativa", critica: false, texto: "La empresa realiza algún tipo de seguimiento, registro o reporte relacionado con sus prácticas operativas ambientales.", guia: "¿Registran algo? ¿Tienen evidencia de lo que hacen?" },
  { id: 23, seccion: "Alineación Normativa", critica: false, texto: "La empresa cuenta con alguna certificación, distintivo o iniciativa relacionada con sostenibilidad o gestión ambiental.", guia: "¿Han participado en algún programa como Cocina Verde, Punto Limpio u otro?" },
];

const SECCIONES = [...new Set(PREGUNTAS.map(p => p.seccion))];

const SEMAFORO_INTEGRACION = [
  { min: 0, max: 67, color: "rojo", label: "Inicial", desc: "Las prácticas operativas ambientales son mínimas o inexistentes. No hay estructura, responsables definidos ni alineación entre áreas.", emoji: "🔴" },
  { min: 68, max: 106, color: "amarillo", label: "En desarrollo", desc: "Existen prácticas operativas ambientales y hay voluntad, pero la ejecución es inconsistente o requiere supervisión constante para mantenerse.", emoji: "🟡" },
  { min: 107, max: 145, color: "verde", label: "Integrado", desc: "Las prácticas operativas ambientales forman parte de la operación diaria con criterios distribuidos en el equipo.", emoji: "🟢" },
];

const SEMAFORO_CRITERIO = [
  { min: 0, max: 37, color: "rojo", label: "Criterio en una sola persona", desc: "El criterio operativo ambiental está concentrado en una o pocas personas. Si esa persona no está presente, las prácticas operativas ambientales se detienen o se ejecutan de forma inconsistente.", emoji: "🔴" },
  { min: 38, max: 59, color: "amarillo", label: "Bases iniciales de criterio", desc: "Hay avances en la distribución del criterio operativo, pero el sistema todavía falla ante cambios de personal, rotación alta o falta de dirección activa.", emoji: "🟡" },
  { min: 60, max: 80, color: "verde", label: "Criterio en desarrollo", desc: "El criterio operativo ambiental está distribuido en el equipo. Las prácticas operativas ambientales se sostienen con mayor consistencia sin depender de supervisión constante.", emoji: "🟢" },
];

const DESCRIPCIONES_SECCION = {
  "Claridad Operativa": {
    que: "Evalúa si la empresa sabe qué prácticas operativas ambientales tiene, quién las ejecuta y cómo se hacen.",
    rojo: "No hay claridad sobre qué prácticas operativas ambientales existen, quién es responsable ni cómo deben ejecutarse. Las acciones son informales o dependen de la memoria de cada persona.",
    amarillo: "Hay alguna claridad pero los responsables no están bien definidos o el equipo no tiene instrucciones claras sobre cómo ejecutar las prácticas operativas ambientales.",
    verde: "Las prácticas operativas ambientales están identificadas, tienen responsables definidos y el equipo sabe cómo ejecutarlas.",
  },
  "Criterio Distribuido": {
    que: "Evalúa si el criterio operativo ambiental está repartido en el equipo o concentrado en una sola persona.",
    rojo: "El criterio está en una sola persona. Si esa persona no está, las prácticas operativas ambientales se detienen o se ejecutan mal. La dirección no está activamente involucrada.",
    amarillo: "Hay alguna distribución del criterio pero todavía existen áreas donde la operación depende de personas específicas o de recordatorios frecuentes.",
    verde: "El criterio está distribuido. El equipo sabe qué hacer sin que alguien tenga que supervisar constantemente.",
  },
  "Organización": {
    que: "Evalúa si las prácticas operativas ambientales están organizadas, alineadas entre áreas y documentadas con criterios claros.",
    rojo: "Las prácticas operativas ambientales existen de forma aislada y no están alineadas entre áreas. Cada quien hace lo que puede sin lineamientos comunes.",
    amarillo: "Hay algún nivel de organización pero las prácticas operativas ambientales no están completamente integradas ni documentadas de forma que el equipo pueda seguirlas de manera consistente.",
    verde: "Las prácticas operativas ambientales están organizadas, alineadas entre áreas y el equipo tiene criterios claros para ejecutarlas como parte de su trabajo diario.",
  },
  "Ejecución Real": {
    que: "Evalúa si las prácticas operativas ambientales realmente se aplican en la operación diaria y se sostienen en el tiempo.",
    rojo: "Las prácticas operativas ambientales existen en papel pero no se ejecutan de forma consistente. Se aplican solo cuando hay supervisión o presión externa.",
    amarillo: "Las prácticas operativas ambientales se ejecutan con cierta regularidad pero hay inconsistencias. No se han sostenido de forma estable por varios meses.",
    verde: "Las prácticas operativas ambientales se ejecutan de forma constante en la operación diaria y se han sostenido en el tiempo sin depender de supervisión externa.",
  },
  "Capacidades Internas": {
    que: "Evalúa si el equipo tiene el conocimiento y las habilidades para ejecutar y enseñar las prácticas operativas ambientales.",
    rojo: "El equipo no tiene claro qué debe hacer, por qué importa ni cómo enseñárselo a alguien nuevo. El conocimiento está concentrado o no existe formalmente.",
    amarillo: "El equipo tiene conocimiento parcial. Algunos miembros saben qué hacer pero no hay un proceso claro para que el criterio llegue a toda la organización.",
    verde: "El equipo entiende qué hacer, por qué importa y existe un proceso claro para que el criterio sobre las prácticas operativas ambientales llegue también al personal nuevo.",
  },
  "Desperdicios y Recursos": {
    que: "Evalúa si la empresa identifica dónde pierde recursos y si tiene acciones concretas para reducir esos desperdicios.",
    rojo: "No hay claridad sobre dónde se generan los desperdicios de agua, energía o insumos. No existen acciones concretas para reducirlos.",
    amarillo: "Hay alguna identificación de desperdicios pero las acciones para reducirlos son parciales o no están organizadas de forma sistemática.",
    verde: "La empresa sabe dónde genera desperdicios y tiene acciones concretas en marcha para reducirlos dentro de la operación diaria.",
  },
  "Alineación Normativa": {
    que: "Evalúa si la empresa conoce y cumple los requisitos normativos ambientales aplicables a su operación.",
    rojo: "La empresa no tiene claridad sobre qué normas aplican a su operación o no está cumpliendo con los requisitos básicos de residuos, salubridad y manejo de recursos.",
    amarillo: "La empresa conoce algunos requisitos normativos pero el cumplimiento es parcial o no está documentado con evidencia verificable.",
    verde: "La empresa conoce los requisitos normativos aplicables, los cumple en la operación diaria y cuenta con algún registro o evidencia de ello.",
  },
};

const TIPOS_GASTRONOMICO = ["Restaurante", "Cafetería", "Bar", "Hotel / Restaurante", "Cocina económica"];
const TIPOS_EDUCATIVO = ["Institución educativa"];

const getRec = (integracion, criterio, nicho) => {
  const g = nicho === "gastronomico";
  if (integracion === "rojo") return {
    servicio: g ? "Diagnóstico Estratégico de Sostenibilidad Operativa — DESO" : "Diagnóstico Estratégico de Gestión Ambiental Operativa — DEGAO",
    razon: "La prioridad es generar claridad técnica sobre dónde están las brechas antes de implementar cualquier cosa. El diagnóstico identifica desperdicios, riesgos normativos y capacidades internas en 10 días hábiles.",
  };
  if (integracion === "amarillo") return {
    servicio: g ? "Implementación de Prácticas Operativas Sostenibles — IPOS · Método NÚCLEO ATS™" : "Implementación de Programas de Sostenibilidad Ambiental · Método NÚCLEO ATS™",
    razon: g
      ? "Existen prácticas operativas ambientales pero el criterio no está distribuido o la ejecución es inconsistente. El proceso de 5 meses instala criterios operativos y verifica que se sostengan cuando el acompañamiento disminuye."
      : "Existen prácticas operativas ambientales pero el criterio no está distribuido o la ejecución es inconsistente. El proceso de 6 meses instala criterios operativos y fortalece las capacidades del equipo para sostenerlos.",
  };
  if (integracion === "verde" && criterio !== "verde") return {
    servicio: g
      ? "Criterio de consultora — IPOS si es cliente nuevo · Fortalecimiento de la Capacidad Operativa si ya fue cliente de Potencia"
      : "Criterio de consultora — Implementación si es cliente nuevo · Servicio de Continuidad en Sostenibilidad Ambiental — SCSA si ya fue cliente de Potencia",
    razon: "La integración es sólida pero el criterio requiere fortalecimiento. El servicio recomendado depende de si la organización ya tuvo un proceso previo con Potencia.",
  };
  if (integracion === "verde" && criterio === "verde") return {
    servicio: g
      ? "Criterio de consultora — se evalúa si hay oportunidades reales de mejora"
      : "Servicio de Continuidad en Sostenibilidad Ambiental — SCSA + diagnóstico acotado",
    razon: g
      ? "Combinación poco frecuente. Si hay oportunidades reales de mejora se propone un diagnóstico acotado y el Fortalecimiento de la Capacidad Operativa. Si no las hay, se comunica con honestidad."
      : "El sistema está consolidado. El SCSA mantiene activos los indicadores, detecta desviaciones a tiempo e incluye un diagnóstico acotado para identificar áreas de ajuste.",
  };
  return null;
};

function getNivel(valor, semaforo) {
  return semaforo.find(s => valor >= s.min && valor <= s.max);
}

function getColor(color) {
  if (color === "rojo") return { bg: "#FEE2E2", border: "#EF4444", text: "#991B1B", badge: "#EF4444" };
  if (color === "amarillo") return { bg: "#FEF9C3", border: "#EAB308", text: "#713F12", badge: "#EAB308" };
  if (color === "verde") return { bg: "#DCFCE7", border: "#22C55E", text: "#14532D", badge: "#22C55E" };
  return { bg: "#F5F7FA", border: "#CCCCCC", text: "#1C2D42", badge: "#CCCCCC" };
}

function calcularResultados(respuestas) {
  let totalIntegracion = 0;
  let totalCriterio = 0;
  PREGUNTAS.forEach(p => {
    const val = respuestas[p.id];
    if (val) {
      totalIntegracion += val * (p.critica ? 2 : 1);
      if (p.critica) totalCriterio += val * 2;
    }
  });
  const nivelInt = getNivel(totalIntegracion, SEMAFORO_INTEGRACION);
  const nivelCrit = getNivel(totalCriterio, SEMAFORO_CRITERIO);
  return { totalIntegracion, totalCriterio, nivelInt, nivelCrit };
}

function ProgressBar({ value, max, color }) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  const c = color === "rojo" ? "#EF4444" : color === "amarillo" ? "#EAB308" : color === "verde" ? "#22C55E" : "#0097D7";
  return (
    <div style={{ background: "#E5E7EB", borderRadius: 8, height: 10, overflow: "hidden", width: "100%" }}>
      <div style={{ width: `${pct}%`, background: c, height: "100%", borderRadius: 8, transition: "width 0.5s ease" }} />
    </div>
  );
}

function PuntajeCard({ label, valor, max, nivel, mini }) {
  const c = nivel ? getColor(nivel.color) : getColor(null);
  const pct = Math.round((valor / max) * 100);
  return (
    <div style={{ background: c.bg, border: `2px solid ${c.border}`, borderRadius: 12, padding: mini ? "12px 16px" : "16px 20px", flex: 1 }}>
      <div style={{ fontSize: mini ? 10 : 11, color: "#666", fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase", marginBottom: 4 }}>{label}</div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 6 }}>
        <span style={{ fontSize: mini ? 26 : 34, fontWeight: 800, color: c.badge, fontFamily: "Arial" }}>{valor}</span>
        <span style={{ fontSize: 13, color: "#888" }}>/ {max}</span>
        <span style={{ fontSize: 12, color: "#888", marginLeft: 4 }}>{pct}%</span>
      </div>
      <ProgressBar value={valor} max={max} color={nivel?.color} />
      {nivel && (
        <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: 15 }}>{nivel.emoji}</span>
          <span style={{ fontSize: 12, fontWeight: 700, color: c.text }}>{nivel.label}</span>
        </div>
      )}
    </div>
  );
}

export default function DiagnosticoInicial() {
  const [vista, setVista] = useState("inicio");
  const [respuestas, setRespuestas] = useState({});
  const [seccionActual, setSeccionActual] = useState(0);
  const [clienteNombre, setClienteNombre] = useState("");
  const [clienteTipo, setClienteTipo] = useState("");
  const [showGuia, setShowGuia] = useState({});

  const nicho = TIPOS_EDUCATIVO.includes(clienteTipo) ? "educativo" : "gastronomico";
  const resultados = calcularResultados(respuestas);
  const preguntasSeccion = PREGUNTAS.filter(p => p.seccion === SECCIONES[seccionActual]);
  const totalRespondidas = Object.keys(respuestas).length;
  const progresoPct = Math.round((totalRespondidas / PREGUNTAS.length) * 100);
  const seccionCompleta = preguntasSeccion.every(p => respuestas[p.id] !== undefined);

  function setRespuesta(id, val) { setRespuestas(prev => ({ ...prev, [id]: val })); }
  function siguienteSeccion() { seccionActual < SECCIONES.length - 1 ? setSeccionActual(s => s + 1) : setVista("resultado"); }
  function anteriorSeccion() { seccionActual > 0 && setSeccionActual(s => s - 1); }

  // INICIO
  if (vista === "inicio") return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #011B5B 0%, #0047A5 60%, #0097D7 100%)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Arial, sans-serif", padding: 24 }}>
      <div style={{ background: "white", borderRadius: 20, padding: "40px 48px", maxWidth: 560, width: "100%", boxShadow: "0 24px 64px rgba(0,0,0,0.18)" }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2, color: "#0097D7", textTransform: "uppercase", marginBottom: 6 }}>Potencia Consultoría Estratégica</div>
          <div style={{ fontSize: 11, color: "#AAA", letterSpacing: 1, marginBottom: 20 }}>Aprender · Transformar · Sostener</div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: "#011B5B", margin: "0 0 10px", lineHeight: 1.2 }}>Diagnóstico Inicial de Sostenibilidad Operativa</h1>
          <p style={{ color: "#666", fontSize: 13, lineHeight: 1.6, margin: 0 }}>Conversación inicial · 20–25 minutos · 23 preguntas · 7 secciones</p>
        </div>
        <div style={{ background: "#F5F7FA", borderRadius: 12, padding: "14px 18px", marginBottom: 24 }}>
          <p style={{ fontSize: 13, color: "#444", lineHeight: 1.7, margin: 0 }}>Esta herramienta es una <strong>conversación guiada</strong> — no una auditoría. Exploramos juntos el estado actual de las prácticas operativas ambientales para identificar las oportunidades de mejora más importantes.</p>
        </div>
        <div style={{ marginBottom: 20 }}>
          <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#011B5B", marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 }}>Nombre del establecimiento</label>
          <input value={clienteNombre} onChange={e => setClienteNombre(e.target.value)} placeholder="Ej. Restaurante La Cocina" style={{ width: "100%", border: "1.5px solid #D1D5DB", borderRadius: 8, padding: "10px 14px", fontSize: 14, outline: "none", boxSizing: "border-box", fontFamily: "Arial" }} />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#011B5B", marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.5 }}>Sector</label>
          <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
            {["Sector gastronómico", "Sector educativo"].map(s => {
              const activo = s === "Sector gastronómico" ? TIPOS_GASTRONOMICO.includes(clienteTipo) : TIPOS_EDUCATIVO.includes(clienteTipo);
              return (
                <button key={s} onClick={() => setClienteTipo(s === "Sector gastronómico" ? "Restaurante" : "Institución educativa")}
                  style={{ flex: 1, padding: "10px 14px", borderRadius: 10, border: `2px solid ${activo ? "#0047A5" : "#D1D5DB"}`, background: activo ? "#011B5B" : "white", color: activo ? "white" : "#444", fontSize: 13, cursor: "pointer", fontFamily: "Arial", fontWeight: activo ? 700 : 400, transition: "all 0.2s" }}>
                  {s === "Sector gastronómico" ? "🍽️ Gastronómico" : "🎓 Educativo"}
                </button>
              );
            })}
          </div>
          {TIPOS_GASTRONOMICO.includes(clienteTipo) && (
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {TIPOS_GASTRONOMICO.map(t => (
                <button key={t} onClick={() => setClienteTipo(t)} style={{ padding: "6px 12px", borderRadius: 16, border: `1.5px solid ${clienteTipo === t ? "#0047A5" : "#E5E7EB"}`, background: clienteTipo === t ? "#EFF8FF" : "white", color: clienteTipo === t ? "#0047A5" : "#666", fontSize: 12, cursor: "pointer", fontFamily: "Arial", fontWeight: clienteTipo === t ? 700 : 400 }}>{t}</button>
              ))}
            </div>
          )}
        </div>
        {clienteTipo && (
          <div style={{ background: TIPOS_EDUCATIVO.includes(clienteTipo) ? "#EFF8FF" : "#F0FDF4", borderRadius: 8, padding: "8px 14px", marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 12, color: TIPOS_EDUCATIVO.includes(clienteTipo) ? "#0047A5" : "#15803D", fontWeight: 600 }}>
              {TIPOS_EDUCATIVO.includes(clienteTipo) ? "🎓 Nicho educativo seleccionado" : "🍽️ Nicho gastronómico seleccionado"}
            </span>
          </div>
        )}
        <button onClick={() => { if (clienteNombre || clienteTipo) setVista("diagnostico"); }} style={{ width: "100%", background: clienteNombre || clienteTipo ? "linear-gradient(90deg, #011B5B, #0047A5)" : "#E5E7EB", color: clienteNombre || clienteTipo ? "white" : "#999", border: "none", borderRadius: 10, padding: "14px 24px", fontSize: 15, fontWeight: 700, cursor: clienteNombre || clienteTipo ? "pointer" : "not-allowed", fontFamily: "Arial" }}>
          Iniciar diagnóstico →
        </button>
      </div>
    </div>
  );

  // DIAGNÓSTICO
  if (vista === "diagnostico") return (
    <div style={{ minHeight: "100vh", background: "#F5F7FA", fontFamily: "Arial, sans-serif" }}>
      <div style={{ background: "#011B5B", padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100 }}>
        <div>
          <div style={{ fontSize: 10, color: "#0097D7", fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" }}>Diagnóstico Inicial · {nicho === "educativo" ? "Sector Educativo" : "Sector Gastronómico"}</div>
          <div style={{ fontSize: 13, color: "white", fontWeight: 600 }}>{clienteNombre || "Establecimiento"}</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 10, color: "#0097D7", fontWeight: 600 }}>{totalRespondidas}/{PREGUNTAS.length} respondidas</div>
            <div style={{ width: 120, background: "rgba(255,255,255,0.2)", borderRadius: 4, height: 5, marginTop: 4 }}>
              <div style={{ width: `${progresoPct}%`, background: "#28C2B3", height: "100%", borderRadius: 4, transition: "width 0.4s" }} />
            </div>
          </div>
          <div style={{ display: "flex", gap: 4 }}>
            {SECCIONES.map((s, i) => {
              const preg = PREGUNTAS.filter(p => p.seccion === s);
              const completa = preg.every(p => respuestas[p.id] !== undefined);
              return <div key={s} onClick={() => setSeccionActual(i)} title={s} style={{ width: 10, height: 10, borderRadius: "50%", cursor: "pointer", background: i === seccionActual ? "#28C2B3" : completa ? "#3FA33E" : "rgba(255,255,255,0.3)", border: i === seccionActual ? "2px solid white" : "none", transition: "all 0.2s" }} />;
            })}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 760, margin: "0 auto", padding: "24px 20px 120px" }}>
        {totalRespondidas > 0 && (
          <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
            <PuntajeCard label="Integración operativa" valor={resultados.totalIntegracion} max={145} nivel={resultados.nivelInt} mini />
            <PuntajeCard label="Criterio operativo distribuido" valor={resultados.totalCriterio} max={80} nivel={resultados.nivelCrit} mini />
          </div>
        )}
        <div style={{ background: "white", borderRadius: 16, boxShadow: "0 2px 12px rgba(0,0,0,0.07)", overflow: "hidden" }}>
          <div style={{ background: "linear-gradient(90deg, #0047A5, #0097D7)", padding: "18px 28px" }}>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.7)", fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", marginBottom: 4 }}>Sección {seccionActual + 1} de {SECCIONES.length}</div>
            <h2 style={{ color: "white", fontSize: 19, fontWeight: 800, margin: 0 }}>{SECCIONES[seccionActual]}</h2>
          </div>
          <div style={{ padding: "24px 28px" }}>
            {preguntasSeccion.map((p, idx) => {
              const val = respuestas[p.id];
              return (
                <div key={p.id} style={{ marginBottom: idx < preguntasSeccion.length - 1 ? 28 : 0, paddingBottom: idx < preguntasSeccion.length - 1 ? 28 : 0, borderBottom: idx < preguntasSeccion.length - 1 ? "1px solid #F0F0F0" : "none" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 8 }}>
                    {p.critica && <span style={{ background: "#FEF3C7", color: "#92400E", fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 10, whiteSpace: "nowrap", marginTop: 2 }}>CLAVE</span>}
                    <p style={{ fontSize: 14, color: "#1C2D42", fontWeight: 600, margin: 0, lineHeight: 1.5 }}>{p.texto}</p>
                  </div>
                  <button onClick={() => setShowGuia(prev => ({ ...prev, [p.id]: !prev[p.id] }))} style={{ fontSize: 11, color: "#0097D7", background: "none", border: "none", cursor: "pointer", padding: "0 0 8px", fontFamily: "Arial", display: "flex", alignItems: "center", gap: 4 }}>
                    {showGuia[p.id] ? "▲" : "▼"} Pregunta guía para la conversación
                  </button>
                  {showGuia[p.id] && (
                    <div style={{ background: "#EFF8FF", border: "1px solid #BAE6FD", borderRadius: 8, padding: "10px 14px", marginBottom: 10 }}>
                      <p style={{ fontSize: 13, color: "#0369A1", margin: 0, fontStyle: "italic" }}>"{p.guia}"</p>
                    </div>
                  )}
                  <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                    <span style={{ fontSize: 11, color: "#999", width: 58 }}>En desacuerdo</span>
                    {[1, 2, 3, 4, 5].map(n => (
                      <button key={n} onClick={() => setRespuesta(p.id, n)} style={{ width: 44, height: 44, borderRadius: "50%", border: val === n ? "3px solid #011B5B" : "2px solid #D1D5DB", background: val === n ? (n <= 2 ? "#EF4444" : n === 3 ? "#EAB308" : "#22C55E") : "white", color: val === n ? "white" : "#444", fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "Arial", transition: "all 0.2s", boxShadow: val === n ? "0 2px 8px rgba(0,0,0,0.15)" : "none" }}>{n}</button>
                    ))}
                    <span style={{ fontSize: 11, color: "#999", width: 58, textAlign: "right" }}>De acuerdo</span>
                    {val && <span style={{ fontSize: 11, color: "#666", marginLeft: 6 }}>{val === 1 ? "Totalmente en desacuerdo" : val === 2 ? "Parcialmente en desacuerdo" : val === 3 ? "Neutral" : val === 4 ? "Parcialmente de acuerdo" : "Totalmente de acuerdo"}</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: "white", borderTop: "1px solid #E5E7EB", padding: "14px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", boxShadow: "0 -4px 20px rgba(0,0,0,0.08)" }}>
        <button onClick={anteriorSeccion} disabled={seccionActual === 0} style={{ padding: "10px 24px", border: "1.5px solid #D1D5DB", borderRadius: 8, background: "white", color: seccionActual === 0 ? "#CCC" : "#444", cursor: seccionActual === 0 ? "not-allowed" : "pointer", fontSize: 13, fontWeight: 600, fontFamily: "Arial" }}>← Anterior</button>
        <div style={{ fontSize: 12, color: "#666", textAlign: "center" }}>
          <strong style={{ color: "#011B5B" }}>{seccionActual + 1}</strong> de {SECCIONES.length} secciones
          {!seccionCompleta && <div style={{ fontSize: 10, color: "#EAB308", marginTop: 2 }}>Responde todas las preguntas para continuar</div>}
        </div>
        <button onClick={siguienteSeccion} disabled={!seccionCompleta} style={{ padding: "10px 24px", border: "none", borderRadius: 8, background: seccionCompleta ? "linear-gradient(90deg, #011B5B, #0047A5)" : "#E5E7EB", color: seccionCompleta ? "white" : "#999", cursor: seccionCompleta ? "pointer" : "not-allowed", fontSize: 13, fontWeight: 700, fontFamily: "Arial" }}>
          {seccionActual < SECCIONES.length - 1 ? "Siguiente →" : "Ver resultado →"}
        </button>
      </div>
    </div>
  );

  // RESULTADO
  if (vista === "resultado") {
    const { totalIntegracion, totalCriterio, nivelInt, nivelCrit } = resultados;
    const rec = getRec(nivelInt?.color, nivelCrit?.color, nicho);
    const cInt = nivelInt ? getColor(nivelInt.color) : getColor(null);
    const cCrit = nivelCrit ? getColor(nivelCrit.color) : getColor(null);
    const brechas = SECCIONES.map(sec => {
      const preg = PREGUNTAS.filter(p => p.seccion === sec);
      const promedio = preg.reduce((acc, p) => acc + (respuestas[p.id] || 0), 0) / preg.length;
      const nivel = promedio < 2.5 ? "bajo" : promedio < 3.5 ? "medio" : "alto";
      return { sec, promedio, nivel };
    }).sort((a, b) => a.promedio - b.promedio);

    return (
      <div style={{ minHeight: "100vh", background: "#F5F7FA", fontFamily: "Arial, sans-serif" }}>
        <div style={{ background: "linear-gradient(135deg, #011B5B 0%, #0047A5 100%)", padding: "28px 24px 32px", textAlign: "center" }}>
          <div style={{ fontSize: 10, color: "#0097D7", fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>Diagnóstico Inicial de Sostenibilidad Operativa · Potencia</div>
          <h1 style={{ color: "white", fontSize: 22, fontWeight: 800, margin: "0 0 6px" }}>{clienteNombre || "Resultado del diagnóstico"}</h1>
          {clienteTipo && <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 13 }}>{clienteTipo} · {nicho === "educativo" ? "Sector Educativo" : "Sector Gastronómico"}</div>}
        </div>

        <div style={{ maxWidth: 760, margin: "0 auto", padding: "24px 20px 60px" }}>
          <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
            <PuntajeCard label="Integración operativa" valor={totalIntegracion} max={145} nivel={nivelInt} />
            <PuntajeCard label="Criterio operativo distribuido" valor={totalCriterio} max={80} nivel={nivelCrit} />
          </div>

          <div style={{ display: "grid", gap: 14, marginBottom: 24 }}>
            {nivelInt && (
              <div style={{ background: cInt.bg, border: `2px solid ${cInt.border}`, borderRadius: 12, padding: "18px 22px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                  <span style={{ fontSize: 22 }}>{nivelInt.emoji}</span>
                  <div>
                    <div style={{ fontSize: 10, fontWeight: 700, color: cInt.text, textTransform: "uppercase", letterSpacing: 0.5 }}>Nivel de integración operativa</div>
                    <div style={{ fontSize: 17, fontWeight: 800, color: cInt.badge }}>{nivelInt.label}</div>
                  </div>
                </div>
                <p style={{ fontSize: 13, color: cInt.text, margin: 0, lineHeight: 1.6 }}>{nivelInt.desc}</p>
              </div>
            )}
            {nivelCrit && (
              <div style={{ background: cCrit.bg, border: `2px solid ${cCrit.border}`, borderRadius: 12, padding: "18px 22px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                  <span style={{ fontSize: 22 }}>{nivelCrit.emoji}</span>
                  <div>
                    <div style={{ fontSize: 10, fontWeight: 700, color: cCrit.text, textTransform: "uppercase", letterSpacing: 0.5 }}>Nivel de criterio operativo distribuido</div>
                    <div style={{ fontSize: 17, fontWeight: 800, color: cCrit.badge }}>{nivelCrit.label}</div>
                  </div>
                </div>
                <p style={{ fontSize: 13, color: cCrit.text, margin: 0, lineHeight: 1.6 }}>{nivelCrit.desc}</p>
              </div>
            )}
          </div>

          <div style={{ background: "white", borderRadius: 16, padding: "22px 26px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", marginBottom: 22 }}>
            <h3 style={{ fontSize: 14, fontWeight: 800, color: "#011B5B", margin: "0 0 4px" }}>Áreas con mayor oportunidad de mejora</h3>
            <p style={{ fontSize: 11, color: "#888", margin: "0 0 18px" }}>Las tres áreas con menor puntaje en este diagnóstico</p>
            {brechas.slice(0, 3).map(({ sec, promedio, nivel }) => {
              const pct = Math.round((promedio / 5) * 100);
              const c = nivel === "bajo" ? "#EF4444" : nivel === "medio" ? "#EAB308" : "#22C55E";
              const bg = nivel === "bajo" ? "#FEF2F2" : nivel === "medio" ? "#FEFCE8" : "#F0FDF4";
              const desc = DESCRIPCIONES_SECCION[sec];
              const lectura = nivel === "bajo" ? desc?.rojo : nivel === "medio" ? desc?.amarillo : desc?.verde;
              return (
                <div key={sec} style={{ marginBottom: 16, background: bg, borderRadius: 10, padding: "14px 16px", border: `1.5px solid ${c}33` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: "#1C2D42" }}>{sec}</span>
                    <span style={{ fontSize: 13, color: c, fontWeight: 800 }}>{pct}%</span>
                  </div>
                  <div style={{ background: "#E5E7EB", borderRadius: 6, height: 7, overflow: "hidden", marginBottom: 10 }}>
                    <div style={{ width: `${pct}%`, background: c, height: "100%", borderRadius: 6, transition: "width 0.6s ease" }} />
                  </div>
                  {desc && (
                    <>
                      <p style={{ fontSize: 12, color: "#555", margin: "0 0 5px", lineHeight: 1.5 }}><strong style={{ color: "#444" }}>¿Qué evalúa?</strong> {desc.que}</p>
                      {lectura && <p style={{ fontSize: 12, color: c === "#EF4444" ? "#991B1B" : c === "#EAB308" ? "#713F12" : "#14532D", margin: 0, lineHeight: 1.5, fontStyle: "italic" }}>{lectura}</p>}
                    </>
                  )}
                </div>
              );
            })}
          </div>

          {rec && (
            <div style={{ background: "linear-gradient(135deg, #011B5B 0%, #0047A5 100%)", borderRadius: 16, padding: "26px", marginBottom: 22, color: "white" }}>
              <div style={{ fontSize: 10, color: "#28C2B3", fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginBottom: 10 }}>Próximo paso sugerido</div>
              <h3 style={{ fontSize: 17, fontWeight: 800, margin: "0 0 10px", color: "white", lineHeight: 1.3 }}>{rec.servicio}</h3>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.85)", lineHeight: 1.7, margin: "0 0 18px" }}>{rec.razon}</p>
              <div style={{ background: "rgba(255,255,255,0.1)", borderRadius: 10, padding: "12px 16px" }}>
                <div style={{ fontSize: 10, color: "#28C2B3", fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6 }}>Método NÚCLEO ATS™</div>
                <div style={{ display: "flex", gap: 16 }}>
                  {["Aprender", "Transformar", "Sostener"].map(p => (
                    <div key={p} style={{ fontSize: 12, color: "rgba(255,255,255,0.9)", fontWeight: 600 }}>· {p}</div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div style={{ display: "flex", gap: 12 }}>
            <button onClick={() => { setVista("inicio"); setRespuestas({}); setSeccionActual(0); setClienteNombre(""); setClienteTipo(""); }} style={{ flex: 1, padding: "12px", border: "1.5px solid #D1D5DB", borderRadius: 10, background: "white", color: "#444", cursor: "pointer", fontSize: 13, fontWeight: 600, fontFamily: "Arial" }}>Nuevo diagnóstico</button>
            <button onClick={() => setVista("diagnostico")} style={{ flex: 1, padding: "12px", border: "none", borderRadius: 10, background: "#011B5B", color: "white", cursor: "pointer", fontSize: 13, fontWeight: 700, fontFamily: "Arial" }}>Revisar respuestas</button>
          </div>
        </div>
      </div>
    );
  }
}
