const { test, expect } = require('@playwright/test')

test('PWA carrega e busca filmes na API', async ({ page }) => {
  // abre o PWA
  await page.goto('/', { waitUntil: 'networkidle' })

  // confere que o título da aba contém PWA Movies
  await expect(page).toHaveTitle(/PWA Movies/i)

  // seleciona campo de busca e botão
  const input = page.getByPlaceholder('Digite o nome do filme (ex: Batman)')
  const button = page.getByRole('button', { name: /Buscar/i })

  await input.fill('batman')
  await button.click()

  // espera aparecer pelo menos 1 card em [data-testid="api-ok"]
  const firstCard = page.locator('[data-testid="api-ok"] article').first()
  await expect(firstCard).toBeVisible()
})
