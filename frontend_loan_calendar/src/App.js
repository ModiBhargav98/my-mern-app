import React, { Component } from "react";
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import EmiCalculator from "./components/EmiCalculator";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="container my-5 text-center">
          <div className="alert alert-danger mx-auto" style={{ maxWidth: "500px" }} role="alert">
            <h4 className="alert-heading">Something went wrong</h4>
            <p>An unexpected error occurred. Please return to login and try again.</p>
            <button
              className="btn btn-primary"
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.href = "/";
              }}
            >
              Go to Login
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/emicalculator" element={<EmiCalculator />} />
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;

