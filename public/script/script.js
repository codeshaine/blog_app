function deleteItem(index) {
  console.log(index);
  fetch(`/index/${index}`, {
    method: "delete",
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`oops you got an error ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      console.log(data);
      //  updateUI(data.storage);
      location.reload();
      // renderUpdatedData(data.storage);
    })
    .catch((err) => {
      console.log(err);
    });
}
