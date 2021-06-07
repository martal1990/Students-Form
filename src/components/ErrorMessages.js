import Form from "react-bootstrap/Form";

export default function ErrorMessages(props) {
    // console.log(props.errors);

  return (
      <>
      {props.errors.map((error, idx) => <Form.Text className="text-danger" key={`${idx}`}>
      {error}
    </Form.Text>
  )}
  </>
  )
//   console.log(stam);
//   return <div></div>
 
    // return <Form.Text>LAMA</Form.Text> 
}
