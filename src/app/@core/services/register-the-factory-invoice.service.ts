import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray } from '@angular/forms';
import { DocumentoElectronicoForm } from '../models/forms/invoice-thefactory-form.model';

@Injectable({
  providedIn: 'root'
})
export class RegisterFactoryInvoiceService {

  constructor(private fb: FormBuilder) { }

  createDocumentoElectronicoForm(values: any): FormGroup<DocumentoElectronicoForm> {
    return this.fb.group({
      documentoElectronico: this.fb.group({
        encabezado: this.fb.group({
          identificacionDocumento: this.fb.group({
            tipoDocumento: new FormControl<string>(values.documentoElectronico.encabezado.identificacionDocumento.tipoDocumento),
            numeroDocumento: new FormControl<string>(values.documentoElectronico.encabezado.identificacionDocumento.numeroDocumento),
            tipoProveedor: new FormControl<string | null>(values.documentoElectronico.encabezado.identificacionDocumento.tipoProveedor),
            tipoTransaccion: new FormControl<string | null>(values.documentoElectronico.encabezado.identificacionDocumento.tipoTransaccion),
            numeroPlanillaImportacion: new FormControl<string | null>(values.documentoElectronico.encabezado.identificacionDocumento.numeroPlanillaImportacion),
            numeroExpedienteImportacion: new FormControl<string | null>(values.documentoElectronico.encabezado.identificacionDocumento.numeroExpedienteImportacion),
            serieFacturaAfectada: new FormControl<string | null>(values.documentoElectronico.encabezado.identificacionDocumento.serieFacturaAfectada),
            numeroFacturaAfectada: new FormControl<string | null>(values.documentoElectronico.encabezado.identificacionDocumento.numeroFacturaAfectada),
            fechaFacturaAfectada: new FormControl<string | null>(values.documentoElectronico.encabezado.identificacionDocumento.fechaFacturaAfectada),
            montoFacturaAfectada: new FormControl<string | null>(values.documentoElectronico.encabezado.identificacionDocumento.montoFacturaAfectada),
            comentarioFacturaAfectada: new FormControl<string | null>(values.documentoElectronico.encabezado.identificacionDocumento.comentarioFacturaAfectada),
            regimenEspTributacion: new FormControl<string | null>(values.documentoElectronico.encabezado.identificacionDocumento.regimenEspTributacion),
            fechaEmision: new FormControl<string>(values.documentoElectronico.encabezado.identificacionDocumento.fechaEmision),
            fechaVencimiento: new FormControl<string>(values.documentoElectronico.encabezado.identificacionDocumento.fechaVencimiento),
            horaEmision: new FormControl<string>(values.documentoElectronico.encabezado.identificacionDocumento.horaEmision),
            anulado: new FormControl<boolean>(values.documentoElectronico.encabezado.identificacionDocumento.anulado),
            tipoDePago: new FormControl<string>(values.documentoElectronico.encabezado.identificacionDocumento.tipoDePago),
            serie: new FormControl<string>(values.documentoElectronico.encabezado.identificacionDocumento.serie),
            sucursal: new FormControl<string>(values.documentoElectronico.encabezado.identificacionDocumento.sucursal),
            tipoDeVenta: new FormControl<string>(values.documentoElectronico.encabezado.identificacionDocumento.tipoDeVenta),
            moneda: new FormControl<string>(values.documentoElectronico.encabezado.identificacionDocumento.moneda),
            transaccionId: new FormControl<string | null>(values.documentoElectronico.encabezado.identificacionDocumento.transaccionId),
          }),
          vendedor: new FormControl<string | null>(values.documentoElectronico.encabezado.vendedor),
          comprador: this.fb.group({
            tipoIdentificacion: new FormControl<string>(values.documentoElectronico.encabezado.comprador.tipoIdentificacion),
            numeroIdentificacion: new FormControl<string>(values.documentoElectronico.encabezado.comprador.numeroIdentificacion),
            razonSocial: new FormControl<string>(values.documentoElectronico.encabezado.comprador.razonSocial),
            direccion: new FormControl<string>(values.documentoElectronico.encabezado.comprador.direccion),
            ubigeo: new FormControl<string | null>(values.documentoElectronico.encabezado.comprador.ubigeo),
            pais: new FormControl<string>(values.documentoElectronico.encabezado.comprador.pais),
            notificar: new FormControl<string | null>(values.documentoElectronico.encabezado.comprador.notificar),
            telefono: this.fb.array<FormControl<string>>(values.documentoElectronico.encabezado.comprador.telefono.map((tel: string) => new FormControl<string>(tel))),
            correo: this.fb.array<FormControl<string>>(values.documentoElectronico.encabezado.comprador.correo.map((email: string) => new FormControl<string>(email))),
            otrosEnvios: new FormControl<string | null>(values.documentoElectronico.encabezado.comprador.otrosEnvios),
          }),
          sujetoRetenido: new FormControl<string | null>(values.documentoElectronico.encabezado.sujetoRetenido),
          tercero: new FormControl<string | null>(values.documentoElectronico.encabezado.tercero),
          totales: this.createTotalesForm(values.documentoElectronico.encabezado.totales),
          totalesRetencion: new FormControl<string | null>(values.documentoElectronico.encabezado.totalesRetencion),
          totalesOtraMoneda: this.fb.group({
            moneda: new FormControl<string>(values.documentoElectronico.encabezado.totalesOtraMoneda.moneda),
            tipoCambio: new FormControl<string>(values.documentoElectronico.encabezado.totalesOtraMoneda.tipoCambio),
            montoGravadoTotal: new FormControl<string>(values.documentoElectronico.encabezado.totalesOtraMoneda.montoGravadoTotal),
            montoExentoTotal: new FormControl<string>(values.documentoElectronico.encabezado.totalesOtraMoneda.montoExentoTotal),
            subtotal: new FormControl<string>(values.documentoElectronico.encabezado.totalesOtraMoneda.subtotal),
            totalAPagar: new FormControl<string>(values.documentoElectronico.encabezado.totalesOtraMoneda.totalAPagar),
            totalIVA: new FormControl<string>(values.documentoElectronico.encabezado.totalesOtraMoneda.totalIVA),
            montoTotalConIVA: new FormControl<string>(values.documentoElectronico.encabezado.totalesOtraMoneda.montoTotalConIVA),
            montoEnLetras: new FormControl<string>(values.documentoElectronico.encabezado.totalesOtraMoneda.montoEnLetras),
            totalDescuento: new FormControl<string>(values.documentoElectronico.encabezado.totalesOtraMoneda.totalDescuento),
            listaDescBonificacion: this.fb.array<FormGroup>(values.documentoElectronico.encabezado.totalesOtraMoneda.listaDescBonificacion.map((desc: any) => this.fb.group({
              descDescuento: new FormControl<string>(desc.descDescuento),
              montoDescuento: new FormControl<string>(desc.montoDescuento),
            }))),

            impuestosSubtotal: this.fb.array<FormGroup>(values.documentoElectronico.encabezado.totalesOtraMoneda.impuestosSubtotal.map((imp: any) => this.fb.group({
              codigoTotalImp: new FormControl<string>(imp.codigoTotalImp),
              alicuotaImp: new FormControl<string>(imp.alicuotaImp),
              baseImponibleImp: new FormControl<string>(imp.baseImponibleImp),
              valorTotalImp: new FormControl<string>(imp.valorTotalImp),
            }))),
          }),
          orden: new FormControl<string | null>(values.documentoElectronico.encabezado.orden),
        }),
        detallesItems: this.createDetallesItemsForm(values.documentoElectronico.detallesItems),
        detallesRetencion: new FormControl<string | null>(values.documentoElectronico.detallesRetencion),
        viajes: new FormControl<string | null>(values.documentoElectronico.viajes),
        infoAdicional: this.fb.array<FormGroup>(values.documentoElectronico.infoAdicional.map((info: any) => this.fb.group({
          campo: new FormControl<string>(info.campo),
          valor: new FormControl<string>(info.valor),
        }))),
        guiaDespacho: new FormControl<string | null>(values.documentoElectronico.guiaDespacho),
        transporte: new FormControl<string | null>(values.documentoElectronico.transporte),
        esLote: new FormControl<string | null>(values.documentoElectronico.esLote),
        esMinimo: new FormControl<string | null>(values.documentoElectronico.esMinimo),
      }),
    });
  }

