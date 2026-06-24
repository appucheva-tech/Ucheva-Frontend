import { apiClient } from "../../../config/AxiosInstance";

export const walletService = {
  getWallet: () => apiClient.get("/admin/wallet"),
  getPaymentHistory: () => apiClient.get("/payment/history"),
};
