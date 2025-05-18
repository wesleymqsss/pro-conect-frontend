import { NgModule } from '@angular/core';
import { FocusTrapModule } from 'primeng/focustrap';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { IconField, IconFieldModule } from 'primeng/iconfield';
import { InputIcon, InputIconModule } from 'primeng/inputicon';
import { AutoFocusModule } from 'primeng/autofocus';
import { Ripple } from 'primeng/ripple';
import { Toast } from 'primeng/toast';
import { SplitButton } from 'primeng/splitbutton';
import { Toolbar } from 'primeng/toolbar';
import { DrawerModule } from 'primeng/drawer';
import { AvatarModule } from 'primeng/avatar';
import { StyleClass } from 'primeng/styleclass';
import { Menubar } from 'primeng/menubar';
import { Dialog } from 'primeng/dialog';
import { Message } from 'primeng/message';

@NgModule({
  imports: [
    FocusTrapModule,
    ButtonModule,
    FormsModule,
    InputTextModule,
    CheckboxModule,
    IconFieldModule,
    InputIconModule,
    AutoFocusModule,
    Ripple,
    Toast,
    Toolbar,
    ButtonModule,
    SplitButton,
    IconField,
    InputIcon,
    DrawerModule, 
    ButtonModule, 
    Ripple, 
    AvatarModule, 
    StyleClass,
    Menubar,
    Dialog,
    Message,
  ],
  exports: [
    FocusTrapModule,
    ButtonModule,
    FormsModule,
    InputTextModule,
    CheckboxModule,
    IconFieldModule,
    InputIconModule,
    AutoFocusModule,
    Ripple,
    Toast,
    Toolbar,
    ButtonModule,
    SplitButton,
    IconField,
    InputIcon,
     DrawerModule, 
    ButtonModule, 
    Ripple, 
    AvatarModule, 
    StyleClass,
    Menubar,
    Dialog,
    Message,
  ]
})
export class MaterialModule { }