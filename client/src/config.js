const env = import.meta.env;

export const CONFIG = {
  brand: env.VITE_APP_NAME || "YPX Studios",
  tagline: "Turning Ideas Into Digital Impact.",
  whatsapp: env.VITE_WHATSAPP_NUMBER || "919999999999",
  email: env.VITE_EMAIL || "ypxstudios@gmail.com",
  instagram: env.VITE_INSTAGRAM_URL || "https://instagram.com/ypx.studios",
  location: env.VITE_LOCATION || "Hubli, Karnataka, India",
  appUrl: env.VITE_APP_URL || "https://your-public-domain.com",
  adminEmail: env.VITE_ADMIN_EMAIL || "admin@ypxstudios.com",
};

export const waLink = (
  text = "Hello YPX Studios, I'd like to learn more about your services.",
) => `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(text)}`;
