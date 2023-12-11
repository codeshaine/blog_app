function triggerSubmission(clicked) {
  const confirmation=window.confirm("Are you sure you want to delete this blog?")
  let form = clicked.closest("form");
  console.log("clieckkd")
if(confirmation)
  form.submit();
}




