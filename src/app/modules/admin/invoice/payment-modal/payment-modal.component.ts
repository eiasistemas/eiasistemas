import { ChangeDetectorRef, Component, OnInit, signal } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { RegisterInvoiceService } from '../../../../@core/services/register-invoice.service';
import { HttpHeaders } from '@angular/common/http';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { RegisterInvoiceForm } from '../../../../@core/models/forms/register-invoice-form.model';
import { SharedServiceService } from '../../../../@core/services/shared-service.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { InvoceFormService } from '../../../../@core/services/invoce-form.service';
import { DocumentoElectronicoForm } from '../../../../@core/models/forms/invoice-thefactory-form.model';
import { TheFactoryService } from '../../../../@core/services/the-factory.service';
import { RegisterFactoryInvoiceService } from '../../../../@core/services/register-the-factory-invoice.service';

@Component({
  selector: 'app-payment-modal',
  templateUrl: './payment-modal.component.html',
  styleUrls: ['./payment-modal.component.scss'],
})
export class PaymentModalComponent implements OnInit {
  isLoading = signal(false); // Definir la señal de carga

  formattedTotalBs: number = 0; // Cambiado a number
  selectedOption: string = ''; // Valor inicial vacío
  referenceNumber: string = '';
  phoneNumber: string = '';
  idNumber: string = '';
  email: string = '';
  batchNumber: string = '';
  descrip: string = this.selectedOption;
  prFactValueInt: number;

  paymentsList: { monto: number, igtf: number, tipoPago: string, montoDolares?: number }[] = [];

  totalBs: number;
  totalUsd: number;
  cxcItems: any[] = [];
  itemFactItems: any[] = [];
  invioceNumber: number = 0;

  paymentForm: FormGroup;

  registerForm: FormGroup<RegisterInvoiceForm>;
  documentoElectronicoForm: FormGroup<DocumentoElectronicoForm>;
  http: any;

  constructor(
    private dialogConfig: DynamicDialogConfig,
    private registerInvoiceService: RegisterInvoiceService,
    private sharedService: SharedServiceService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private router: Router,
    private dialogRef: DynamicDialogRef,
    private cd: ChangeDetectorRef,
    private invoiceFormService: InvoceFormService,
    private theFactoryService: TheFactoryService,
    private registerTheFactoryInvoiceService: RegisterFactoryInvoiceService
  ) {
    this.totalBs = this.dialogConfig.data.totalBs.toFixed(2);
    this.totalUsd = this.dialogConfig.data.totalUsd.toFixed(2);

  }

