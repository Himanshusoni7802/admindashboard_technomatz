const CustomerPagination = ({
  totalpages,
  currentpage,
  setCurrentPage,
  content,
}) => {
  function randomfun() {
    let btns = [];

    for (let i = 1; i <= totalpages; i++) {
      btns.push(
        <button
          onClick={() => setCurrentPage(i)}
          className={`${
            currentpage === i ? "bg-blue-600" : "bg-blue-400"
          } bg-blue-400 rounded-xl text-white px-4 py-2 `}
        >
          {i}
        </button>
      );
    }

    return btns;
  }

  return (
    <div className="flex flex-col gap-10 w-full h-full">
      <div className="grid grid-cols-4 gap-6 px-6">
        {content.map((item) => (
          <div
            key={item._id}
            className="border rounded-xl p-5 shadow-sm hover:shadow-md transition-all bg-white"
          >
            <h1 className="font-semibold text-lg">{item.name}</h1>
            <p className="text-gray-600 mt-1">{item.description}</p>
            <h3 className="text-gray-600 mt-1 font-bold">{item.price}</h3>
          </div>
        ))}
      </div>

      <div className="flex gap-20">
        <button disabled = {currentpage === 1}
          onClick={() => setCurrentPage((prev) => (prev > 1 ? prev - 1 : 1))}
          className="bg-blue-500 disabled:opacity-50 rounded-xl px-4 py-2 text-white"
        >
          Prev
        </button>

        {randomfun()}

        <button  disabled = {currentpage === totalpages}
          onClick={() =>
            setCurrentPage((prev) =>
              prev < totalpages ? prev + 1 : totalpages
            )
          }
          className="bg-blue-500 disabled:opacity-50 rounded-xl px-4 py-2 text-white"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CustomerPagination;
