import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutes } from "./app.routes";

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { FlexLayoutModule } from '@angular/flex-layout';
import { environment } from '../environments/environment';
import { AuthService } from './auth.service';

import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartService } from './cart.service';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { BottomBarComponent } from './bottom-bar/bottom-bar.component';
import { AdminComponent } from './admin/admin.component';
import { EquipmentService } from './equipment.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,

    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    FlexLayoutModule,

    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'admin', component: AdminComponent},
      { path: 'shop', component: ProductListComponent },
      { path: 'account', component: LoginComponent },
      { path: 'products/:productId', component: ProductDetailsComponent },
      { path: 'cart', component: CartComponent },
    ])
  ],
  declarations: [
    AppComponent,
    TopBarComponent,
    ProductListComponent,
    ProductDetailsComponent,
    CartComponent,
    HomeComponent,
    LoginComponent,
    BottomBarComponent,
    AdminComponent
  ],
  bootstrap: [ AppComponent ],
  providers: [CartService, AuthService, EquipmentService]
})
export class AppModule { }
