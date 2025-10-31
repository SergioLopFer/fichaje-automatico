import { test, expect } from '@playwright/test';
import { config } from './config';

test('test', async ({ page }) => {
  await page.goto(config.baseURL);
  await page.getByRole('textbox', { name: 'Nombre del usuario' }).click();
  await page.getByRole('textbox', { name: 'Nombre del usuario' }).fill(config.webUser);
  await page.getByRole('textbox', { name: 'Contraseña' }).click();
  await page.getByRole('textbox', { name: 'Contraseña' }).fill(config.webPassword);
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();
});