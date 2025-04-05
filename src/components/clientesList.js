import { LitElement, css, html } from "lit";

export class ClientesList extends LitElement {
  static properties = {
    users: { type: Array },
    nombre: { type: String },
    email: { type: String },
    telefono: { type: String },
    direccion: { type: String },
    editIndex: { type: Number },
  };

  constructor() {
    super();
    this.users = [];
    this.nombre = '';
    this.email = '';
    this.telefono = '';
    this.direccion = '';
    this.editIndex = -1;
  }

  connectedCallback() {
    super.connectedCallback();
    this.fetchUsers();
  }

  async fetchUsers() {
    try {
      const res = await fetch("/api/clientes");
      if (!res.ok) throw new Error("Error fetching users");
      this.users = await res.json();
    } catch (err) {
      console.error("Fetch error:", err);
    }
  }

  async addUser(e) {
    e.preventDefault();
    try {
      const res = await fetch("/api/clientes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: this.nombre,
          email: this.email,
          telefono: this.telefono,
          direccion: this.direccion,
        }),
      });

      if (!res.ok) throw new Error(`Error al agregar usuario: ${res}`);
      const newUser = await res.json();
      this.users = [...this.users, newUser];

      this.nombre = '';
      this.email = '';
      this.telefono = '';
      this.direccion = '';
    } catch (err) {
      console.error("Error al agregar cliente:", err);
    }
  }

  handleInputChange(e) {
    this[e.target.name] = e.target.value;
  }

  enableEdit(index) {
    this.editIndex = index;
  }

  handleEditInput(e, index, field) {
    const updatedUsers = [...this.users];
    updatedUsers[index][field] = e.target.value;
    this.users = updatedUsers;
  }

  async saveEdit(index) {
    const user = this.users[index];
    try {
      const res = await fetch(`/api/clientes/${user.id_cliente}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      if (!res.ok) throw new Error("Error al actualizar");
      this.editIndex = -1;
    } catch (err) {
      console.error("Error al guardar cambios:", err);
    }
  }

  async deleteUser(id) {
    try {
      const res = await fetch(`/api/clientes/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Error al eliminar");
      this.users = this.users.filter(u => u.id_cliente !== id);
    } catch (err) {
      console.error("Error al eliminar cliente:", err);
    }
  }

  render() {
    return html`
      <h2>Lista de Clientes</h2>

      <form @submit="${this.addUser}">
        <input name="nombre" .value="${this.nombre}" @input="${this.handleInputChange}" placeholder="Nombre" required />
        <input name="email" .value="${this.email}" @input="${this.handleInputChange}" placeholder="Email" required />
        <input name="telefono" .value="${this.telefono}" @input="${this.handleInputChange}" placeholder="Teléfono" />
        <input name="direccion" .value="${this.direccion}" @input="${this.handleInputChange}" placeholder="Dirección" />
        <button type="submit">Agregar Cliente</button>
      </form>

      <table>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Email</th>
          <th>Teléfono</th>
          <th>Acciones</th>
        </tr>
        ${this.users.map((user, index) => html`
          <tr>
            <td>${user.id_cliente}</td>
            <td>
              ${this.editIndex === index
                ? html`<input .value="${user.nombre}" @input="${e => this.handleEditInput(e, index, 'nombre')}" />`
                : user.nombre}
            </td>
            <td>
              ${this.editIndex === index
                ? html`<input .value="${user.email}" @input="${e => this.handleEditInput(e, index, 'email')}" />`
                : user.email}
            </td>
            <td>
              ${this.editIndex === index
                ? html`<input .value="${user.telefono}" @input="${e => this.handleEditInput(e, index, 'telefono')}" />`
                : user.telefono}
            </td>
            <td>
              ${this.editIndex === index
                ? html`
                    <button @click="${() => this.saveEdit(index)}">Guardar</button>
                    <button @click="${() => (this.editIndex = -1)}">Cancelar</button>
                  `
                : html`
                    <button @click="${() => this.enableEdit(index)}">Editar</button>
                    <button @click="${() => this.deleteUser(user.id_cliente)}">Eliminar</button>
                  `}
            </td>
          </tr>
        `)}
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

    th, td {
      padding: 0.5rem;
      border-bottom: 1px solid #ccc;
    }

    th {
      background-color: #f3f4f6;
      text-align: left;
    }
  `;
}

customElements.define("clientes-list", ClientesList);
