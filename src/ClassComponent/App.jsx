import React, { Component } from "react";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Home from "./Home";

export default class App extends Component {
  constructor(){
    super()
    this.state={
      language:"hi",
      search:""
    }
  }
  changeLanguage=(data)=>{
    this.setState({language:data})
  }
  changeSearch=(data)=>{
    this.setState({search:data})
  }
  render() {
    return (
      <BrowserRouter>
        <Navbar changeLanguage={this.changeLanguage} changeSearch={this.changeSearch} />
            <Routes>
                <Route path="/" element={<Home search={this.state.search} language={this.state.language} q="All" />} />
                <Route path="/All" element={<Home search={this.state.search} language={this.state.language} q="All" />} />
                <Route path="/Politics" element={<Home search={this.state.search} language={this.state.language} q="Politics" />} />
                <Route path="/Education" element={<Home search={this.state.search} language={this.state.language} q="Education" />} />
                <Route path="/Crime" element={<Home search={this.state.search} language={this.state.language} q="Crime" />} />
                <Route path="/Entertainment" element={<Home search={this.state.search} language={this.state.language} q="Entertainment" />} />
                <Route path="/Science" element={<Home search={this.state.search} language={this.state.language} q="Science" />} />
                <Route path="/Technology" element={<Home search={this.state.search} language={this.state.language} q="Technology" />} />
                <Route path="/Sports" element={<Home search={this.state.search} language={this.state.language} q="Sports" />} />
                <Route path="/Cricket" element={<Home search={this.state.search} language={this.state.language} q="Cricket" />} />
                <Route path="/Jokes" element={<Home search={this.state.search} language={this.state.language} q="Jokes" />} />
                <Route path="/Hindi" element={<Home search={this.state.search} language={this.state.language} q="Hindi" />} />
                <Route path="/English" element={<Home search={this.state.search} language={this.state.language} q="English" />} />
                
            </Routes>
        <Footer />
      </BrowserRouter>
    );
  }
}
