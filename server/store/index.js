import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { randomUUID } from 'crypto';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, '../../data');
const DB_PATH = path.join(DATA_DIR, 'db.json');

const defaultDb = {
  meta: { initialized: false },
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
  const db = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
  if (!db.meta) db.meta = { initialized: false };
  return db;
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

/** Atomic read → mutate → write so concurrent requests cannot restore deleted rows. */
export function mutateDb(mutator) {
  const db = readDb();
  const result = mutator(db);
  writeDb(db);
  return result;
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
  collection[index] = {
    ...collection[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
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

export function isDbInitialized() {
  const db = readDb();
  return Boolean(db.meta?.initialized);
}

export function markDbInitialized(db) {
  db.meta = { ...db.meta, initialized: true, updatedAt: new Date().toISOString() };
}
