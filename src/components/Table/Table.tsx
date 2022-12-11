import { Table as BootstrapTable } from "react-bootstrap";
import Button from "../../components/Button/Button";
import { UserDataProps } from "../../globalInterfaces";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

interface TableProps {
  userData: Array<UserDataProps>;
  handleDelete: (a: number) => void;
}

const Table = ({ userData, handleDelete }: TableProps) => {
  const [filteredArray, setFilteredArray] = useState<Array<UserDataProps>>();
  const [sortedAlphabetically, setSortedAlphabetically] =
    useState<boolean>(false);

  useEffect(() => {
    setFilteredArray(userData);
  }, [userData]);

  const sortAlphabetically = () => {
    const filteredCopy = [...userData];
    setSortedAlphabetically(!sortedAlphabetically);
    filteredCopy.sort((a, b) => {
      if (sortedAlphabetically && a.username > b.username) {
        return 1;
      } else if (!sortedAlphabetically && a.username < b.username) {
        return -1;
      }
      return 0;
    });
    setFilteredArray(filteredCopy);
  };

  const navigate = useNavigate();
  return (
    <BootstrapTable striped hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th onClick={() => sortAlphabetically()}>
            Username
            {sortedAlphabetically ? (
              <i className="bi bi-sort-alpha-down" />
            ) : (
              <i className="bi bi-sort-alpha-up" />
            )}
          </th>
          <th>City</th>
          <th>Email</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {filteredArray && filteredArray.length === 0 ? (
          <p>Ooops, seems like you don't have any user data. Create one!</p>
        ) : (
          filteredArray?.map((user, index) => {
            return (
              <tr key={index}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.address.city}</td>
                <td>{user.email}</td>
                <td>
                  <Button
                    text="Edit"
                    variant="warning"
                    onClick={() => {
                      navigate(`/${user.id}/edit`, { state: user });
                    }}
                  />
                </td>
                <td>
                  <Button
                    text="Delete"
                    variant="danger"
                    onClick={() => handleDelete(user.id)}
                  />
                </td>
              </tr>
            );
          })
        )}
      </tbody>
    </BootstrapTable>
  );
};

export default Table;
