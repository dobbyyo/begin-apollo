import { gql, useMutation, useQuery } from "@apollo/client";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const LIKE_MOVIE = gql`
  mutation toggleLikeMovie($id: Int!, $isLiked: Boolean!) {
    toggleLikeMovie(id: $id, isLiked: $isLiked) @client
  }
`;
const GET_MOVIE = gql`
  query getMovie($id: Int!) {
    movie(id: $id) {
      id
      title
      medium_cover_image
      description_intro
      language
      rating
      isLiked @client
    }
    suggestions(id: $id) {
      id
      medium_cover_image
      isLiked @client
    }
  }
`;

const Container = styled.div`
  height: 500px;
  border-radius: 7px;
  width: 100%;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  /* overflow: hidden; */
  background-color: transparent;
  padding-bottom: 20px;
`;
const Poster = styled.div`
  background-image: url(${(props) => props.bg});
  height: 100%;
  width: 100%;
  background-size: cover;
  background-position: center center;
  border-radius: 7px;
`;

function Movie({ id, bg, isLiked }) {
  useQuery(GET_MOVIE, { variables: { id: parseInt(id) } });
  const [toggleMovie] = useMutation(LIKE_MOVIE, {
    variables: { id: parseInt(id), isLiked },
  });

  return (
    <Container>
      <Link to={`/${id}`}>
        <Poster bg={bg} />
      </Link>
      <button
        style={{
          width: "100%",
          justifyContent: "center",
        }}
        onClick={toggleMovie}
      >
        {isLiked ? " 💔" : "❤️"}
      </button>
    </Container>
  );
}

export default Movie;
