const ENDPOINT_URL = process.env.LEAD_ENDPOINT_URL;
const ENDPOINT_KEY = process.env.LEAD_ENDPOINT_KEY;

const LEAD_EMAIL = "3bc41pnvc2010@gmail.com";

function buildEmailHtml(data: Record<string, string>): string {
  const fields = [
    ["Nombre", data.name],
    ["Email", data.email],
    ["Empresa / Proyecto", data.companyOrProject],
    ["Tipo de producto", data.productType],
    ["Pain point principal", data.primaryPainPoint],
    ["Urgencia", data.urgency],
    ["Stack actual", data.currentStack],
    ["Volumen estimado", data.estimatedTraffic],
    ["Plazo estimado", data.timeline],
    ["Rango de presupuesto", data.budgetRange],
    ["Links relevantes", data.relevantLinks],
    ["Descripción del problema", data.problemDescription],
    ["Estado actual del sistema", data.currentSystemState],
    ["Restricciones técnicas", data.technicalConstraints],
    ["Objetivo esperado", data.desiredOutcome],
  ];

  const rows = fields
    .filter(([, v]) => v)
    .map(([label, value]) =>
      `<tr><td style="padding:8px 12px;border-bottom:1px solid #333;font-weight:600;white-space:nowrap;vertical-align:top">${label}</td><td style="padding:8px 12px;border-bottom:1px solid #333;white-space:pre-wrap">${value}</td></tr>`
    )
    .join("\n");

  return `<html><body style="font-family:monospace;background:#0a0a0a;color:#e5e5e5;padding:24px"><h2 style="color:#10b981">Evaluación de Arquitectura</h2><p style="color:#888">Recibido: ${new Date().toLocaleString("es-CL")}</p><table style="width:100%;border-collapse:collapse;margin-top:16px">${rows}</table></body></html>`;
}

function buildPlainText(data: Record<string, string>): string {
  const fields = [
    ["Nombre", data.name],
    ["Email", data.email],
    ["Empresa / Proyecto", data.companyOrProject],
    ["Tipo de producto", data.productType],
    ["Pain point principal", data.primaryPainPoint],
    ["Urgencia", data.urgency],
    ["Stack actual", data.currentStack],
    ["Volumen estimado", data.estimatedTraffic],
    ["Plazo estimado", data.timeline],
    ["Rango de presupuesto", data.budgetRange],
    ["Links relevantes", data.relevantLinks],
    ["Descripción del problema", data.problemDescription],
    ["Estado actual del sistema", data.currentSystemState],
    ["Restricciones técnicas", data.technicalConstraints],
    ["Objetivo esperado", data.desiredOutcome],
  ];

  const lines = fields
    .filter(([, v]) => v)
    .map(([label, value]) => `${label}:\n${value}`)
    .join("\n\n---\n\n");

  return `Evaluación de Arquitectura\nRecibido: ${new Date().toLocaleString("es-CL")}\n\n${lines}`;
}

export async function sendLead(data: Record<string, string>): Promise<void> {
  if (!ENDPOINT_URL) {
    console.log("[LEAD-CAPTURED]", JSON.stringify({ ...data, _to: LEAD_EMAIL }, null, 2));
    return;
  }

  const body = {
    ...data,
    _to: LEAD_EMAIL,
    _subject: `[Evaluación de Arquitectura] ${data.companyOrProject || "Sin empresa"}`,
    _html: buildEmailHtml(data),
    _plain: buildPlainText(data),
  };

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  if (ENDPOINT_KEY) {
    headers["Authorization"] = `Bearer ${ENDPOINT_KEY}`;
  }

  const res = await fetch(ENDPOINT_URL, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "unknown");
    throw new Error(`Lead delivery failed (${res.status}): ${text.slice(0, 200)}`);
  }
}
