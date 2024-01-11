import { test , expect } from '@playwright/test';
import { CartPage } from '../pages/cartPage';
import { generateRandomFirstName, generateRandomLastName, generateRandomEmail, generateRandomPassword, generateRandomInvalidEmail } from '../helpers/faker';
import { LoginPage } from '../pages/loginPage';
import {TopsWomenPage} from '../pages/topsWomenPage';
    


    const validEmail = 'Tester99@gmail.com'
    const password = '.Tester99'
    let cartPage;
    let loginPage;
    let topsWomenPage;
    let addUrl = 'https://magento.softwaretestingboard.com/women/tops-women.html';
    let urlLogin = 'https://magento.softwaretestingboard.com/customer/account/login/referer/aHR0cHM6Ly9tYWdlbnRvLnNvZnR3YXJldGVzdGluZ2JvYXJkLmNvbS9jdXN0b21lci9hY2NvdW50L2NyZWF0ZS8%2C/';

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        topsWomenPage = new TopsWomenPage(page);
        cartPage = new CartPage(page);
        await page.goto(urlLogin);
        await loginPage.fillLoginForm(validEmail,password);
        await loginPage.page.waitForTimeout(1000);
        await loginPage.clickSignInButton();
        await loginPage.page.waitForTimeout(1000);
        await page.goto(addUrl)
        await topsWomenPage.selectAntoniaClothing()
        await topsWomenPage.selectZoeClothing()
        await topsWomenPage.selectBellaClothing()
        await page.waitForTimeout(2000)
        await page.click('.action.showcart')
        await loginPage.page.waitForTimeout(2000);
        await page.click('a.action.viewcart')
    });
    

test('TEST',async({ page }) => { 
    
    
})
test('ECA-23 | Verify Display of Purchased Items on Shopping Cart Page',async({ page }) => { 
    await page.waitForTimeout(1000);

    // Verificar que haya al menos un elemento en la tabla de carrito
    const isAnyItemInCart = await page.evaluate(() => {
        const cartTable = document.getElementById('shopping-cart-table');
        
        if (!cartTable) {
            // La tabla de carrito no está presente
            return false;
        }

        // Buscar elementos dentro de la tabla que indican la existencia de un item
        const itemElements = cartTable.querySelectorAll('.cart.item');

        // Verificar si hay al menos uno
        return itemElements.length > 0;
    });

    // Imprimir la información antes de la aserción
    console.log('Are there any items in the cart table:', isAnyItemInCart);

    // Verificar que haya al menos un elemento en la tabla de carrito
    expect(isAnyItemInCart).toBe(true);

})

test('ECA-24 | Verify Functionality of Item Action [Edit] Button',async({ page }) => { 

})

test('ECA-25 | Verify Functionality of Item Action [Delete] Button',async({ page }) => { 

})

test('ECA-26 | Verify Editing Quantity on Attribute Editing Page',async({ page }) => { 

})

test('ECA-27 | Verify Display of Summary Box on Shopping Cart Page With the information of the Shipping',async({ page }) => { 

})

test('ECA-28 | Verify Update of Subtotal After Editing Quantity of an item and clicking on [Update Shopping Cart] Button',async({ page }) => { 

})

test('ECA-29 | Verify Display of "More Choices" Section',async({ page }) => { 

})

test('ECA-30 | Verify Clicking [Add to Cart] Button of an item on "More Choices" Section it add the item to the cart',async({ page }) => { 

})

test('ECA-31 | Verify Clicking [Wish List] Button redirect you to the WishList Page',async({ page }) => { 

})

test('ECA-32 | Verify Clicking [Cart Page] Button redirect you to the Cart Page',async({ page }) => { 

})

test('ECA-33 | Verify Functionality of [Proceed to Checkout] Button',async({ page }) => { 
    
    await cartPage.clickProceedToCheckoutButton();
    await page.waitForTimeout(1000)
    const updatedUrl = page.url();
    expect(updatedUrl).toBe('https://magento.softwaretestingboard.com/checkout/');
})

test('ECA-34 | Verify Functionality of [Check Out with Multiple Addresses] Button',async({ page }) => { 
    await cartPage.clickMultiCheckoutLink();
    await page.waitForTimeout(2000)
    const updatedUrl = page.url();
    expect(updatedUrl).toBe('https://magento.softwaretestingboard.com/multishipping/checkout_address/newShipping/');
})

test('ECA-35 | Verify the correct sum for the subtotal of an item',async({ page }) => { 

})

test('ECA-36 | Verify the correct sum for the subtotal of the Summary Section',async({ page }) => { 
    await page.waitForTimeout(1000)

    // Obtener los elementos del carrito con atributo data-cart-item-id
    const cartItems = await page.$$('.cart.item .col.subtotal[data-th="Subtotal"] .cart-price .price');

    // Sumar los subtotales de cada ítem en el carrito
    let totalCartPrice = 0;
    for (const cartItem of cartItems) {
        await page.waitForTimeout(1000)

        
        const itemSubtotalText = await cartItem.textContent(); // Obtener el texto del subtotal
        await page.waitForTimeout(1000)

        const itemSubtotal = parseFloat(itemSubtotalText.replace('$', '')); // Convertir a número
        console.log('Item Subtotal:', itemSubtotal);
        await page.waitForTimeout(1000)

        totalCartPrice += itemSubtotal;
    }

    // Obtener el precio total del carrito utilizando el nuevo método
    const expectedCartTotal = await cartPage.getCartSubTotalPrice();
    console.log('Expected Cart Total:', expectedCartTotal);

    // Imprimir la información antes de la aserción
    console.log('Total Cart Price:', totalCartPrice);

    // Verificar que la suma de precios de ítems sea igual al precio total del carrito
    expect(totalCartPrice).toBe(expectedCartTotal);
})

test('ECA-37 | Verify the correct sum for the "Order Total" of the Summary Section',async({ page }) => { 
    await page.waitForTimeout(1000);
    const CartSubTotal = await cartPage.getCartSubTotalPrice();

    // Obtener los montos de descuento, envío y total
    const discountAmount = await cartPage.getDiscountAmount(page);
    const shippingAmount = await cartPage.getShippingAmount(page);
    const orderTotal = await cartPage.getOrderTotal(page);

    // Sumar el descuento y el envío
    const sumOfDiscountAndShipping = discountAmount + shippingAmount + CartSubTotal;

    // Verificar que la suma sea igual al total del pedido
    expect(sumOfDiscountAndShipping).toBe(orderTotal);
})

test.afterEach(async ({ page }) => {
    await page.goto('https://magento.softwaretestingboard.com/checkout/cart/');
    await page.waitForTimeout(1000)
    const currentUrl = page.url();
    expect(currentUrl).toBe('https://magento.softwaretestingboard.com/checkout/cart/');
    await page.waitForTimeout(3000)
    while (await page.$$('a.action.action-delete').length !== 0 ) {
        let removeButtons = await page.$$('a.action.action-delete');
        await page.waitForTimeout(1000)
        // Itera sobre cada botón y haz clic
        // Itera sobre cada botón y haz clic
        console.log(removeButtons);
        const removeButton = removeButtons.shift()
        if (!removeButton) break;
        // Espera a que el elemento sea visible, habilitado y estable antes de hacer clic
        await removeButton.waitForElementState('visible');
        await removeButton.waitForElementState('enabled');
        
        // Haz clic en el botón
        await removeButton.click();
        
        await page.waitForLoadState('load');
        
        // Vuelve a obtener los botones después de la recarga
        
        
        // Asegúrate de que la página se haya cargado completamente antes de continuar
        await page.waitForLoadState('load');
    }
});