import Title from "../components/Title";
import Login from "./login";

export default ({ data }) => {
  console.log(data);
  return (
    <div>
      <Title title="Home" />
      <Login />
    </div>
  );
};
