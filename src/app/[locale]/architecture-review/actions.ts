"use server";

import { sendLead } from "../../../infrastructure/leadSender";

export type FormState = {
  success: boolean;
  errors: Record<string, string>;
  values: Record<string, string>;
};

const REQUIRED_FIELDS: Record<string, string> = {
  name: "Nombre",
  email: "Email",
  companyOrProject: "Empresa o proyecto",
  productType: "Tipo de producto",
  problemDescription: "Descripción del problema",
  currentSystemState: "Estado actual del sistema",
  primaryPainPoint: "Pain point principal",
  urgency: "Urgencia",
  desiredOutcome: "Objetivo esperado",
};

const VALID_URGENCY = ["low", "medium", "high", "critical"];

export async function submitArchitectureReview(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const values: Record<string, string> = {};
  const errors: Record<string, string> = {};

  for (const [key] of formData.entries()) {
    values[key] = formData.get(key)?.toString().trim() ?? "";
  }

  for (const [field, label] of Object.entries(REQUIRED_FIELDS)) {
    if (!values[field]) {
      errors[field] = `${label} es obligatorio`;
    }
  }

  if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Ingresa un email válido";
  }

  if (values.urgency && !VALID_URGENCY.includes(values.urgency)) {
    errors.urgency = "Selecciona una urgencia válida";
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, errors, values };
  }

  try {
    await sendLead(values);
  } catch (e) {
    const message = e instanceof Error ? e.message : "Error desconocido";
    console.error("[LEAD-DELIVERY]", message);
    return {
      success: false,
      errors: { _form: "Error al enviar la solicitud. Si el problema persiste, escribime directamente." },
      values,
    };
  }

  return { success: true, errors: {}, values: {} };
}
