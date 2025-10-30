# Fichaje Automático

Automatización del proceso de fichaje usando Playwright y GitHub Actions.

## 🕒 Horarios Configurados

### Invierno (CET, UTC+1) - Noviembre a Marzo
- **Entrada**: 08:00 CET
  - Presencial: Martes y Jueves
  - Teletrabajo: Lunes, Miércoles y Viernes
- **Salida**:
  - Lunes a Jueves: 17:30 CET
  - Viernes: 14:00 CET

### Verano (CEST, UTC+2) - Abril a Octubre
- **Entrada**: 08:00 CEST
  - Presencial: Martes y Jueves
  - Teletrabajo: Lunes, Miércoles y Viernes
- **Salida**:
  - Lunes a Jueves: 17:30 CEST
  - Viernes: 14:00 CEST

## 📅 Festivos
Los días festivos se configuran en `.github/holidays/malaga.txt`. El workflow no ejecutará los tests en estos días.

## 🚀 Ejecución Manual
El workflow puede ejecutarse manualmente desde GitHub Actions seleccionando:
- Test Suite: `fichar-entrada` o `fichar-salida`

## 💻 Desarrollo Local

### Pre-requisitos
- Node.js (versión LTS)
- npm

### Instalación
```bash
# Instalar dependencias
npm ci

# Instalar navegadores de Playwright
npx playwright install --with-deps
```

### Ejecución de Tests
```bash
# Ejecutar todos los tests
npm test

# Ejecutar test específico
npx playwright test tests/fichar-entrada-presencial.spec.ts
npx playwright test tests/fichar-entrada-teletrabajo.spec.ts
npx playwright test tests/fichar-salida.spec.ts
```

## 📊 Reportes
Los resultados de las pruebas se publican en GitHub Pages y se envían por email.

## ⚙️ Variables de Entorno
- `BASE_URL`: URL base para las pruebas (requerida)
- `EMAIL_USERNAME`: Usuario SMTP para notificaciones
- `EMAIL_PASSWORD`: Contraseña SMTP para notificaciones
- `EMAIL_RECIPIENT`: Destinatario de las notificaciones

## 🤝 Contribuciones
1. Fork el repositorio
2. Crea una rama (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request