import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-selfie',
  templateUrl: './selfie.component.html',
  styleUrls: ['./selfie.component.scss'],
  inputs: ['w', 'h', 'imgs', 'text']
})
export class SelfieComponent implements OnInit {
	w: number;
	h: number;
  imgs: Array<string>;
  text: Array<string>;
  slides: Array<any> = [];

  constructor() {
    if(this.imgs&&this.text&&this.imgs.length===this.text.length){
      for (let i = 0; i < this.imgs.length; i++) {
        this.addSlide();
      }
    } else {
      console.log(this.imgs);
      console.log(this.text);
    }
  }

  addSlide(): void {
    // let newWidth = 600 + this.slides.length + 1;
    this.slides.push({
      image: `/img/selfie/` + this.imgs[this.slides.length % this.imgs.length] + '.jpg',
      text: `${this.text[this.slides.length % this.imgs.length]}`
    });
  }

  ngOnInit() {
  }

}
