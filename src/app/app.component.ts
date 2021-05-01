import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'meeting-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Meeting Room Manager';

  public constructor(private titleService: Title) {
    this.titleService.setTitle(this.title);
  }
}
