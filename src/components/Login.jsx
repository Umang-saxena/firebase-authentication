import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useFormik } from "formik";
import {Link} from "react-router-dom";
// import  {useAuth} from "../contexts/authContext/index.jsx";
import { auth } from "../firebase/firebase.js";
import { signInWithEmailAndPassword } from "firebase/auth";
import * as Yup from "yup";
import { useState } from "react";



const initialValues = {
  email: "",
  password: ""
};

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string().required("Required"),
});


const Register = () => {

  const [firebaseError, setFirebaseError] = useState(null);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setFirebaseError(null);
      try {
        await signInWithEmailAndPassword(
          auth,
          values.email,
          values.password
        );
        console.log("User logged in successfully:");
        window.location.href = "/admin";
        const user = auth.currentUser;
        console.log(user);
        console.log("User created successfully:");
      } catch (error) {
        setFirebaseError(error.message);
        // console.log(firebaseError);
      }

      // console.log(formik.values);
    },
  });
  // console.log(formik)

  return (
    <Form onSubmit={formik.handleSubmit}>
      <h2>Login Now</h2>
      {firebaseError && (
    <p className="text-danger fw-bold">{firebaseError}</p>
  )}
      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isInvalid={formik.touched.email && formik.errors.email}
        />
        <Form.Control.Feedback type="invalid"> {formik.errors.email} </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isInvalid={formik.touched.password && formik.errors.password}
        />
        <Form.Control.Feedback type="invalid"> {formik.errors.password} </Form.Control.Feedback>
      </Form.Group>
      <Button variant="primary" type="submit">
        Login
      </Button>
      <div className="mt-3 text-center">
  <span>No Account? </span>
  <Link to="/register">Sign Up</Link>
</div>

    </Form>
  );
};

export default Register;
