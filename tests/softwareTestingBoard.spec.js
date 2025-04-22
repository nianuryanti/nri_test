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

test('Verify that Sort functionality is working properly', async ({ page }) => {

    // Navigate to the site
    console.log('Opening site');
    await page.goto('https://magento.softwaretestingboard.com/');
  
    // Locate link to product list
    console.log('Find link to product list');
    const findLinkListItem = page.getByRole('link', { name: 'New Luma Yoga Collection Get' });
    await findLinkListItem.click();
  
    // Select the 'Sort By' dropdown and choose the 'Price' option.
    console.log('Select the "Price" option in the "Sort By" dropdown...');
    const selectSoryBy = page.getByLabel('Sort By');
    await selectSoryBy.click();
    await selectSoryBy.selectOption('Price');
  
    await page.waitForLoadState();
  
    // Taking all product elements
    const productItems = await page.locator('.product-item-info');
  
    // Get the number of existing products
    const productCount = await productItems.count();
  
    const productPricesLowtoHigh = [];
  
  // Iterate to get the price of each product
  for (let i = 0; i < productCount; i++) {
      const priceLocator = productItems.nth(i).locator('.price-box');
      const priceText = await priceLocator.textContent();
  
      if (priceText) {
          // Using regex to search for numbers after the $ symbol
          const regex = /\$(\d+(\.\d{1,2})?)/;
          const match = priceText.trim().match(regex);
  
          if (match) {
              const price = parseFloat(match[1]); // Taking price as a number
  
              // Adding prices to an array
              productPricesLowtoHigh.push(price);
  
              console.log(`Product price ${i + 1}: $${price}`);
          } else {
              console.log(`Product price ${i + 1} does not match format.`);
          }
      }
  }
  
  // Validate the price order from lowest to highest
  const isPriceSortedLowToHigh = productPricesLowtoHigh.every((price, index, array) => 
      index === 0 || price >= array[index - 1]
  );
  
  console.log(isPriceSortedLowToHigh ? '✅ Price set Lowest to Highest.' : '❌ Prices are not sorted correctly.');
  expect(isPriceSortedLowToHigh).toBe(true);
  
  const setDescending = page.getByRole('link', { name: ' Set Descending Direction' });
  await setDescending.click();
  
  await page.waitForLoadState();
  
  const productPricesHightoLow = [];
  
  // Iterate to get the price of each product
  for (let i = 0; i < productCount; i++) {
    const priceLocator = productItems.nth(i).locator('.price-box');
    const priceText = await priceLocator.textContent();
  
    if (priceText) {
        // Using regex to search for numbers after the $ symbol
        const regex = /\$(\d+(\.\d{1,2})?)/;
        const match = priceText.trim().match(regex);
  
        if (match) {
            const price = parseFloat(match[1]); // Taking price as a number
  
            // Adding prices to an array
            productPricesHightoLow.push(price);
  
            console.log(`Product price ${i + 1}: $${price}`);
        } else {
            console.log(`Product price ${i + 1} does not match format.`);
        }
    }
  }
  
  // Validate the price order from highest to loweest
  const isPriceSortedHighToLow = productPricesHightoLow.every((price, index, array) => 
    index === 0 || price <= array[index - 1]
  );
  
  console.log(isPriceSortedHighToLow ? '✅ Price set Highest to Lowest.' : '❌ Prices are not sorted correctly.');
  expect(isPriceSortedHighToLow).toBe(true);
  
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

