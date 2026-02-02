import { useState, useEffect } from 'react';
import { validarCedulaEcuatoriana, validarEmail, validarTelefono, generarPDF } from './utils/helpers';
import { Calendar, Users, Package, Grid, Plus, Edit2, Trash2, X, SearchIcon, Download } from './components/Icons';
import type { ActiveTab } from './types';

// Configuración API
const API_URL = 'http://localhost:5000/api';

const App = ({ onLogout }: { onLogout: () => void }) => {  const [activeTab, setActiveTab] = useState<ActiveTab>('canchas');
  const [data, setData] = useState<Record<ActiveTab, any[]>>({ 
    canchas: [], 
    usuarios: [], 
    reservas: [], 
    inventario: [] 
  });
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => { 
    loadData(); 
  }, [activeTab]);

  const loadData = async () => {
    try {
      const response = await fetch(`${API_URL}/${activeTab}`);
      const result = await response.json();
      setData(prev => ({ ...prev, [activeTab]: result }));
    } catch (error) { 
      console.error('Error cargando datos:', error); 
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (activeTab === 'usuarios') {
      if (formData.email && !validarEmail(formData.email)) {
        newErrors.email = 'Email inválido';
      }
      if (formData.telefono && !validarTelefono(formData.telefono)) {
        newErrors.telefono = 'Teléfono debe tener 10 dígitos';
      }
      if (formData.cedula && !validarCedulaEcuatoriana(formData.cedula)) {
        newErrors.cedula = 'Cédula inválida';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    try {
      const method = editingItem ? 'PUT' : 'POST';
      const url = editingItem ? `${API_URL}/${activeTab}/${editingItem._id}` : `${API_URL}/${activeTab}`;
      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      closeModal();
      loadData();
    } catch (error) { 
      console.error('Error guardando:', error); 
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('¿ELIMINAR registro permanentemente?')) return;
    try {
      await fetch(`${API_URL}/${activeTab}/${id}`, { method: 'DELETE' });
      loadData();
    } catch (error) {
      console.error('Error eliminando:', error);
    }
  };

  const openModal = (item: any = null) => {
    setEditingItem(item);
    setFormData(item || getEmptyForm());
    setErrors({});
    setShowModal(true);
  };

  const closeModal = () => { 
    setShowModal(false); 
    setEditingItem(null); 
    setFormData({}); 
  };

  const getEmptyForm = () => {
    const forms: Record<ActiveTab, any> = {
      canchas: { 
        nombre: '', 
        deporte: '', 
        precio_hora: '', 
        capacidad: '', 
        caracteristicas: { 
          superficie: '', 
          techada: false, 
          iluminacion: '' 
        }, 
        estado: 'Disponible' 
      },
      usuarios: { 
        nombre: '', 
        email: '', 
        password: '', 
        telefono: '', 
        cedula: '', 
        rol: 'cliente' 
      },
      reservas: { 
        cancha_id: '', 
        usuario_id: '', 
        nombre_cancha: '', 
        fecha_reserva: '', 
        horario: { 
          inicio: '08:00', 
          fin: '09:00' 
        }, 
        monto_total: '', 
        estado_pago: 'Pendiente', 
        metodo_pago: 'Efectivo' 
      },
      inventario: { 
        nombre_articulo: '', 
        tipo: 'Alquiler', 
        categoria: '', 
        stock_total: '', 
        stock_disponible: '', 
        precio_uso: '', 
        estado_articulos: 'Bueno' 
      }
    };
    return forms[activeTab];
  };

  const filteredData = (data[activeTab] || []).filter(item => 
    JSON.stringify(item).toLowerCase().includes(searchTerm.toLowerCase())
  );

  const tabs = [
    { id: 'canchas' as ActiveTab, label: 'Canchas', icon: Grid },
    { id: 'usuarios' as ActiveTab, label: 'Usuarios', icon: Users },
    { id: 'reservas' as ActiveTab, label: 'Reservas', icon: Calendar },
    { id: 'inventario' as ActiveTab, label: 'Inventario', icon: Package }
  ];

  return (
    <div className="min-h-screen">
      {/* HEADER */}
<header className="bg-gradient-to-br from-[#000000] to-[#1a1a1a] border-b border-green-500/20 px-8 py-5 flex justify-between items-center sticky top-0 z-50 shadow-2xl">
  <div className="flex items-center gap-3">
    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center text-black font-black italic shadow-lg">
      S
    </div>
    <div>
      <h1 className="text-xl font-black uppercase tracking-tighter">
        SPORTMANAGER <span className="text-green-500">PRO</span>
      </h1>
      <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">
        Sistema Validado
      </p>
    </div>
  </div>

<div className="flex items-center gap-4">
  <div className="flex bg-zinc-900 rounded-xl p-1 shadow-lg">
    {tabs.map(tab => (
      <button 
        key={tab.id} 
        onClick={() => setActiveTab(tab.id)}
        className={`nav-tab ${activeTab === tab.id ? 'active' : 'inactive'}`}
      >
        <tab.icon /> {tab.label}
      </button>
    ))}
  </div>
  
  <button
    onClick={onLogout}
    className="flex items-center gap-2 px-4 py-2.5 bg-transparent border-2 border-red-500/30 hover:border-red-500 hover:bg-red-500/10 text-red-500 rounded-lg text-xs font-bold uppercase tracking-wider transition-all"
  >
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
      <polyline points="16 17 21 12 16 7"></polyline>
      <line x1="21" y1="12" x2="9" y2="12"></line>
    </svg>
    SALIR
  </button>
</div>
</header>

      <main className="max-w-7xl mx-auto px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12 animate-fade-in-down">
          <div>
            <p className="text-green-500 font-bold text-xs tracking-[0.3em] uppercase mb-2">
              Panel de Administración
            </p>
            <h2 className="text-6xl font-black italic uppercase tracking-tighter bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
              {activeTab}
            </h2>
          </div>
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-80">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">
                <SearchIcon />
              </div>
              <input 
                type="text" 
                placeholder="Buscar..." 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
                className="input-dark pl-12" 
              />
            </div>
            <button 
              onClick={() => generarPDF(filteredData, activeTab)} 
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 font-bold transition-all shadow-lg hover:shadow-blue-500/20"
            >
              <Download /> PDF
            </button>
            <button 
              onClick={() => openModal()} 
              className="btn-neon px-6 py-3 rounded-xl flex items-center gap-2 whitespace-nowrap shadow-lg"
            >
              <Plus /> NUEVO
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredData.map((item: any) => (
            <div key={item._id} className="glass-card rounded-3xl p-8 flex flex-col">
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 bg-green-500/10 rounded-2xl flex items-center justify-center text-green-500 shadow-lg">
                   {activeTab === 'canchas' && <Grid />}
                   {activeTab === 'usuarios' && <Users />}
                   {activeTab === 'reservas' && <Calendar />}
                   {activeTab === 'inventario' && <Package />}
                </div>
                <div className="flex gap-2">
                  <button 
                        onClick={() => openModal(item)} 
                        className="p-2 text-zinc-500 hover:text-green-500 bg-transparent border border-zinc-800 hover:border-green-500 hover:bg-zinc-900 rounded-lg transition-all"
                    >
                    <Edit2 />
                  </button>
                  <button 
                    onClick={() => handleDelete(item._id)} 
                        className="p-2 text-zinc-500 hover:text-green-500 bg-transparent border border-zinc-800 hover:border-green-500 hover:bg-zinc-900 rounded-lg transition-all"
                  >
                    <Trash2 />
                  </button>
                </div>
              </div>
              <h3 className="text-xl font-bold uppercase mb-6 tracking-tight break-words">
                {item.nombre || item.nombre_cancha || item.nombre_articulo || item.email}
              </h3>
              
              {/* RENDERIZADO CONDICIONAL DE CAMPOS */}
              <div className="space-y-3 pt-6 border-t border-zinc-800 text-sm">
                {activeTab === 'canchas' && (
                  <>
                    <Row label="Deporte" value={item.deporte} />
                    <Row label="Precio/Hora" value={`$${item.precio_hora}`} highlight />
                    <Row label="Capacidad" value={`${item.capacidad} pax`} />
                    <StatusBadge status={item.estado} />
                  </>
                )}
                {activeTab === 'usuarios' && (
                  <>
                    <Row label="Email" value={item.email} />
                    <Row label="Teléfono" value={item.telefono} />
                    <Row label="Cédula" value={item.cedula} />
                    <StatusBadge status={item.rol} color={item.rol === 'administrador' ? 'blue' : 'gray'} />
                  </>
                )}
                {activeTab === 'reservas' && (
                  <>
                     <Row label="Fecha" value={item.fecha_reserva} />
                     <Row label="Horario" value={`${item.horario?.inicio} - ${item.horario?.fin}`} />
                     <Row label="Monto" value={`$${item.monto_total}`} highlight />
                     <StatusBadge status={item.estado_pago} />
                  </>
                )}
                {activeTab === 'inventario' && (
                  <>
                    <Row label="Stock" value={`${item.stock_disponible} / ${item.stock_total}`} />
                    <Row label="Precio" value={`$${item.precio_uso}`} highlight />
                    <StatusBadge status={item.estado_articulos} color="gray" />
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center p-6 z-[100]">
          <div className="bg-zinc-950 border-2 border-green-500/20 w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl">
            <div className="px-10 py-8 bg-gradient-to-r from-zinc-900 to-black border-b border-zinc-800 flex justify-between items-center">
              <h2 className="text-3xl font-black uppercase italic tracking-tighter">
                {editingItem ? 'EDITAR' : 'NUEVO'} <span className="text-green-500">{activeTab.slice(0, -1)}</span>
              </h2>
              <button onClick={closeModal} className="text-zinc-500 hover:text-white transition-colors">
                <X />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-10 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
              {/* Form Canchas */}
              {activeTab === 'canchas' && (
                <>
                  <Input 
                    label="Nombre" 
                    value={formData.nombre || ''} 
                    onChange={(v) => setFormData({...formData, nombre: v.toUpperCase()})} 
                  />
                  <Select 
                    label="Deporte" 
                    value={formData.deporte || ''} 
                    options={['Fútbol','Tenis','Pádel','Básquet','Vóley']} 
                    onChange={(v) => setFormData({...formData, deporte: v})} 
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Input 
                      label="Precio ($)" 
                      type="number" 
                      value={formData.precio_hora || ''} 
                      onChange={(v) => setFormData({...formData, precio_hora: v})} 
                    />
                    <Input 
                      label="Capacidad" 
                      type="number" 
                      value={formData.capacidad || ''} 
                      onChange={(v) => setFormData({...formData, capacidad: v})} 
                    />
                  </div>
                  <Select 
                    label="Superficie" 
                    value={formData.caracteristicas?.superficie || ''} 
                    options={['Sintética','Césped Natural','Arcilla','Cemento','Parquet']} 
                    onChange={(v) => setFormData({...formData, caracteristicas: {...(formData.caracteristicas || {}), superficie: v}})} 
                  />
                  <Select 
                    label="Estado" 
                    value={formData.estado || 'Disponible'} 
                    options={['Disponible','Mantenimiento','Ocupada']} 
                    onChange={(v) => setFormData({...formData, estado: v})} 
                  />
                </>
              )}

              {/* Form Usuarios */}
              {activeTab === 'usuarios' && (
                <>
                  <Input 
                    label="Nombre" 
                    value={formData.nombre || ''} 
                    onChange={(v) => setFormData({...formData, nombre: v.toUpperCase()})} 
                  />
                  <Input 
                    label="Cédula" 
                    maxLength={10} 
                    value={formData.cedula || ''} 
                    onChange={(v) => setFormData({...formData, cedula: v.replace(/\D/g,'')})} 
                    error={errors.cedula} 
                  />
                  <Input 
                    label="Email" 
                    type="email" 
                    value={formData.email || ''} 
                    onChange={(v) => setFormData({...formData, email: v.toLowerCase()})} 
                    error={errors.email} 
                  />
                  <Input 
                    label="Contraseña" 
                    type="password" 
                    value={formData.password || ''} 
                    onChange={(v) => setFormData({...formData, password: v})} 
                    placeholder={editingItem ? "Dejar vacío para mantener" : ""} 
                  />
                  <Input 
                    label="Teléfono" 
                    maxLength={10} 
                    value={formData.telefono || ''} 
                    onChange={(v) => setFormData({...formData, telefono: v.replace(/\D/g,'')})} 
                    error={errors.telefono} 
                  />
                  <Select 
                    label="Rol" 
                    value={formData.rol || 'cliente'} 
                    options={['cliente','administrador']} 
                    onChange={(v) => setFormData({...formData, rol: v})} 
                  />
                </>
              )}
              
               {/* Form Reservas */}
               {activeTab === 'reservas' && (
                <>
                  <Input 
                    label="Nombre Cancha" 
                    value={formData.nombre_cancha || ''} 
                    onChange={(v) => setFormData({...formData, nombre_cancha: v.toUpperCase()})} 
                  />
                  <Input 
                    label="Fecha" 
                    type="date" 
                    value={formData.fecha_reserva || ''} 
                    onChange={(v) => setFormData({...formData, fecha_reserva: v})} 
                  />
                  <div className="grid grid-cols-2 gap-4">
                     <Select 
                       label="Inicio" 
                       value={formData.horario?.inicio || '08:00'} 
                       options={Array.from({length:15},(_,i)=>`${i+8 <10?'0':''}${i+8}:00`)} 
                       onChange={(v) => setFormData({...formData, horario: {...(formData.horario || {}), inicio: v}})} 
                     />
                     <Select 
                       label="Fin" 
                       value={formData.horario?.fin || '09:00'} 
                       options={Array.from({length:15},(_,i)=>`${i+9 <10?'0':''}${i+9}:00`)} 
                       onChange={(v) => setFormData({...formData, horario: {...(formData.horario || {}), fin: v}})} 
                     />
                  </div>
                  <Input 
                    label="Monto ($)" 
                    type="number" 
                    value={formData.monto_total || ''} 
                    onChange={(v) => setFormData({...formData, monto_total: v})} 
                  />
                  <div className="grid grid-cols-2 gap-4">
                     <Select 
                       label="Estado Pago" 
                       value={formData.estado_pago || 'Pendiente'} 
                       options={['Pendiente','Pagado','Cancelado']} 
                       onChange={(v) => setFormData({...formData, estado_pago: v})} 
                     />
                     <Select 
                       label="Método" 
                       value={formData.metodo_pago || 'Efectivo'} 
                       options={['Efectivo','Tarjeta','Transferencia']} 
                       onChange={(v) => setFormData({...formData, metodo_pago: v})} 
                     />
                  </div>
                </>
              )}

              {/* Form Inventario */}
              {activeTab === 'inventario' && (
                 <>
                   <Input 
                     label="Artículo" 
                     value={formData.nombre_articulo || ''} 
                     onChange={(v) => setFormData({...formData, nombre_articulo: v.toUpperCase()})} 
                   />
                   <div className="grid grid-cols-2 gap-4">
                      <Select 
                        label="Tipo" 
                        value={formData.tipo || 'Alquiler'} 
                        options={['Alquiler','Venta']} 
                        onChange={(v) => setFormData({...formData, tipo: v})} 
                      />
                      <Input 
                        label="Categoría" 
                        value={formData.categoria || ''} 
                        onChange={(v) => setFormData({...formData, categoria: v})} 
                      />
                   </div>
                   <div className="grid grid-cols-2 gap-4">
                      <Input 
                        label="Total" 
                        type="number" 
                        value={formData.stock_total || ''} 
                        onChange={(v) => setFormData({...formData, stock_total: v})} 
                      />
                      <Input 
                        label="Disponible" 
                        type="number" 
                        value={formData.stock_disponible || ''} 
                        onChange={(v) => setFormData({...formData, stock_disponible: v})} 
                      />
                   </div>
                   <Input 
                     label="Precio ($)" 
                     type="number" 
                     value={formData.precio_uso || ''} 
                     onChange={(v) => setFormData({...formData, precio_uso: v})} 
                   />
                   <Select 
                     label="Estado" 
                     value={formData.estado_articulos || 'Bueno'} 
                     options={['Excelente','Bueno','Regular','Necesita mantenimiento']} 
                     onChange={(v) => setFormData({...formData, estado_articulos: v})} 
                   />
                 </>
              )}

              <div className="flex gap-4 pt-6 border-t border-zinc-800">
                <button type="submit" className="flex-1 btn-neon py-4 rounded-2xl font-black">
                  GUARDAR
                </button>
                <button 
                  type="button" 
                  onClick={closeModal} 
                  className="flex-1 bg-zinc-800 text-zinc-300 font-bold py-4 rounded-2xl hover:bg-zinc-700 transition-all"
                >
                  CANCELAR
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// Componentes UI auxiliares
const Row = ({ label, value, highlight = false }: any) => (
  <div className="flex justify-between">
    <span className="text-zinc-500 font-semibold">{label}</span>
    <span className={`font-bold ${highlight ? 'text-green-500' : 'text-white'}`}>
      {value || 'N/A'}
    </span>
  </div>
);

const StatusBadge = ({ status, color = 'green' }: any) => {
  const colors: any = {
    green: 'bg-green-500/20 text-green-500',
    red: 'bg-red-500/20 text-red-500',
    blue: 'bg-blue-500/20 text-blue-500',
    gray: 'bg-zinc-500/20 text-zinc-400',
    yellow: 'bg-yellow-500/20 text-yellow-500'
  };
  
  let finalColor = colors[color];
  if(status === 'Ocupada' || status === 'Cancelado' || status === 'Necesita mantenimiento') {
    finalColor = colors.red;
  }
  if(status === 'Pendiente' || status === 'Regular') {
    finalColor = colors.yellow;
  }

  return (
    <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${finalColor}`}>
      {status}
    </span>
  );
};

const Input = ({ label, error, onChange, ...props }: any) => (
  <div>
    <label className="text-[10px] font-bold text-zinc-500 uppercase ml-1 mb-1 block">
      {label}
    </label>
    <input 
      className="input-dark" 
      {...props}
      onChange={(e) => onChange(e.target.value)}
    />
    {error && <p className="text-red-500 text-xs font-bold mt-1">✗ {error}</p>}
  </div>
);

const Select = ({ label, options, onChange, value, ...props }: any) => (
  <div>
    <label className="text-[10px] font-bold text-zinc-500 uppercase ml-1 mb-1 block">
      {label}
    </label>
    <select 
      className="input-dark" 
      value={value || ''} 
      onChange={(e) => onChange(e.target.value)} 
      {...props}
    >
      <option value="">Seleccionar</option>
      {options.map((opt: string) => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  </div>
);

export default App;