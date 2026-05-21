"use client";

import { useActionState } from "react";
import { submitArchitectureReview, type FormState } from "./actions";
import { AlertCircle, AlertTriangle, ArrowRight, Send } from "lucide-react";
import type { ArchitectureReviewField } from "../../domain/entities/ArchitectureReview";

const initialState: FormState = {
  success: false,
  errors: {},
  values: {},
};

export function ArchitectureReviewForm({
  fields,
  responseExpectation,
  submitLabel,
}: {
  fields: ArchitectureReviewField[];
  responseExpectation: string;
  submitLabel: string;
}) {
  const [state, formAction, isPending] = useActionState(
    submitArchitectureReview,
    initialState
  );

  if (state.success) {
    return (
      <section>
        <div className="p-8 md:p-10 rounded-xl border border-primary/20 bg-primary/5 text-center space-y-4">
          <Send className="w-12 h-12 text-primary mx-auto" />
          <h3 className="text-xl font-semibold text-white">Solicitud recibida</h3>
          <p className="text-gray-400 max-w-md mx-auto leading-relaxed">
            {responseExpectation}
          </p>
        </div>
      </section>
    );
  }

  const fieldErrors = Object.keys(state.errors).filter((k) => k !== "_form");
  const hasFormError = !!state.errors._form;

  return (
    <section>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-2">Formulario técnico</h2>
        <p className="text-sm text-gray-400">
          Completá con contexto real. Cuanto más preciso, más útil va a ser el diagnóstico.
        </p>
      </div>

      {hasFormError && (
        <div className="flex items-start gap-3 p-4 mb-6 rounded-lg border border-red-400/30 bg-red-400/10">
          <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
          <div>
            <p className="text-red-400 font-medium">Error al enviar</p>
            <p className="text-sm text-gray-400 mt-1">{state.errors._form}</p>
          </div>
        </div>
      )}

      {fieldErrors.length > 0 && (
        <div className="flex items-start gap-3 p-4 mb-6 rounded-lg border border-red-400/30 bg-red-400/10">
          <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
          <div>
            <p className="text-red-400 font-medium">Corregí los errores antes de enviar</p>
            <p className="text-sm text-gray-400 mt-1">
              Los campos marcados necesitan completarse o corregirse.
            </p>
          </div>
        </div>
      )}

      <form action={formAction} className="space-y-6" noValidate>
        {fields.map((field) => {
          const hasError = !!state.errors[field.name];

          return (
            <div key={field.name}>
              <label
                htmlFor={field.name}
                className="block text-sm font-medium text-gray-300 mb-1.5"
              >
                {field.label}
                {field.required && <span className="text-primary ml-1">*</span>}
              </label>

              {field.type === "textarea" ? (
                <textarea
                  id={field.name}
                  name={field.name}
                  placeholder={field.placeholder}
                  required={field.required}
                  rows={4}
                  defaultValue={state.values[field.name] ?? ""}
                  className={`w-full px-4 py-2.5 bg-surface border rounded-lg text-gray-200 placeholder-gray-600 focus:outline-none focus:ring-2 transition-colors resize-y ${
                    hasError
                      ? "border-red-400 focus:ring-red-400/50 focus:border-red-400/50"
                      : "border-border focus:ring-primary/50 focus:border-primary/50"
                  }`}
                />
              ) : field.type === "select" ? (
                <select
                  id={field.name}
                  name={field.name}
                  required={field.required}
                  defaultValue={state.values[field.name] ?? ""}
                  className={`w-full px-4 py-2.5 bg-surface border rounded-lg text-gray-200 focus:outline-none focus:ring-2 transition-colors ${
                    hasError
                      ? "border-red-400 focus:ring-red-400/50 focus:border-red-400/50"
                      : "border-border focus:ring-primary/50 focus:border-primary/50"
                  }`}
                >
                  <option value="">Seleccionar...</option>
                  {(field.options ?? []).map((opt) => (
                    <option key={opt} value={opt}>
                      {opt.charAt(0).toUpperCase() + opt.slice(1)}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  id={field.name}
                  name={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                  required={field.required}
                  defaultValue={state.values[field.name] ?? ""}
                  className={`w-full px-4 py-2.5 bg-surface border rounded-lg text-gray-200 placeholder-gray-600 focus:outline-none focus:ring-2 transition-colors ${
                    hasError
                      ? "border-red-400 focus:ring-red-400/50 focus:border-red-400/50"
                      : "border-border focus:ring-primary/50 focus:border-primary/50"
                  }`}
                />
              )}

              {field.type === "select" && field.helpText && !hasError && (
                <p className="text-xs text-gray-500 mt-1">{field.helpText}</p>
              )}

              {hasError && (
                <p className="text-xs text-red-400 mt-1">{state.errors[field.name]}</p>
              )}
            </div>
          );
        })}

        <div className="flex flex-col gap-4 pt-4">
          <p className="text-sm text-gray-500 leading-relaxed border border-border rounded-lg p-4 bg-surface/50">
            <AlertCircle className="inline w-4 h-4 text-primary mr-1 -mt-0.5" />
            {responseExpectation}
          </p>
          <button
            type="submit"
            disabled={isPending}
            className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-primary text-black font-semibold rounded-lg hover:bg-primary/90 transition-all hover:scale-105 self-start disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {isPending ? "Enviando..." : submitLabel}
            {!isPending && <ArrowRight className="w-4 h-4" />}
          </button>
        </div>
      </form>
    </section>
  );
}
