import { Component, ViewChild, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { SearchboxComponent } from './searchbox/searchbox.component';
import { PostsService } from './services/posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild('search', { static: true }) searchBox: SearchboxComponent;

  public posts$: Observable<any>;

  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    this.posts$ = this.searchBox.value.pipe(
      switchMap((val) => this.postsService.search(val))
    );
  }

}
