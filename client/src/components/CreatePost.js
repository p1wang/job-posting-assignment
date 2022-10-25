import React from "react";
import { useForm } from "react-hook-form";
import { Form, Button, Row, Col } from "react-bootstrap";
import { createPosting, updatePosting } from "../redux/postingsSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import convertToBinary from "../utils/convertToBinary";

export default function CreatePost({ posting, isUpdate, setShowEditForm }) {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      jobType: isUpdate ? posting.job_type : "",
      industry: isUpdate ? posting.industry : "",
      jobCategory: isUpdate ? posting.job_category : "",
      payRate: isUpdate ? posting.pay_rate : "",
      startDate: isUpdate
        ? moment(posting.start_date).format("YYYY-MM-DD")
        : "",
      title: isUpdate ? posting.title : "",
      shortDescription: isUpdate ? posting.short_description : "",
      jobDescription: isUpdate ? posting.job_description : "",
      descriptionFile: "",
    },
  });
  const navigate = useNavigate();

  const onSubmit = async (formData) => {
    console.log(formData);
    const binaryFileData = await convertToBinary(formData.descriptionFile[0]);

    isUpdate
      ? dispatch(
          updatePosting({
            id: posting.job_id,
            updatedPosting: {
              ...formData,
              descriptionFile: new Int8Array(binaryFileData),
            },
          })
        )
      : dispatch(
          createPosting({
            newPosting: {
              ...formData,
              descriptionFile: new Int8Array(binaryFileData),
            },
          })
        );
    reset();
    isUpdate && setShowEditForm(false);

    !isUpdate && navigate("/");
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        margin: "auto",
        maxWidth: "500px",
        display: "flex",
        flexDirection: "column",
        gap: ".5rem",
      }}
    >
      {/* Job Type */}
      <Row>
        <Col>
          <Form.Group>
            <Form.Label>
              Job Type <span className="text-danger">*</span>
            </Form.Label>
            <Form.Select {...register("jobType")} required autoFocus>
              <option value="">Select</option>
              <option value="Full Time">Full Time</option>
              <option value="Part Time">Part Time</option>
              <option value="Contract">Contract</option>
              <option value="Permanent">Permanent</option>
              <option value="Seasonal">Seasonal</option>
              <option value="Temporary">Temporary</option>
            </Form.Select>
          </Form.Group>
        </Col>

        {/* Industries */}
        <Col>
          <Form.Group>
            <Form.Label>
              Industry <span className="text-danger">*</span>
            </Form.Label>
            <Form.Select {...register("industry")} required>
              <option value="">Select</option>
              <option value="Consumer Services">Consumer Services</option>
              <option value="Miscellaneous">Miscellaneous</option>
              <option value="Health Care">Health Care</option>
              <option value="Public Utilities">Public Utilities</option>
              <option value="Finance">Finance</option>
              <option value="Consumer Durables">Consumer Durables</option>
              <option value="Capital Goods">Capital Goods</option>
              <option value="Basic Industries">Basic Industries</option>
              <option value="Consumer Non-Durables">
                Consumer Non-Durables
              </option>
              <option value="Technology">Technology</option>
              <option value="Transportation">Transportation</option>
              <option value="Energy">Energy</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      {/* Job Categories */}
      <Row>
        <Col>
          <Form.Group>
            <Form.Label>
              Category <span className="text-danger">*</span>
            </Form.Label>
            <Form.Select {...register("jobCategory")} required>
              <option value="">Select</option>
              <option value="Training">Training</option>
              <option value="Business Development">Business Development</option>
              <option value="Product Management">Product Management</option>
              <option value="Support">Support</option>
              <option value="Marketing">Marketing</option>
              <option value="Human Resources">Human Resources</option>
              <option value="Sales">Sales</option>
              <option value="Legal">Legal</option>
              <option value="Services">Services</option>
              <option value="Engineering">Engineering</option>
              <option value="Research and Development">
                Research and Development
              </option>
              <option value="Accounting">Accounting</option>
            </Form.Select>
          </Form.Group>
        </Col>

        {/* Pay Rate  */}
        <Col>
          <Form.Group>
            <Form.Label>
              Pay Rate <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              {...register("payRate")}
              required
              type="number"
              step="0.01"
              placeholder="eg. 30.00"
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        {/* Start Date  */}
        <Col>
          <Form.Group>
            <Form.Label>
              Start Date <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control {...register("startDate")} required type="date" />
          </Form.Group>
        </Col>

        {/* Description File */}
        <Col>
          <Form.Group>
            <Form.Label>
              Description File <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              {...register("descriptionFile")}
              required
              type="file"
            />
          </Form.Group>
        </Col>
      </Row>

      {/* Title */}
      <Row>
        <Form.Group>
          <Form.Label>
            Title <span className="text-danger">*</span>
          </Form.Label>
          <Form.Control
            {...register("title")}
            required
            maxLength="255"
            placeholder="Title for the job ..."
          />
        </Form.Group>
      </Row>

      {/* Summary*/}
      <Row>
        <Form.Group>
          <Form.Label>
            Summary <span className="text-danger">*</span>
          </Form.Label>
          <Form.Control
            {...register("shortDescription")}
            required
            as="textarea"
            rows={4}
            maxLength="1000"
            placeholder="Summarize the job ..."
          />
        </Form.Group>
      </Row>
      <Row>
        <Form.Group>
          <Form.Label>
            Description <span className="text-danger">*</span>
          </Form.Label>
          <Form.Control
            {...register("jobDescription")}
            required
            as="textarea"
            rows={8}
            maxLength="2000"
            placeholder="Describe a bit more about the job ..."
          />
        </Form.Group>
      </Row>
      {/* submit */}
      <Button variant="primary" type="submit" className="d-block ms-auto mt-3">
        Submit
      </Button>
    </Form>
  );
}
