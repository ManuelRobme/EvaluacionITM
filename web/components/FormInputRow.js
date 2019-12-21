import {Col, FormFeedback, FormGroup, Label, Input} from 'reactstrap'

const FormInput = (props) => 
    <FormGroup row>
        <Label sm={2} for={props.name}>{props.label}</Label>
        <Col sm={10}>
        <Input value={props.value} invalid={!!props.error} onChange={props.onChange.bind(this, props.name)} type={props.type} name={props.name} id={props.name} placeholder={props.placeholder ? props.placeholder : ""} />
        </Col>
        <FormFeedback>{props.error}</FormFeedback>
    </FormGroup>

export default FormInput