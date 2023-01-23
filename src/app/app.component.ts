import { Component } from '@angular/core';

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private title = 'Problem Çözme Teknikleri';
  
  getTitle() {
    return this.title;
  }
}
