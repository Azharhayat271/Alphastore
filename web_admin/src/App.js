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
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import Setting from "./components/pages/setting/index";
import LogoSetting from "./components/pages/setting/logo";
import ColorSetting from "./components/pages/setting/color";
import Marketing from "./components/pages/marketing/index";
import Coupon from "./components/pages/coupon/coupon";
import Return from "./components/pages/return/index";
import Installments from "./components/pages/installments/index";
import Stats from "./components/pages/setting/stats";

function App() {
  return (
    <>
      <Toast />
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
          <PrivateRouter path="/marketing" component={Marketing} />
          <PrivateRouter path="/coupons" component={Coupon} />
          <PrivateRouter path="/return" component={Return} />
          <PrivateRouter path="/installments" component={Installments} />
          <PrivateRouter path="/stats" component={Stats} />


          <PrivateRouter path="*" component={NotFound} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
