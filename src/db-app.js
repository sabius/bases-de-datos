import { LitElement, css, html } from "lit";
import litLogo from "./assets/lit.svg";
import viteLogo from "/vite.svg";

import "./components/userList";
import "./components/productosList";

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
export class DbApp extends LitElement {
  static get properties() {
    return {
      /**
       * Copy for the read the docs hint.
       */
      docsHint: { type: String },

      /**
       * The number of times the button has been clicked.
       */
      count: { type: Number },
    };
  }

  constructor() {
    super();
    this.docsHint = "Click on the Vite and Lit logos to learn more";
    this.count = 0;
  }

  render() {
    return html`
      <div class="layout">
        <aside class="sidebar">
          <h2>TechLogistics</h2>
          <!-- <nav>
            <a href="#">Dashboard</a>
            <a href="#">Pedidos</a>
            <a href="#">Clientes</a>
            <a href="#">Productos</a>
            <a href="#">Envíos</a>
          </nav> -->
        </aside>

        <main class="main-content">
          <header class="header">
            <h1>Panel de Control</h1>
          </header>

          <section>
            <user-list></user-list>
          </section>

          <section>
            <h2>Lista de Productos</h2>
            <productos-list></productos-list>
          </section>
        </main>
      </div>
    `;
  }

  _onClick() {
    this.count++;
  }

  static get styles() {
    return css`
      :host {
        display: block;
        width: 100vw;
        height: 100vh;
        margin: 0;
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        color: #1f2937;
      }

      .layout {
        display: flex;
        height: 100%;
      }

      .sidebar {
        width: 260px;
        background-color: #1f2937;
        color: white;
        padding: 2rem 1.5rem;
        display: flex;
        flex-direction: column;
      }

      .sidebar h2 {
        font-size: 1.75rem;
        margin-bottom: 2.5rem;
      }

      .sidebar nav a {
        display: block;
        color: #9ca3af;
        text-decoration: none;
        margin-bottom: 1.2rem;
        font-weight: 500;
        font-size: 1rem;
        transition: color 0.2s;
      }

      .sidebar nav a:hover {
        color: white;
      }

      .main-content {
        flex: 1;
        padding: 2.5rem 3rem;
        background-color: #f3f4f6;
        overflow-y: auto;
      }

      .header h1 {
        font-size: 2rem;
        margin-bottom: 2rem;
      }

      .overview {
        display: flex;
        gap: 2rem;
        margin-bottom: 3rem;
      }

      .overview .card {
        flex: 1;
        background-color: white;
        border-radius: 1rem;
        padding: 2rem;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        text-align: center;
      }

      .overview .card h3 {
        margin: 0 0 0.8rem;
        font-size: 1.2rem;
        color: #4b5563;
      }

      .overview .card p {
        font-size: 2.5rem;
        font-weight: bold;
        color: #111827;
      }

      section {
        margin-bottom: 3rem;
      }

      section h2 {
        font-size: 1.6rem;
        margin-bottom: 1rem;
        color: #1f2937;
        border-bottom: 2px solid #3b82f6;
        padding-bottom: 0.5rem;
      }

      /* Estilos para tablas internas de los componentes */
      ::slotted(table) {
        width: 100%;
        border-collapse: collapse;
        background-color: white;
        border-radius: 0.5rem;
        overflow: hidden;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
      }

      ::slotted(th) {
        background-color: #3b82f6;
        color: white;
        padding: 1rem;
        text-align: left;
        font-size: 0.95rem;
      }

      ::slotted(td) {
        padding: 1rem;
        border-top: 1px solid #e5e7eb;
        font-size: 0.95rem;
      }

      ::slotted(tr:hover) {
        background-color: #f0f9ff;
      }

      @media (max-width: 768px) {
        .layout {
          flex-direction: column;
        }

        .sidebar {
          width: 100%;
          flex-direction: row;
          justify-content: space-around;
          padding: 1rem;
        }

        .main-content {
          padding: 1.5rem;
        }

        .overview {
          flex-direction: column;
          gap: 1.5rem;
        }
      }
    `;
  }
}

window.customElements.define("db-app", DbApp);
