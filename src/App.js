import React, { Component } from 'react';
import './App.css';
import TOC from './Component/TOC';
import ReadContent from './Component/ReadContent';
import Subject from './Component/Subject';
import Control from './Component/Control';
import CreateContent from './Component/CreateContent';






class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: "read",
      selected_content_id: 2,
      subject: { title: "WEB", sub: "world wide web" },
      welcome: { title: "Welcome!", desc: "Hello React!" },
      contents: [{ id: 1, title: "HTML", desc: "HTML is hyper text markupu language!" },
      { id: 2, title: "CSS", desc: "CSS is for design!" },
      { id: 3, title: "Javascript", desc: "Javascript is for interactive!" }
      ]
    }
  }

  render() {
    console.log("App render");

    var _title, _desc, _article = null;

    if (this.state.mode === "welcome") {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title = {_title} desc = {_desc}></ReadContent> 
    }
    else if (this.state.mode === "read") {

      var i = 0;

      while (i < this.state.contents.length) {
        var data = this.state.contents[i];
        if (data.id === this.state.selected_content_id) {
          _title = data.title;
          _desc = data.desc;
          break;
        }
        i = i + 1;
      }
      _article = <ReadContent
        title={_title}
        desc={_desc}
      ></ReadContent>
    }
    else if (this.state.mode === 'creat'){
      _article = <CreateContent title = {_title} desc = {_desc}></CreateContent>
    }
    return (
      <div className="App">
        <Subject
          title={this.state.subject.title}
          subtitle={this.state.subject.sub}
          onChangePage={function () {
            this.setState({ mode: 'welcome' });
          }.bind(this)}
        >
        </Subject>
        {/* <header>
          <h1><a href = "/" onClick = {function(e){
            console.log(e);
            this.setState({
              mode : 'welcome'
            });
            e.preventDefault();
            // debugger;
          }.bind(this)}>{this.state.subject.title}</a></h1>
          {this.state.subject.subtitle}
        </header> */}

        <TOC
          data={this.state.contents}
          onChangePage={function (id) {
            this.setState({
              mode: 'read',
              selected_content_id: Number(id)
            });

          }.bind(this)}
        ></TOC>

        <Control
          onChangePage={function (_mode) {
            this.setState({ mode: _mode });
          }.bind(this)}
        >
        </Control>

        {/* <Content
          title={_title}
          desc={_desc}
        ></Content> */}

        {_article}
      </div>
    );
  }
}

export default App;
