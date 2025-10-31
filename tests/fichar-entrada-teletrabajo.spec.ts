import { test, expect } from '@playwright/test';
import { config } from './config';

test('test', async ({ page }) => {
  await page.goto(config.baseURL);
  await page.getByRole('textbox', { name: 'Nombre del usuario' }).click();
  await page.getByRole('textbox', { name: 'Nombre del usuario' }).fill(config.webUser);
  await page.getByRole('textbox', { name: 'Contraseña' }).click();
  await page.getByRole('textbox', { name: 'Contraseña' }).fill(config.webPassword);
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();
   // Esperar al selector y abortar si no existe
  try {
    await page.waitForSelector('#ddlImputaciones', { timeout: 5000 });
  } catch (error) {
    console.error('No se encontró el selector #ddlImputaciones - Abortando test');
    throw new Error('Selector #ddlImputaciones no encontrado');
  }
  await page.locator('#ddlImputaciones').selectOption('TELETRABAJO');
  await page.getByRole('link', { name: ' Entrada' }).click();
  await page.getByRole('button', { name: 'OK' }).click();
});