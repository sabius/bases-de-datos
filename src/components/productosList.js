import { LitElement, css, html } from "lit";

export class ProductosList extends LitElement {

  static properties = {
    productos: { type: Array },
  }

  constructor() {
    super();
    this.productos = [];
  }

  connectedCallback() {
    super.connectedCallback();
    this.fetchProductos();
  }

  async fetchProductos() {
    try {
      const response = await fetch('/api/productos');

      if (!response.ok) {
        throw new Error(`Api responded with status ${response.status}`);
      }

      const data = await response.json();
      this.productos = data;

      console.log(this.productos);
    }
    catch (error) {
      console.error('Error al traer productos:', error)
    }
  }

  render() {
    return html`
      <h2>Lista de Productos</h2>
      <table>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Descripción</th>
          <th>Precio</th>
          <th>Stock</th>
        </tr>
        ${this.productos.map(
          (producto) => html`
            <tr>
              <td>${producto.id_producto}</td>
              <td>${producto.nombre}</td>
              <td>${producto.descripcion}</td>
              <td>${producto.precio}</td>
              <td>${producto.stock}</td>
            </tr>
          `
        )}
      </table>
    `
  }

  static get styles() {
    return css`
      h2 {
        font-size: 1.6rem;
        margin-bottom: 1rem;
        color: #1f2937;
        border-bottom: 2px solid #3b82f6;
        padding-bottom: 0.5rem;
      }
    `;
  }
}

customElements.define('productos-list', ProductosList)
