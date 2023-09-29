import { DOCUMENT } from '@angular/common';
import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';

declare function calculateFinalNumber(numbLength: number, width: number, height: number, centerx: number, centery: number, zoomBoard: number, cR: number): any;
declare function initNumberArray(numbLength: number): any;
declare function randCircle(i: number, width: number, height: number, centerx: number, centery: number, value: number, zoom: number, cR: number): any;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'game-tim-so';
  private isShowSidenav = false;
  private x: any;
  private start = new Date().getTime();
  numberArray = [];
  public data = {
    numbLength: 0,
    font_size: 0,
    zoomBoard: 0,
    delta_top: 0,
    cR: 0
  };

  @ViewChild('mySidenav', { static: false }) private mySidenav: ElementRef;
  @ViewChild('vn_timer', { static: true }) public vn_timer: ElementRef;
  @ViewChild('vn_number', { static: false }) public vn_number: ElementRef;
  @ViewChild('myCanvas', { static: false }) public canvas: ElementRef;
  @ViewChild('gameZone', { static: false }) public gameZone: ElementRef;
  @ViewChild('game_over', { static: false }) public gameFinishPan: ElementRef;
  @ViewChild('final_timer', { static: false }) public final_timer: ElementRef;

  constructor(@Inject(DOCUMENT) document: Document) {
    // Change made below, so your variable is of type string, not any
    this.data.cR = 44;
    this.data.numbLength = 11,
      this.data.font_size = 22,
      this.data.zoomBoard = 33,
      this.data.delta_top = 55;
  }

  ngOnInit(): void {
  }

  public changeNav() {
    this.isShowSidenav = !this.isShowSidenav;
    if (this.mySidenav)
      if (this.isShowSidenav) {
        this.mySidenav.nativeElement.style.width = "250px";
      } else {
        this.mySidenav.nativeElement.style.width = "0";
      }
  }

  public closeFinish() {
    if (this.gameFinishPan)
      this.gameFinishPan.nativeElement.style.display = "none";
  }

  public closeNav() {
    this.isShowSidenav = false;
    if (this.mySidenav)
      this.mySidenav.nativeElement.style.width = "0";
  }

  private gameTimer() {

    // Get today's date and time
    let addTime = 0; // 3595;

    // Find the distance between now and the count down date
    let distance = addTime + ((Date.now() - this.start) / 1000) | 0;

    let hours = (distance / 3600) | 0;
    let minutes = ((distance / 60) | 0) - (hours * 60);
    let seconds = (distance % 60) | 0;

    let str_hours = hours < 10 ? "0" + hours : hours;
    let str_minutes = minutes < 10 ? "0" + minutes : minutes;
    let str_seconds = seconds < 10 ? "0" + seconds : seconds;

    // Display the result in the element with id="demo"
    if (this.vn_timer)
      this.vn_timer.nativeElement.innerHTML = `${str_hours}:${str_minutes}:${str_seconds}`;

    if (hours >= 1) {
      clearInterval(this.x);
    }
  }

  public startCounting() {
    this.start = new Date().getTime();
    if (this.vn_timer && this.vn_number) {
      this.vn_timer.nativeElement.innerHTML = `00:00:00`;
      this.vn_number.nativeElement.innerHTML = ``;
      this.Init();
      this.closeNav();
      this.closeFinish();

      localStorage.setItem("zoomBoard", `${this.data.zoomBoard}`);
      localStorage.setItem("numbLength", `${this.data.numbLength}`);
      localStorage.setItem("cR", `${this.data.cR}`);
      localStorage.setItem("font_size", `${this.data.font_size}`);
      localStorage.setItem("delta_top", `${this.data.delta_top}`);
      if (this.x) {
        clearInterval(this.x);
      }
      this.x = setInterval(() => { this.gameTimer(); }, 1000);
    } else {
      console.log('>>>>Something Wrong');
    }
  }

  public stopCounting() {
    if (this.vn_timer && this.vn_number && this.gameZone) {
      this.vn_timer.nativeElement.innerHTML = `00:00:00`;
      this.gameZone.nativeElement.innerHTML = '';
      this.vn_number.nativeElement.innerHTML = '';
      clearInterval(this.x);
    }
  }

  private Init() {
    if (this.canvas && this.gameZone && this.vn_number) {
      this.canvas.nativeElement.width = (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) - 20;
      this.canvas.nativeElement.height = (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight) - 200; //bottom
      const ctx = this.canvas.nativeElement.getContext("2d");
      let canvas = this.canvas.nativeElement;
      let lookNumber = 1;
      let cR = this.data.cR;
      let zoomBoard = this.data.zoomBoard;
      let numbLength = this.data.numbLength;
      let delta_top = this.data.delta_top;

      ctx.beginPath();

      let centerx = canvas.width / 2;
      let centery = canvas.height / 2;
      let j = 0, i = 0, k = 0;

      let finalNumber = calculateFinalNumber(numbLength, canvas.width, canvas.height, centerx, centery, zoomBoard, cR);
      this.data.numbLength = finalNumber;
      numbLength = this.data.numbLength;
      this.numberArray = initNumberArray(numbLength);
      this.gameZone.nativeElement.innerHTML = '';
      this.vn_number.nativeElement.innerHTML = '1';
      for (let j = 0, i = j + 1; j < numbLength || k < numbLength; j++, i = j + 1) {
        let c = randCircle(i, canvas.width, canvas.height, centerx, centery, this.numberArray[k], zoomBoard, cR);
        if (c != null) {
          let node = document.createElement("div");
          let textnode = document.createTextNode(c.value);
          node.appendChild(textnode);
          node.classList.add('numberCircle');
          // node.setAttribute('background-color', c.color);
          node.style.backgroundColor = c.backgroundColor;
          node.style.top = (c.rY + delta_top) + 'px';
          node.style.right = c.rX + 'px';
          node.style.width = c.R + 'px';
          node.style.height = c.R + 'px';
          node.style.lineHeight = c.R + 'px';
          node.style.fontSize = this.data.font_size + "px";
          node.style.color = c.color;
          let parent = this;

          node.addEventListener('click', function (event) {
            if (this.innerHTML == `${lookNumber}`) {
              // this.classList.add('selected');
              this.classList.add('hidden');
              lookNumber++;
              parent.vn_number.nativeElement.innerHTML = `${lookNumber}`;
              // If the count down is finished, write some text
              if (lookNumber > numbLength && parent.gameFinishPan && parent.final_timer && parent.vn_timer) {
                clearInterval(parent.x);
                parent.vn_number.nativeElement.innerHTML = ' - ';
                parent.gameFinishPan.nativeElement.style.display = "flex";
                parent.final_timer.nativeElement.innerHTML = parent.vn_timer.nativeElement.innerHTML;
              }
            } else {
              console.log('>>>>Click Fail');
            }

          });
          parent.gameZone?.nativeElement.appendChild(node);
          // mapNumberBall.put(c.getValue(), c);
          // drawCircle(ctx, c)
          k++;
        }
      }
    }
  }

}
