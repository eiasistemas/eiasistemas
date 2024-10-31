import { FormControl, FormArray, FormGroup } from '@angular/forms';

export interface DocumentoElectronicoForm {
  documentoElectronico: FormGroup<{
    encabezado: FormGroup<{
      identificacionDocumento: FormGroup<{
        tipoDocumento: FormControl<string>;
        numeroDocumento: FormControl<string>;
        tipoProveedor: FormControl<string | null>;
        tipoTransaccion: FormControl<string | null>;
        numeroPlanillaImportacion: FormControl<string | null>;
        numeroExpedienteImportacion: FormControl<string | null>;
        serieFacturaAfectada: FormControl<string | null>;
        numeroFacturaAfectada: FormControl<string | null>;
        fechaFacturaAfectada: FormControl<string | null>;
        montoFacturaAfectada: FormControl<string | null>;
        comentarioFacturaAfectada: FormControl<string | null>;
        regimenEspTributacion: FormControl<string | null>;
        fechaEmision: FormControl<string>;
        fechaVencimiento: FormControl<string>;
        horaEmision: FormControl<string>;
        anulado: FormControl<boolean>;
        tipoDePago: FormControl<string>;
        serie: FormControl<string>;
        sucursal: FormControl<string>;
        tipoDeVenta: FormControl<string>;
        moneda: FormControl<string>;
        transaccionId: FormControl<string | null>;
      }>;
      vendedor: FormControl<string | null>;
      comprador: FormGroup<{
        tipoIdentificacion: FormControl<string>;
        numeroIdentificacion: FormControl<string>;
        razonSocial: FormControl<string>;
        direccion: FormControl<string>;
        ubigeo: FormControl<string | null>;
        pais: FormControl<string>;
        notificar: FormControl<string | null>;
        telefono: FormArray<FormControl<string>>;
        correo: FormArray<FormControl<string>>;
        otrosEnvios: FormControl<string | null>;
      }>;
      sujetoRetenido: FormControl<string | null>;
      tercero: FormControl<string | null>;
      totales: FormGroup;
      totalesRetencion: FormControl<string | null>;
      totalesOtraMoneda: FormGroup<{
        moneda: FormControl<string>;
        tipoCambio: FormControl<string>;
        montoGravadoTotal: FormControl<string>;
        montoExentoTotal: FormControl<string>;
        subtotal: FormControl<string>;
        totalAPagar: FormControl<string>;
        totalIVA: FormControl<string>;
        montoTotalConIVA: FormControl<string>;
        montoEnLetras: FormControl<string>;
        totalDescuento: FormControl<string>;
        listaDescBonificacion: FormArray<FormGroup<{
          descDescuento: FormControl<string>;
          montoDescuento: FormControl<string>;
        }>>;
        impuestosSubtotal: FormArray<FormGroup<{
          codigoTotalImp: FormControl<string>;
          alicuotaImp: FormControl<string>;
          baseImponibleImp: FormControl<string>;
          valorTotalImp: FormControl<string>;
        }>>;
      }>;
      orden: FormControl<string | null>;
    }>;
    detallesItems: FormArray<FormGroup>;
    detallesRetencion: FormControl<string | null>;
    viajes: FormControl<string | null>;
    infoAdicional: FormArray<FormGroup<{
      campo: FormControl<string>;
      valor: FormControl<string>;
    }>>;
    guiaDespacho: FormControl<string | null>;
    transporte: FormControl<string | null>;
    esLote: FormControl<string | null>;
    esMinimo: FormControl<string | null>;
  }>;
}
