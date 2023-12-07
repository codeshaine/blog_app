function triggerSubmission(clicked) {
  let form = clicked.closest("form");
  console.log(clicked)
  form.submit();
}

