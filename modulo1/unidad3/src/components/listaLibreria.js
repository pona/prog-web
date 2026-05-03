'use client';
import { useState } from "react";

export function ListaProductos(props) {
    const [selectedItems, setSelectedItems] = useState([]);

    const handleChange = (id) => {
        setSelectedItems(prev =>
            prev.includes(id)
                ? prev.filter(itemId => itemId !== id)
                : [...prev, id]
        );
    };

    return (
        <div>
            <ul>
                {props.items.map(item => (
                    <li key={item.id}>
                        <label>
                            <input
                                type="checkbox"
                                checked={selectedItems.some(p => p.id === item.id)}
                                onChange={() => props.onToggle(item)}
                            />
                              {item.nombre} - Precio: ${item.precio}
                        </label>
                    </li>
                ))}
            </ul>
        </div>
    );
}