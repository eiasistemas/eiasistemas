import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { catchError, map, Observable, switchMap, tap, throwError } from 'rxjs';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DocumentoElectronicoForm } from '../models/forms/invoice-thefactory-form.model';

@Injectable({
  providedIn: 'root'
})
export class TheFactoryService {
  api: string = environment.apiTheFactory;

  constructor(private http: HttpClient, private fb: FormBuilder) { }

  api2 = '/api/Autenticacion/';

authenticate(): Observable<string> {
  const body = {
    usuario: 'seqrhfvjvrhn_tfhka',
    clave: ',MkOoSs.VcVk'
  };

  return this.http.post<any>(`${this.api2}`, body)
    .pipe(
      map(response => {
        localStorage.setItem('tokenTheFactory', response.token);
        return "token: " + response.token; // Retorna el token de la respuesta
      }),
      catchError(error => {
        console.error('Error authenticating', error);
        return throwError(() => new Error('Error authenticating'));
      })
    );
}

createRegisterFormInvoice(values: any): FormGroup<DocumentoElectronicoForm> {
  return this.fb.group({
    documentoElectronico: this.fb.group({
      encabezado: this.fb.group({
        identificacionDocumento: this.fb.group({
          tipoDocumento: new FormControl(values.tipoDocumento),
          numeroDocumento: new FormControl(values.numeroDocumento),
          tipoProveedor: new FormControl(values.tipoProveedor),
          tipoTransaccion: new FormControl(values.tipoTransaccion),
          numeroPlanillaImportacion: new FormControl(values.numeroPlanillaImportacion),
          numeroExpedienteImportacion: new FormControl(values.numeroExpedienteImportacion),
          serieFacturaAfectada: new FormControl(values.serieFacturaAfectada),
          numeroFacturaAfectada: new FormControl(values.numeroFacturaAfectada),
          fechaFacturaAfectada: new FormControl(values.fechaFacturaAfectada),
          montoFacturaAfectada: new FormControl(values.montoFacturaAfectada),
          comentarioFacturaAfectada: new FormControl(values.comentarioFacturaAfectada),
          regimenEspTributacion: new FormControl(values.regimenEspTributacion),
          fechaEmision: new FormControl(values.fechaEmision),
          fechaVencimiento: new FormControl(values.fechaVencimiento),
          horaEmision: new FormControl(values.horaEmision),
          anulado: new FormControl(values.anulado),
          tipoDePago: new FormControl(values.tipoDePago),
          serie: new FormControl(values.serie),
          sucursal: new FormControl(values.sucursal),
          tipoDeVenta: new FormControl(values.tipoDeVenta),
          moneda: new FormControl(values.moneda)
        }),
        vendedor: this.fb.group({
          codigo: new FormControl(values.vendedor.codigo),
          nombre: new FormControl(values.vendedor.nombre),
          numCajero: new FormControl(values.vendedor.numCajero)
        }),
        comprador: this.fb.group({
          tipoIdentificacion: new FormControl(values.comprador.tipoIdentificacion),
          numeroIdentificacion: new FormControl(values.comprador.numeroIdentificacion),
          razonSocial: new FormControl(values.comprador.razonSocial),
          direccion: new FormControl(values.comprador.direccion),
          pais: new FormControl(values.comprador.pais),
          telefono: this.fb.array(values.comprador.telefono),
          correo: this.fb.array(values.comprador.correo)
        }),
        sujetoRetenido: new FormControl(values.sujetoRetenido),
        totales: this.fb.group({
          nroItems: new FormControl(values.totales.nroItems),
          montoGravadoTotal: new FormControl(values.totales.montoGravadoTotal),
          montoExentoTotal: new FormControl(values.totales.montoExentoTotal),
          subtotal: new FormControl(values.totales.subtotal),
          totalAPagar: new FormControl(values.totales.totalAPagar),
          totalIVA: new FormControl(values.totales.totalIVA),
          montoTotalConIVA: new FormControl(values.totales.montoTotalConIVA),
          montoEnLetras: new FormControl(values.totales.montoEnLetras),
          totalDescuento: new FormControl(values.totales.totalDescuento),
          listaDescBonificacion: this.fb.array(values.totales.listaDescBonificacion.map(d => this.fb.group({
            descDescuento: new FormControl(d.descDescuento),
            montoDescuento: new FormControl(d.montoDescuento)
          }))),
          impuestosSubtotal: this.fb.array(values.totales.impuestosSubtotal.map(i => this.fb.group({
            codigoTotalImp: new FormControl(i.codigoTotalImp),
            alicuotaImp: new FormControl(i.alicuotaImp),
            baseImponibleImp: new FormControl(i.baseImponibleImp),
            valorTotalImp: new FormControl(i.valorTotalImp)
          }))),
          formasPago: this.fb.array(values.totales.formasPago.map(f => this.fb.group({
            descripcion: new FormControl(f.descripcion),
            fecha: new FormControl(f.fecha),
            forma: new FormControl(f.forma),
            monto: new FormControl(f.monto),
            moneda: new FormControl(f.moneda),
            tipoCambio: new FormControl(f.tipoCambio)
          })))
        }),
        totalesRetencion: new FormControl(values.totalesRetencion)
      }),
      detallesItems: this.fb.array(values.detallesItems.map(d => this.fb.group({
        numeroLinea: new FormControl(d.numeroLinea),
        codigoCIIU: new FormControl(d.codigoCIIU),
        codigoPLU: new FormControl(d.codigoPLU),
        indicadorBienoServicio: new FormControl(d.indicadorBienoServicio),
        descripcion: new FormControl(d.descripcion),
        cantidad: new FormControl(d.cantidad),
        unidadMedida: new FormControl(d.unidadMedida),
        precioUnitario: new FormControl(d.precioUnitario),
        precioUnitarioDescuento: new FormControl(d.precioUnitarioDescuento),
        montoBonificacion: new FormControl(d.montoBonificacion),
        descripcionBonificacion: new FormControl(d.descripcionBonificacion),
        descuentoMonto: new FormControl(d.descuentoMonto),
        precioItem: new FormControl(d.precioItem),
        codigoImpuesto: new FormControl(d.codigoImpuesto),
        tasaIVA: new FormControl(d.tasaIVA),
        valorIVA: new FormControl(d.valorIVA),
        valorTotalItem: new FormControl(d.valorTotalItem),
        infoAdicionalItem: new FormControl(d.infoAdicionalItem),
        listaItemOTI: this.fb.array(d.listaItemOTI.map(l => this.fb.group({
          tasaOTI: new FormControl(l.tasaOTI),
          codigoOTI: new FormControl(l.codigoOTI),
          valorOTI: new FormControl(l.valorOTI)
        })))
      }))),
      detallesRetencion: new FormControl(values.detallesRetencion),
      viajes: new FormControl(values.viajes),
      infoAdicional: this.fb.array(values.infoAdicional.map(i => this.fb.group({
        campo: new FormControl(i.campo),
        valor: new FormControl(i.valor)
      }))),
      guiaDespacho: new FormControl(values.guiaDespacho)
    })
  }) as unknown as FormGroup<DocumentoElectronicoForm>;
}

api3 = '/api/Emision/';

submitInvoice(form: FormGroup<DocumentoElectronicoForm>): Observable<any> {
  const headers = new HttpHeaders({
    'authorization': `Bearer ${localStorage.getItem('tokenTheFactory')}`,
    'content-type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
  });

  const url = `${this.api3}`;

  const body = form.value;

  console.log('body', body);

  return this.http.post(url, body, { headers }).pipe(
    tap(response => {
      console.log('Response from The Factory:', response);
        localStorage.setItem('ResponseTheFactory', JSON.stringify(response));
    })
  );
}
  
}
