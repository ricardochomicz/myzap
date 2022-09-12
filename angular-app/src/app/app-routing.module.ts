import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryListComponent } from './components/pages/category/category-list/category-list.component';
import { LoginComponent } from './components/pages/login/login.component';
import { ProductCategoryListComponent } from './components/pages/product-category/product-category-list/product-category-list.component';
import { ProductListComponent } from './components/pages/product/product-list/product-list.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'categories/list',
        component: CategoryListComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'product/:product/categories',
        component: ProductCategoryListComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'products/list',
        component: ProductListComponent,
        canActivate: [AuthGuard]
    },
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
