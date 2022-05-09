import React, { useEffect, useState } from "react";

const Users = () => {
  const [data, setData] = useState();
  const [filterArray, setFilterArray] = useState();
  const [id, setId] = useState(0);
  useEffect(() => {
    getData();
    return () => {};
  }, []);

  const categories = [
    "All",
    ...new Set(data?.products?.map((x) => x.category)),
  ];
  const getData = async () => {
    const response = await fetch("https://dummyjson.com/products");
    const responseData = await response.json();
    setData(responseData);
    setFilterArray(responseData?.products);
    console.log(response, "response");
  };

  const onRadioClick = (i, category) => {
    setId(i);
    if (i === 0) {
      setFilterArray(data?.products);
    } else {
      setFilterArray(data?.products?.filter((x) => x.category === category));
    }
  };
  console.log(data, "<===>", filterArray);

  return (
    <div>
      {categories.map((x, i) => {
        return categories[1] === undefined ? (
          <div>No data</div>
        ) : (
          <div key={i}>
            <span>{x}</span>
            <input
              type="radio"
              onChange={(e) => console.log(e.nativeEvent.target.value, "e")}
              checked={id === i}
              onClick={() => onRadioClick(i, x)}
            />
          </div>
        );
      })}
      {data?.products?.[0].title === undefined ? (
        <div> No data available</div>
      ) : (
        filterArray?.map((x) => {
          return (
            <div
              key={x.id}
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
              <span>{x?.title}</span>
              <button
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
        })
      )}
    </div>
  );
};

export default Users;
