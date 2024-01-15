import Title from "../components/Title";
import HomePage from "../website/HomePage";

export default ({ data }) => {
  console.log(data);
  return (
    <div>
      <Title title="Home" />
      <HomePage />
    </div>
  );
};
