import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { CourseDetailsComponent } from './components/course-details/course-details.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dash/home',
    pathMatch: 'full',
  },
  {
    path: 'dash',
    component: LayoutComponent,
    data: {
      title: 'Navigation'
    },
    children: [
      {
        path:'home',
        component: DashboardComponent
      },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'shopping-cart',
        component: ShoppingCartComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'wishlist',
        component: WishlistComponent
      },
      {
        path: 'course-details/:courseId',
        component: CourseDetailsComponent
      },
      {
        path: 'login',
        component: LoginComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
