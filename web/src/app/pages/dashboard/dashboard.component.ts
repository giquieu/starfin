import { Component, ChangeDetectionStrategy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {

  constructor(
    private httpClient: HttpClient
  ) {};

  ngOnInit() {
    console.log('aqui eh bom');
    this.get();
  }

  get() {
    this.httpClient.get('api/entity')
    .subscribe(
      data => console.log(data),
      error => console.log(error)
    );
  }

}
