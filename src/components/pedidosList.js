import { LitElement, css, html } from "lit";

export class PedidosList extends LitElement {

  static properties = {
    pedidos: { type: Array },
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
    }
    catch (error) {
      console.error('Error al traer pedidos:', error)
    }
  }

  getEstadoClass(estado) {
    switch (estado.toLowerCase()) {
      case 'pendiente': return 'estado pendiente';
      case 'procesando': return 'estado procesando';
      case 'en tránsito': return 'estado en-transito';
      case 'entregado': return 'estado entregado';
      case 'cancelado': return 'estado cancelado';
      case 'devuelto': return 'estado devuelto';
      default: return 'estado';
    }
  }

  render() {
    return html`
      <h2>Lista de Pedidos</h2>
      ${this.pedidos.map(
        (pedido) => html`
          <div class="pedido">
            <div class="pedido-info">
              <div class="datos">
                <p><strong>Pedido #${pedido.id_pedido}</strong></p>
                <p><strong>Cliente:</strong> ${pedido.cliente}</p>
                <p><strong>Transportista:</strong> ${pedido.transportista ?? 'Sin asignar'}</p>
                <p><strong>Estado:</strong>
                  <span class="${this.getEstadoClass(pedido.estado)}">${pedido.estado}</span>
                </p>
              </div>

              <div class="productos">
                <table>
                  <thead>
                    <tr>
                      <th>Producto</th>
                      <th>Cantidad</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${pedido.productos.map(producto => html`
                      <tr>
                        <td>${producto.nombre}</td>
                        <td>${producto.cantidad}</td>
                      </tr>
                    `)}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        `
      )}
    `;
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

      .pedido {
        margin-bottom: 1.5rem;
        padding: 1rem;
        border: 1px solid #e5e7eb;
        border-radius: 0.5rem;
        background: #ffffff;
        box-shadow: 0 1px 2px rgba(0,0,0,0.05);
      }

      .pedido-info {
        display: grid;
        grid-template-columns: 1fr 2fr;
        gap: 1rem;
      }

      .datos p {
        margin: 0.2rem 0;
        font-size: 0.95rem;
      }

      .estado {
        padding: 0.2rem 0.5rem;
        border-radius: 0.3rem;
        font-weight: bold;
        text-transform: capitalize;
        font-size: 0.85rem;
      }

      .pendiente {
        background-color: #f3f4f6;
        color: #374151;
      }

      .procesando {
        background-color: #dbeafe;
        color: #1d4ed8;
      }

      .en-transito {
        background-color: #fef9c3;
        color: #ca8a04;
      }

      .entregado {
        background-color: #dcfce7;
        color: #16a34a;
      }

      .cancelado,
      .devuelto {
        background-color: #fee2e2;
        color: #b91c1c;
      }

      table {
        width: 100%;
        border-collapse: collapse;
        font-size: 0.9rem;
      }

      th, td {
        padding: 0.4rem;
        text-align: left;
        border: 1px solid #d1d5db;
      }

      th {
        background-color: #f9fafb;
      }
    `;
  }
}

customElements.define('pedidos-list', PedidosList);
