
export default function checkAddToCart(data) {
    if(data.inStock === 0) {
        return "This product is not available in our stock";
    }
    return"";
}
