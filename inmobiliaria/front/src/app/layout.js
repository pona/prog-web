import "@/styles/globals.css";
import Nav from "@/components/Nav";

export const metadata = {
  title: "Inmobiliaria Final",
  description: "NAP Propiedades",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header>
          <div className="holder">
            <div className="logo">
              <img src="/images/logo.png" width="25%" alt="Inmobiliaria Final" />
              <h1>Inmobiliaria Final</h1>
            </div>
          </div>

        </header>

        <Nav/>

        {children}
        <footer>
          <p>Derechos reservados. Inmobiliaria Final Año 2026</p>
        </footer>
      </body>
    </html>
  );
}
