import { Component } from '@angular/core';
import { Icons } from '../../shared/fontawesome';

@Component({
  selector: 'meeting-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  icons = Icons;
}
