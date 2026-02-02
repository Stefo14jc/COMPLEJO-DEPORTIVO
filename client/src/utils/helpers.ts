import { ActiveTab } from '../types';

// Validación de cédula ecuatoriana
export const validarCedulaEcuatoriana = (cedula: string): boolean => {
  if (cedula.length !== 10) return false;
  
  const provincia = parseInt(cedula.substring(0, 2), 10);
  if (provincia < 1 || provincia > 24) return false;
  
  const tercerDigito = parseInt(cedula.substring(2, 3), 10);
  if (tercerDigito > 6) return false;
  
  const coeficientes = [2, 1, 2, 1, 2, 1, 2, 1, 2];
  const digitoVerificador = parseInt(cedula.substring(9, 10), 10);
  
  let suma = 0;
  for (let i = 0; i < 9; i++) {
    let valor = parseInt(cedula.substring(i, i + 1), 10) * coeficientes[i];
    if (valor > 9) valor -= 9;
    suma += valor;
  }
  
  const resultado = suma % 10 === 0 ? 0 : 10 - (suma % 10);
  return resultado === digitoVerificador;
};

// Validación de email
export const validarEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// Validación de teléfono (10 dígitos)
export const validarTelefono = (telefono: string): boolean => {
  return /^\d{10}$/.test(telefono);
};

// Generar PDF (simplificado - en producción usar jsPDF o similar)
export const generarPDF = (data: any[], tipo: ActiveTab): void => {
  // Esta es una implementación simplificada
  // En producción, deberías usar una librería como jsPDF
  
  const contenido = JSON.stringify(data, null, 2);
  const blob = new Blob([contenido], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = `${tipo}-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  
  alert(`PDF de ${tipo} generado. En producción, instala jsPDF para PDFs reales.`);
};