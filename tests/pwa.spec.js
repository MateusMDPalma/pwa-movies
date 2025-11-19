const { test, expect } = require('@playwright/test');

test('PWA carrega e busca filmes na API', async ({ page }) => {
  // abre a home e espera a rede ficar ociosa
  await page.goto('/', { waitUntil: 'networkidle' });

  // ✅ confere que existe um <h1> visível (sem depender do texto)
  await expect(page.locator('h1')).toBeVisible();

  // seleciona campo de busca e botão
  const input = page.getByPlaceholder('Digite o nome do filme (ex: Batman)');
  await input.fill('batman');

  const button = page.getByRole('button', { name: /Buscar/i });
  await button.click();

  // espera carregar resultados
  await page.waitForTimeout(2000);

  // confere se apareceu pelo menos 1 card de filme
  const cards = page.locator('[data-testid="movie-card"]');
  await expect(cards.first()).toBeVisible();
});
