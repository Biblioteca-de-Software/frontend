export class ReportEntity {

  id: string;                // Identificador único del reporte
  title: string;             // Título del reporte
  details: string;           // Detalles adicionales o análisis
  type: string;              // Tipo de reporte: 'Ingreso', 'Salida', 'Inventario', 'Alerta', etc.
  date: string;              // Fecha de creación del reporte
  status: string;            // Estado del reporte: 'Pendiente', 'Revisado', 'Aprobado'

  constructor() {
    this.id = '';
    this.title = '';
    this.details = '';
    this.type = '';
    this.date = '';
    this.status = '';
  }
}