  ngOnInit(): void {

    this.formattedTotalBs = null;
    //this.formattedTotalBs = this.totalBs; // Inicializa formattedTotalBs con totalBs
    this.updateDropdownOptions(this.selectedOption); // Inicializa las opciones de dropdown
  
    this.loadCorrelatives();

    this.sharedService.prFactValueInt$.subscribe(value => {
      this.prFactValueInt = value;
      console.log('Received prFactValueInt:', this.prFactValueInt);
    });

    
    // Inicializa el formulario vacío
    this.registerForm = this.registerInvoiceService.createRegisterFormInvoice({
      codClie: '',
      codVend: '',
      codUbic: '',
      descrip: '',
      direc1: '',
      direc2: '',
      mtoTotal: 0,
      tgravable: 0,
      texento: 0,
      monto: 0,
      mtoTax: 0,
      contado: 0,
      tipoCli: 0,
      fechaE: '',
      fechaV: '',
      Id3: '',
      ordenC: '',
      telef: '',
      tipoFac: '',
      items: [
        {
          codItem: '',
          codUbic: '',
          codVend: '',
          descrip1: '',
          priceO: 0,
          precio: 0,
          cantidad: 0,
          mtoTax: 0,
        },
      ],
      payments: [
        {
          monto: 0,
          codTarj: '',
          fechae: '',
          descrip: '',
        },
      ],
      taxes: [
        {
          monto: 0,
          codTaxs: '',
          tgravable: 0,
        },
      ],
    });

// Inicializa el formulario de documento electrónico
this.documentoElectronicoForm = this.registerTheFactoryInvoiceService.createDocumentoElectronicoForm({
  documentoElectronico: {
    encabezado: {
      identificacionDocumento: {
        tipoDocumento: '',
        numeroDocumento: '',
        tipoProveedor: '',
        tipoTransaccion: '',
        numeroPlanillaImportacion: '',
        numeroExpedienteImportacion: '',
        serieFacturaAfectada: '',
        numeroFacturaAfectada: '',
        fechaFacturaAfectada: '',
        montoFacturaAfectada: '',
        comentarioFacturaAfectada: '',
        regimenEspTributacion: '',
        fechaEmision: '',
        fechaVencimiento: '',
        horaEmision: '',
        anulado: false,
        tipoDePago: '0',
        serie: '',
        sucursal: '',
        tipoDeVenta: '0',
        moneda: '',
        transaccionId: '',
      },
      vendedor: '',
      comprador: {
        tipoIdentificacion: '',
        numeroIdentificacion: '',
        razonSocial: '',
        direccion: '',
        ubigeo: '',
        pais: '',
        notificar: '',
        telefono: [''],
        correo: [''],
        otrosEnvios: '',
      },
      sujetoRetenido: '',
      tercero: '',
      totales: {
        nroItems: '0',
        montoGravadoTotal: '0',
        montoExentoTotal: '0',
        subtotal: '0',
        totalAPagar: '0',
        totalIVA: '0',
        montoTotalConIVA: '0',
        montoEnLetras: '',
        totalDescuento: '0',
        listaDescBonificacion: [{
          descDescuento: '',
          montoDescuento: '0',
        }],
        impuestosSubtotal: [{
          codigoTotalImp: '',
          alicuotaImp: '',
          baseImponibleImp: '0',
          valorTotalImp: '0',
        }],
        formasPago: [{
          descripcion: '',
          fecha: '',
          forma: '',
          monto: '0',
          moneda: '',
          tipoCambio: '0',
        }],
      },
      totalesRetencion: '',
      totalesOtraMoneda: {
        moneda: '',
        tipoCambio: '',
        montoGravadoTotal: '0',
        montoExentoTotal: '0',
        subtotal: '0',
        totalAPagar: '0',
        totalIVA: '0',
        montoTotalConIVA: '0',
        montoEnLetras: '',
        totalDescuento: '0',
        listaDescBonificacion: [{
          descDescuento: '',
          montoDescuento: '0',
        }],
        impuestosSubtotal: [{
          codigoTotalImp: '',
          alicuotaImp: '',
          baseImponibleImp: '0',
          valorTotalImp: '0',
        }],
      },
      orden: '',
    },
    detallesItems: [{
      numeroLinea: '',
      codigoCIIU: '',
      codigoPLU: '',
      indicadorBienoServicio: '',
      descripcion: '',
      cantidad: '0',
      unidadMedida: '',
      precioUnitario: '0',
      precioUnitarioDescuento: '0',
      montoBonificacion: '0',
      descripcionBonificacion: '',
      descuentoMonto: '0',
      precioItem: '0',
      codigoImpuesto: '',
      tasaIVA: '',
      valorIVA: '0',
      valorTotalItem: '0',
      infoAdicionalItem: [],
      listaItemOTI: '',
    }],
    detallesRetencion: '',
    viajes: '',
    infoAdicional: [{
      campo: '',
      valor: '',
    }],
    guiaDespacho: '',
    transporte: '',
    esLote: '',
    esMinimo: '',
  }
});

    // Suscribirse al cliente seleccionado
    this.sharedService.selectedCustomer$.subscribe((customer) => {
      if (customer) {
        console.log('Cliente recibido en suscripción:', customer); // Verifica los
        this.updateForm(customer);
      }
    });

        // Agregar items del localStorage al formulario
        this.addItemsFromLocalStorage();
        this.addItemsToDocumentoElectronicoFromLocalStorage();

        
    // Verifica el valor del formulario completo
    console.log('Valor del formulario completo:', this.documentoElectronicoForm.value);

    // Verifica el valor de detallesItems
    const detallesItemsFormArray = this.documentoElectronicoForm.get('documentoElectronico.detallesItems') as FormArray;
    console.log('Valor de detallesItems:', detallesItemsFormArray.value);

    this.documentoElectronicoForm.get('documentoElectronico.detallesItems').valueChanges.subscribe((value) => {
      console.log('Cambios en detallesItems:', value);
    });
 
  }

