import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/pages/login/login.component';
import { CategoryListComponent } from './components/pages/category/category-list/category-list.component';
import { HeaderComponent } from './components/bootstrap/header/header.component';
import { ModalComponent } from './components/bootstrap/modal/modal.component';
import { CategoryNewModalComponent } from './components/pages/category/category-new-modal/category-new-modal.component';
import { CategoryEditModalComponent } from './components/pages/category/category-edit-modal/category-edit-modal.component';
import { OverlayComponent } from './components/bootstrap/overlay/overlay.component';
import { CategoryDeleteModalComponent } from './components/pages/category/category-delete-modal/category-delete-modal.component';
import { ProductListComponent } from './components/pages/product/product-list/product-list.component';
import { ProductNewModalComponent } from './components/pages/product/product-new-modal/product-new-modal.component';
import { ProductEditModalComponent } from './components/pages/product/product-edit-modal/product-edit-modal.component';
import { ProductDeleteModalComponent } from './components/pages/product/product-delete-modal/product-delete-modal.component';
import { ProductCategoryListComponent } from './components/pages/product-category/product-category-list/product-category-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductCategoryNewComponent } from './components/pages/product-category/product-category-new/product-category-new.component';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { UserListComponent } from './components/pages/user/user-list/user-list.component';
import { UserNewModalComponent } from './components/pages/user/user-new-modal/user-new-modal.component';
import { UserEditModalComponent } from './components/pages/user/user-edit-modal/user-edit-modal.component';
import { UserDeleteModalComponent } from './components/pages/user/user-delete-modal/user-delete-modal.component';
import { CategorySearchComponent } from './components/pages/category/category-search/category-search.component';
import { CategoryFormComponent } from './components/pages/category/category-form/category-form.component';
import { FieldErrorComponent } from './components/bootstrap/field-error/field-error.component';
import { IsInvalidDirective } from './directives/is-invalid.directive';
import { ListErrorsComponent } from './components/bootstrap/list-errors/list-errors.component';
import { CardErrorComponent } from './components/bootstrap/card-error/card-error.component';
import { ProductFormComponent } from './components/pages/product/product-form/product-form.component';
import { ProductInputListComponent } from './components/pages/product-input/product-input-list/product-input-list.component';
import { ProductInputSearchComponent } from './components/pages/product-input/product-input-search/product-input-search.component';
import { ProductSearchComponent } from './components/pages/product/product-search/product-search.component';
import { ProductInputNewModalComponent } from './components/pages/product-input/product-input-new-modal/product-input-new-modal.component';


@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        CategoryListComponent,
        HeaderComponent,
        ModalComponent,
        CategoryNewModalComponent,
        CategoryEditModalComponent,
        OverlayComponent,
        CategoryDeleteModalComponent,
        ProductListComponent,
        ProductNewModalComponent,
        ProductEditModalComponent,
        ProductDeleteModalComponent,
        ProductCategoryListComponent,
        ProductCategoryNewComponent,
        UserListComponent,
        UserNewModalComponent,
        UserEditModalComponent,
        UserDeleteModalComponent,
        CategorySearchComponent,
        CategoryFormComponent,
        FieldErrorComponent,
        IsInvalidDirective,
        ListErrorsComponent,
        CardErrorComponent,
        ProductFormComponent,
        ProductInputListComponent,
        ProductInputSearchComponent,
        ProductSearchComponent,
        ProductInputNewModalComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot({
            positionClass: 'toast-bottom-right',
        }),
        NgbModule,
        NgxPaginationModule
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptorService,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
