import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EditRoutingModule } from './edit-routing.module';
import { EditPage } from './edit.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, EditRoutingModule],
  declarations: [EditPage]
})
export class EditPageModule {}
