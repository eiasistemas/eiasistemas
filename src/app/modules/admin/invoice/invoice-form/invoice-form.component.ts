import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { InvoceFormService } from '../../../../@core/services/invoce-form.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PaymentModalComponent } from '../payment-modal/payment-modal.component';
import { PaymentModalModule } from '../payment-modal/payment-modal.module';
import { CreditNoteComponent } from '../credit-note/credit-note.component';
import { SuspendServiceUserComponent } from '../suspend-service-user/suspend-service-user.component';
import { Router } from '@angular/router';
import { AuthService } from '../../../../@core/services/auth.service';
import { DocumentoElectronicoComponent } from '../the-factory-form/the-factory-form.component';
import { environment } from '../../../../../environments/environment.development';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SharedServiceService } from '../../../../@core/services/shared-service.service';
import { VersionService } from '../../../../@core/services/version.service';
import { MessageService } from 'primeng/api';
import { TheFactoryService } from '../../../../@core/services/the-factory.service';
import { CollectionNoticesComponent } from '../collection-notices/collection-notices.component';

@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.scss'],
})
export class InvoiceFormComponent implements OnInit {
  services: any[] = [];
  filteredServices: any[] = [];
  customers: any[] = [];
  filteredCustomers: any[] = [];
  items: any[] = []; // Array to hold items
  usdPrice: number = 0;
  subtotalBs: number = 0;
  subtotalUsd: number = 0;
  discount: number = 0;
  iva: number = 0;
  igtf: number = 0;
  totalBs: number = 0;
  totalUsd: number = 0;
  price: number = 0;
  currentDate: string;
  dueDate: string;
  user: any;
  prFactValueInt: number; // Propiedad para almacenar el valor de valueint
  totalItems: number = 0; // Propiedad para almacenar el número total de items
  version: string;
  cxcItems: any[] = [];
  itemFactItems: any[] = [];
  isCxcLoaded: boolean = false; // Propiedad para indicar si los datos de Cxc se han cargado

  invoiceForm = this.invoiceFormService.formInvoice();
  customersForm = this.invoiceFormService.formUserData();

  private api: string = environment.apiTheFactory;

  // documentoElectronicoForm: FormGroup;

  constructor(
    private invoiceFormService: InvoceFormService,
    private cdr: ChangeDetectorRef,
    private dialogService: DialogService,
    private router: Router,
    private sharedService: SharedServiceService,
    private versionService: VersionService,
    private messageService: MessageService,
    private theFactoryService: TheFactoryService,
  ) {
    this.invoiceForm = this.invoiceFormService.formInvoice();
    this.customersForm = this.invoiceFormService.formUserData();
  }

