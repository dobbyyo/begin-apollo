import { gql, useQuery } from "@apollo/client";
import React from "react";
import styled from "styled-components";
import Movie from "../components/Movie";

const GET_MOVIES = gql`
  query {
    movies {
      id
      medium_cover_image
      isLiked @client
      # client에서 보내주는것을 알려줘야한다.
    }
  }
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
const Header = styled.header`
  background-image: linear-gradient(-45deg, #d754ab, #fd723a);
  height: 45vh;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
const Title = styled.h1`
  font-size: 60px;
  font-weight: 600;
  margin-bottom: 20px;
`;
const Subtitle = styled.h3`
  font-size: 35px;
`;
const Loading = styled.div`
  font-size: 18px;
  opacity: 0.5;
  font-weight: 500;
  margin-top: 10px;
`;
const Movies = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 25px;
  width: 80%;
  position: relative;
  top: -50px;
`;

function Home() {
  const { loading, data } = useQuery(GET_MOVIES);
  //   console.log(loading, data);
  //   if (loading) {
  //     return "loading....";
  //   }
  //   if (data && data.movies) {
  //     return data.movies.map((movie) => <h1 key={movie.id}>{movie.id}</h1>);
  //   }
  return (
    <Container>
      <Header>
        <Title>Apollo 2020</Title>
        <Subtitle>I love GraphQL</Subtitle>
      </Header>
      {loading && <Loading>Loading...</Loading>}
      {!loading && data.movies && (
        <Movies>
          {data?.movies?.map((movie) => (
            <Movie
              key={movie.id}
              id={movie.id}
              isLiked={movie.isLiked}
              bg={movie.medium_cover_image}
            />
          ))}
        </Movies>
      )}
    </Container>
  );
}

export default Home;
