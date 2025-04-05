import { LitElement, css, html } from "lit";

export class PedidosList extends LitElement {

  static properties = {
    productos: { type: Array },
  }

  constructor() {
    super();
    this.pedidos = [];
  }

  connectedCallback() {
    super.connectedCallback();
    this.fetchPedidos();
  }

  async fetchPedidos() {
    try {
      const response = await fetch('/api/pedidos');

      if (!response.ok) {
        throw new Error(`Api responded with status ${response.status}`);
      }

      const data = await response.json();
      this.pedidos = data;

      console.log(this.pedidos);
    }
    catch (error) {
      console.error('Error al traer pedidos:', error)
    }
  }

  render() {
    return html`
      <table>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Descripción</th>
          <th>Precio</th>
          <th>Stock</th>
        </tr>
        ${this.pedidos.map(
          (pedido) => html`
            <tr>
              <td>${pedido.id_pedido}</td>
              <td>${pedido.nombre}</td>
              <td>${pedido.descripcion}</td>
              <td>${pedido.precio}</td>
              <td>${pedido.stock}</td>
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

customElements.define('pedidos-list', PedidosList)
