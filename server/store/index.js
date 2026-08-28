import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { randomUUID } from 'crypto';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, '../../data');
const DB_PATH = path.join(DATA_DIR, 'db.json');

const defaultDb = {
  admin: null,
  profile: null,
  skills: [],
  projects: [],
  worlds: [],
  messages: [],
};

function ensureDb() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify(defaultDb, null, 2));
  }
}

function readDb() {
  ensureDb();
  return JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
}

function writeDb(data) {
  ensureDb();
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

export async function connectDB() {
  ensureDb();
  console.log('JSON database ready at', DB_PATH);
}

export function getDb() {
  return readDb();
}

export function saveDb(data) {
  writeDb(data);
}

export function createId() {
  return randomUUID();
}

export function sortByOrder(items) {
  return [...items].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

export function findById(collection, id) {
  return collection.find((item) => item._id === id);
}

export function updateById(collection, id, updates) {
  const index = collection.findIndex((item) => item._id === id);
  if (index === -1) return null;
  collection[index] = { ...collection[index], ...updates, updatedAt: new Date().toISOString() };
  return collection[index];
}

export function deleteById(collection, id) {
  const index = collection.findIndex((item) => item._id === id);
  if (index === -1) return false;
  collection.splice(index, 1);
  return true;
}

export function createItem(collection, data) {
  const item = {
    _id: createId(),
    ...data,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  collection.push(item);
  return item;
}
