import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-for-user',
  templateUrl: './list-for-user.component.html',
  styleUrls: ['./list-for-user.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ListForUserComponent implements OnInit {

  list_hash = this.route.snapshot.paramMap.get('list_hash');
  user_hash = this.route.snapshot.paramMap.get('user_hash');

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
  }

  // get info

}
