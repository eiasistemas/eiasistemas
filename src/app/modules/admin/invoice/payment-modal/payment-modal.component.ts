import { ChangeDetectorRef, Component, OnInit, signal } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { RegisterInvoiceService } from '../../../../@core/services/register-invoice.service';
import { HttpHeaders } from '@angular/common/http';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { RegisterInvoiceForm } from '../../../../@core/models/forms/register-invoice-form.model';
import { SharedServiceService } from '../../../../@core/services/shared-service.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

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
  batchNumber: string = '';
  descrip: string = '';

  paymentsList: { monto: number, igtf: number, tipoPago: string, montoDolares?: number }[] = [];

  totalBs: number;
  totalUsd: number;
  cxcItems: any[] = [];
  itemFactItems: any[] = [];

  paymentForm: FormGroup;

  registerForm: FormGroup<RegisterInvoiceForm>;
  http: any;

  constructor(
    private dialogConfig: DynamicDialogConfig,
    private registerInvoiceService: RegisterInvoiceService,
    private sharedService: SharedServiceService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private router: Router,
    private dialogRef: DynamicDialogRef,
    private cd: ChangeDetectorRef
  ) {
    this.totalBs = this.dialogConfig.data.totalBs.toFixed(2);
    this.totalUsd = this.dialogConfig.data.totalUsd.toFixed(2);
  }

  ngOnInit(): void {

    this.formattedTotalBs = null;
    //this.formattedTotalBs = this.totalBs; // Inicializa formattedTotalBs con totalBs
    this.updateDropdownOptions(this.selectedOption); // Inicializa las opciones de dropdown

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

    // Suscribirse al cliente seleccionado
    this.sharedService.selectedCustomer$.subscribe((customer) => {
      if (customer) {
        console.log('Cliente recibido en suscripción:', customer); // Verifica los
        this.updateForm(customer);
      }
    });

        // Agregar items del localStorage al formulario
        this.addItemsFromLocalStorage();
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

      // // Agregar cxcItems con valores por defecto si no los tienen
      // this.cxcItems.forEach((cxcItem) => {
      //   const itemWithDefaults = {
      //     codItem: cxcItem.codItem || '01',
      //     codUbic: cxcItem.codUbic || '01',
      //     codVend: cxcItem.codVend || '01',
      //     descrip1: cxcItem.descrip1 || 'PUNTO SAINT',
      //     priceO: cxcItem.priceO || 100.0,
      //     precio: cxcItem.precio || 100.0,
      //     cantidad: cxcItem.cantidad || 1,
      //     mtoTax: cxcItem.mtoTax || 16.0,
      //   };
      //   itemsFormArray.push(this.fb.group(itemWithDefaults));
      // });

      console.log('Items actualizados en el formulario:', itemsFormArray.value);
    } else {
      console.error('El control "items" no es un FormArray');
    }
  }
  
  // Actualiza las opciones y muestra los campos adicionales según el método de pago seleccionado
  updateDropdownOptions(option: string): void {
    this.selectedOption = option;
  
    // Resetear los valores de los campos adicionales
    this.referenceNumber = '';
    this.phoneNumber = '';
    this.idNumber = '';
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
      console.log('Contenido del formulario sin IGTF antes de enviar:', this.registerForm.value);
  
      this.registerInvoiceService.submitInvoice(this.registerForm).subscribe(
        (response) => {
          this.messageService.add({ 
            severity: 'success', 
            summary: 'Éxito', 
            detail: 'Formulario enviado exitosamente'
          });
  
          // Redirigir a la página de "home" después de 1 segundo
          setTimeout(() => {
            this.dialogRef.close();
            window.location.href = window.location.href;
          }, 1000); // 1000 ms = 1 segundo
        },
        (error) => {
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


}
