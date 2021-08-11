import { Navigate } from 'react-router-dom';
import DashboardLayout from './components/DashboardLayout';
import MainLayout from './components/MainLayout';
import Account from './pages/Account';
import CustomerList from './pages/CustomerList';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Register from './pages/Register';
import Settings from './pages/Settings';
import CategoryList from './pages/category/CategoryList';
import CreateCategory from './pages/category/CreateCategory';
import EditCategory from './pages/category/EditCategory';
import ProductList from './pages/product/ProductList';
import AddProduct from './pages/product/AddProduct';
import EditProduct from './pages/product/EditProduct';

const routes = [
  {
    path: 'management',
    element: <DashboardLayout />,
    children: [
      { path: 'account', element: <Account /> },
      { path: 'customers', element: <CustomerList /> },
      { path: 'categories', element: <CategoryList /> },
      { path: 'categories/create', element: <CreateCategory /> },
      { path: 'categories/:categoryId/edit', element: <EditCategory /> },
      { path: 'products', element: <ProductList /> },
      { path: 'products/add', element: <AddProduct /> },
      { path: 'products/:productId/edit', element: <EditProduct /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'settings', element: <Settings /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: '404', element: <NotFound /> },
      { path: '/', element: <Navigate to="/management/dashboard" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
