import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Import FormsModule

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, FormsModule], // Add FormsModule here
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-tailwind-router';
  newBookName = ''; // Define the property to hold the book name

  constructor(private http: HttpClient) {}

  addBook() {
    if (this.newBookName.trim() === '') {
      alert('Please enter a book name.');
      return;
    }

    const bookData = {
      name: this.newBookName
    };

    // Send the POST request
    this.http.post('http://localhost:5270/api/RecipeBooks', bookData)
      .subscribe({
        next: (response:any) => {
          console.log('Book added successfully:', response);
          this.newBookName = ''; // Clear the input field after successful addition
          window.location.reload()
        },
        error: (error:any) => {
          console.error('Error adding book:', error);
        }
      });
  }
}
