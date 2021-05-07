import { Component } from '@angular/core';
import { Icons } from '../../shared/fontawesome';

@Component({
  selector: 'meeting-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.css'],
})
export class HomePage {
  icons = Icons;
}
