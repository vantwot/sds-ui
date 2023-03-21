import React, { useState } from 'react';

/* Styles */
import './App.css';

/* Utilities */
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { useLocation } from 'react-router';
import ScrollToTop from './utils/ScrollToTop';

/* Components */
import FilterDrawer from './components/FilterDrawer';
import Header from './layouts/Header';
import Footer from './layouts/Footer';

/* Modules */
import Authors from './components/modules/Authors';
import Groups from './components/modules/Groups';
import Home from './components/modules/Home';
import Institutions from './components/modules/Institutions';
import Trends from './components/modules/Trends';
import Compendium from './components/modules/Compendium';
import Calls from './components/modules/Calls';
import NotFound from './components/modules/NotFound';
import Policies from './components/modules/Policies';
import Regulations from './components/modules/Regulations';
import Techdocs from './components/modules/Techdocs';
import SearchResult from './components/modules/SearchResult';
import Subjects from './components/modules/Subjects';
import UserManual from './components/modules/UserManual';
import Metrics from './components/modules/Metrics';

/* UI Library Components */
import { Layout, BackTop } from 'antd';

function App() {
  const location = useLocation();
  const [URL, setURL] = useState(location.pathname + location.search);
  const [filters, setFilters] = useState(null);
  const [home, setHome] = useState(false);
  const core = { URL, setURL, filters, setFilters, home, setHome };

  return (
    <Router>
      <ScrollToTop />
      <BackTop />
      <FilterDrawer core={core} />
      <Layout>
        <Header core={core} />
        <Layout.Content id="content-box">
          <Switch>
            <Redirect exact from="/" to="/app" />
            <Route exact path="/app">
              <Home core={core} />
            </Route>
            <Route exact path="/app/search">
              <SearchResult core={core} />
            </Route>
            <Route exact path="/app/authors">
              <Authors core={core} />
            </Route>
            <Route exact path="/app/groups">
              <Groups core={core} />
            </Route>
            <Route exact path="/app/institutions">
              <Institutions core={core} />
            </Route>
            <Route exact path="/app/subjects">
              <Subjects core={core} />
            </Route>
            <Route exact path="/app/manual">
              <UserManual core={core} />
            </Route>
            <Route exact path="/app/trends">
              <Trends core={core} />
            </Route>
            <Route exact path="/app/compendium">
              <Compendium core={core} />
            </Route>
            <Route exact path="/app/calls">
              <Calls core={core} />
            </Route>
            <Route exact path="/app/regulations">
              <Regulations core={core} />
            </Route>
            <Route exact path="/app/techdocs">
              <Techdocs core={core} />
            </Route>
            <Route exact path="/app/policies">
              <Policies core={core} />
            </Route>
            <Route exact path="/app/metrics">
              <Metrics core={core} />
            </Route>
            <Route>
              <NotFound core={core} />
            </Route>
          </Switch>
        </Layout.Content>
        <Footer core={core} />
      </Layout>
    </Router>
  );
}

export default App;
