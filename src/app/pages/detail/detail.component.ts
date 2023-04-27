import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { EndpointService } from '../../services/endpoint.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnDestroy {
  private destroy = new Subject<void>();
  data!: any;
  loading = true;

  constructor(private endpointService: EndpointService, private activeRoute: ActivatedRoute) {
    this.activeRoute.params.subscribe((params: any) => {
      this.getSpecificRecord(params.ID);
    });
  }

  private getSpecificRecord(recordID: string) {
    if (!this.endpointService.token) {
      this.endpointService.getToken().pipe(takeUntil(this.destroy)).subscribe({
        next: () => this.getSpecificRecord(recordID)
      });
    } else {
      this.endpointService.getRecord(recordID).pipe(takeUntil(this.destroy)).subscribe({
        next: (response: any) => {
          if (response) {
            this.data = response;
            this.loading = false;
          }
        }
      });
    }
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }

}
