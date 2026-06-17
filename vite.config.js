import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    strictPort: true,

    allowedHosts: [
      ".nip.io",
      "127.0.0.1.nip.io",
      //  "app-modelak-college.127.0.0.1.nip.io",
    ],
  },
});




// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     host: true,
//     port: 5173,
//     strictPort: true,

//     allowedHosts: [
//       ".nip.io",
//       "127.0.0.1.nip.io",
//       //  "app-modelak-college.127.0.0.1.nip.io",
//     ],
//   },
// });



// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import basicSsl from "@vitejs/plugin-basic-ssl";

// export default defineConfig({
//   plugins: [
//     react(),
//     basicSsl(),
//   ],

//   server: {
//     host: true,
//     port: 5173,
//     strictPort: true,
//     https: true,

//     allowedHosts: [
//       ".nip.io",
//       "127.0.0.1.nip.io",
//       "app-modelak-college.127.0.0.1.nip.io",
//     ],
//   },
// });