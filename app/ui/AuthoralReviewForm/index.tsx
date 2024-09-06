import { Box, Button, FormControl, FormLabel, Input, Textarea, useToast } from "@chakra-ui/react";

import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { postAuthoralReview } from "@/lib/features/authoralReview/authoralReviewSlice";

const AuthoralReviewForm = () => {
  const dispatch = useAppDispatch();
  const { data, status } = useAppSelector((state) => state.authoralReviews);
  const toast = useToast();

  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [review, setReview] = useState("");
  const [tconst, setTconst] = useState("");


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(
      postAuthoralReview({
        title: title,
        author: author,
        review: review,
        tconst: tconst
      })
    );
  };

  const handleAuthorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuthor(e.target.value);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleReviewChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReview(e.target.value);
  };

  const handletConstChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTconst(e.target.value);
  };

  return (
    <Box as="form" p={4} borderWidth={1} borderRadius="md" boxShadow="md">
      <FormControl id="author" mb={4} isRequired>
        <FormLabel>Author</FormLabel>
        <Input 
          type="text" 
          placeholder="Your name here" 
          value={data?.author}
          onChange={handleAuthorChange}
        />
      </FormControl>
      <FormControl id="title" mb={4} isRequired>
        <FormLabel>Title</FormLabel>
        <Input 
          type="text"
          value={data?.title}
          onChange={handleTitleChange}
          placeholder="Insert a creative title"
        />
      </FormControl>
      <FormControl id="tconst" mb={4} isRequired>
      <FormLabel>tconst (IMDb)</FormLabel>
        <Input 
          type="text" 
          placeholder="IMDB tt code" 
          value={data?.tconst}
          onChange={handletConstChange}
        />
      </FormControl>
      <FormControl id="text" mb={4} isRequired>
        <FormLabel>Review</FormLabel>
        <Textarea 
          placeholder="Enter text"
          onChange={handleReviewChange}
          value={data?.review} 
          rows={10}
        />
      </FormControl>
      <Button
        isLoading={status === "loading"}
        onClick={handleSubmit}
        type="submit"
      >Submit</Button>
    </Box>
  );
}

export default AuthoralReviewForm;
