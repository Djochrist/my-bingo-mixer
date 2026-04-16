import express from 'express';
import cors from 'cors';
import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());

// --- Database setup ---
const db = new Database(join(__dirname, 'bingo.db'));

db.exec(`
  CREATE TABLE IF NOT EXISTS games (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    player_name TEXT NOT NULL,
    theme_id TEXT NOT NULL DEFAULT 'tech',
    mode TEXT NOT NULL DEFAULT 'bingo',
    bingo_count INTEGER DEFAULT 0,
    squares_marked INTEGER DEFAULT 0,
    duration_seconds INTEGER DEFAULT 0,
    created_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS card_deck_sessions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    player_name TEXT NOT NULL,
    theme_id TEXT NOT NULL DEFAULT 'tech',
    success_count INTEGER DEFAULT 0,
    skip_count INTEGER DEFAULT 0,
    cards_drawn INTEGER DEFAULT 0,
    created_at TEXT DEFAULT (datetime('now'))
  );
`);

// --- Routes ---

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Save a completed bingo game
app.post('/api/games', (req, res) => {
  try {
    const { playerName, themeId = 'tech', mode = 'bingo', bingoCount = 0, squaresMarked = 0, durationSeconds = 0 } = req.body;
    if (!playerName) return res.status(400).json({ error: 'playerName is required' });

    const stmt = db.prepare(
      'INSERT INTO games (player_name, theme_id, mode, bingo_count, squares_marked, duration_seconds) VALUES (?, ?, ?, ?, ?, ?)'
    );
    const result = stmt.run(playerName, themeId, mode, bingoCount, squaresMarked, durationSeconds);
    res.json({ id: result.lastInsertRowid, success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save game' });
  }
});

// Save a card deck session
app.post('/api/card-sessions', (req, res) => {
  try {
    const { playerName, themeId = 'tech', successCount = 0, skipCount = 0, cardsDrawn = 0 } = req.body;
    if (!playerName) return res.status(400).json({ error: 'playerName is required' });

    const stmt = db.prepare(
      'INSERT INTO card_deck_sessions (player_name, theme_id, success_count, skip_count, cards_drawn) VALUES (?, ?, ?, ?, ?)'
    );
    const result = stmt.run(playerName, themeId, successCount, skipCount, cardsDrawn);
    res.json({ id: result.lastInsertRowid, success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save session' });
  }
});

// Get leaderboard (top players by bingo count)
app.get('/api/leaderboard', (_req, res) => {
  try {
    const rows = db.prepare(`
      SELECT
        player_name,
        SUM(bingo_count) as total_bingos,
        COUNT(*) as games_played,
        MAX(created_at) as last_played
      FROM games
      GROUP BY LOWER(player_name)
      ORDER BY total_bingos DESC, games_played DESC
      LIMIT 20
    `).all();
    res.json({ leaderboard: rows });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

// Get global stats
app.get('/api/stats', (_req, res) => {
  try {
    const stats = db.prepare(`
      SELECT
        COUNT(*) as total_games,
        SUM(bingo_count) as total_bingos,
        COUNT(DISTINCT LOWER(player_name)) as unique_players
      FROM games
    `).get();
    res.json({ stats });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Bingo Mixer API running on http://localhost:${PORT}`);
});