  loadCorrelatives(): void {
    this.invoiceFormService.getCorrelatives().subscribe(
      (data) => {
        console.log('Correlatives:', data);
        if (data.length > 12) {
          const prFact = data[12];
          this.prFactValueInt = prFact.valueint;
          console.log('PrFact valueint:', this.prFactValueInt);
          localStorage.setItem('prFactValueInt', this.prFactValueInt.toString());
        } else {
          console.error('The 12th object is not available in the response');
        }
      },
      (error) => {
        console.error('Error fetching correlatives:', error);
      }
    );
  }
  

  addItemsFromLocalStorage(): void {
    const items = JSON.parse(localStorage.getItem('invoiceItems') || '[]');
    const mappedItems = items.map((item: any) => this.fb.group({
      codItem: [item.codigo],
      codUbic: ['01'],
      codVend: ['01'],
      descrip1: [item.descripcion],
      priceO: [item.precio],
      precio: [item.precio],
      cantidad: [item.cantidad],
      mtoTax: [item.impuesto]
    }));
  
    // Verifica que el control 'items' sea un FormArray
    const itemsFormArray = this.registerForm.get('items') as FormArray;
    if (itemsFormArray) {
      mappedItems.forEach(item => itemsFormArray.push(item));
    } else {
      console.error('El control "items" no es un FormArray');
    }
    
  }

  addItemsToDocumentoElectronicoFromLocalStorage(): void {
    const items = JSON.parse(localStorage.getItem('invoiceItems') || '[]');
    const mappedItems = items.map((item: any) => this.fb.group({
      numeroLinea: String(item.numeroLinea || '01'),
      codigoCIIU: String(item.codigoCIIU || 'CIIU'),
      codigoPLU: String(item.codigoPLU || 'PLU'),
      indicadorBienoServicio: item.indicadorBienoServicio || null,
      descripcion: String(item.descripcion || ''),
      cantidad: String(item.cantidad || '0'),
      unidadMedida: String(item.unidadMedida || '01'),
      precioUnitario: String(item.precio || '0'),
      precioUnitarioDescuento: String(item.precioUnitarioDescuento || '0'),
      montoBonificacion: String(item.montoBonificacion || '0'),
      descripcionBonificacion: String(item.descripcionBonificacion || ''),
      descuentoMonto: String(item.descuentoMonto || '0'),
      precioItem: String(item.precio || '0'),
      codigoImpuesto: String(item.codigoImpuesto || 'E'),
      tasaIVA: String(item.tasaIVA || '16'),
      valorIVA: String(item.valorIVA || '0'),
      valorTotalItem: String(item.precio * item.cantidad || '0'),
      infoAdicionalItem: [],
      listaItemOTI: this.fb.array(item.listaItemOTI || []),
    }));
  
    // Verifica que el control 'detallesItems' sea un FormArray
    const detallesItemsFormArray = this.documentoElectronicoForm.get('documentoElectronico.detallesItems') as FormArray;
    if (detallesItemsFormArray) {
      detallesItemsFormArray.clear(); // Limpia el FormArray antes de agregar nuevos items
      mappedItems.forEach(item => detallesItemsFormArray.push(item));
      console.log('Items actualizados en el formulario de documento electrónico:', detallesItemsFormArray.value);
    } else {
      console.error('El control "detallesItems" no es un FormArray');
    }
  }

