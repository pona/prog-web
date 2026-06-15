 'use client'
 import Link from "next/link";
 import { usePathname } from "next/navigation";

 export default function Nav() {
    const pathName = usePathname();
    const isActive = (path) => path === pathName;

    return (
        <nav>
            <ul className="holder">
                <li><Link className={isActive("/") ? 'activo' : ''} href="/">Home</Link></li>
                <li><Link className={isActive("/nosotros") ? 'activo' : ''} href="/nosotros">Nosotros</Link></li>
                <li><Link className={isActive("/propiedades") ? 'activo' : ''} href="/propiedades">Propiedades</Link></li>
                <li><Link className={isActive("/tasaciones") ? 'activo' : ''} href="/tasaciones">Tasaciones</Link></li>
                <li><Link className={isActive("/contacto") ? 'activo' : ''} href="/contacto">Contacto</Link></li>
            </ul>
        </nav>
    )
 }