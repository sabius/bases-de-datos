import { LitElement, css, html } from "lit";

export class ProductosList extends LitElement {
  static properties = {
    productos: { type: Array },
    nombre: { type: String },
    descripcion: { type: String },
    precio: { type: String },
    stock: { type: String },
    editIndex: { type: Number },
  };

  constructor() {
    super();
    this.productos = [];
    this.nombre = "";
    this.descripcion = "";
    this.precio = "";
    this.stock = "";
    this.editIndex = -1;
  }

  connectedCallback() {
    super.connectedCallback();
    this.fetchProductos();
  }

  async fetchProductos() {
    try {
      const res = await fetch("/api/productos");
      if (!res.ok) throw new Error("Error al traer productos");
      this.productos = await res.json();
    } catch (error) {
      console.error("Error al traer productos:", error);
    }
  }

  async addProducto(e) {
    e.preventDefault();
    try {
      const res = await fetch("/api/productos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: this.nombre,
          descripcion: this.descripcion,
          precio: this.precio,
          stock: this.stock,
        }),
      });

      if (!res.ok) throw new Error(`Error al agregar producto: ${res}`);
      const newProducto = await res.json();
      this.productos = [...this.productos, newProducto];

      this.nombre = "";
      this.descripcion = "";
      this.precio = "";
      this.stock = "";
    } catch (err) {
      console.error("Error al agregar producto:", err);
    }
  }

  handleInputChange(e) {
    this[e.target.name] = e.target.value;
  }

  enableEdit(index) {
    this.editIndex = index;
  }

  handleEditInput(e, index, field) {
    const updatedProductos = [...this.productos];
    updatedProductos[index][field] = e.target.value;
    this.productos = updatedProductos;
  }

  async saveEdit(index) {
    const producto = this.productos[index];
    try {
      const res = await fetch(`/api/productos/${producto.id_producto}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(producto),
      });
      if (!res.ok) throw new Error("Error al actualizar producto");
      this.editIndex = -1;
    } catch (err) {
      console.error("Error al guardar cambios:", err);
    }
  }

  async deleteProduct(id) {
    try {
      const res = await fetch(`/api/productos/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Error al eliminar");
      this.productos = this.productos.filter((u) => u.id_producto !== id);
    } catch (err) {
      console.error("Error al eliminar producto:", err);
    }
  }

  render() {
    return html`
      <h2>Panel de control de productos</h2>

      <form @submit="${this.addProducto}">
        <input
          name="nombre"
          .value="${this.nombre}"
          @input="${this.handleInputChange}"
          placeholder="Nombre"
          required
        />
        <input
          name="descripcion"
          .value="${this.descripcion}"
          @input="${this.handleInputChange}"
          placeholder="Descripcion"
          required
        />
        <input
          name="precio"
          .value="${this.precio}"
          @input="${this.handleInputChange}"
          placeholder="Precio"
        />
        <input
          name="stock"
          .value="${this.stock}"
          @input="${this.handleInputChange}"
          placeholder="Stock"
        />
        <button type="submit">Agregar Producto</button>
      </form>

      <table>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Descripción</th>
          <th>Precio</th>
          <th>Stock</th>
        </tr>
        ${this.productos.map(
          (producto, index) => html`
            <tr>
              <td>${producto.id_producto}</td>
              <td>
                ${this.editIndex === index
                  ? html`<input .value="${producto.nombre}" @input="${e => this.handleEditInput(e, index, 'nombre')}" />`
                  : producto.nombre}
              </td>
              <td>
                ${this.editIndex === index
                  ? html`<input .value="${producto.descripcion}" @input="${e => this.handleEditInput(e, index, 'descripcion')}" />`
                  : producto.descripcion}
              </td>
              <td>
                ${this.editIndex === index
                  ? html`<input .value="${producto.precio}" @input="${e => this.handleEditInput(e, index, 'precio')}" />`
                  : producto.precio}
              </td>
              <td>
                ${this.editIndex === index
                  ? html`<input .value="${producto.stock}" @input="${e => this.handleEditInput(e, index, 'stock')}" />`
                  : producto.stock}
              </td>
              <td>
                ${this.editIndex === index
                  ? html`
                      <button @click="${() => this.saveEdit(index)}">Guardar</button>
                      <button @click="${() => (this.editIndex = -1)}">Cancelar</button>
                    `
                  : html`
                      <button @click="${() => this.enableEdit(index)}">Editar</button>
                      <button @click="${() => this.deleteProduct(producto.id_producto)}">Eliminar</button>
                    `}
              </td>
            </tr>
          `
        )}
      </table>
    `;
  }

  static styles = css`
    h2 {
      font-size: 1.6rem;
      margin-bottom: 1rem;
      color: #1f2937;
      border-bottom: 2px solid #3b82f6;
      padding-bottom: 0.5rem;
    }

    form {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-bottom: 1rem;
    }

    input {
      padding: 0.5rem;
      font-size: 1rem;
    }

    button {
      padding: 0.4rem 0.8rem;
      margin: 0 2px;
      font-size: 0.9rem;
      background-color: #3b82f6;
      color: white;
      border: none;
      cursor: pointer;
    }

    table {
      width: 100%;
      border-collapse: collapse;
    }

    th,
    td {
      padding: 0.5rem;
      border-bottom: 1px solid #ccc;
    }

    th {
      background-color: #f3f4f6;
      text-align: left;
    }
  `;
}

customElements.define("productos-list", ProductosList);
