import { Component, OnInit } from '@angular/core';
import { _bookListService } from './_bookList.service';
class book {
  id: number;
  title: string;
  rate: string;
  auther: string;
  isSold: boolean;
  check: boolean;
  description?: string
}

@Component({
  selector: 'app-bookList',
  templateUrl: './bookList.component.html',
  styleUrls: ['./bookList.component.scss']
})
export class BookListComponent implements OnInit {
  books!: book[];
  selectedProducts!: any;
  clickd: boolean = false

  constructor(
    private readonly bookListService: _bookListService,
  ) { }

  ngOnInit() {
    this.getAllBooks()
  }

  getAllBooks() {
    this.bookListService.getAllBooks().subscribe({
      next: (value) => {
        let list = [];
        for (let i = 0; i < value.length; i++) {
          let b = new book();
          b.id = value[i].bookId
          b.auther = value[i].auther
          b.rate = value[i].rate
          b.title = value[i].title
          b.isSold = value[i].isSold
          b.check = false
          if (!value[i].isSold) { list.push(b); }

        }
        this.books = list
      },
    })
  }


  updateStatus() {
    let checkd = this.books.filter(f => f.check == true);
    checkd.forEach(f => {
      let book = {
        "bookId": f.id,
        "title": f.title,
        "auther": f.auther,
        "rate": f.rate,
        "isSold": f.id,
        "description": f.description
      }
      this.bookListService.updateBook(f.id, book).subscribe({
        next: (value) => {
          this.getAllBooks()
        },
      })
    })
  }


  selectAll() {
    this.clickd = !this.clickd
    this.books.forEach(f => f.check = this.clickd);
    console.log(this.books);
  }

}
