import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public user: any;
  public token: any;

  constructor(
    private _router: Router,
    private _userService: UserService
  ) {
    this.token = this._userService.getToken();
  }

  ngOnInit(): void {
    
    this.user = this._userService.userData(this.token).subscribe(
      result=>{
        this.user=result
        this._userService.userData(this.token).subscribe(
          resultUser=>{
            localStorage.setItem('currentUser',JSON.stringify(resultUser));


            this._userService.logged(this._userService.getCurrentUser());
            
          },
          error=>{
            this._router.navigate(['/login'])
    
          }
        );
      },
      error=>{
        this._userService.logout()
        this._router.navigate(['/login'])
        console.log(error);
        
        
      }
    )

   
  }

  

}
