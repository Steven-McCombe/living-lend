import logo from './logo.svg';
import './App.css';
import Nav from "./components/nav"
import Home from "./pages/Home"
import Products from "./pages/Products"
import OrderHistory from "./pages/OrderHistory"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Checkout from "./pages/Checkout"
import NotFound from "./pages/NotFound"
import Detail from './pages/Detail';
import Success from './pages/Success';
import Dashboard from './pages/Dashboard';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { StoreProvider } from './utils/GlobalState';
const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
      <StoreProvider>
        <Nav />
          <Routes>
            <Route 
              path="/" 
              element={<Home />} 
            />
            <Route 
              path="/products" 
              element={<Products />} 
            />
            <Route 
              path="/Orderhistory" 
              element={<OrderHistory />} 
            />
            <Route 
              path="/Login" 
              element={<Login />} 
            />
            <Route 
              path="/Signup" 
              element={<Signup />} 
            />
            <Route
                path="/checkout"
                element={<Checkout />}
                />
            <Route 
                path="/products/:id" 
                element={<Detail />} 
              />
            <Route 
                path="/success" 
                element={<Success/>} 
              />
            <Route 
                path="/dashboard" 
                element={<Dashboard />} 
              />
            <Route 
              path="*" 
              element={<NotFound />} 
            />
          </Routes>
         </StoreProvider>

      </Router>
    </ApolloProvider>
  );
}

export default App;
