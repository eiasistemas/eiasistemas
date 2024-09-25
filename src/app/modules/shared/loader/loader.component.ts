import { Component, OnInit, signal } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { Observable, tap } from 'rxjs';
import { loaderAnimation } from '../../../@core/utils/page-animation';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',

})
export class LoaderComponent {
 
}
