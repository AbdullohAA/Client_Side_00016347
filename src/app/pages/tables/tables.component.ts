import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tables',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule, HttpClientModule], // Include HttpClientModule
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css'],
})
export class TablesComponent implements OnInit {
  recipeBooks: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.fetchRecipeBooks();
  }

  fetchRecipeBooks() {
    this.http.get('http://localhost:5270/api/RecipeBooks').subscribe({
      next: (response: any) => {
        this.recipeBooks = response.data;
        console.log(this.recipeBooks);
      },
      error: (err) => {
        console.error('Error fetching recipe books:', err);
      },
    });
  }

  deleteBook(id: number) {
    this.http.delete(`http://localhost:5270/api/RecipeBooks/${id}`).subscribe({
      next: () => {
        console.log(`Book with ID ${id} deleted successfully.`);
        this.recipeBooks = this.recipeBooks.filter((book) => book.id !== id);
      },
      error: (err) => {
        console.error('Error deleting book:', err);
      },
    });
  }

  editBook(id: number) {
    this.router.navigate([`/edit/${id}`]); // Navigates to /edit/1 for id = 1
  }
  
}

