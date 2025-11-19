const { test, expect } = require('@playwright/test');

test('PWA carrega e busca filmes na API', async ({ page }) => {
  // abre a home
  await page.goto('/');

  // ✅ confere que o título visual "PWA Movies" está na tela
  await expect(
    page.getByRole('heading', { name: /PWA Movies/i })
  ).toBeVisible();

  // seleciona campo de busca e botão
  const input = page.getByPlaceholder('Digite o nome do filme (ex: Batman)');
  await input.fill('batman');

  const button = page.getByRole('button', { name: /Buscar/i });
  await button.click();

  // espera carregar resultados
  await page.waitForTimeout(2000);

  const cards = page.locator('[data-testid="movie-card"]');
  // pelo menos 1 card visível
  await expect(cards.first()).toBeVisible();
});
