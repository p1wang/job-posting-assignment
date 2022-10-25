import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPosting } from "../redux/postingsSlice";
import moment from "moment";

export default function PostPage() {
  const { currentPosting } = useSelector((state) => state.postings);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [showCompanyInfo, setShowCompanyInfo] = useState(false);

  useEffect(() => {
    dispatch(getPosting({ id: id }));
  }, []);

  if (!currentPosting) return <>Loading...</>;

  return (
    <Container>
      <h4>{currentPosting[0].company_name}</h4>
      <h6>{currentPosting[0].title}</h6>
      <p
        className="mt-2 px-2 py-1 bg-secondary text-white rounded"
        style={{ width: "fit-content", display: "inline-block" }}
      >{`$${currentPosting[0].pay_rate}/ hour`}</p>
      <p
        className="ms-2 px-2 py-1 bg-secondary text-white rounded"
        style={{ width: "fit-content", display: "inline-block" }}
      >{`${currentPosting[0].job_type}`}</p>
      <p>{`Category: ${currentPosting[0].job_category}`}</p>
      <p>{`Industry: ${currentPosting[0].industry}`}</p>
      <p>{`Start Date: ${moment(currentPosting[0].start_date).format(
        "MMMM Do YYYY"
      )}`}</p>

      <Button
        onClick={() => {
          setShowCompanyInfo(!showCompanyInfo);
        }}
        variant="outline-info"
        className="my-2"
      >
        {showCompanyInfo
          ? "Hide Company Infomation"
          : "Show Company Infomation"}
      </Button>
      {showCompanyInfo && (
        <div>
          <p>{`Address: ${currentPosting[0].address}`}</p>
          <p>{`Email: ${currentPosting[0].email}`}</p>
          <p>{`Phone: ${currentPosting[0].phone}`}</p>
        </div>
      )}
      <p>{currentPosting[0].short_description}</p>
      <p>{currentPosting[0].job_description}</p>
    </Container>
  );
}
