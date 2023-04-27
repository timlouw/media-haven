import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { EndpointService } from 'src/app/services/endpoint.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent {
  private destroy = new Subject<void>();
  data!: any;
  loading = true;
  selectedImage!: string;

  constructor(private endpointService: EndpointService, private router: Router) {
    if (!this.endpointService.token) {
      this.endpointService.getToken().pipe(takeUntil(this.destroy)).subscribe({
        next: () => this.getRecords()
      });
    } else {
      this.getRecords();
    }
  }

  private getRecords() {
    this.endpointService.getRecords().pipe(takeUntil(this.destroy)).subscribe({
      next: (response: any) => {
        if (response) {
          this.data = response;
          this.loading = false;
        }
      }
    });
  }

  openImage(imageURL: string) {
    this.selectedImage = imageURL;
  }

  closeImage() {
    this.selectedImage = "";
  }

  goToDetails(recordID: string) {
    this.router.navigate(['/details/' + recordID]);
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
