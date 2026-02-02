// Define la estructura de una Cancha
export interface Cancha {
  _id?: string;
  nombre: string;
  deporte: string;
  precio_hora: number;
  capacidad: number;
  caracteristicas: {
    superficie: string;
    techada: boolean;
    iluminacion: string;
  };
  estado: string;
}

// Define la estructura de un Usuario
export interface Usuario {
  _id?: string;
  nombre: string;
  email: string;
  password?: string;
  telefono: string;
  cedula: string;
  rol: 'cliente' | 'administrador';
  preferencias?: string[];
}

// Define la estructura de una Reserva
export interface Reserva {
  _id?: string;
  cancha_id: string;
  usuario_id: string;
  nombre_cancha: string;
  fecha_reserva: string;
  horario: {
    inicio: string;
    fin: string;
  };
  monto_total: number;
  estado_pago: 'Pendiente' | 'Pagado' | 'Cancelado';
  metodo_pago: 'Efectivo' | 'Tarjeta' | 'Transferencia';
}

// Define la estructura de un ítem de Inventario
export interface InventarioItem {
  _id?: string;
  nombre_articulo: string;
  tipo: 'Alquiler' | 'Venta';
  categoria: string;
  stock_total: number;
  stock_disponible: number;
  precio_uso: number;
  estado_articulos: string;
}

// Define las pestañas posibles de la aplicación
export type ActiveTab = 'canchas' | 'usuarios' | 'reservas' | 'inventario';