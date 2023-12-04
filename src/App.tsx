import styled from "styled-components";

const GRID_SIZE = 42;
const DATES = new Array(GRID_SIZE).fill(null);

const Wrapper = styled.section.attrs({
  className: `Wrapper`,
})`
  width: 100%;
  box-sizing: border-box;
  padding: 20px 3% 20px;
  background: #eeeff1;
`;

const Grid = styled.div.attrs({
  className: `Grid`,
})`
  display: flex;
  width: 100%;
  padding: 5px;
  flex-wrap: wrap;
  gap: 5px;
`;
const Cell = styled.div.attrs({
  className: `Cell`,
})`
  width: 15.8%;
  aspect-ratio: 1/1;
  border-radius: 3px;
  background: #e3e4e6;
`;

const App = () => {
  return (
    <Wrapper>
      <div>December 2023</div>
      <Grid>
        {DATES.map((value, index) => (
          <Cell key={index}>{value}</Cell>
        ))}
      </Grid>
    </Wrapper>
  );
};

export default App;