  updateForm(customer: any): void {
    const formValues = {
      invoice: {
        codClie: customer.id3 || '',
        codVend: '01',
        codUbic: '01',
        descrip: customer.descrip || '',
        direc1: customer.direc1 || '',
        direc2: 'Maracaibo, Venezuela',
        mtoTotal: 116.0,
        tgravable: 100,
        texento: 0,
        monto: 100,
        mtoTax: 16.0,
        contado: 116.0,
        tipoCli: customer.tipocli || 1, // Asigna un valor predeterminado si es null o undefined
        fechaE: '2024-02-16 12:00:00.000',
        fechaV: '2024-02-16 12:00:00.000',
        Id3: customer.id3 || '',
        ordenC: '01',
        telef: customer.telef || '',
        tipoFac: 'A',
      },
      items: [
        {
          codItem: '01',
          codUbic: '01',
          codVend: '01',
          descrip1: 'PUNTO SAINT',
          priceO: 100.0,
          precio: 100.0,
          cantidad: 1,
          mtoTax: 16.0,
        },
      ],
      payments: [
        {
          monto: this.totalBs,
          codTarj: this.selectedOption || '-EFE-',
          fechae: '2024-02-06 12:00:00.000',
          descrip: this.descrip || 'Efectivo',
        },
      ],
      taxes: [
        {
          monto: 16.0,
          codTaxs: 'IVA',
          tgravable: 100.0,
        },
      ],
    };
    
    // Usa setValue para actualizar todos los valores
    this.registerForm.setValue(formValues);

    // Actualiza el array de items en el formulario
    const itemsFormArray = this.registerForm.get('items') as FormArray;
    if (itemsFormArray) {
      itemsFormArray.clear();
      const defaultItems = [
        {
          codItem: '01',
          codUbic: '01',
          codVend: '01',
          descrip1: 'PUNTO SAINT',
          priceO: 100.0,
          precio: 100.0,
          cantidad: 1,
          mtoTax: 16.0,
        },
      ];

      // Agregar items por defecto
      defaultItems.forEach((item) => itemsFormArray.push(this.fb.group(item)));

      console.log('Items actualizados en el formulario:', itemsFormArray.value);
    } else {
      console.error('El control "items" no es un FormArray');
    }

    console.log("factura", this.prFactValueInt)

    const formValues2 = {
      documentoElectronico: {
        encabezado: {
          identificacionDocumento: {
            tipoDocumento: customer.tipoDocumento || '01',
            numeroDocumento: customer.numeroDocumento || String(this.prFactValueInt) || '',
            tipoProveedor: customer.tipoProveedor || null,
            tipoTransaccion: customer.tipoTransaccion || '01',
            numeroPlanillaImportacion: customer.numeroPlanillaImportacion || null,
            numeroExpedienteImportacion: customer.numeroExpedienteImportacion || null,
            serieFacturaAfectada: customer.serieFacturaAfectada || null,
            numeroFacturaAfectada: customer.numeroFacturaAfectada || null,
            fechaFacturaAfectada: customer.fechaFacturaAfectada || null,
            montoFacturaAfectada: customer.montoFacturaAfectada || null,
            comentarioFacturaAfectada: customer.comentarioFacturaAfectada || null,
            regimenEspTributacion: customer.regimenEspTributacion || null,
            fechaEmision: customer.fechaEmision || '06/10/2024',
            fechaVencimiento: customer.fechaVencimiento || '06/10/2024',
            horaEmision: customer.horaEmision || '12:00:00 pm',
            anulado: customer.anulado || false,
            tipoDePago: String(customer.tipoDePago || 'Contado'), // Convertido a string
            serie: customer.serie || '',
            sucursal: customer.sucursal || '',
            tipoDeVenta: String(customer.tipoDeVenta || 'interna'), // Convertido a string
            moneda: customer.moneda || 'BSD',
            transaccionId: customer.transaccionId || null
          },
          vendedor: customer.vendedor || null,
          comprador: {
            tipoIdentificacion: customer.id3 ? customer.id3.charAt(0) : 'E' ,
            numeroIdentificacion: customer.id3 ? customer.id3.substring(1) : '' ,
            razonSocial: customer.descrip || '',
            direccion: customer.direc1,
            ubigeo: customer.ubigeo || null,
            pais: String(customer.pais || '1'), // Convertido a string
            notificar: customer.notificar || null,
            telefono: customer.telef ? [customer.telef] : ['0414-8007809'],
            correo: customer.correo ? [customer.correo] : ['eiasistemas.desarrollo@gmail.com'],
            otrosEnvios: customer.otrosEnvios || null
          },
          sujetoRetenido: customer.sujetoRetenido || null,
          tercero: customer.tercero || null,
          totales: {
            nroItems: String(localStorage.getItem('invoiceItems').length || '1'), // Convertido a string
            montoGravadoTotal: String(customer.montoGravadoTotal || '1'), // Convertido a string
            montoExentoTotal: customer.montoExentoTotal || '00.00',
            subtotal: String(customer.subtotal || '1'), // Convertido a string
            totalAPagar: String(customer.totalAPagar || '69.60'), // Convertido a string
            totalIVA: String(customer.totalIVA || '1'), // Convertido a string
            montoTotalConIVA: String(customer.montoTotalConIVA || '69.60'), // Convertido a string
            montoEnLetras: customer.montoEnLetras || null,
            totalDescuento: String(customer.totalDescuento || '1'), // Convertido a string
            listaDescBonificacion: customer.listaDescBonificacion || [{
              descDescuento: '00.00',
              montoDescuento: String('1') // Convertido a string
            }],
            impuestosSubtotal: customer.impuestosSubtotal || [
              {
              codigoTotalImp: 'G',
              alicuotaImp: '16.00',
              baseImponibleImp: String('100.00'), // Convertido a string
              valorTotalImp: String('16.00') // Convertido a string
            },
            {
              codigoTotalImp: 'E',
              alicuotaImp: '00.00',
              baseImponibleImp: String('0.0'), // Convertido a string
              valorTotalImp: String('00.00') // Convertido a string
            },
            {
              codigoTotalImp: 'IGTF',
              alicuotaImp: '3.00',
              baseImponibleImp: String('116.0'), // Convertido a string
              valorTotalImp: String('3.48') // Convertido a string
            }
          ],
            formasPago: customer.formasPago || [{
              descripcion: this.descrip || 'Efectivo',
              fecha: '01/01/2022',
              forma: '01', // Convertido a string
              monto: String('69.60'), // Convertido a string
              moneda: this.selectedOption === 'USD' ? 'USD' : 'BS',
              tipoCambio: String('0') // Convertido a string
            }]
          },
          totalesRetencion: customer.totalesRetencion || null,
          totalesOtraMoneda: {
            moneda: customer.monedaOtra || 'USD',
            tipoCambio: customer.tipoCambioOtra || '40',
            montoGravadoTotal: String(customer.montoGravadoTotalOtra || '0'), // Convertido a string
            montoExentoTotal: String(customer.montoExentoTotalOtra || '0'), // Convertido a string
            subtotal: String(customer.subtotalOtra || '0'), // Convertido a string
            totalAPagar: String(customer.totalAPagarOtra || '0'), // Convertido a string
            totalIVA: String(customer.totalIVAOtra || '0'), // Convertido a string
            montoTotalConIVA: String(customer.montoTotalConIVAOtra || '0'), // Convertido a string
            montoEnLetras: customer.montoEnLetrasOtra || null,
            totalDescuento: String(customer.totalDescuentoOtra || '0'), // Convertido a string
            listaDescBonificacion: customer.listaDescBonificacionOtra || [{
              descDescuento: '',
              montoDescuento: String('0') // Convertido a string
            }],
            impuestosSubtotal: customer.impuestosSubtotalOtra || [{
              codigoTotalImp: 'IGTF',
              alicuotaImp: '3.00',
              baseImponibleImp: "2.00", // Convertido a string
              valorTotalImp: "0.06" // Convertido a string
            }]
          },
          orden: customer.orden || null
        },
        detallesItems: customer.detallesItems || [{
          numeroLinea: String('01'), // Convertido a string
          codigoCIIU: 'CIIU',
          codigoPLU: 'PLU',
          indicadorBienoServicio: customer.indicadorBienoServicio || null,
          descripcion: '?SEGURO PREPAGADOS',
          cantidad: String('1'), // Convertido a string
          unidadMedida: '01',
          precioUnitario: String('0'), // Convertido a string
          precioUnitarioDescuento: String('0'), // Convertido a string
          montoBonificacion: String('0'), // Convertido a string
          descripcionBonificacion: '',
          descuentoMonto: String('0'), // Convertido a string
          precioItem: String('0'), // Convertido a string
          codigoImpuesto: customer.codigoImpuesto || null,
          tasaIVA: '0.16',
          valorIVA: String('0'), // Convertido a string
          valorTotalItem: String('0'), // Convertido a string
          infoAdicionalItem: customer.infoAdicionalItem || [],
          listaItemOTI: customer.listaItemOTI || []
        }],
        detallesRetencion: customer.detallesRetencion || null,
        viajes: customer.viajes || null,
        infoAdicional: customer.infoAdicional || [{
          campo: 'PDF',
          valor: "{'coletilla1':'Este pago estará sujeto al cobro adicional del 3,00% del Impuesto a las Grandes Transacciones Financieras (IGTF), de conformidad con la Providencia Administrativa SNAT/2022/000013 publicada en la G.O.N. 42.339 del 17-03-2022, en caso de ser cancelado en divisas. No aplica en pago en Bs.'}"
        }],
        guiaDespacho: customer.guiaDespacho || null,
        transporte: customer.transporte || null,
        esLote: customer.esLote || null,
        esMinimo: customer.esMinimo || null
      }
    };
    
    // Usa patchValue para actualizar todos los valores
this.documentoElectronicoForm.patchValue(formValues2);

// Asegúrate de que los FormArray estén inicializados correctamente
const detallesItemsArray = this.documentoElectronicoForm.get('documentoElectronico.detallesItems') as FormArray;
if (detallesItemsArray) {
  detallesItemsArray.clear();
  formValues2.documentoElectronico.detallesItems.forEach(item => {
    detallesItemsArray.push(this.fb.group(item));
  });
}

const infoAdicionalArray = this.documentoElectronicoForm.get('documentoElectronico.infoAdicional') as FormArray;
if (infoAdicionalArray) {
  infoAdicionalArray.clear();
  formValues2.documentoElectronico.infoAdicional.forEach(info => {
    infoAdicionalArray.push(this.fb.group(info));
  });
}

console.log('Formulario de documento electrónico actualizado:', this.documentoElectronicoForm.value);
    
      // Actualiza el array de items en el formulario
  const itemsFormArray2 = this.documentoElectronicoForm.get('documentoElectronico.detallesItems') as FormArray;
  if (itemsFormArray2) {
    itemsFormArray2.clear();
    const defaultItems = [{
      numeroLinea: '',
      codigoCIIU: '',
      codigoPLU: '',
      indicadorBienoServicio: '',
      descripcion: '',
      cantidad: 0,
      unidadMedida: '',
      precioUnitario: 0,
      precioUnitarioDescuento: 0,
      montoBonificacion: 0,
      descripcionBonificacion: '',
      descuentoMonto: 0,
      precioItem: 0,
      codigoImpuesto: '',
      tasaIVA: '',
      valorIVA: 0,
      valorTotalItem: 0,
      infoAdicionalItem: '',
      listaItemOTI: [],
    }];

    // Agregar items por defecto
    defaultItems.forEach((item) => itemsFormArray2.push(this.fb.group(item)));

    console.log('Items actualizados en el formulario de documento electrónico:', itemsFormArray2.value);
  } else {
    console.error('El control "detallesItems" no es un FormArray');
  }
  }
  
