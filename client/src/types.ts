export type ActiveTab = 'canchas' | 'usuarios' | 'reservas' | 'inventario';

export interface Cancha {
  _id: string;
  nombre: string;
  deporte: string;
  precio_hora: number;
  capacidad: number;
  caracteristicas: {
    superficie: string;
    techada: boolean;
    iluminacion: string;
  };
  estado: 'Disponible' | 'Mantenimiento' | 'Ocupada';
}

export interface Usuario {
  _id: string;
  nombre: string;
  email: string;
  password?: string;
  telefono: string;
  cedula: string;
  rol: 'cliente' | 'administrador';
}

export interface Reserva {
  _id: string;
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

export interface Inventario {
  _id: string;
  nombre_articulo: string;
  tipo: 'Alquiler' | 'Venta';
  categoria: string;
  stock_total: number;
  stock_disponible: number;
  precio_uso: number;
  estado_articulos: 'Excelente' | 'Bueno' | 'Regular' | 'Necesita mantenimiento';
}