  ngOnInit(): void {
    this.loadServices();
    this.loadCustomers();
    this.loadItems(); // Load items from localStorage on init
    this.loadUsd();
    this.calculateTotals();
    this.loadCorrelatives();
    this.loadCxcItems();
    this.loadItemFactItems();
    this.loadUsd(); // Esperar a que se cargue el valor del dólar
    this.usdPrice = this.getUsdPrice(); // Obtener el valor del dólar desde localStorage


        // Suscribirse a los cambios de cxcItems
        this.sharedService.cxcItems$.subscribe(items => {
          this.cxcItems = items;
          this.calculateTotals();
          this.cdr.detectChanges(); // Forzar la detección de cambios
        });

        // Suscribirse a los cambios de itemFactItems
        this.sharedService.itemFact$.subscribe(item => {
          this.itemFactItems.push(item);
          this.calculateTotals();
          this.cdr.detectChanges(); // Forzar la detección de cambios
        });

        window.addEventListener('storage', this.handleStorageChange.bind(this));

    const today = new Date();
    this.currentDate = this.formatDate(today);

    const due = new Date();
    due.setDate(today.getDate() + 7); // 30 días después de la fecha actual
    this.dueDate = this.formatDate(due);

    this.customersForm.get('descuento')?.valueChanges.subscribe(() => {
      const discountPercentage =
        parseFloat(this.customersForm.get('descuento')?.value) || 0;
      this.discount = (this.subtotalBs * discountPercentage) / 100;
      this.calculateTotals();
    });

    // Observadores para cambios en los campos del formulario
    this.invoiceForm.get('cantidad')?.valueChanges.subscribe(() => {
      this.updateTotalAndTax();
      this.calculateTotals();
    });

    this.invoiceForm.get('precio')?.valueChanges.subscribe(() => {
      this.updateTotalAndTax();
      this.calculateTotals();
    });

    this.invoiceForm.get('descuento')?.valueChanges.subscribe(() => {
      this.updateTotalAndTax();
      this.calculateTotals();
    });

    this.invoiceForm.get('impuesto')?.valueChanges.subscribe(() => {
      this.updateTotalAndTax();
      this.calculateTotals();
    });

    this.totalItems = this.items.length; // Asigna el número total de items

    this.versionService.getVersion().subscribe(data => {
      this.version = data.version;
      console.log('Version:', this.version);
    });

        // Observador para cambios en la tabla de items
        this.sharedService.itemFact$.subscribe(() => {
          this.calculateTotals();
        });

    // this.theFactoryService.getToken().subscribe(
    //   (data) => {
    //     console.log('Token:', data);
    //   },
    //   (error) => {
    //     console.error('Error fetching token:', error);
    //   }
    // );

    this.theFactoryService.authenticate().subscribe(
      (data) => {
        console.log('Authenticated:', data);
      },
      (error) => {
        console.error('Error authenticating:', error);
      }
    );
    

    this.invoiceFormService.getCxc().subscribe(
      (data) => {
        // Filtrar los datos para obtener solo los que tienen tipocxc: "70"
        const filteredData = data.filter(item => item.tipocxc === "70");
        console.log('Filtered Cxc:', filteredData);
      },
      (error) => {
        console.error('Error fetching Cxc:', error);
      }
    );

    this.invoiceFormService.getItems().subscribe(
      (data) => {
        // Filtrar los datos para obtener solo los que tienen tipocxc: "70"
        const filteredData = data.filter(item => item.tipofac === "H");
        console.log('Filtered items:', filteredData);
      },
      (error) => {
        console.error('Error fetching items:', error);
      }
    );
    

  }

  handleStorageChange(event: StorageEvent): void {
    if (event.key === 'itemFact') {
      this.loadItemFactItems();
      this.calculateTotals();
    }
  }

  formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses empiezan desde 0
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  loadCxcItems(): void {
    const storedCxcItems = localStorage.getItem('cxc');
    if (storedCxcItems) {
      this.cxcItems = JSON.parse(storedCxcItems);
    }
  }

  loadItemFactItems(): void {
    const itemFact = localStorage.getItem('itemFact');
    if (itemFact) {
      this.itemFactItems = JSON.parse(itemFact);
      this.calculateTotals();
      this.updateTotalAndTax();
      this.totalItems = this.items.length;
      this.cdr.detectChanges(); // Forzar la detección de cambios
    } else {
      console.error('No itemFact found in localStorage');
    }
  }

  loadCorrelatives(): void {
    this.invoiceFormService.getCorrelatives().subscribe(
      (data) => {
        console.log('Correlatives:', data);
        if (data.length > 12) {
          const prFact = data[12];
          this.prFactValueInt = prFact.valueint;
          console.log('PrFact valueint:', this.prFactValueInt);

          // Enviar el valor al SharedDataService
          this.sharedService.setPrFactValueInt(this.prFactValueInt);
        } else {
          console.error('The 12th object is not available in the response');
        }
      },
      (error) => {
        console.error('Error fetching correlatives:', error);
      }
    );
  }

  loadServices(): void {
    this.invoiceFormService.getServices().subscribe((services) => {
      this.services = services;
    });
  }

  loadCustomers(): void {
    this.invoiceFormService.getCustomers().subscribe((customers) => {
      this.customers = customers;
      console.log(customers);
    });
  }

  loadUsd(): void {
    this.invoiceFormService.getUsd().subscribe((usd) => {
      this.usdPrice = usd?.monitors?.usd?.price || 0;
      localStorage.setItem('usdPrice', this.usdPrice.toString());
      console.log("aqui" + this.usdPrice);
    });
  }
  
