import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import InvoiceManagement from './components/InvoiceManagement';
import TaxFiling from './components/TaxFiling';
import Reports from './components/Reports';
import Navbar from './components/Navbar';
import { ApiProvider } from './context/ApiContext';

function App(){
  return (
    <ApiProvider> 
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" exact Component={Dashboard} />
          <Route path="/invoices" Component={InvoiceManagement} />
          <Route path="/tax-filling" Component={TaxFiling} />
          <Route path="reports" Component={Reports} />
        </Routes>
      </Router>
      </ApiProvider>
  );
}

export default App;

