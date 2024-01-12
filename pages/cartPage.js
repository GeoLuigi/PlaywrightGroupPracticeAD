import { cartLocators } from "../locators/cartLocators";

export class CartPage {
    constructor(page){
        this.page = page;
        this.proceedToCheckoutButton = cartLocators.proceedToCheckoutButton;
        this.multiCheckoutLink = cartLocators.multiCheckoutLink;
        this.itemPrice = cartLocators.itemPrice;
        this.cartSubTotal = cartLocators.cartSubTotal;
        this.discountAmount = cartLocators.discountAmount;
        this.shippingAmount = cartLocators.shippingAmount;
        this.orderTotal = cartLocators.orderTotal;
        this.editLink = cartLocators.editLink;
        this.editButton = cartLocators.editButton;
    }

    async clickProceedToCheckoutButton() {
        await this.page.click(this.proceedToCheckoutButton);
    }

    async clickMultiCheckoutLink() {
        await this.page.click(this.multiCheckoutLink);
    }
    async getPriceOfCartItem(itemId) {
        const itemLocator = `.cart-item[data-cart-item-id="${itemId}"] ${this.itemPrice}`;
        const priceElement = await this.page.$(itemLocator);
        const priceText = await priceElement.textContent();
        return parseFloat(priceText.replace('$', ''));
    }
    
    async getCartSubTotalPrice() {
        const cartTotalText = await this.page.textContent(this.cartSubTotal);
        return parseFloat(cartTotalText.replace('$', ''));
    }
     async getDiscountAmount(page) {
        const discountAmountElement = await page.$(cartLocators.discountAmount);
        if (!discountAmountElement) {
            return 0;
        }
        const discountAmountText = await discountAmountElement.textContent();
        return parseFloat(discountAmountText.replace('$', '')) || 0;
    }
    
    async getShippingAmount(page) {
        const shippingAmountElement = await page.$(cartLocators.shippingAmount);
        if (!shippingAmountElement) {
            return 0;
        }
        const shippingAmountText = await shippingAmountElement.textContent();
        return parseFloat(shippingAmountText.replace('$', '')) || 0;
    }
    
    async getOrderTotal(page) {
        const orderTotalElement = await page.$(cartLocators.orderTotal);
        if (!orderTotalElement) {
            return 0;
        }
        const orderTotalText = await orderTotalElement.textContent();
        return parseFloat(orderTotalText.replace('$', '')) || 0;
    }

    async getEditLink() {
        const itemLinkElement = await this.page.$(this.editLink);
        return await itemLinkElement.getAttribute('href');
    }

    async clickEditLink(){
        await this.page.click(this.editButton);
    }
}