  getUsdPrice(): number {
    const storedUsdPrice = localStorage.getItem('usdPrice');
    return storedUsdPrice ? parseFloat(storedUsdPrice) : 0;
  }

  filterServices(event: any): void {
    const query = event.query.toLowerCase();
    this.filteredServices = this.services.filter((service) => {
      const codserv = service.codserv ? service.codserv.toLowerCase() : '';
      const descrip = service.descrip ? service.descrip.toLowerCase() : '';
      return codserv.includes(query) || descrip.includes(query);
    });
  }

  filterCustomers(event: any): void {
    const query = event.query.toLowerCase();
    this.filteredCustomers = this.customers.filter((customer) => {
      const cedula = customer.id3?.toLowerCase() || '';
      const cliente = customer.descrip?.toLowerCase() || '';
      return cedula.includes(query) || cliente.includes(query);
    });
  }

  selectService(event: any): void {
    const service = event.value;

    console.log('Servicio seleccionado:', service);

    const patchValues = {
      codigo: service.codserv || '',
      descripcion: service.descrip || '',
      cantidad: service.cantidad || 1,
      precio: service.precioi1 || '',
      descuento: service.descuento || '',
      impuesto:
        (service.cantidad || 1) *
        (service.precioi1 || 0) *
        (service.impuesto || 0),
      totalItem: (service.cantidad || 1) * (service.precioi1 || 0),
      
    };

    this.invoiceForm.patchValue(patchValues);
    this.filteredServices = [];
  }

  selectCustomer(event: any): void {
    const customer = event.value;
    const codclie = customer.codclie;
    const cedula = customer.id3;
  
    console.log('Cliente seleccionado:', customer);
  
    const patchValues = {
      cedula: customer.id3 || '',
      cliente: customer.descrip || '',
      direccion: customer.direc1 || '',
      telefono: customer.telef || '',
      email: customer.email || '',
      descuento: customer.descuento || '',
      tipoCli: customer.tipoCli || 1,
    };
  
    this.customersForm.patchValue(patchValues);
    this.filteredCustomers = [];
  
    // Compartir el cliente seleccionado usando el servicio compartido
    this.sharedService.setSelectedCustomer({
      ...customer,
      descrip: customer.descrip
    });
  
    // Llamar al método para obtener los datos de Cxc filtrados por cedula
    this.filterDataByCedula(cedula);
  }

  filterDataByCedula(cedula: string): void {
    this.invoiceFormService.getCxc().subscribe(
      (data) => {
        // Filtrar los datos para obtener solo los que tienen cedula igual al del cliente seleccionado
        const filteredData = data.filter(item => item.codclie === cedula && item.monto > 0);
        console.log('Filtered Cxc:', filteredData);

        // Actualizar la variable de estado
        this.isCxcLoaded = filteredData.length > 0;
        this.cdr.detectChanges(); // Forzar la detección de cambios

        // Si filteredData contiene datos, mostrar el modal
        if (filteredData.length > 0) {
          this.showCollectionNotices();
        }

        // Compartir los datos filtrados usando el servicio compartido
        this.sharedService.setFilteredData(filteredData);
      },
      (error) => {
        console.error('Error fetching Cxc:', error);
      }
    );
  }
  

  addItem(): void {
    const item = this.invoiceForm.value;

    if (item.precio && item.cantidad) {
      const newItem = {
        ...item,
        totalItem: item.cantidad * item.precio,
      };

      this.items.push(newItem);
      localStorage.setItem('invoiceItems', JSON.stringify(this.items));
      this.calculateTotals();

      this.invoiceForm.reset();
      this.cdr.detectChanges();
    } else {
      this.messageService.add({ 
        severity: 'error', 
        summary: 'Error', 
        detail: 'El ítem debe tener precio y cantidad válidos.'
      });
    }
    this.totalItems = this.items.length; // Actualiza el número total de items
  }

