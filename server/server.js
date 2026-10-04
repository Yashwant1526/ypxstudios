import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import fs from "fs";
import { randomUUID } from "crypto";
import path from "path";
import jwt from "jsonwebtoken";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = Number(process.env.PORT || 10000);
const DATA_FILE = path.join(__dirname, "data", "store.json");
const FRONTEND_DIST = path.join(__dirname, "..", "client", "dist");
const JWT_SECRET = process.env.JWT_SECRET || "ypx-dev-secret";
const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || "admin@ypxstudios.com").toLowerCase();
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "ChangeMe123!";
const CORS_ORIGIN = process.env.CORS_ORIGIN || "*";

function readStore() {
  try {
    const raw = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(raw);
  } catch {
    const defaultStore = { enquiries: [], projects: [] };
    fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
    fs.writeFileSync(DATA_FILE, JSON.stringify(defaultStore, null, 2));
    return defaultStore;
  }
}

function writeStore(store) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(store, null, 2));
}

app.use(
  cors({
    origin: CORS_ORIGIN === "*" ? true : CORS_ORIGIN,
    credentials: true,
  }),
);
app.use(express.json());

if (fs.existsSync(FRONTEND_DIST)) {
  app.use(express.static(FRONTEND_DIST));
}

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "YPX Studios API is running." });
});

app.get("/api/portfolio", (req, res) => {
  const store = readStore();
  res.json(store.projects || []);
});

app.post("/api/enquiries", (req, res) => {
  const { name, phone, email, service, budget, deadline, details } = req.body || {};

  if (!name || !phone || !details) {
    return res.status(400).json({ message: "Name, phone, and details are required." });
  }

  const store = readStore();
  const enquiry = {
    id: randomUUID(),
    name,
    phone,
    email: email || "",
    service: service || "General enquiry",
    budget: budget || "",
    deadline: deadline || "",
    details,
    createdAt: new Date().toISOString(),
  };

  store.enquiries.unshift(enquiry);
  writeStore(store);

  res.status(201).json({
    ok: true,
    message: "Enquiry submitted successfully.",
    enquiry,
  });
});

app.post("/api/login", (req, res) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  if (email.toLowerCase() !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
    return res.status(401).json({ message: "Incorrect email or password." });
  }

  const token = jwt.sign({ email: ADMIN_EMAIL }, JWT_SECRET, { expiresIn: "8h" });

  return res.json({
    token,
    user: { email: ADMIN_EMAIL },
  });
});

function requireAuth(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";

  if (!token) {
    return res.status(401).json({ message: "Authentication required." });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    return next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired token." });
  }
}

app.get("/api/dashboard/summary", requireAuth, (req, res) => {
  const store = readStore();
  const summary = {
    stats: [
      { label: "Open enquiries", value: String(store.enquiries.length || 12) },
      { label: "Active projects", value: "8" },
      { label: "Avg. response time", value: "2h" },
    ],
    recentLeads: (store.enquiries || []).slice(0, 4).map((item) => ({
      id: item.id,
      name: item.name,
      service: item.service,
      status: item.budget ? "Qualified" : "New",
    })),
    pipeline: [
      { title: "Brand identity sprint", value: "₹18,000" },
      { title: "Reel package", value: "₹12,500" },
      { title: "Landing page", value: "₹22,000" },
    ],
  };

  res.json(summary);
});

app.get("/api/enquiries", requireAuth, (req, res) => {
  const store = readStore();
  res.json(store.enquiries || []);
});

if (fs.existsSync(FRONTEND_DIST)) {
  app.get(/^\/(?!api).*/, (req, res, next) => {
    if (req.path.startsWith("/api")) {
      return next();
    }

    return res.sendFile(path.join(FRONTEND_DIST, "index.html"));
  });
}

app.use((req, res) => {
  res.status(404).json({ message: "Route not found." });
});

app.listen(PORT, () => {
  console.log(`YPX Studios API running on port ${PORT}`);
});
