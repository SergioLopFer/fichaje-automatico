# Fichaje automático — Tests Playwright

Este repositorio contiene pruebas E2E con Playwright y un workflow de GitHub Actions que ejecuta los tests por caso de uso y envía una notificación por email al terminar.

## Estructura principal

- `tests/` — Contiene los archivos de prueba (*.spec.ts):
  - `login-people.spec.ts` — Tests de login
  - `fichar-entrada-presencial.spec.ts` — Tests de fichaje entrada presencial
  - `fichar-entrada-teletrabajo.spec.ts` — Tests de fichaje entrada teletrabajo
  - `fichar-salida.spec.ts` — Tests de fichaje de salida
  - `example.spec.ts` — Archivo de ejemplo (no necesario; recomendado eliminar)

- `playwright.config.ts` — Configuración de Playwright
- `.github/workflows/playwright.yml` — Workflow de CI que ejecuta los tests y envía emails
- `playwright-report/` y `test-results/` — Directorios generados por Playwright y runners (no versionar)
- `package.json`, `package-lock.json` — Dependencias y scripts

## Qué hace el workflow (`.github/workflows/playwright.yml`)

- Ejecuta los tests por caso de uso:
  - `test-fichar-entrada` — ejecuta `tests/fichar-entrada-presencial.spec.ts` y `tests/fichar-entrada-teletrabajo.spec.ts`
  - `test-fichar-salida` — ejecuta `tests/fichar-salida.spec.ts`
- Guarda los reportes generados bajo `playwright-report/` como artefactos del run.
- Envía un email con el resultado final (éxito/fracaso) usando la acción `dawidd6/action-send-mail`.

### Triggers del workflow

El workflow se ejecuta en:

- `push` a `main` / `master`
- `pull_request` hacia `main` / `master`
- `workflow_dispatch` (manual)
- `schedule` (cron):
  - `test-fichar-entrada`: lunes a viernes a las 8:00 CET (7:00 UTC) — cron `0 7 * * 1-5`
  - `test-fichar-salida`: lunes a jueves a las 17:30 CET (16:30 UTC) — cron `30 16 * * 1-4`
  - `test-fichar-salida` (viernes): viernes a las 14:00 CET (13:00 UTC) — cron `0 13 * * 5`

> Nota: GitHub Actions usa UTC para los valores `cron`, por eso en el workflow aparecen las horas en UTC.

## Configuración necesaria para el envío de emails

Debes añadir los siguientes secretos en el repositorio (Settings → Secrets and variables → Actions):

- `EMAIL_USERNAME` — Dirección de correo utilizada para autenticar (p. ej. Gmail)
- `EMAIL_PASSWORD` — Contraseña o contraseña de aplicación (app password). Para Gmail es recomendable generar una contraseña de aplicación
- `EMAIL_RECIPIENT` — Dirección de destino que recibirá las notificaciones

Una vez añadidos, el workflow usará estos valores para enviar el email.

## Cómo ejecutar los tests localmente

1. Instalar dependencias:

```bash
npm ci
```

2. Instalar navegadores de Playwright (solo una vez):

```bash
npx playwright install --with-deps
```

3. Ejecutar todos los tests:

```bash
npx playwright test
```

4. Ejecutar solo los tests de un caso de uso (ejemplo `fichar-entrada`):

```bash
npx playwright test tests/fichar-entrada-presencial.spec.ts
npx playwright test tests/fichar-entrada-teletrabajo.spec.ts
```

5. Ejecutar un test concreto o con filtro por título:

```bash
npx playwright test -g "nombre del test"
```

Los reportes se guardarán en `playwright-report/`.

## Archivos/directorios recomendados para limpiar o ignorar

- `tests/example.spec.ts` — Archivo de ejemplo; se recomienda eliminarlo si no aporta valor.
- `playwright-report/` y `test-results/` — Directorios generados, no versionarlos. Asegúrate de tenerlos en `.gitignore`.

## Consejos y buenas prácticas

- Usa contraseñas de aplicación para Gmail o un servicio SMTP dedicado con credenciales específicas para automatización.
- Si necesitas enviar adjuntos (por ejemplo los reportes), puedes ampliar la acción de envío de correo o usar una acción alternativa que soporte adjuntos más grandes.
- Para depurar ejecuciones programadas, activa `workflow_dispatch` y prueba manualmente antes de confiar en el cron.
