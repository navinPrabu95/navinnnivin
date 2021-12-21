import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AdminLogin from './Components/Admin/AdminLogin';
import Login from './Components/User/Login';
import CreateForm from './Components/Admin/CreateForm';
import DynamicForm from './Components/Admin/DynamicForm';
import EditForm from './Components/User/EditForm';
import ClientForm from './Components/User/ClientForm';
import Home from './Components/Home';


function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' exact element={<Home/>}></Route>
          <Route path='/user' element={<Login />} />
          <Route path='/forms' element={<ClientForm />} />
          <Route path='/create/:id' element={<EditForm />} />
          <Route path='/admin' exact element={<AdminLogin />} />
          <Route path='/admin/dynamicForm' exact element={<DynamicForm />} />
          <Route path='/admin/dynamicForm/create' element={<CreateForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
