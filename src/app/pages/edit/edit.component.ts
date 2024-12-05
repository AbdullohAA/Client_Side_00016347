import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule, RouterModule],
  templateUrl: './edit.component.html',
  styleUrls: ['../../app.component.css'],
})
export class EditComponent implements OnInit {
  id: string | null = null; // Recipe ID from the route
  book: any = {}; // Stores the full book data
  recipeForm: any = {
    title: '',
    description: '',
    ingredients: '',
    steps: '',
    recipeBookId: null, // Initialize as null
    dto: {}  // Ensure dto is included
  }; // Stores the form data for a new or existing recipe

  constructor(public route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.getBookById(this.id); // Fetch book if an ID exists
    }
  }

  updateRecipe(recipe: any): void {
    // Add missing fields if not part of the editable form
    recipe.recipeBookId = this.book.id; // Ensure recipeBookId is included
  
    // Log the updated recipe
    console.log('Updated Recipe:', recipe);
  
    // Send the PUT request
    this.http.put(`http://localhost:5270/api/Recipes/${recipe.id}`, recipe).subscribe({
      next: (response:any) => {
        console.log('Recipe updated successfully:', response);
        alert('Recipe updated successfully!');
      },
      error: (err:any) => {
        console.error('Error updating recipe:', err);
        alert('An error occurred while updating the recipe. Please try again.');
      },
    });
  }

  deleteRecipe(id: number): void {
    if (confirm('Are you sure you want to delete this recipe?')) {
      this.http.delete(`http://localhost:5270/api/Recipes/${id}`).subscribe({
        next: (response:any) => {
          console.log('Recipe deleted successfully:', response);
          alert('Recipe deleted successfully!');
          // Optionally refresh the list of recipes or remove the deleted recipe from the view
          this.book.recipes = this.book.recipes.filter((recipe: any) => recipe.id !== id);
        },
        error: (err:any) => {
          console.error('Error deleting recipe:', err);
          alert('An error occurred while deleting the recipe. Please try again.');
        },
      });
    }
  }
  

  getBookById(id: string): void {
    this.http.get(`http://localhost:5270/api/RecipeBooks/${id}`).subscribe({
      next: (response: any) => {
        this.book = response.data; // Assign the entire book object
        console.log('Book fetched:', this.book);

        // After book is fetched, set recipeBookId in recipeForm
        this.recipeForm.recipeBookId = this.book.id;
      },
      error: (err:any) => {
        console.error('Error fetching book:', err);
      },
    });
  }



  addRecipe(): void {
    // Ensure that recipeBookId is set correctly
    if (!this.recipeForm.title || !this.recipeForm.ingredients || !this.recipeForm.recipeBookId) {
      alert('Please fill in the required fields!');
      return;
    }

    // Log the recipe form data before sending it
    console.log('Recipe Form:', this.recipeForm);

    // Make the POST request to the server
    this.http.post('http://localhost:5270/api/Recipes', this.recipeForm).subscribe({
      next: (response:any) => {
        console.log('Recipe added successfully:', response);
        alert('Recipe added successfully!');
        // Reset the form after successful submission
        this.recipeForm = { 
          title: '', 
          description: '', 
          ingredients: '', 
          steps: '', 
          recipeBookId: null, 
          dto: {} 
        };
      },
      error: (err:any) => {
        console.error('Error adding recipe:', err);
        alert('An error occurred while adding the recipe. Please try again.');
      },
    });
  }

 
  
}
