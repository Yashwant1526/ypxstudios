const env = import.meta.env;

export const CONFIG = {
  brand: env.VITE_APP_NAME || "YPX Studios",
  tagline: "Creative strategy, premium design, and digital execution that move businesses forward.",
  whatsapp: env.VITE_WHATSAPP_NUMBER || "917618741576",
  email: env.VITE_EMAIL || "ypxstudios@gmail.com",
  instagram: env.VITE_INSTAGRAM_URL || "https://instagram.com/ypx.studios",
  location: env.VITE_LOCATION || "Hubli, Karnataka, India",
  appUrl: env.VITE_APP_URL || "https://ypxstudios.onrender.com",
  adminEmail: env.VITE_ADMIN_EMAIL || "admin@ypxstudios.com",
};

export const waLink = (
  text = "Hello YPX Studios, I'd like to learn more about your services.",
) => `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(text)}`;
