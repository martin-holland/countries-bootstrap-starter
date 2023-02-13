const Login = () => {


  return (
    <div class="">
    <div class="form">
      <p>Login
      </p>
      <form class="login-form">
        <input type="text" placeholder="email" required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"/>
        <input type="password" placeholder="password" required />
        <button>login</button>
      </form>  
    </div>
  </div>
  );
};

export { Login };
