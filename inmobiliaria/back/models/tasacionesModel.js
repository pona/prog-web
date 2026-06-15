var pool = require('./bd');

async function getTasaciones() {
    try {
        var rows = await pool.query('select * from tasaciones order by id desc');
        return rows;
    } catch (error) {
        throw error;
    }
}

module.exports = { getTasaciones };