  // Actualiza las opciones y muestra los campos adicionales según el método de pago seleccionado
  updateDropdownOptions(option: string): void {
    this.selectedOption = option;
  
    // Resetear los valores de los campos adicionales
    this.referenceNumber = '';
    this.phoneNumber = '';
    this.idNumber = '';
    this.email = '';
    this.batchNumber = '';
  
    // Variable para almacenar el valor de codTarj
    let codTarjValue = '';
  
    // Lógica para asignar el valor de codTarj según la opción seleccionada
    switch (option) {
      case 'USD':
        codTarjValue = 'USD'; // Para pagos en dólares
        this.descrip = 'Divisas';
        break;
        
      case '-EFE-':
        codTarjValue = '-EFE-'; // Para pagos en efectivo
        this.descrip = 'Efectivo';
        break;
  
      case '0134':
        codTarjValue = '0134'; // Para otro tipo de pagos
        this.descrip = 'Banesco';
        break;
  
      case '0134M':
        codTarjValue = '0134M'; // Pago móvil Banesco
        this.descrip = 'Banesco Pago Móvil';
        // Aquí puedes agregar lógica adicional para campos como teléfono e identificación
        break;
  
      case '0134P':
        codTarjValue = '0134P'; // POS Banesco
        this.descrip = 'Banesco POS';
        // Aquí puedes agregar lógica adicional para el número de lote
        break;
  
      default:
        codTarjValue = ''; // Valor predeterminado si no se selecciona una opción válida
        break;
    }
  }


