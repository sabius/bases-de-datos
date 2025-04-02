USE pedidosdatabase;

-- Insertar Clientes
INSERT INTO Clientes (nombre, email, telefono, direccion) VALUES 
('Juan Perez', 'juan@example.com', '123456789', 'Calle 123'),
('Maria Lopez', 'maria@example.com', '987654321', 'Avenida 456'),
('Carlos Gutierrez', 'carlos@example.com', '555666777', 'Calle 789'),
('Ana Martinez', 'ana@example.com', '444555666', 'Carrera 10'),
('Pedro Ramírez', 'pedro@example.com', '333444555', 'Diagonal 20');

-- Insertar Productos
INSERT INTO Productos (nombre, descripcion, precio, stock) VALUES 
('Laptop', 'Laptop gaming', 1200.50, 5),
('Smartphone', 'Último modelo', 850.00, 10),
('Tablet', 'Pantalla HD', 450.75, 15),
('Auriculares', 'Inalámbricos Bluetooth', 150.99, 25),
('Monitor', '27 pulgadas 4K', 550.00, 8);

-- Insertar Transportistas
INSERT INTO Transportistas (nombre, telefono, email) VALUES 
('DHL Express', '555777888', 'contacto@dhl.com'),
('FedEx Logistics', '666888999', 'info@fedex.com'),
('UPS Delivery', '777999000', 'support@ups.com'),
('Correos Nacionales', '888000111', 'info@correos.com'),
('BlueExpress', '999111222', 'contacto@blueexpress.com');

-- Insertar Rutas
INSERT INTO Rutas (origen, destino, distancia_km) VALUES 
('Bogotá', 'Medellín', 420.50),
('Medellín', 'Cali', 415.30),
('Cali', 'Cartagena', 1050.80),
('Bogotá', 'Barranquilla', 980.40),
('Cartagena', 'Santa Marta', 250.00);

-- Insertar Estados de Envío
INSERT INTO EstadosEnvio (descripcion) VALUES 
('Pendiente'),
('En tránsito'),
('Entregado'),
('Devuelto'),
('Cancelado');

-- Insertar Pedidos
INSERT INTO Pedidos (id_cliente, id_transportista, id_ruta, id_estado, total) VALUES 
(1, 1, 1, 1, 2050.50),
(2, 2, 2, 2, 850.00),
(3, 3, 3, 3, 450.75),
(4, 4, 4, 4, 150.99),
(5, 5, 5, 5, 550.00);

-- Insertar Productos en Pedidos (relación muchos a muchos)
INSERT INTO PedidoProductos (id_pedido, id_producto, cantidad, precio_unitario) VALUES 
(1, 1, 1, 1200.50), 
(1, 2, 1, 850.00), 
(2, 3, 1, 450.75), 
(3, 4, 2, 150.99), 
(4, 5, 1, 550.00);

-- Insertar Historial de Envíos
INSERT INTO HistorialEnvios (id_pedido, id_estado, ubicacion) VALUES 
(1, 1, 'Bodega Principal'),
(1, 2, 'Centro de distribución Medellín'),
(2, 2, 'En camino a Cali'),
(3, 3, 'Entregado en la dirección del cliente'),
(4, 4, 'Devuelto al almacén'),
(5, 5, 'Pedido cancelado por el cliente');