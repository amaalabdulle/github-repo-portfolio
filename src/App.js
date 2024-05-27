import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary'; // Import ErrorBoundary
import Navbar from './pages/navbar';
import Repos from './pages/repos';
import SingleRepo from './pages/single-repo';
import Page404 from './pages/page404';

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div>
      <h2>Something went wrong:</h2>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <Navbar />
          </div>
          <div className="col-md-12 d-flex justify-content-center">
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <Routes>
                <Route path="/" element={<Repos />} />
                <Route path="/repos" element={<Repos />} />
                <Route path="/repos/:repoName" element={<SingleRepo />} />
                <Route path="*" element={<Page404 />} />
              </Routes>
            </ErrorBoundary>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;


