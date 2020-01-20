import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'demo';
  currentValue: number = 0;
  secondValue: number[] = [0, 0];
  time = 2000;
  changeValue() {
    this.currentValue = Math.floor(Math.random() * 100);
    this.secondValue = [ this.currentValue*.3 ,  this.currentValue*.7]
    this.secondValue = [ {step:this.currentValue*.3, color:'#009688'} , {step:this.currentValue*.7,color: '#dbf7f7' }] as any
    this.secondValue = [ {step:this.currentValue*.3, color:'red'} , {step:this.currentValue*.7,color: 'orange' }] as any
  }

  ngOnInit() {
    setInterval(() => {
      this.changeValue()
    }, this.time);
  }
}
