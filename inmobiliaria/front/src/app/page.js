import "@/styles/home.css"

export default function Home() {
  return (
    <main className="holder">
      <div className="homeimg">
        <img src="/images/home/img01.png" alt="casa" width="100%" />
      </div>
      <div className="columnas">
        <div className="bienvenidos">
          <h2>Home</h2>
          <p>Encuentre su propiedad</p>
        </div>
        <div className="testimonios">
          <h2>Testimonios</h2>
          <div className="testimonio">
            <span className="cita">Simplemente excelente</span>
            <span className="autor">Juan Perez</span>
          </div>
        </div>
      </div>
    </main>
  );
}
