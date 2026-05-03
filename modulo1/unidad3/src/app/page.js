'use client';
import { Listar } from "@/components/listaCompra";
import { ListaProductos } from "@/components/listaLibreria";
import { useState } from "react";


const productos = [
  { id:1, nombre: 'cuaderno', precio: 3000 },
  { id:2, nombre: 'lapiz', precio: 2000 },
  { id:3, nombre: 'regla', precio: 3500 },
  { id:4, nombre: 'tijeras', precio: 4000 }
]

export default function Home() {
  const [selectedItems, setSelectedItems] = useState([]);
  const handleToggle = (item) => {
    setSelectedItems(prev =>
      prev.find(p => p.id === item.id)
        ? prev.filter(p => p.id !== item.id)
        : [...prev, item]
    );
  };
  return (
    <div>
      <h2>Carrito de compras</h2>
      <hr/>
      <ListaProductos
        items = {productos}
        selectedItems = {selectedItems}
        onToggle={handleToggle}
      />
      <hr/>
      <Listar selectedItems = {selectedItems}/>
      <hr/>
    </div>
  );
}
