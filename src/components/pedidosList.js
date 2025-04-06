import { LitElement, css, html } from "lit";

export class PedidosList extends LitElement {
  static properties = {
    pedidos: { type: Array },
    clientes: { type: Array },
    productos: { type: Array },
    transportistas: { type: Array },
    nuevoPedido: { type: Object },
  };

  constructor() {
    super();
    this.pedidos = [];
    this.clientes = [];
    this.productos = [];
    this.transportistas = [];
    this.nuevoPedido = {
      cliente: '',
      transportista: '',
      productos: [],
    };
  }

  connectedCallback() {
    super.connectedCallback();
    this.fetchPedidos();
    this.fetchClientes();
    this.fetchProductos();
    this.fetchTransportistas();
  }

  async fetchPedidos() {
    try {
      const response = await fetch('/api/pedidos');
      if (!response.ok) throw new Error(`Error al obtener pedidos: ${response.status}`);
      const data = await response.json();
      this.pedidos = data;
    } catch (error) {
      console.error('Error al traer pedidos:', error);
    }
  }

  async fetchClientes() {
    try {
      const response = await fetch('/api/clientes');
      if (!response.ok) throw new Error(`Error al obtener clientes: ${response.status}`);
      const data = await response.json();
      this.clientes = data;
    } catch (error) {
      console.error('Error al traer clientes:', error);
    }
  }

  async fetchProductos() {
    try {
      const response = await fetch('/api/productos');
      if (!response.ok) throw new Error(`Error al obtener productos: ${response.status}`);
      const data = await response.json();
      this.productos = data;
    } catch (error) {
      console.error('Error al traer productos:', error);
    }
  }

  async fetchTransportistas() {
    try {
      const response = await fetch('/api/transportistas');
      if (!response.ok) throw new Error(`Error al obtener transportistas: ${response.status}`);
      const data = await response.json();
      this.transportistas = data;
    } catch (error) {
      console.error('Error al traer transportistas:', error);
    }
  }

  handleInputChange(e) {
    const { name, value } = e.target;
    this.nuevoPedido = { ...this.nuevoPedido, [name]: value };
  }

  handleAddProducto() {
    const productoId = parseInt(this.shadowRoot.getElementById('producto-id').value, 10);
    const cantidad = parseInt(this.shadowRoot.getElementById('producto-cantidad').value, 10);

    const producto = this.productos.find((p) => p.id_producto === productoId);

    if (producto && cantidad > 0 && cantidad <= producto.stock) {
      const subtotal = cantidad * producto.precio;
      this.nuevoPedido.productos = [
        ...this.nuevoPedido.productos,
        { id: producto.id_producto, nombre: producto.nombre, cantidad, subtotal },
      ];
      this.shadowRoot.getElementById('producto-id').value = '';
      this.shadowRoot.getElementById('producto-cantidad').value = '';
    } else {
      alert('Cantidad no válida o producto sin suficiente stock.');
    }
  }

  async handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch('/api/pedidos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.nuevoPedido),
      });
      if (!response.ok) throw new Error(`Error al crear pedido: ${response.status}`);
      const nuevoPedido = await response.json();
      this.pedidos = [...this.pedidos, nuevoPedido];
      this.nuevoPedido = { cliente: '', transportista: '', productos: [] };
    } catch (error) {
      console.error('Error al crear pedido:', error);
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

      <!-- Formulario para crear un nuevo pedido -->
      <form @submit="${this.handleSubmit}">
        <fieldset>
          <legend>Crear Nuevo Pedido</legend>
          <label>
            Cliente:
            <select name="cliente" @change="${this.handleInputChange}" required>
              <option value="">Seleccione un cliente</option>
              ${this.clientes.map(
                (cliente) => html`<option value="${cliente.id_cliente}">${cliente.nombre}</option>`
              )}
            </select>
          </label>
          <label>
            Transportista:
            <select name="transportista" @change="${this.handleInputChange}">
              <option value="">Seleccione un transportista</option>
              ${this.transportistas.map(
                (transportista) =>
                  html`<option value="${transportista.id_transportista}">${transportista.nombre}</option>`
              )}
            </select>
          </label>
          <fieldset>
            <legend>Agregar Producto</legend>
            <label>
              Producto:
              <select id="producto-id">
                <option value="">Seleccione un producto</option>
                ${this.productos.map(
                  (producto) =>
                    html`<option value="${producto.id_producto}">
                      ${producto.nombre} (Stock: ${producto.stock})
                    </option>`
                )}
              </select>
            </label>
            <label>
              Cantidad:
              <input type="number" id="producto-cantidad" min="1" />
            </label>
            <button type="button" @click="${this.handleAddProducto}">Agregar Producto</button>
          </fieldset>
          <ul>
            ${this.nuevoPedido.productos.map(
              (producto) => html`
                <li>
                  ${producto.nombre} - Cantidad: ${producto.cantidad} - Subtotal: ${producto.subtotal.toFixed(2)}
                </li>
              `
            )}
          </ul>
          <button type="submit">Crear Pedido</button>
        </fieldset>
      </form>

      <!-- Lista de pedidos -->
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