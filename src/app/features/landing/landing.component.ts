import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SeoService } from '../../seo.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  constructor(private seo: SeoService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    console.log(this.route.snapshot.data);
    const { title, description } = this.route.snapshot.data;
    this.seo.setTags({ title, description });
  }

}
