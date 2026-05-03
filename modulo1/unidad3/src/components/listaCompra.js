'use client';

import React, { useState } from "react";

export function Listar(props) {
    const total = props.selectedItems.reduce(
        (acc, item) => acc + item.precio, 0
    );
    return(
        <div>
            <h3>Resumen de compra</h3>
            {props.selectedItems.length === 0 ? (
                <p>No hay productos seleccionados</p>
            ) : (
                <>
                <ul>
                    {props.selectedItems.map(item => (
                        <li key={item.id}>
                            {item.nombre} - ${item.precio}
                        </li>
                    ))}
                </ul>
                <p>Total: ${total}</p>
                </>
            )}
        </div>
    )
}