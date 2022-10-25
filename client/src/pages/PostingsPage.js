import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useSearchParams } from "react-router-dom";
import PaginationComp from "../components/PaginationComp";
import Postings from "../components/Postings";
import { getPostings } from "../redux/postingsSlice";

export default function PostingsPage() {
  let [searchParams, setSearchParams] = useSearchParams();
  let currentParams = Object.fromEntries([...searchParams]);
  let { pathname } = useLocation();
  let location = useLocation();

  const dispatch = useDispatch();
  const { postings, isLoading, totalPages } = useSelector(
    (state) => state.postings
  );

  // useEffect(() => {
  //   dispatch(getPostings());
  // }, []);

  useEffect(() => {
    pathname === "/postings" &&
      dispatch(
        getPostings({
          searchQuery: currentParams,
        })
      );
  }, [location]);

  return (
    <Container
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
      }}
    >
      <Postings postings={postings} />
      <div style={{ margin: "auto", paddingTop: "1rem" }}>
        <PaginationComp totalPages={totalPages} />
      </div>
    </Container>
  );
}
