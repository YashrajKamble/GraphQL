import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

const query = gql`
  query GetTodosWithUser {
    getTodos {
      id
      title
      completed
      user {
        id
        name
      }
    }
  }
`;

function App() {
  const { data, loading, error } = useQuery(query);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Failed to load data.</h1>;

  return (
    <div className="App">
      <table>
        <tbody>
          {(data?.getTodos ?? []).map((todo) => (
            <tr key={todo.id}>
              <td>
                {todo.title}</td>
              <td>{todo?.user?.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
