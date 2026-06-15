'use client';

import { useState } from "react"

export default function ContactForm({ postUrl }) {
    const initialForm = {
        nombre: '',
        email: '',
        telefono: '',
        mensaje: ''
    }
    const [sending, setSending] = useState(false);
    const [msg, setMsg] = useState('');
    const [formData, setFormData] = useState(initialForm);

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(oldData => ({
            ...oldData,
            [name]: value
        }));
    }
    const handleSubmit = async e => {
        e.preventDefault();
        setMsg('');
        setSending(true);

        try {
            const rawResponse = await fetch(postUrl, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!rawResponse.ok) {
                const errorResponse = await rawResponse.json().catch(() => null);
                throw new Error(errorResponse?.message || 'Error al enviar la solicitud');
            }

            const response = await rawResponse.json();
            setMsg(response.message || 'Solicitud enviada correctamente');
            if (response.error === false) {
                setFormData(initialForm);
            }
        } catch (error) {
            console.error('ContactForm submit error:', error);
            setMsg(error.message || 'No se pudo enviar la solicitud. Intente nuevamente.');
        } finally {
            setSending(false);
        }
    }
    return (
        <>
        <form action="/contacto" method="post" onSubmit={handleSubmit} className="formulario">
            <p>
                <label>Nombre</label>
                <input type="text" name="nombre" value={formData.nombre} onChange={handleChange}></input>
            </p>
            <p>
                <label>Email</label>
                <input type="text" name="email" value={formData.email} onChange={handleChange}></input>
            </p>
            <p>
                <label>Telefono</label>
                <input type="text" name="telefono" value={formData.telefono} onChange={handleChange}></input>
            </p>
            <p>
                <label>Comentario</label>
                <input type="text" name="mensaje" value={formData.mensaje} onChange={handleChange}></input>
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