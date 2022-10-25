import "bootstrap/dist/css/bootstrap.min.css";
import { Navigate, Route, Routes } from "react-router-dom";
import PostingsPage from "./pages/PostingsPage";
import Layout from "./layout/Layout";
import CreatePostPage from "./pages/CreatePostPage";
import PostingPage from "./pages/PostingPage";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to={"/postings"} />} />
        <Route path="/postings" element={<PostingsPage />} />
        <Route path="/postings/:id" element={<PostingPage />} />
        <Route path="/create" element={<CreatePostPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Layout>
  );
}

export default App;
