import Coupon from "../models/couponModel";

export class CouponService {
  async applyCoupon(code: string, totalAmount: number) {
    console.log("🔥 COUPON START:", code);
    const coupon: any = await Coupon.findOne({
      code: code.toUpperCase(),
      isActive: true,
    });

    console.log("FOUND COUPON:", coupon);
    if (!coupon) {
      throw new Error("Invalid Coupon");
    }

    console.log("COUPON OBJECT:", coupon);
    // Expiry Check
     console.log("EXPIRY DATE:", coupon.expiryDate);
    
    console.log("EXPIRY CHECK:", coupon.expiryDate, new Date());
   if (!coupon.expiryDate) {
     throw new Error("Coupon expiry date missing in database");
   }

   if (new Date() > new Date(coupon.expiryDate)) {
     throw new Error("Coupon Expired");
   }
   
console.log("USAGE:", coupon.usedCount, "/", coupon.usageLimit);
    // Usage Limit Check
    if (coupon.usedCount >= coupon.usageLimit) {
      throw new Error("Coupon Usage Limit Exceeded");
    }
    console.log("COUPON OBJECT:", coupon);
    console.log("USED COUNT:", coupon.usedCount);
    console.log("LIMIT:", coupon.usageLimit);

    // Minimum Order Check
      console.log("TOTAL AMOUNT:", totalAmount);
     
    console.log("MIN ORDER:", totalAmount, coupon.minOrderAmount);
    if (totalAmount < coupon.minOrderAmount) {

      throw new Error(
        `Minimum order amount should be ₹${coupon.minOrderAmount}`,
      );
    }
   

console.log("DISCOUNT TYPE:", coupon.discountType);
console.log("DISCOUNT VALUE:", coupon.discountValue);


    let discount = 0;

    // Percentage Discount
    if (coupon.discountType === "percentage") {
      discount = (totalAmount * coupon.discountValue) / 100;

      if (coupon.maxDiscount > 0 && discount > coupon.maxDiscount) {
        discount = coupon.maxDiscount;
      }
    }

    // Fixed Discount
    if (coupon.discountType === "fixed") {
      discount = Math.min(coupon.discountValue, totalAmount);
    }

    const finalAmount = Math.max(0, totalAmount - discount);


console.log("TOTAL AMOUNT =>", totalAmount);
console.log("DISCOUNT =>", discount);
console.log("FINAL AMOUNT =>", finalAmount);
console.log("DISCOUNT TYPE:", coupon.discountType);
console.log("DISCOUNT VALUE:", coupon.discountValue);
    return {
      couponCode: coupon.code,
      discount,
      finalAmount,
    };
  }

  async increaseCouponUsage(code: string) {
    await Coupon.findOneAndUpdate(
      { code: code.toUpperCase() },
      { $inc: { usedCount: 1 } },
    );
  }
}
