import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SharedServiceService } from '../../../../@core/services/shared-service.service';
import { InvoceFormService } from '../../../../@core/services/invoce-form.service';

@Component({
  selector: 'app-collection-notices',
  templateUrl: './collection-notices.component.html',
  styleUrl: './collection-notices.component.scss'
})
export class CollectionNoticesComponent implements OnInit {
  filteredData: any[] = [];
  totalCxc: number = 0;
  selectedCustomer: any = null;
  selectedItems: any[] = [];
  

  constructor(private sharedService: SharedServiceService, private invoiceFormService: InvoceFormService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.sharedService.selectedCustomer$.subscribe(customer => {
      this.selectedCustomer = customer;
      console.log('Cliente seleccionado:', this.selectedCustomer);
    });

    this.sharedService.filteredData$.subscribe(data => {
      this.filteredData = data;
      console.log('Datos filtrados recibidos:', this.filteredData);
      this.calculateTotalCxc();
    });
  }

  calculateTotalCxc(): void {
    this.totalCxc = this.filteredData.length;
  }

  onRowClick(item: any): void {
    const index = this.selectedItems.findIndex(selectedItem => selectedItem.numerod === item.numerod);
    if (index === -1) {
      this.selectedItems.push(item);
    } else {
      this.selectedItems.splice(index, 1);
    }
    localStorage.setItem('cxc', JSON.stringify(this.selectedItems));
    localStorage.setItem('selectedNumerod', item.numerod); // Guardar el numerod de la cxc seleccionada
    this.sharedService.updateCxcItems(this.selectedItems); // Emitir los cambios

    // Obtener el selectedNumerod del localStorage
    const selectedNumerod = localStorage.getItem('selectedNumerod');
    this.cdr.detectChanges(); // Forzar la detección de cambios

    if (selectedNumerod) {
      // Obtener los items y filtrar basados en el selectedNumerod
      this.invoiceFormService.getItems().subscribe(
          (data) => {
            const filteredData = data.filter(item => item.numerod === selectedNumerod && item.tipofac === "H");
            console.log('Filtered items:', filteredData);

            // Obtener los items existentes de itemFact en localStorage
          const existingItems = JSON.parse(localStorage.getItem('itemFact')) || [];

          // Agregar los nuevos items filtrados a la lista existente
          const updatedItems = [...existingItems, ...filteredData];

          // Guardar los items actualizados en el localStorage bajo la clave itemFact
          localStorage.setItem('itemFact', JSON.stringify(updatedItems));
          this.cdr.detectChanges(); // Forzar la detección de cambios
          window.location.href = window.location.href;
          },
          (error) => {
            console.error('Error fetching items:', error);
          }
          );
        } else {
          console.error('No selectedNumerod found in localStorage');
        }
        
    }
}
