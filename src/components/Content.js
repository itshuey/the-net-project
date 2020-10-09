import React, { Component } from "react";
import { Helmet } from "react-helmet";
import Fade from 'react-reveal/Fade';
import favicon from "./favicon.ico";
import net from "../../static/net.png";
import './Content.css';

export default class Content extends Component {
  constructor(props) {
    super(props);

    this.state = {
      slide: 0,
      mantra: -1,
      seenMantras: new Set(),
      allMantrasSeen: false,
    };

    this.slides = [
      {
        text: "Have you ever wondered if life has meaning?",
        size: "40px",
        delay: 3000,
      },
      {
        text: "Consider this...",
        size: "40px",
        delay: 3000,
      },
      {
        text: "Learn about and help yourself, to the best of your ability while enjoying the process of doing so",
        size: "40px",
        delay: 5000,
      },
    ]

    this.mantras = [
      "[ Test Mantra 1 ]",
      "[ Mantra 2 ]",
      "[ Mantra 3 ]",
      "[ Mantra 4 ]",
      "[ Mantra 5 ]",
    ]

    this.shuffleSlides = this.shuffleSlides.bind(this);
    this.addSeenMantra = this.addSeenMantra.bind(this);
  }

  shuffleSlides(delay) {
    if (this.state.slide < this.slides.length) {
      setTimeout(
        () => this.setState(
          { slide: this.state.slide+1 }
        ),
        delay
      );
    } else if (this.state.slide === this.slides.length) {
      this.setState({ slide: this.state.slide+1 });
    }
  }

  addSeenMantra(index) {
    if (index !== -1) this.state.seenMantras.add(index);
    if (this.state.seenMantras.size === 5)
      this.setState({ allMantrasSeen: true });
  }

  renderContent() {

    let content = (
      <div id="placeholder">
        the net (coming),&nbsp;
        <span class="reset" onClick={() => this.setState({
          slide: 0,
          seenMantras: new Set(),
          allMantrasSeen: false,
        })}>
          <i>reset</i>
        </span>
      </div>
    );

    if (this.state.slide < this.slides.length) {

      this.shuffleSlides(this.slides[this.state.slide].delay);
      let currentSlide = this.slides[this.state.slide];

      content = (
        <div class="content">
          <div
            class={this.state.slide === this.slides.length-1 ? "text rise" : "text"}
            style={{fontSize: currentSlide.size}}>
            <Fade distance={"40px"} spy={this.state.slide} appear bottom>
              {currentSlide.text}
            </Fade>
          </div>
        </div>
      );
    } else if (this.state.slide === this.slides.length) {

      let col1 = this.mantras.slice(0, 3).map((item, index) =>
        <div class={"circle"}
          onMouseOver={() => {
            this.setState({ mantra : index });
            this.addSeenMantra(index);
          }}
          onMouseLeave={() => this.setState({ mantra : -1 })}>
        </div>
      );

      let col2 = this.mantras.slice(3).map((item, index) =>
        <div class="circle"
          onMouseOver={() => {
            this.setState({ mantra : 3 + index });
            this.addSeenMantra(3+index);
          }}
          onMouseLeave={() => this.setState({ mantra : -1 })}>
        </div>
      );

      let enterNet = (<div class="enter-text" onClick={() => this.setState({ slide: 47 })}>
        CLICK TO ENTER THE NET
      </div>);

      let mantraText = this.state.mantra === -1 ?
        <div /> : <div class="mantra-text"><i>{this.mantras[this.state.mantra]}</i></div>;

      content = (
        <div class="content">
          <div class="text" style={{fontSize: this.slides[this.slides.length-1].size, top: "20%"}}>
              {this.slides[this.slides.length-1].text}
          </div>
          {mantraText}
          {this.state.allMantrasSeen && this.state.mantra === -1 && enterNet}
          <div class="circles">
            <div class="col">
              {col1}
            </div>
            <div class="col">
              {col2}
            </div>
          </div>
        </div>
      );
    }

    return content;
  }

  render() {

    const page = (
      <div class={"main"}>
        <Helmet>
          <title>THE NET PROJECT</title>
          <link rel="icon" href={favicon} type="image/x-icon" />
        </Helmet>
        {this.renderContent()}
      </div>
    );

    return page;
  }
}
