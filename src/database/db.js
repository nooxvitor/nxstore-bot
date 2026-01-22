const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'nxstore.db');
const db = new sqlite3.Database(dbPath);

// Criar tabelas
db.serialize(() => {
    // Tabela de configurações do servidor
    db.run(`
        CREATE TABLE IF NOT EXISTS server_config (
            guild_id TEXT PRIMARY KEY,
            log_channel TEXT,
            welcome_channel TEXT,
            ticket_category TEXT,
            product_category TEXT,
            staff_role TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);

    // Tabela de produtos
    db.run(`
        CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            guild_id TEXT,
            name TEXT NOT NULL,
            description TEXT,
            price REAL,
            stock INTEGER DEFAULT 0,
            image_url TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (guild_id) REFERENCES server_config (guild_id)
        )
    `);

    // Tabela de tickets
    db.run(`
        CREATE TABLE IF NOT EXISTS tickets (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            guild_id TEXT,
            user_id TEXT,
            channel_id TEXT,
            status TEXT DEFAULT 'open',
            subject TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            closed_at DATETIME,
            FOREIGN KEY (guild_id) REFERENCES server_config (guild_id)
        )
    `);

    // Tabela de vendas
    db.run(`
        CREATE TABLE IF NOT EXISTS sales (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            guild_id TEXT,
            user_id TEXT,
            product_id INTEGER,
            quantity INTEGER,
            total_price REAL,
            status TEXT DEFAULT 'pending',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (guild_id) REFERENCES server_config (guild_id),
            FOREIGN KEY (product_id) REFERENCES products (id)
        )
    `);

    // Tabela de staff
    db.run(`
        CREATE TABLE IF NOT EXISTS staff (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            guild_id TEXT,
            user_id TEXT,
            role TEXT,
            permissions TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (guild_id) REFERENCES server_config (guild_id)
        )
    `);

    console.log('✅ Banco de dados inicializado!');
});

module.exports = db;
