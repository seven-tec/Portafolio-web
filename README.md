# 🚀 Portafolio: Seven | Arquitecto de Software & Desarrollador Full-Stack

Bienvenido al código fuente de mi portafolio web personal. 

**🔗 Sitio en vivo:** [portfolio-arquitectura.vercel.app](https://portfolio-arquitectura.vercel.app)

## 📌 Sobre Mí (Seven)
Ingeniero Informático especializado en resolver problemas complejos mediante arquitectura moderna, automatización y desarrollo local de IA. Mi enfoque está en la orquestación de sistemas escalables y agentes inteligentes, priorizando performance, seguridad y valor de negocio.

## 🛠️ Stack Tecnológico de este Portafolio
- **Framework:** Next.js (App Router)
- **Lenguaje:** TypeScript
- **Despliegue:** Vercel

## 💼 Casos de Estudio Destacados
- **Inventario / ERP Bodega:** Sistema de alta performance para gestión de stock con Arquitectura Hexagonal y Rust.
- **NovelaVox Studio:** Orquestación de IA y TTS local con persistencia en IndexedDB, procesando audio en tiempo real con latencia < 10ms y costo de infraestructura cero.

## ⚙️ Instalación Local
Para correr este proyecto en tu máquina:

```bash
npm install
npm run dev
```

## 📧 Lead Pipeline — Formulario de Arquitectura

El formulario en `/architecture-review` entrega los leads mediante un servicio externo configurable (Formspree, Web3Forms, etc.).

### Configuración

1. Copiá `.env.local.example` a `.env.local`
2. Registrate en [formspree.io](https://formspree.io) (gratuito)
3. Creá un nuevo formulario con destino a `3bc41pnvc2010@gmail.com`
4. Copiá el endpoint URL (`https://formspree.io/f/xxxxx`) en `LEAD_ENDPOINT_URL`

Si no configurás el endpoint, los leads se loguean a consola en desarrollo.

### Variables de Entorno

| Variable | Obligatorio | Descripción |
|----------|-------------|-------------|
| `NEXT_PUBLIC_SITE_URL` | ✅ Producción | URL del sitio en producción |
| `LEAD_ENDPOINT_URL` | ❌ (consola si falta) | Endpoint POST JSON para entrega de leads |
| `LEAD_ENDPOINT_KEY` | ❌ | API key para servicios que requieren autenticación Bearer |
