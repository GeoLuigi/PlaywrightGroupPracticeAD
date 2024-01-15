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
        this.itemText = cartLocators.itemText;
        this.editTittle = cartLocators.editTittle;
        this.summaryTitle = cartLocators.summaryTitle;
        this.qtyInput = cartLocators.qtyInput;
        this.priceValue = cartLocators.priceValue;
        this.subtotalItemValue = cartLocators.subtotalItemValue;
        this.updateCartButton = cartLocators.updateCartButton;
        this.moreChoices = cartLocators.moreChoices;
        this.addItem = cartLocators.addItem;
        this.wishListButton = cartLocators.wishListButton;
        this.cartButtonItem = cartLocators.cartButtonItem;
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
    async getPageTitleText() {
        const pageTitleElement = await this.page.$(this.editTittle);
        return await pageTitleElement.textContent();
    }

    async getProductItemNameText() {
        const productItemNameElement = await this.page.$(this.itemText);
        return await productItemNameElement.textContent();
    }
    
    async doesSummaryTitleExist() {
        const summaryTitleElement = await this.page.$(this.summaryTitle);
        return !!summaryTitleElement;
    }

    async changeQty(newQty) {
        await this.page.fill(this.qtyInput, newQty.toString());
    }

    async getPriceValue() {
        const priceElement = await this.page.$(this.priceValue);
        const priceText = await priceElement.textContent();
        return parseFloat(priceText.replace('$', ''));
    }

    async getSubtotalValue() {
        const subtotalElement = await this.page.$(this.subtotalItemValue);
        const subtotalText = await subtotalElement.textContent();
        return parseFloat(subtotalText.replace('$', ''));
    }

    async clickUpdateCartButton() {
        await this.page.click(this.updateCartButton);
    }

    async doesCrossSellBlockExist() {
        const crossSellBlockElement = await this.page.$(this.moreChoices);
        return !!crossSellBlockElement;
    }

    async clickAddToCartButton() {
        await this.page.click(this.addItem);
    }

    async clickAddToWishlist() {
        const allWishlistButtons = await this.page.$$(this.wishListButton);
    
        const lastWishlistButton = allWishlistButtons[allWishlistButtons.length - 1];
        await lastWishlistButton.click();
    }

    async clickAddToCompare() {
        await this.page.click(this.cartButtonItem);
    }
    
}