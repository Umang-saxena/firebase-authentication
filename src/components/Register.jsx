import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useFormik } from "formik";
// import  {useAuth} from "../contexts/authContext/index.jsx";
import {auth}  from "../firebase/firebase.js";
import { createUserWithEmailAndPassword } from "firebase/auth";

const initialValues = {
  email: "",
  password: "",
  confirm_password: "",
}; 


const Register = () => {
  const formik = useFormik({
    initialValues:initialValues,
    onSubmit: async (values) => {
      try {
         await createUserWithEmailAndPassword(auth,values.email, values.password);
         const user = auth.currentUser;
         console.log(user);
         console.log("User created successfully:");
      } catch (error) {
        console.error("Error creating user:", error.message);
        
      }

      // console.log(formik.values);
    },
  });
  // console.log(formik)

  return (
    <Form  onSubmit={formik.handleSubmit}>
      <h2>Register Now</h2>
      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" values={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" values={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="confirm_password">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control type="password" placeholder="Confirm Password" values={formik.values.confirm_password} onChange={formik.handleChange} onBlur={formik.handleBlur} />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default Register;