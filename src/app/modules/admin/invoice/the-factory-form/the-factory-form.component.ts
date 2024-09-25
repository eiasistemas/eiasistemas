import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../../environments/environment.development';

@Component({
  selector: 'app-documento-electronico',
  templateUrl: './the-factory-form.component.html',
  styleUrls: ['./the-factory-form.component.scss']
})
export class DocumentoElectronicoComponent implements OnInit {
  private api: string = environment.apiTheFactory;

  documentoElectronicoForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    
  }

  ngOnInit(): void {
    // Puedes inicializar más lógica aquí si es necesario
  }

  
}