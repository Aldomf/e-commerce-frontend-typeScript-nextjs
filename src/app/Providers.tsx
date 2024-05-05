"use client";
import BackToTopButton from "@/components/back-to-top-button/BackToTopButton";
import { AddProductProvider } from "@/context/AddProductContext";
import { AuthProvider } from "@/context/AuthContext";
import { CheckoutAndOrderProvider } from "@/context/CheckoutAndOrderContext";
import { ProductProvider } from "@/context/ProductContext";
import { ReviewsProvider } from "@/context/ReviewsContext";
import { ShippingAddressProvider } from "@/context/ShippingAddresContext";
import { UserProvider } from "@/context/UserContext";
import { WishlistProvider } from "@/context/WishlistContext";

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <UserProvider>
        <AddProductProvider>
          <WishlistProvider>
            <ShippingAddressProvider>
              <CheckoutAndOrderProvider>
                <ReviewsProvider>
                  <ProductProvider>
                    {children}
                    <BackToTopButton />
                  </ProductProvider>
                </ReviewsProvider>
              </CheckoutAndOrderProvider>
            </ShippingAddressProvider>
          </WishlistProvider>
        </AddProductProvider>
      </UserProvider>
    </AuthProvider>
  );
}

export default Providers;
