import { LitElement, html } from 'lit';

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
      const response = await fetch('/api/clientes'); // Ensure this URL is correct

      if (!response.ok) {
        throw new Error(`API responded with status ${response.status}`);
      }

      const data = await response.json();
      this.users = data;

      console.log(this.users);
    } catch (error) {
      console.error('Error al traer usuarios:', error);
    }
  }

  render() {
    return html`
      <h2>Lista de Clientes</h2>
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
    `;
  }
}

customElements.define('user-list', UserList);
