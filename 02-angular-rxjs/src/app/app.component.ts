import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { SearchboxComponent } from './searchbox/searchbox.component';
import { PostsService } from './services/posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('search', { static: true }) searchBox: SearchboxComponent;

  public posts;
  public posts$: Observable<any>;
  public postsSubscription: Subscription;

  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    this.posts$ = this.searchBox.value.pipe(
      switchMap((val) => this.postsService.search(val))
    );

    this.postsSubscription = this.posts$.subscribe(
      (data) => (this.posts = data)
    );
  }

  ngOnDestroy(): void {
    this.postsSubscription.unsubscribe();
  }
}