  loadItems(): void {
    const storedItems = localStorage.getItem('invoiceItems');
    if (storedItems) {
      this.items = JSON.parse(storedItems);
      this.totalItems = this.items.length; // Actualiza el número total de items
      this.calculateTotals();
    } else {
      this.items = [];
      this.totalItems = 0; // Si no hay items, el total es 0
    }
  }

  removeItem(index: number, type: string): void {
    if (type === 'cxc') {
      this.cxcItems.splice(index, 1);
      localStorage.setItem('cxc', JSON.stringify(this.cxcItems));
    } else if (type === 'itemFact') {
      this.itemFactItems.splice(index, 1);
      localStorage.setItem('itemFact', JSON.stringify(this.itemFactItems));
    } else {
      this.items.splice(index, 1);
      localStorage.setItem('invoiceItems', JSON.stringify(this.items));
    }
    this.calculateTotals();
    this.cdr.detectChanges();
    this.totalItems = this.items.length + this.cxcItems.length + this.itemFactItems.length; // Actualiza el número total de items
  }


  updateTotalAndTax(): void {
    const cantidad = parseFloat(
      this.invoiceForm.get('cantidad')?.value?.toString() || '0'
    );
    const precio = parseFloat(
      this.invoiceForm.get('precio')?.value?.toString() || '0'
    );
    const descuento = parseFloat(
      this.invoiceForm.get('descuento')?.value?.toString() || '0'
    );
    const impuestoRate = 0.16; // Tasa de impuesto fija

    if (cantidad > 0 && precio > 0) {
      const total = cantidad * precio;
      const impuesto = total * impuestoRate;

      // Actualiza los campos del formulario
      this.invoiceForm.get('totalItem')?.setValue(total, { emitEvent: false });
      this.invoiceForm.get('impuesto')?.setValue(impuesto, { emitEvent: false });

      // Calcular subtotalBs incluyendo items y itemFactItems
      this.subtotalBs = this.items.reduce(
        (acc: number, item: any) => acc + (parseFloat(item.totalItem) || 0),
        0
      ) + this.itemFactItems.reduce(
        (acc: number, item: any) => acc + (parseFloat(item.montoneto) || 0),
        0
      );

      // Calcular el total de precios de itemFactItems
      const totalItemFactPrices = this.itemFactItems.reduce(
        (acc: number, item: any) => acc + (parseFloat(item.precio) || 0),
        0
      );

      // Incluir el total de precios de itemFactItems en el subtotalBs
      this.subtotalBs += totalItemFactPrices;

      this.iva = isNaN(this.subtotalBs) ? 0 : this.subtotalBs * impuestoRate;
      this.totalBs =
        this.subtotalBs - (isNaN(descuento) ? 0 : descuento) + this.iva;
      this.totalUsd =
        isNaN(this.totalBs) || isNaN(this.usdPrice) || this.usdPrice === 0
          ? 0
          : this.totalBs / this.usdPrice;
      this.subtotalUsd =
        isNaN(this.subtotalBs) || isNaN(this.usdPrice) || this.usdPrice === 0
          ? 0
          : this.subtotalBs / this.usdPrice;
    } else {
      // Restablece los campos si cantidad o precio no son válidos
      this.invoiceForm.get('totalItem')?.setValue(null, { emitEvent: false });
      this.invoiceForm.get('impuesto')?.setValue(null, { emitEvent: false });
    }

    // Forzar la detección de cambios
    this.cdr.detectChanges();
  }
  
