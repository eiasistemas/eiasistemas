import { FormControl, FormGroup, FormArray } from "@angular/forms";

export interface DocumentoElectronico {
  Encabezado: Encabezado;
  DetallesItems: DetallesItem[];
  DetallesRetencion: any;
  Viajes: any;
  InfoAdicional: InfoAdicional[];
  GuiaDespacho: any;
}

export interface Encabezado {
  IdentificacionDocumento: IdentificacionDocumento;
  Vendedor: Vendedor;
  Comprador: Comprador;
  SujetoRetenido: any;
  Totales: Totales;
  TotalesRetencion: any;
}

export interface IdentificacionDocumento {
  TipoDocumento: FormControl<string>;
  NumeroDocumento: FormControl<string>;
  TipoProveedor: FormControl<string | null>;
  TipoTransaccion: FormControl<string | null>;
  NumeroPlanillaImportacion: FormControl<string | null>;
  NumeroExpedienteImportacion: FormControl<string | null>;
  SerieFacturaAfectada: FormControl<string | null>;
  NumeroFacturaAfectada: FormControl<string | null>;
  FechaFacturaAfectada: FormControl<string | null>;
  MontoFacturaAfectada: FormControl<string | null>;
  ComentarioFacturaAfectada: FormControl<string | null>;
  RegimenEspTributacion: FormControl<string | null>;
  FechaEmision: FormControl<string>;
  FechaVencimiento: FormControl<string>;
  HoraEmision: FormControl<string>;
  Anulado: FormControl<boolean>;
  TipoDePago: FormControl<string>;
  Serie: FormControl<string>;
  Sucursal: FormControl<string>;
  TipoDeVenta: FormControl<string>;
  Moneda: FormControl<string>;
}

export interface Vendedor {
  Codigo: FormControl<string>;
  Nombre: FormControl<string>;
  NumCajero: FormControl<string>;
}

export interface Comprador {
  TipoIdentificacion: FormControl<string>;
  NumeroIdentificacion: FormControl<string>;
  RazonSocial: FormControl<string>;
  Direccion: FormControl<string>;
  Pais: FormControl<string>;
  Telefono: FormArray<FormControl<string>>;
  Correo: FormArray<FormControl<string>>;
}

export interface Totales {
  NroItems: FormControl<string>;
  MontoGravadoTotal: FormControl<string>;
  MontoExentoTotal: FormControl<string | null>;
  Subtotal: FormControl<string>;
  TotalAPagar: FormControl<string>;
  TotalIVA: FormControl<string>;
  MontoTotalConIVA: FormControl<string>;
  MontoEnLetras: FormControl<string>;
  TotalDescuento: FormControl<string | null>;
  ListaDescBonificacion: FormControl<string | null>;
  ImpuestosSubtotal: FormArray<FormGroup>;
  FormasPago: FormArray<FormGroup>;
}

export interface ImpuestoSubtotal {
  CodigoTotalImp: FormControl<string>;
  AlicuotaImp: FormControl<string>;
  BaseImponibleImp: FormControl<string>;
  ValorTotalImp: FormControl<string>;
}

export interface FormaPago {
  Descripcion: FormControl<string>;
  Fecha: FormControl<string>;
  Forma: FormControl<string>;
  Monto: FormControl<string>;
  Moneda: FormControl<string>;
  TipoCambio: FormControl<string | null>;
}

export interface DetallesItem {
  NumeroLinea: FormControl<string>;
  CodigoCIIU: FormControl<string | null>;
  CodigoPLU: FormControl<string>;
  IndicadorBienoServicio: FormControl<string>;
  Descripcion: FormControl<string>;
  Cantidad: FormControl<string>;
  UnidadMedida: FormControl<string>;
  PrecioUnitario: FormControl<string>;
  PrecioUnitarioDescuento: FormControl<string | null>;
  MontoBonificacion: FormControl<string | null>;
  DescripcionBonificacion: FormControl<string | null>;
  DescuentoMonto: FormControl<string | null>;
  PrecioItem: FormControl<string>;
  CodigoImpuesto: FormControl<string>;
  TasaIVA: FormControl<string>;
  ValorIVA: FormControl<string>;
  ValorTotalItem: FormControl<string>;
  InfoAdicionalItem: FormControl<string | null>;
  ListaItemOTI: FormControl<string | null>;
}

export interface InfoAdicional {
  Campo: FormControl<string>;
  Valor: FormControl<string>;
}