 // Método para calcular la suma total de todos los montos actuales
 getTotalPayments(): number {
  return this.paymentsList.reduce((acc, payment) => acc + payment.monto, 0);
}

// Método para calcular el saldo restante
getRemainingBalance(): number {
  const itemFactTotal = this.itemFactItems.reduce((acc, item) => acc + (parseFloat(item.montoneto) || 0), 0);
  return this.totalBs - this.getTotalPayments() - itemFactTotal;
}

isFormValid(): boolean {
  if (!this.formattedTotalBs || this.formattedTotalBs <= 0) {
    return false;
  }

  if (this.selectedOption === '0134M') {
    return this.idNumber.trim() !== '' && this.phoneNumber.trim() !== '' && this.getRemainingBalance() === 0;
  }

  if (this.selectedOption === '0134P') {
    return this.batchNumber.trim() !== '' && this.getRemainingBalance() === 0;
  }

  return this.getRemainingBalance() === 0;
}

addPayment(): void {
  // Verificar si el monto es válido
  if (!this.formattedTotalBs || isNaN(this.formattedTotalBs) || this.formattedTotalBs <= 0) {
    alert('Por favor ingresa un monto válido.');
    return;
  }

  const monto = parseFloat(this.formattedTotalBs.toString()); // Asegurarse de que sea un número
  const igtf = monto * 0.16; // Calculamos el IGTF (16% del monto)
  const montoDolares = this.totalUsd // Calculamos el monto en dólares (asumiendo que tienes una tasa de cambio)

  // Verificar campos adicionales según la opción seleccionada
  if (this.selectedOption === '0134M') {
    if (!this.idNumber || !this.idNumber.trim() || !this.phoneNumber || !this.phoneNumber.trim()) {
      this.messageService.add({ 
        severity: 'error', 
        summary: 'Error', 
        detail: 'Por favor completa todos los campos requeridos para Pago Móvil.'
      });
      return;
    }
  }

  if (this.selectedOption === '0134P') {
    if (!this.batchNumber || !this.batchNumber.trim()) {
      this.messageService.add({ 
        severity: 'error', 
        summary: 'Error', 
        detail: 'Por favor completa todos los campos requeridos para Pago POS.'
      });
      return;
    }
  }

  // Calculamos la suma actual de los pagos + el nuevo monto que se va a añadir
  const currentTotal = this.getTotalPayments() + monto;

  // Verificar si la suma actual excede el totalBs
  if (currentTotal > this.totalBs) {
    this.messageService.add({ 
      severity: 'error', 
      summary: 'Error', 
      detail: 'La suma de los pagos no puede exceder el total de ' + this.totalBs + ' Bs.'
    });

    return; // Detenemos la ejecución si se supera el total
  }

  // Añadir el nuevo pago a la lista
  this.paymentsList.push({ 
    tipoPago: this.descrip, 
    monto, 
    montoDolares, 
    igtf 
  });

  // También lo agregamos al FormArray
  const paymentsFormArray = this.registerForm.get('payments') as FormArray;
  const newPayment = this.fb.group({
    tipoPago: this.selectedOption,
    monto: monto,
    montoDolares: montoDolares,
    igtf: igtf,
    fechae: new Date().toISOString(),
  });
  paymentsFormArray.push(newPayment);

  // Opcional: Limpiar el input después de agregar el pago
  this.formattedTotalBs = null;
  this.idNumber = '';
  this.phoneNumber = '';
  this.batchNumber = '';

  // Forzar la detección de cambios para actualizar la vista
  this.cd.detectChanges();

            // Verifica el valor del formulario completo
            console.log('Valor del formulario completo:', this.documentoElectronicoForm.value);
}