  calculateTotals(): void {
    const impuestoRate = 0.16; // Tasa de impuesto fija
    const igtfRate = 0.03; // Tasa de IGTF
  
    // Obtener el valor del dólar desde localStorage
    const storedUsdPrice = localStorage.getItem('usdPrice');
    this.usdPrice = storedUsdPrice ? parseFloat(storedUsdPrice) : 0;
  
    // Verificar si el valor del dólar está disponible
    if (!this.usdPrice || this.usdPrice === 0) {
      console.warn('El valor del dólar no está disponible.');
      return;
    }
  
    // Calcular subtotalBs incluyendo items y itemFactItems
    this.subtotalBs = this.items.reduce(
      (acc: number, item: any) => acc + (parseFloat(item.totalItem) || 0),
      0
    ) + this.itemFactItems.reduce(
      (acc: number, item: any) => acc + (parseFloat(item.montoneto) || 0),
      0
    );
  
    // Calcular el total de precios de itemFactItems
    const totalItemFactPrices = this.itemFactItems.reduce(
      (acc: number, item: any) => acc + (parseFloat(item.precio) || 0),
      0
    );
  
    // Incluir el total de precios de itemFactItems en el subtotalBs
    this.subtotalBs += totalItemFactPrices;
  
    // Calcular el subtotal en dólares para itemFactItems
    const subtotalItemFactUsd = this.itemFactItems.reduce(
      (acc: number, item: any) => acc + (parseFloat(item.precio) || 0) / this.usdPrice,
      0
    );
  
    // Calcular el IGTF
    this.igtf = this.subtotalBs * igtfRate;
  
    // Calcular el IVA
    this.iva = isNaN(this.subtotalBs) ? 0 : this.subtotalBs * impuestoRate;
  
    // Calcular el total en bolívares incluyendo IGTF
    this.totalBs =
      this.subtotalBs - (isNaN(this.discount) ? 0 : this.discount) + this.iva + this.igtf;
  
    // Calcular el total en dólares
    this.totalUsd =
      isNaN(this.totalBs) || isNaN(this.usdPrice) || this.usdPrice === 0
        ? 0
        : this.totalBs / this.usdPrice;
  
    // Calcular el subtotal en dólares
    this.subtotalUsd =
      isNaN(this.subtotalBs) || isNaN(this.usdPrice) || this.usdPrice === 0
        ? 0
        : this.subtotalBs / this.usdPrice;
  
    // Incluir el subtotal en dólares de itemFactItems en el subtotalUsd
    this.subtotalUsd += subtotalItemFactUsd;
  
    this.cdr.detectChanges(); // Forzar la detección de cambios
  }

  onDiscountChange(event: any): void {
    this.discount = parseFloat(event.target.value) || 0;
    this.calculateTotals();
  }

  resetForm(): void {
    this.invoiceForm.reset();
    this.cdr.detectChanges(); // Forzar la detección de cambios
  }

  clearAll(): void {
    this.customersForm.reset();
    this.invoiceForm.reset();
    this.cxcItems = [];
    this.items = [];
    localStorage.removeItem('invoiceItems');
    this.calculateTotals();
    this.totalItems = 0;
    this.cdr.detectChanges();
  }

  toUpperCase(event: any): void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.toUpperCase();
    this.customersForm.get('cedula')?.setValue(input.value.toUpperCase(), { emitEvent: false });
  }

  ref: DynamicDialogRef | undefined;

  showPaymentModal() {
    this.ref = this.dialogService.open(PaymentModalComponent, {
      header: 'Agregar Pago',
      width: '35vw',
      modal: true,
      data: {
        totalBs: this.totalBs,
        totalUsd: this.totalUsd,
        subtotalBs: this.subtotalBs,
        subtotalUsd: this.subtotalUsd,
        discount: this.discount,
        iva: this.iva,
        invoiceNumber: this.prFactValueInt
      },
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw',
      },
    });
  }

  showCreditNote() {
    this.ref = this.dialogService.open(CreditNoteComponent, {
      header: 'Nota de Crédito',
      width: '35vw',
      modal: true,
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw',
      },
    });
  }

  showSuspendServiceUser() {
    this.ref = this.dialogService.open(SuspendServiceUserComponent, {
      header: 'Suspender Servicio',
      width: '35vw',
      modal: true,
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw',
      },
    });
  }

  showCollectionNotices(){
    this.ref = this.dialogService.open(CollectionNoticesComponent, {
      header: 'Notificaciones de Cobro',
      width: '35vw',
      modal: true,
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw',
      },
    });
  }

  isFormValid(): boolean {
    return this.customersForm.valid && (this.items.length > 0 || this.cxcItems.length > 0);
  }

  logout() {
    // Eliminar todo del localStorage
    localStorage.clear();
    console.log('Logged out successfully');
    // Redirigir a la página de inicio de sesión
    this.router.navigateByUrl('/login');
  }
}
