import { LitElement, css, html } from "lit";

export class UserList extends LitElement {
  // Se declaran las propiedades reactivas. En este cao, se espera que users se actualice luego del fetch a la base de datos.
  static properties = {
    users: { type: Array },
  };

  constructor() {
    super();
    this.users = [];
  }

  connectedCallback() {
    super.connectedCallback();
    this.fetchUsers();
  }

  async fetchUsers() {
    try {
      const response = await fetch("/api/clientes"); // Ensure this URL is correct

      if (!response.ok) {
        throw new Error(`API responded with status ${response.status}`);
      }

      const data = await response.json();
      this.users = data;

      console.log(this.users);
    } catch (error) {
      console.error("Error al traer usuarios:", error);
    }
  }

  render() {
    return html`
      <h2>Lista de Clientes Prueba </h2>
      <table>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Email</th>
          <th>Telefono</th>
        </tr>
        ${this.users.map(
          (user) => html`
            <tr>
              <td>${user.id_cliente}</td>
              <td>${user.nombre}</td>
              <td>${user.email}</td>
              <td>${user.telefono}</td>
            </tr>
          `
        )}
      </table>
      <h2>Agregar Cliente</h2>
      <form id="add-client-form" @submit="${this.addClient}">
        <input type="text" placeholder="Nombre" id="nombre" />
        <input type="email" placeholder="Email" id="email" />
        <input type="text" placeholder="Telefono" id="telefono" />
        <input type="text" placeholder="Direccion" id="direccion" />
        <button type="submit">Agregar Cliente</button>
      <input type="text" placeholder="Nombre" id="nombre" />
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
    `;
  }
}

customElements.define("user-list", UserList);
