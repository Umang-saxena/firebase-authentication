import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useFormik } from "formik";

const initialValues = {
  email: "",
  password: "",
  confirm_password: "",
}; 


const Register = () => {
  const formik = useFormik({
    initialValues:initialValues,
    onSubmit: (values) => {
      console.log(formik.values);
    },
  });
  // console.log(formik)

  return (
    <Form  onSubmit={formik.handleSubmit}>
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
