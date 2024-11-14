import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { _bookListService } from '../bookList/_bookList.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {

  bookId: string;
  book!: any;

  constructor(private route: ActivatedRoute,
    private readonly bookListService: _bookListService,
  ) { }

  ngOnInit(): void {
    this.updateBook();
  }

  updateBook() {
    this.bookId = this.route.snapshot.paramMap.get('id')!;
    this.bookListService.getBookById(this.bookId).subscribe({
      next: (book) => {
        this.book = book
      },
    })
  }
}
