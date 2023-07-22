function Header() {
  return (
    <>
      <header className="text-5xl text-pink">Welcome</header>
      <h2 className="text-3xl">Sign In</h2>
    </>
  );
}

function FieldSet() {
  return (
    <fieldset>
      <label htmlFor="email">Email</label>
      <input
        className="border-2 border-pink focus:outline-none mb-2"
        type="text"
        name="email"
        placeholder="John"
      />
    </fieldset>
  );
}

function Form() {
  return (
    <form className="flex flex-col items-center">
      <div>
        <label htmlFor="password">Password</label>
        <br />
        <input
          className="border-2 border-pink focus:outline-none mb-2"
          type="text"
          name="password"
          placeholder="Doe"
        />
        <br />
      </div>
    </form>
  );
}

function Actions() {
  return (
    <>
      <button className="bg-pink text-white px-4 py-1 mt-4 rounded-lg">
        Sign In
      </button>
      <p> Don't have an account?</p>
      <button className="text-pink hover:bold">Sign Up</button>
    </>
  );
}

function LoginForm() {
  return (
    <div className="w-1/2 flex items-center justify-center">
      <div className="border-pink border-2 p-28 flex flex-col items-center">
        <Header />
        <Form />
        <Actions />
      </div>
    </div>
  );
}

export default LoginForm;
