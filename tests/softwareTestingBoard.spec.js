import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('https://magento.softwaretestingboard.com/');
})


test('Verify that search box is working properly', async ({ page }) => {
    const searchInput = page.locator('[id="search"]');
    const searchResult = page.locator('[class="product-item-info"]').first();

    await searchInput.click();
    await searchInput.fill('jacket');
    await searchInput.press('Enter');
    await page.waitForTimeout(3000);
    await searchResult.waitFor({state : 'visible'})
    const productName = page.locator('[class="product name product-item-name"]').first();
    await expect(productName.getByText('jacket')).toBeVisible();
});



test('Verify Add to Cart is working correctly', async ({ page }) => {
    const searchInput = page.locator('[id="search"]');
    const searchResult = page.locator('[class="product-item-info"]').first();
    const productItem = page.locator('[class="item product product-item"]').first();
//search and click product
    await searchInput.click();
    await searchInput.fill('jacket');
    await searchInput.press('Enter');
    await page.waitForTimeout(3000);
    await searchResult.waitFor({state : 'visible'})
    await productItem.click();
    await page.waitForTimeout(3000);

    //select size and color product
    const sizeS = page.locator('[id="option-label-size-143-item-167"][option-label="S"]');
    const grayColor = page.locator('[id="option-label-color-93-item-52"][option-label="Gray"]');
    const btnAddtocart = page.locator('[id="product-addtocart-button"]')
    const successAddtocart = page.locator('[data-ui-id="message-success"]')

    await sizeS.click();
    await grayColor.click();
    await btnAddtocart.click();
    await expect(successAddtocart).toContainText('added');

    //open cart
    const cartBtn = page.locator('[class="minicart-wrapper"]');
    await cartBtn.click();

    const cartView = page.locator('[class="action viewcart"]')
    await cartView.click();

    //verify size, color, and quantity
    const productItemCart = page.locator('[class="item-options"]').last();

    await expect(productItemCart).toContainText('S'); // Verifikasi ukuran
    await expect(productItemCart).toContainText('Gray'); // Verifikasi warna

    const qtyCart = page.locator('[class="input-text qty"] input');

//   const initialQty = await qtyCart.inputValue();
//   console.log('Initial Quantity:', initialQty);  // Untuk verifikasi awal

//   await qtyCart.fill('2'); 

//   const updatedQty = await qtyCart.inputValue();
//   console.log('Updated Quantity:', updatedQty);

//   await expect(updatedQty).toBe('2');

});

