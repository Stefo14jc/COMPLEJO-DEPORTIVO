/**
 * Manual Helper - SportManager PRO
 * Presiona Ctrl+F1 para abrir el manual de usuario
 */

(function () {
  "use strict";

  // Contenido del manual
  const manualContent = {
    title: "Manual de Usuario - SportManager PRO",
    version: "1.0",
    sections: [
      {
        title: "1. Introducción",
        content: `Bienvenido a <strong>SportManager PRO</strong>, el sistema validado para la gestión 
                integral de complejos deportivos. Este software permite administrar de manera eficiente 
                canchas, usuarios, reservas e inventario de artículos, todo bajo una interfaz moderna de 
                alto contraste (Modo Oscuro/Neón) diseñada para facilitar la lectura y operación rápida.`,
      },
      {
        title: "2. Acceso y Navegación General",
        subsections: [
          {
            title: "2.1. Interfaz Principal",
            content: `Al ingresar al sistema, encontrará una interfaz limpia dividida en tres áreas principales:
                        <ul>
                            <li><strong>Barra Superior (Header):</strong> Contiene el logo del sistema y el menú de navegación principal.</li>
                            <li><strong>Panel de Control (Dashboard):</strong> Muestra el título de la sección actual, la barra de búsqueda y los botones de acción rápida.</li>
                            <li><strong>Área de Tarjetas (Grid):</strong> Visualización de los registros en formato de tarjetas con efecto "cristal".</li>
                        </ul>`,
          },
          {
            title: "2.2. Menú de Navegación",
            content: `Puede cambiar entre los diferentes módulos haciendo clic en las pestañas de la parte superior derecha:
                        <ul>
                            <li><strong>CANCHAS:</strong> Gestión de instalaciones deportivas.</li>
                            <li><strong>USUARIOS:</strong> Administración de clientes y personal.</li>
                            <li><strong>RESERVAS:</strong> Control de agenda y pagos.</li>
                            <li><strong>INVENTARIO:</strong> Gestión de productos para venta o alquiler.</li>
                        </ul>`,
          },
        ],
      },
      {
        title: "3. Guía de Módulos",
        subsections: [
          {
            title: "3.1. Módulo de Canchas",
            content: `Permite registrar y monitorear el estado de las instalaciones deportivas.
                        <ul>
                            <li><strong>Datos Visibles:</strong> Nombre, Deporte, Precio por hora, Capacidad y Estado.</li>
                            <li><strong>Indicadores de Estado:</strong>
                                <ul>
                                    <li><span style="color: #00ff00;">● Disponible</span> (Verde)</li>
                                    <li><span style="color: #ff0040;">● Ocupada / Mantenimiento</span> (Rojo)</li>
                                </ul>
                            </li>
                            <li><strong>Campos de Registro:</strong> Características: Superficie (Césped, Sintética, etc.), Techada (Sí/No), Iluminación.</li>
                        </ul>`,
          },
          {
            title: "3.2. Módulo de Usuarios",
            content: `Gestión de la base de datos de personas con validaciones estrictas de seguridad.
                        <ul>
                            <li><strong>Validaciones Automáticas:</strong>
                                <ul>
                                    <li><strong>Cédula:</strong> El sistema valida automáticamente que la cédula sea ecuatoriana real (algoritmo módulo 10).</li>
                                    <li><strong>Teléfono:</strong> Debe comenzar con "09" y tener 10 dígitos.</li>
                                    <li><strong>Email:</strong> Formato de correo válido.</li>
                                </ul>
                            </li>
                            <li><strong>Roles:</strong>
                                <ul>
                                    <li><em>Administrador:</em> Acceso total.</li>
                                    <li><em>Cliente:</em> Usuario regular.</li>
                                </ul>
                            </li>
                        </ul>`,
          },
          {
            title: "3.3. Módulo de Reservas",
            content: `Control financiero y de horarios del complejo.
                        <ul>
                            <li><strong>Funciones Clave:</strong>
                                <ul>
                                    <li>Selección de horarios de inicio y fin.</li>
                                    <li>Cálculo de montos totales.</li>
                                </ul>
                            </li>
                            <li><strong>Estado de Pago:</strong>
                                <ul>
                                    <li><span style="color: #ffff00;">● Pendiente</span> (Amarillo): Reserva hecha, pago no recibido.</li>
                                    <li><span style="color: #00ff00;">● Pagado</span> (Verde): Transacción completada.</li>
                                    <li><span style="color: #ff0040;">● Cancelado</span> (Rojo): Reserva anulada.</li>
                                </ul>
                            </li>
                        </ul>`,
          },
          {
            title: "3.4. Módulo de Inventario",
            content: `Control de stock para tienda o alquiler de equipos.
                        <ul>
                            <li><strong>Tipos de Artículo:</strong>
                                <ul>
                                    <li><em>Alquiler:</em> Raquetas, balones, chalecos.</li>
                                    <li><em>Venta:</em> Bebidas, snacks, accesorios.</li>
                                </ul>
                            </li>
                            <li><strong>Control de Stock:</strong> Visualización rápida de Stock Disponible / Stock Total.</li>
                            <li><strong>Estado del Artículo:</strong> Excelente, Bueno, Regular, Necesita Mantenimiento.</li>
                        </ul>`,
          },
        ],
      },
      {
        title: "4. Funcionalidades Comunes",
        content: `En todos los módulos encontrará las siguientes herramientas estandarizadas:
                <ul>
                    <li><strong>Buscar:</strong> Ubicada en la parte superior central. Permite filtrar en tiempo real por cualquier criterio. Simplemente escriba y las tarjetas se filtrarán automáticamente.</li>
                    <li><strong>Nuevo Registro:</strong> Botón <span style="color: #00ff00;">"NUEVO"</span> (Color Neón Verde). Abre una ventana emergente (modal) para ingresar datos. Los campos obligatorios están marcados y el botón "GUARDAR" no funcionará si hay errores de validación.</li>
                    <li><strong>Editar:</strong> Botón con icono de Lápiz dentro de cada tarjeta. Carga la información actual para ser modificada.</li>
                    <li><strong>Eliminar:</strong> Botón con icono de Basurero. <em>Advertencia:</em> Al hacer clic, el sistema pedirá una confirmación de seguridad. Esta acción es irreversible y borra el registro de la base de datos permanentemente.</li>
                    <li><strong>Generar Reporte PDF:</strong> Botón azul "PDF". Genera y descarga automáticamente un documento PDF con una tabla detallada de todos los registros visibles (respeta los filtros de búsqueda).</li>
                </ul>`,
      },
      {
        title: "5. Solución de Problemas Frecuentes",
        content: `<table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
                    <thead>
                        <tr style="background-color: rgba(0, 255, 255, 0.1);">
                            <th style="padding: 12px; border: 1px solid rgba(0, 255, 255, 0.3); text-align: left;">Problema</th>
                            <th style="padding: 12px; border: 1px solid rgba(0, 255, 255, 0.3); text-align: left;">Causa Probable</th>
                            <th style="padding: 12px; border: 1px solid rgba(0, 255, 255, 0.3); text-align: left;">Solución</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding: 10px; border: 1px solid rgba(0, 255, 255, 0.2);">"No hay registros"</td>
                            <td style="padding: 10px; border: 1px solid rgba(0, 255, 255, 0.2);">Base de datos vacía o búsqueda activa</td>
                            <td style="padding: 10px; border: 1px solid rgba(0, 255, 255, 0.2);">Borre el texto de la barra de búsqueda o cree un nuevo registro</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; border: 1px solid rgba(0, 255, 255, 0.2);">Error en Cédula</td>
                            <td style="padding: 10px; border: 1px solid rgba(0, 255, 255, 0.2);">El número ingresado no es válido</td>
                            <td style="padding: 10px; border: 1px solid rgba(0, 255, 255, 0.2);">Verifique que la cédula sea ecuatoriana real y tenga 10 dígitos</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; border: 1px solid rgba(0, 255, 255, 0.2);">El sistema no carga</td>
                            <td style="padding: 10px; border: 1px solid rgba(0, 255, 255, 0.2);">El servidor backend está apagado</td>
                            <td style="padding: 10px; border: 1px solid rgba(0, 255, 255, 0.2);">Contacte a soporte técnico para iniciar el servidor (node server.js)</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; border: 1px solid rgba(0, 255, 255, 0.2);">No guarda los cambios</td>
                            <td style="padding: 10px; border: 1px solid rgba(0, 255, 255, 0.2);">Campos obligatorios vacíos</td>
                            <td style="padding: 10px; border: 1px solid rgba(0, 255, 255, 0.2);">Revise si hay mensajes de error en rojo debajo de los campos del formulario</td>
                        </tr>
                    </tbody>
                </table>`,
      },
    ],
  };

  // Estilos para el modal
  const styles = `
        #manual-modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.85);
            backdrop-filter: blur(10px);
            z-index: 10000;
            display: flex;
            justify-content: center;
            align-items: center;
            animation: fadeIn 0.3s ease-out;
        }

        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }

        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }

        @keyframes slideUp {
            from {
                transform: translateY(50px);
                opacity: 0;
            }
            to {
                transform: translateY(0);
                opacity: 1;
            }
        }

        #manual-modal-container {
            background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%);
            border: 2px solid rgba(0, 255, 255, 0.3);
            border-radius: 20px;
            width: 90%;
            max-width: 900px;
            max-height: 85vh;
            overflow: hidden;
            box-shadow: 0 20px 60px rgba(0, 255, 255, 0.3), 
                        0 0 100px rgba(0, 255, 255, 0.1),
                        inset 0 0 50px rgba(0, 255, 255, 0.05);
            animation: slideUp 0.4s ease-out;
            display: flex;
            flex-direction: column;
        }

        #manual-modal-header {
            background: linear-gradient(135deg, rgba(0, 255, 255, 0.2) 0%, rgba(0, 200, 255, 0.1) 100%);
            border-bottom: 2px solid rgba(0, 255, 255, 0.3);
            padding: 25px 30px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        #manual-modal-header h1 {
            margin: 0;
            color: #00ffff;
            font-size: 28px;
            font-weight: 700;
            text-shadow: 0 0 20px rgba(0, 255, 255, 0.6);
            letter-spacing: 1px;
        }

        #manual-modal-header .version {
            color: #00ff00;
            font-size: 14px;
            margin-top: 5px;
            opacity: 0.8;
        }

        #manual-modal-close {
            background: rgba(255, 0, 64, 0.2);
            border: 2px solid #ff0040;
            color: #ff0040;
            font-size: 24px;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
            font-weight: bold;
        }

        #manual-modal-close:hover {
            background: rgba(255, 0, 64, 0.4);
            box-shadow: 0 0 20px rgba(255, 0, 64, 0.6);
            transform: rotate(90deg);
        }

        #manual-modal-content {
            padding: 30px;
            overflow-y: auto;
            flex: 1;
            color: #e0e0e0;
            line-height: 1.8;
        }

        #manual-modal-content::-webkit-scrollbar {
            width: 12px;
        }

        #manual-modal-content::-webkit-scrollbar-track {
            background: rgba(0, 0, 0, 0.3);
            border-radius: 10px;
        }

        #manual-modal-content::-webkit-scrollbar-thumb {
            background: linear-gradient(180deg, #00ffff 0%, #0080ff 100%);
            border-radius: 10px;
            border: 2px solid rgba(0, 0, 0, 0.3);
        }

        #manual-modal-content::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(180deg, #00ff00 0%, #00ffff 100%);
        }

        .manual-section {
            margin-bottom: 35px;
            padding: 20px;
            background: rgba(0, 255, 255, 0.03);
            border-left: 4px solid #00ffff;
            border-radius: 10px;
            transition: all 0.3s ease;
        }

        .manual-section:hover {
            background: rgba(0, 255, 255, 0.08);
            box-shadow: 0 5px 20px rgba(0, 255, 255, 0.1);
        }

        .manual-section h2 {
            color: #00ffff;
            font-size: 24px;
            margin: 0 0 15px 0;
            text-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
        }

        .manual-subsection {
            margin: 20px 0 20px 20px;
            padding-left: 20px;
            border-left: 2px solid rgba(0, 255, 0, 0.3);
        }

        .manual-subsection h3 {
            color: #00ff00;
            font-size: 18px;
            margin: 0 0 10px 0;
            text-shadow: 0 0 8px rgba(0, 255, 0, 0.4);
        }

        .manual-section p, .manual-subsection p {
            margin: 10px 0;
            color: #d0d0d0;
        }

        .manual-section ul {
            margin: 10px 0;
            padding-left: 30px;
        }

        .manual-section li {
            margin: 8px 0;
            color: #d0d0d0;
        }

        .manual-section strong {
            color: #00ffff;
            font-weight: 600;
        }

        .manual-section em {
            color: #ffff00;
        }

        #manual-modal-footer {
            background: rgba(0, 255, 255, 0.05);
            border-top: 2px solid rgba(0, 255, 255, 0.3);
            padding: 15px 30px;
            text-align: center;
            color: #888;
            font-size: 13px;
        }

        .help-hint {
            display: inline-block;
            background: rgba(0, 255, 0, 0.1);
            border: 1px solid #00ff00;
            color: #00ff00;
            padding: 8px 15px;
            border-radius: 20px;
            font-size: 12px;
            margin-top: 10px;
        }

        @media (max-width: 768px) {
            #manual-modal-container {
                width: 95%;
                max-height: 90vh;
            }

            #manual-modal-header h1 {
                font-size: 20px;
            }

            #manual-modal-content {
                padding: 20px;
            }

            .manual-section h2 {
                font-size: 20px;
            }

            .manual-subsection h3 {
                font-size: 16px;
            }
        }
    `;

  // Crear el modal
  function createModal() {
    if (document.getElementById("manual-modal-overlay")) {
      return;
    }

    const overlay = document.createElement("div");
    overlay.id = "manual-modal-overlay";

    const container = document.createElement("div");
    container.id = "manual-modal-container";

    const header = document.createElement("div");
    header.id = "manual-modal-header";
    header.innerHTML = `
            <div>
                <h1>${manualContent.title}</h1>
                <div class="version">Versión ${manualContent.version} | Presione Ctrl+F1 para ayuda</div>
            </div>
            <button id="manual-modal-close" aria-label="Cerrar manual">×</button>
        `;

    const content = document.createElement("div");
    content.id = "manual-modal-content";

    let contentHTML = "";
    manualContent.sections.forEach((section) => {
      contentHTML += `<div class="manual-section">`;
      contentHTML += `<h2>${section.title}</h2>`;

      if (section.content) {
        contentHTML += `<div>${section.content}</div>`;
      }

      if (section.subsections) {
        section.subsections.forEach((subsection) => {
          contentHTML += `<div class="manual-subsection">`;
          contentHTML += `<h3>${subsection.title}</h3>`;
          contentHTML += `<div>${subsection.content}</div>`;
          contentHTML += `</div>`;
        });
      }

      contentHTML += `</div>`;
    });

    content.innerHTML = contentHTML;

    const footer = document.createElement("div");
    footer.id = "manual-modal-footer";
    footer.innerHTML = `
            <p>© 2025 SportManager PRO - Pontificia Universidad Católica del Ecuador</p>
            <span class="help-hint"> Presione ESC o haga clic fuera del manual para cerrar</span>
        `;

    container.appendChild(header);
    container.appendChild(content);
    container.appendChild(footer);
    overlay.appendChild(container);

    document.body.appendChild(overlay);

    document
      .getElementById("manual-modal-close")
      .addEventListener("click", closeModal);
    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) {
        closeModal();
      }
    });

    document.body.style.overflow = "hidden";
  }

  // Cerrar el modal
  function closeModal() {
    const overlay = document.getElementById("manual-modal-overlay");
    if (overlay) {
      overlay.style.animation = "fadeOut 0.3s ease-out";
      setTimeout(() => {
        overlay.remove();
        document.body.style.overflow = "";
      }, 300);
    }
  }

  // Inyectar estilos
  const styleSheet = document.createElement("style");
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);

  // Event listener para Ctrl+F1 y ESC
  document.addEventListener("keydown", function (e) {
    if (e.key === "1" && e.ctrlKey) {
      e.preventDefault();
      createModal();
    }
    if (e.key === "Escape") {
      closeModal();
    }
  });

  console.log(
    "%c SportManager PRO",
    "color: #00ffff; font-size: 16px; font-weight: bold;"
  );
  console.log(
    "%cPresiona Ctrl+F1 para abrir el manual de ayuda",
    "color: #00ff00; font-size: 12px;"
  );
})();
