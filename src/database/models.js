const db = require('./db.js');

const ServerConfig = {
    get: (guildId) => {
        return new Promise((resolve, reject) => {
            db.get('SELECT * FROM server_config WHERE guild_id = ?', [guildId], (err, row) => {
                if (err) reject(err);
                resolve(row || { guild_id: guildId });
            });
        });
    },

    set: (guildId, data) => {
        return new Promise((resolve, reject) => {
            const fields = Object.keys(data);
            const values = Object.values(data);
            
            const placeholders = fields.map(() => '?').join(', ');
            const updates = fields.map(f => `${f} = ?`).join(', ');
            
            db.run(
                `INSERT INTO server_config (guild_id, ${fields.join(', ')}) 
                 VALUES (?, ${placeholders})
                 ON CONFLICT(guild_id) DO UPDATE SET ${updates}`,
                [guildId, ...values, ...values],
                (err) => {
                    if (err) reject(err);
                    resolve();
                }
            );
        });
    }
};

const Products = {
    create: (guildId, productData) => {
        return new Promise((resolve, reject) => {
            const { name, description, price, stock, image_url } = productData;
            db.run(
                'INSERT INTO products (guild_id, name, description, price, stock, image_url) VALUES (?, ?, ?, ?, ?, ?)',
                [guildId, name, description, price, stock, image_url],
                function(err) {
                    if (err) reject(err);
                    resolve(this.lastID);
                }
            );
        });
    },

    getAll: (guildId) => {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM products WHERE guild_id = ? ORDER BY created_at DESC', [guildId], (err, rows) => {
                if (err) reject(err);
                resolve(rows);
            });
        });
    },

    delete: (id) => {
        return new Promise((resolve, reject) => {
            db.run('DELETE FROM products WHERE id = ?', [id], (err) => {
                if (err) reject(err);
                resolve();
            });
        });
    }
};

const Tickets = {
    create: (guildId, userId, channelId, subject) => {
        return new Promise((resolve, reject) => {
            db.run(
                'INSERT INTO tickets (guild_id, user_id, channel_id, subject) VALUES (?, ?, ?, ?)',
                [guildId, userId, channelId, subject],
                function(err) {
                    if (err) reject(err);
                    resolve(this.lastID);
                }
            );
        });
    },

    getOpenTickets: (guildId) => {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM tickets WHERE guild_id = ? AND status = "open"', [guildId], (err, rows) => {
                if (err) reject(err);
                resolve(rows);
            });
        });
    },

    close: (ticketId) => {
        return new Promise((resolve, reject) => {
            db.run(
                'UPDATE tickets SET status = "closed", closed_at = CURRENT_TIMESTAMP WHERE id = ?',
                [ticketId],
                (err) => {
                    if (err) reject(err);
                    resolve();
                }
            );
        });
    }
};

module.exports = { ServerConfig, Products, Tickets };
