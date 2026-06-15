var pool = require('./bd');

async function getPropiedades() {
    try {
        var rows = await pool.query('select * from propiedades order by id asc');
        return rows;
    } catch (error) {
        throw error;
    }
}

async function getPropiedadById(id) {
    try {
        var rows = await pool.query('select * from propiedades where id = ?', [id]);
        return rows[0];
    } catch (error) {
        throw error;
    }
}

async function insertPropiedad(propiedad) {
    try {
        const result = await pool.query(
            'insert into propiedades (titulo, precio, direccion, descripcion, imagen) values (?, ?, ?, ?, ?)',
            [propiedad.titulo, propiedad.precio, propiedad.direccion, propiedad.descripcion, propiedad.imagen || '']
        );
        return result.insertId;
    } catch (error) {
        throw error;
    }
}

async function updatePropiedadById(propiedad) {
    try {
        const result = await pool.query(
            'update propiedades set titulo = ?, precio = ?, direccion = ?, descripcion = ?, imagen = ? where id = ?',
            [propiedad.titulo, propiedad.precio, propiedad.direccion, propiedad.descripcion, propiedad.imagen || '', propiedad.id]
        );
        return result.affectedRows;
    } catch (error) {
        throw error;
    }
}

async function deletePropiedadById(id) {
    try {
        const result = await pool.query('delete from propiedades where id = ?', [id]);
        return result.affectedRows;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getPropiedades,
    getPropiedadById,
    insertPropiedad,
    updatePropiedadById,
    deletePropiedadById
};