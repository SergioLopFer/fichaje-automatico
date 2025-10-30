import { test, expect } from '@playwright/test';
import { config } from './config';

test('test', async ({ page }) => {
  await page.goto(config.baseURL);
  await page.getByRole('textbox', { name: 'Nombre del usuario' }).click();
  await page.getByRole('textbox', { name: 'Nombre del usuario' }).fill('25690116J');
  await page.getByRole('textbox', { name: 'Contraseña' }).click();
  await page.getByRole('textbox', { name: 'Contraseña' }).fill('CuentaMentor2025!');
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();
  await page.locator('#ddlImputaciones').selectOption('PRESENCIAL');
  await page.getByRole('link', { name: ' Entrada' }).click();
  await page.getByRole('button', { name: 'OK' }).click();
});