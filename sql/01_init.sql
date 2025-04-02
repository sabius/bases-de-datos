CREATE DATABASE IF NOT EXISTS pedidosdatabase;
DEFAULT CHARACTER SET utf8mb4;
DEFAULT COLLATE utf8mb4_unicode_ci;

USE pedidosdatabase;

-- Tabla de Clientes
CREATE TABLE IF NOT EXISTS Clientes (
    id_cliente INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    telefono VARCHAR(20),
    direccion TEXT,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Tabla de Productos
CREATE TABLE IF NOT EXISTS Productos (
    id_producto INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10,2) NOT NULL,
    stock INT NOT NULL CHECK (stock >= 0)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Tabla de Transportistas
CREATE TABLE IF NOT EXISTS Transportistas (
    id_transportista INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    telefono VARCHAR(20),
    email VARCHAR(100) UNIQUE
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Tabla de Rutas
CREATE TABLE IF NOT EXISTS Rutas (
    id_ruta INT AUTO_INCREMENT PRIMARY KEY,
    origen VARCHAR(100) NOT NULL,
    destino VARCHAR(100) NOT NULL,
    distancia_km DECIMAL(10,2) CHECK (distancia_km > 0)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Tabla de Estados de Envío
CREATE TABLE IF NOT EXISTS EstadosEnvio (
    id_estado INT AUTO_INCREMENT PRIMARY KEY,
    descripcion VARCHAR(100) NOT NULL UNIQUE
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Tabla de Pedidos
CREATE TABLE IF NOT EXISTS Pedidos (
    id_pedido INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT NOT NULL,
    fecha_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    id_transportista INT,
    id_ruta INT,
    id_estado INT NOT NULL,
    total DECIMAL(10,2) DEFAULT 0.00,
    FOREIGN KEY (id_cliente) REFERENCES Clientes(id_cliente) ON DELETE CASCADE,
    FOREIGN KEY (id_transportista) REFERENCES Transportistas(id_transportista) ON DELETE SET NULL,
    FOREIGN KEY (id_ruta) REFERENCES Rutas(id_ruta) ON DELETE SET NULL,
    FOREIGN KEY (id_estado) REFERENCES EstadosEnvio(id_estado) ON DELETE RESTRICT
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Tabla intermedia para productos en un pedido (relación muchos a muchos)
CREATE TABLE IF NOT EXISTS PedidoProductos (
    id_pedido INT,
    id_producto INT,
    cantidad INT NOT NULL CHECK (cantidad > 0),
    precio_unitario DECIMAL(10,2) NOT NULL,
    subtotal DECIMAL(10,2) GENERATED ALWAYS AS (cantidad * precio_unitario) STORED,
    PRIMARY KEY (id_pedido, id_producto),
    FOREIGN KEY (id_pedido) REFERENCES Pedidos(id_pedido) ON DELETE CASCADE,
    FOREIGN KEY (id_producto) REFERENCES Productos(id_producto) ON DELETE CASCADE
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Tabla de Historial de Estados de Envío
CREATE TABLE IF NOT EXISTS HistorialEnvios (
    id_historial INT AUTO_INCREMENT PRIMARY KEY,
    id_pedido INT NOT NULL,
    id_estado INT NOT NULL,
    fecha_cambio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ubicacion VARCHAR(100),
    FOREIGN KEY (id_pedido) REFERENCES Pedidos(id_pedido) ON DELETE CASCADE,
    FOREIGN KEY (id_estado) REFERENCES EstadosEnvio(id_estado) ON DELETE RESTRICT
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
