
import { Card, Form, Button } from "react-bootstrap";
import { useFormik } from "formik";
import {Link,useNavigate} from "react-router-dom";
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
  const {signup} = useAuth();
  const navigate = useNavigate();
  const [firebaseError, setFirebaseError] = useState(null);
  const[loading, setLoading] = useState(false)

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setFirebaseError(null);
      try {
        setLoading(true);
        await signup(values.email, values.password).then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          console.log("User created successfully:");
          navigate("/");
        })
        setLoading(false);
      } catch (error) {
        setFirebaseError(error.message);
        // console.log(firebaseError);
      }

      // console.log(formik.values);
    },
  });
  // console.log(formik)

  return (
    <Card>
      <Card.Body className="text-center mb-3 w-200 mx-auto">
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

        <Button variant="primary" type="submit" disabled={loading}>
          Sign Up
        </Button>
        <div className="mt-3 text-center">
    <span>Already have an account? </span>
    <Link to="/login">Login</Link>
  </div>

      </Form>
      </Card.Body>
      
    </Card>
  );
};

export default Register;