  createTotalesForm(values: any): FormGroup {
    return this.fb.group({
      nroItems: new FormControl<string>(values.nroItems),
      montoGravadoTotal: new FormControl<string>(values.montoGravadoTotal),
      montoExentoTotal: new FormControl<string>(values.montoExentoTotal),
      subtotal: new FormControl<string>(values.subtotal),
      totalAPagar: new FormControl<string>(values.totalAPagar),
      totalIVA: new FormControl<string>(values.totalIVA),
      montoTotalConIVA: new FormControl<string>(values.montoTotalConIVA),
      montoEnLetras: new FormControl<string>(values.montoEnLetras),
      totalDescuento: new FormControl<string>(values.totalDescuento),
      listaDescBonificacion: this.fb.array(values.listaDescBonificacion.map((desc: any) => this.fb.group({
        descDescuento: new FormControl<string>(desc.descDescuento),
        montoDescuento: new FormControl<string>(desc.montoDescuento),
      }))),
      impuestosSubtotal: this.fb.array(values.impuestosSubtotal.map((imp: any) => this.fb.group({
        codigoTotalImp: new FormControl<string>(imp.codigoTotalImp),
        alicuotaImp: new FormControl<string>(imp.alicuotaImp),
        baseImponibleImp: new FormControl<string>(imp.baseImponibleImp),
        valorTotalImp: new FormControl<string>(imp.valorTotalImp),
      }))),
    });
  }

  createDetallesItemsForm(values: any[]): FormArray {
    return this.fb.array(values.map((item: any) => this.fb.group({
      cantidad: new FormControl<string>(item.cantidad),
      descripcion: new FormControl<string>(item.descripcion),
      precioUnitario: new FormControl<string>(item.precioUnitario),
      valorTotal: new FormControl<string>(item.valorTotal),
      descuento: new FormControl<string>(item.descuento),
      unidadMedida: new FormControl<string>(item.unidadMedida),
    })));
  }
}
