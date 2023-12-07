import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Dashboard from "./components/pages/Dashboard";
import Products from "./components/pages/product/Products";
import AddProduct from "./components/pages/product/AddProduct";
import EditProduct from "./components/pages/product/EditProduct";
import Categories from "./components/pages/category/Categories";
import Orders from "./components/pages/order/Orders";
import EditOrder from "./components/pages/order/EditOrder";
import Users from "./components/pages/user/Users";
import NotFound from "./components/pages/NotFound";
import AuthRoute from "./AuthRoute";
import PrivateRouter from "./PrivateRouter";
import Toast from "./components/LoadingError/Toast";
import './App.css';
import "react-toastify/dist/ReactToastify.css";
import Setting from "./components/pages/setting/index";
import LogoSetting from "./components/pages/setting/logo";
import ColorSetting from './components/pages/setting/color';
import firebase from 'firebase/app';
import 'firebase/storage';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBsmxbOGyWVAr0C-j8YGVuM9F-7v8_R6zQ",
  authDomain: "mystore-11870.firebaseapp.com",
  projectId: "mystore-11870",
  storageBucket: "mystore-11870.appspot.com",
  messagingSenderId: "197350777962",
  appId: "1:197350777962:web:5ec1ec2aaf26580c5b9613",
  measurementId: "G-D9DYSTLZM1"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);



function App() {
  return (
    <>
      <Toast/>
      <Router>
        <Switch>
          <PrivateRouter path="/" component={Dashboard} exact />
          <AuthRoute path="/login" component={Login} />
          <AuthRoute path="/register" component={Register} />
          <PrivateRouter path="/dashboard" component={Dashboard} />
          <PrivateRouter path="/products" component={Products} />
          <PrivateRouter path="/product/add" component={AddProduct} />
          <PrivateRouter path="/product/edit/:id" component={EditProduct} />
          <PrivateRouter path="/categories" component={Categories} />
          <PrivateRouter path="/orders" component={Orders} />
          <PrivateRouter path="/order/edit/:id" component={EditOrder} />
          <PrivateRouter path="/users" component={Users} />
          <PrivateRouter path="/storesetting" component={Setting} />
          <PrivateRouter path="/logosetting" component={LogoSetting} />
          <PrivateRouter path="/colorsetting" component={ColorSetting} />



          <PrivateRouter path="*" component={NotFound} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
