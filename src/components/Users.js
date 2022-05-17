import React, { useEffect, useState, memo } from "react";
import axios from "../axios/axios";
const Users = () => {
  const [data, setData] = useState();
  const [id, setId] = useState(0);
  const [filterArray, setFilterArray] = useState(data);

  const getData = async () => {
    const response = await axios.get("/users");
    setData(response?.data);
  };

  const categories = [
    "All",
    ...new Set(data?.map((product) => product?.category)),
  ];
  console.log(categories, "categories");
  console.log(data);
  useEffect(() => {
    getData();
    return () => {};
  }, []);

  const radioClick = (index, c) => {
    setId(index);
    if (index === 0) {
      setFilterArray(data.filter((x) => x));
    } else {
      setFilterArray(data.filter((x) => x.category === c));
    }
  };
  
  console.log(id, "index");

  const deleteUser = (id) => {
    axios
      .delete(`/users/${id}`)
      .then((res) => {
        setData(data.filter((x) => x.id !== id));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h1>Users</h1>
      {categories.map((category, i) => {
        return (
          <>
            <input
              onClick={() => radioClick(i, category)}
              checked={id === i}
              // onChange={(e) => console.log(e, "event")}
              type={"radio"}
            />
            <label>{category}</label>
          </>
        );
      })}
      {filterArray?.map((user) => {
        return (
          <div
            key={user.id}
            style={{
              display: "flex",
              gap: 10,
              margin: "10px 0px",
              backgroundColor: "lightgray",
              padding: "10px",
              justifyContent: "space-between",
              alignitems: "center",
              borderRadius: "10px",
            }}
          >
            <span>{user?.title}</span>
            <button
              onClick={() => deleteUser(user?.id)}
              style={{
                backgroundColor: "Highlight",
                padding: "5px",
                borderRadius: 5,
              }}
            >
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default memo(Users);
