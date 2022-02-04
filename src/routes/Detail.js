import { gql, useQuery } from "@apollo/client";
import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Movie from "../components/Movie";

const GET_MOVIE = gql`
  query getMovie($id: Int!) {
    #   id type 검사
    movie(id: $id) {
      # 변수에 id 주는곳.
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
  height: 100vh;
  background-image: linear-gradient(-45deg, #d754ab, #fd723a);
  width: 100%;
  /* display: flex; */
  /* justify-content: space-around; */
  /* align-items: center; */
  color: white;
`;

const Column = styled.div`
  display: flex;
  margin-left: 10px;
  width: 70%;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: 65px;
  margin-bottom: 15px;
`;

const Subtitle = styled.h4`
  font-size: 35px;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 28px;
`;

const Poster = styled.div`
  width: 25%;
  height: 60%;
  background-color: transparent;
  background-image: url(${(props) => props.bg});
  background-size: cover;
  background-position: center center;
`;

const Ae = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  /* grid-gap: 10px; */
  width: 100%;
  position: absolute;
`;
const As = styled.div`
  display: flex;
  width: 100%;
  height: 80%;
  align-items: center;
  position: relative;
  /* background-color: red; */
`;

function Detail() {
  const { id } = useParams();
  console.log(id);
  const { loading, data } = useQuery(GET_MOVIE, {
    // variables: { id },
    variables: { id: parseInt(id) },
  });
  // if (loading) {
  //   return "loading";
  // }
  // if (data && data.movie) {
  //   return data.movie.title;
  // }
  console.log(data);
  return (
    <Container>
      <As>
        <Column>
          <Title>
            {" "}
            {loading
              ? "Loading..."
              : `${data.movie.title} ${data.movie.isLiked ? "💖" : "😞"}`}
          </Title>
          {!loading && data.movie && (
            <>
              <Subtitle>
                {data.movie.language} · {data.movie.rating}
              </Subtitle>
              <Description>{data.movie.description_intro}</Description>
            </>
          )}
        </Column>
        <Poster bg={data && data.movie ? data.movie.medium_cover_image : ""} />
      </As>
      <Ae>
        {data &&
          data.suggestions.map((suggestion) => (
            <Movie
              key={suggestion.id}
              id={suggestion.id}
              bg={suggestion.medium_cover_image}
              isLiked={suggestion.isLiked}
            />
          ))}
      </Ae>
    </Container>
  );
}

export default Detail;