  removePayment(index: number): void {
    this.paymentsList.splice(index, 1); // Eliminamos el pago de la lista de pagos
    const paymentsFormArray = this.registerForm.get('payments') as FormArray;
    paymentsFormArray.removeAt(index); // También lo eliminamos del FormArray
  }

  // Método para limpiar el formulario
  clearForm(): void {
    this.selectedOption = '';
    this.referenceNumber = '';
    this.phoneNumber = '';
    this.idNumber = '';
    this.batchNumber = '';

    this.paymentsList = []; // Vacía la lista de pagos
    const paymentsFormArray = this.registerForm.get('payments') as FormArray;
    while (paymentsFormArray.length !== 0) {
      paymentsFormArray.removeAt(0); // Elimina todos los elementos del FormArray
    }
  }

  

  submitForm(): void {
  if (this.registerForm) {
    this.isLoading.set(true);

    // Mostrar el contenido del formulario en la consola
    console.log('Contenido del formulario antes de enviar:', this.registerForm.value);

    // Asegurarse de que el array de payments solo tenga un objeto y eliminar el campo igtf
    const paymentsFormArray = this.registerForm.get('payments') as FormArray;
    if (paymentsFormArray.length > 0) {
      const firstPayment = paymentsFormArray.at(0).value;
      delete firstPayment.igtf;
      paymentsFormArray.clear();
      paymentsFormArray.push(this.fb.group(firstPayment));
    }

    // Mostrar el contenido del formulario sin igtf en la consola
    console.log('Contenido del formulario sin IGTF antes de enviar:', JSON.stringify(this.registerForm.value));

    this.registerInvoiceService.submitInvoice(this.registerForm).subscribe(
      (response) => {
        this.messageService.add({ 
          severity: 'success', 
          summary: 'Éxito', 
          detail: 'Formulario enviado exitosamente'
        });

        // Limpiar referencias circulares
        const cleanedFormValue = this.removeCircularReferences(this.documentoElectronicoForm.value);
        console.log('Contenido del formulario limpio:', JSON.stringify(cleanedFormValue));

        this.theFactoryService.submitInvoice(this.documentoElectronicoForm).subscribe(
          (response) => {
            console.log('Respuesta del servicio de The Factory:', response);
            this.messageService.add({ 
              severity: 'success', 
              summary: 'Éxito', 
              detail: 'Factura generada exitosamente'
            });

            // Desactivar el estado de carga una vez completada la solicitud
            this.isLoading.set(false);
          },
          (error) => {
            console.error('Error al enviar el formulario a The Factory:', error);
            this.messageService.add({ 
              severity: 'error', 
              summary: 'Error', 
              detail: 'Hubo un error al enviar el formulario a The Factory. Por favor, inténtalo de nuevo.'
            });
            this.isLoading.set(false);
          }
        );

        // Obtener el selectedNumerod del local storage
        const seleectedCxcId = localStorage.getItem('seleectedCxcId');
        if (seleectedCxcId) {

          // Actualizar el saldo de la CXC a 0
          this.invoiceFormService.updateCxcSaldoToZero().subscribe(
            (response) => {
              console.log('Saldo de la CXC actualizado a 0:', response);
              this.messageService.add({ 
                severity: 'success', 
                summary: 'Éxito', 
                detail: 'Saldo de la CXC actualizado a 0'
              });
              localStorage.removeItem('itemFact');
            },
            (error) => {
              console.error('Error al actualizar el saldo de la CXC:', error);
              this.messageService.add({ 
                severity: 'error', 
                summary: 'Error', 
                detail: 'Hubo un error al actualizar el saldo de la CXC'
              });
              this.isLoading.set(false);

              // Recargar la página
              window.location.reload();
              
            }
          );
        }
      },
      (error) => {
        console.error('Error al enviar el formulario:', error);
        this.messageService.add({ 
          severity: 'error', 
          summary: 'Error', 
          detail: 'Hubo un error al enviar el formulario. Por favor, inténtalo de nuevo.'
        });
        // Desactivar el estado de carga una vez completada la solicitud
        this.isLoading.set(false);
      }
    );
  } else {
    console.error('El formulario no está inicializado.');
  }
}

onDropdownChange(event: any): void {
  this.selectedOption = event.value;
}

// Método para eliminar referencias circulares
removeCircularReferences(obj: any): any {
  const seen = new WeakSet();
  return JSON.parse(JSON.stringify(obj, (key, value) => {
      if (typeof value === 'object' && value !== null) {
          if (seen.has(value)) {
              return;
          }
          seen.add(value);
      }
      return value;
  }));
}


}
