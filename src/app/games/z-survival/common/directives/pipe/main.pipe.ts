import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";

import { AttrArrayPipe } from "./attrArray.pipe";

@NgModule({
  declarations:[AttrArrayPipe],
  imports:[CommonModule],
  exports:[AttrArrayPipe]
})

export class MainPipe{}
