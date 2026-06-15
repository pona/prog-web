'use client';

import { useState } from "react"

export default function TasacionesForm() {
    const initialForm = {
        nombre: '',
        email: '',
        telefono: '',
        description: '',
        imagen: null
    }
    const [sending, setSending] = useState(false);
    const [msg, setMsg] = useState('');
    const [formData, setFormData] = useState(initialForm);

    const handleChange = e => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            setFormData(oldData => ({
                ...oldData,
                [name]: files[0] || null
            }));
        } else {
            setFormData(oldData => ({
                ...oldData,
                [name]: value
            }));
        }
    }

    const handleSubmit = async e => {
        e.preventDefault();
        setMsg('');
        setSending(true);
        
        try {
            const form = new FormData();
            form.append('nombre', formData.nombre);
            form.append('email', formData.email);
            form.append('telefono', formData.telefono);
            form.append('description', formData.description);
            if (formData.imagen) {
                form.append('imagen', formData.imagen);
            }

            const rawResponse = await fetch('/tasaciones', {
                method: 'POST',
                body: form
            });
            const response = await rawResponse.json();
            setSending(false);
            setMsg(response.message);
            if (response.error === false) {
                setFormData(initialForm);
            }
        } catch (error) {
            setSending(false);
            setMsg('Error al enviar la solicitud');
            console.error(error);
        }
    }

    return (
        <>
        <form action="/tasaciones" method="post" onSubmit={handleSubmit} encType="multipart/form-data" className="formulario">
            <p>
                <label>Nombre</label>
                <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required></input>
            </p>
             <p>
                <label>Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required></input>
            </p>
             <p>
                <label>Telefono</label>
                <input type="tel" name="telefono" value={formData.telefono} onChange={handleChange} required></input>
            </p>
             <p>
                <label>Descripción de la propiedad</label>
                <textarea name="description" value={formData.description} onChange={handleChange} required></textarea>
            </p>
            <p>
                <label>Imagen de la propiedad</label>
                <input type="file" name="imagen" accept="image/*" onChange={handleChange} />
            </p>
            <p className="centrar">
                <input type="submit" value="Enviar"/>
            </p>
        </form>
        {sending ? <p>Enviando...</p> : null}
        {msg ? <p>{msg}</p> : null}
        </>
    )
}