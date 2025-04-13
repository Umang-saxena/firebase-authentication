import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useFormik } from "formik";
import {Link} from "react-router-dom";
// import  {useAuth} from "../contexts/authContext/index.jsx";
// import { auth } from "../firebase/firebase.js";
// import { createUserWithEmailAndPassword } from "firebase/auth";
import {useAuth} from "../contexts/AuthContext.jsx"
import * as Yup from "yup";
import { useState } from "react";




const initialValues = {
  email: "",
  password: "",
  confirm_password: "",
};

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string().required("Required"),
  confirm_password: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Required"),
});


const Register = () => {
  const {signup} = useAuth()

  const [firebaseError, setFirebaseError] = useState(null);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setFirebaseError(null);
      try {
        await signup(values.email, values.password).then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          console.log("User created successfully:");
          window.location.href = "/admin";
        })
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
      <h2>Register Now</h2>
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
      <Form.Group className="mb-3" controlId="confirm_password">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Confirm Password"
          value={formik.values.confirm_password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isInvalid={formik.touched.confirm_password && formik.errors.confirm_password}
        />
        <Form.Control.Feedback type="invalid"> {formik.errors.confirm_password} </Form.Control.Feedback>
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
      <div className="mt-3 text-center">
  <span>Already have an account? </span>
  <Link to="/login">Login</Link>
</div>

    </Form>
  );
};

export default Register;

