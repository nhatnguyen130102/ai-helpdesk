import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { Toaster } from "sonner";

import "./index.css";

import App from "./App";
import { AuthProvider } from "./contexts/AuthContext";
import GlobalLoading from "./components/common/GlobalLoading";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <App />

      <Toaster
        position="top-right"
        closeButton
        expand={false}
        toastOptions={{
          classNames: {
            // Style khung chung cho tất cả toast (xóa !text-zinc-100 ở đây để không bị đè màu)
            toast:
              "!bg-zinc-950 !border !border-zinc-800 !rounded-xl !shadow-2xl font-sans p-4",

            // Chữ mô tả dùng màu xám dịu cho dễ đọc
            description: "!text-xs !text-zinc-400 !mt-1",

            // 🟢 SUCCESS: Tiêu đề + Icon + Viền dưới cùng màu Xanh lá
            success:
              "!border-b-4 !border-b-emerald-500 !border-emerald-500/20 !bg-emerald-950/30 [&_[data-title]]:!text-emerald-400 [&_[data-icon]]:!text-emerald-400",

            // 🔴 ERROR: Tiêu đề + Icon + Viền dưới cùng màu Đỏ
            error:
              "!border-b-4 !border-b-rose-500 !border-rose-500/20 !bg-rose-950/30 [&_[data-title]]:!text-rose-400 [&_[data-icon]]:!text-rose-400",

            // 🟡 WARNING: Tiêu đề + Icon + Viền dưới cùng màu Vàng
            warning:
              "!border-b-4 !border-b-amber-500 !border-amber-500/20 !bg-amber-950/30 [&_[data-title]]:!text-amber-400 [&_[data-icon]]:!text-amber-400",

            // 🔵 INFO: Tiêu đề + Icon + Viền dưới cùng màu Xanh dương
            info:
              "!border-b-4 !border-b-sky-500 !border-sky-500/20 !bg-sky-950/30 [&_[data-title]]:!text-sky-400 [&_[data-icon]]:!text-sky-400",
          },
        }}
      />

      <GlobalLoading />
    </AuthProvider>
  </StrictMode>
);